import numpy as np
import faiss,pickle, os, json
from services.embedding_model import EmbeddingModel
import google.generativeai as genai
from dotenv import load_dotenv
from collections import defaultdict, deque
from datetime import datetime
import jwt

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

conversation_memory = defaultdict(lambda: defaultdict(lambda: deque(maxlen=10)))

STATIC_PATH = "data/static"

supreme_index = faiss.read_index(os.path.join(f"{STATIC_PATH}/legal22-25.index"))
with open(os.path.join(f"{STATIC_PATH}/chunks22-25.pkl"), "rb") as f:
    supreme_chunks = pickle.load(f)

ref_index = faiss.read_index(os.path.join(f"{STATIC_PATH}/ref_emb.index"))
with open(os.path.join(f"{STATIC_PATH}/ref.pkl"), "rb") as f:
    ref_chunks = pickle.load(f)
    
def load_case_db(case_number: str):
    case_path = f"data/cases/{case_number}"
    index = faiss.read_index(os.path.join(case_path, "legal.index"))
    with open(os.path.join(case_path, "chunks.pkl"), "rb") as f:
        chunks = pickle.load(f)
    
    return index, chunks


model = EmbeddingModel.get_model()

def extract_user_from_jwt(auth_header):
    if not auth_header or not auth_header.startswith('Bearer '):
        return None, None
    
    token = auth_header.split(' ')[1]
    try:
        decoded = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded.get('userId') or decoded.get('user_id') or decoded.get('id') or decoded.get('sub')
        session_id = decoded.get('sessionId') or decoded.get('session_id')
        return str(user_id), str(session_id) if session_id else None
    except Exception as e:
        print(f"JWT decode error: {e}")
        return None, None

def get_conversation_history(user_id, case_number, limit=3):
    if not user_id or not case_number:
        return []
    
    memory_key = f"{user_id}:{case_number}"
    if memory_key in conversation_memory:
        history = list(conversation_memory[user_id][case_number])
        return history[-limit:] if len(history) > limit else history
    return []

def save_conversation_turn(user_id, case_number, query, response):
    if not user_id or not case_number:
        return
    
    turn = {
        "query": query,
        "response": response[:500],
        "timestamp": datetime.now().isoformat()
    }
    
    conversation_memory[user_id][case_number].append(turn)

def chatbot_response(query, case_number=None, auth_header=None, top_k=10):
    case_identifier = case_number
    
    user_id, session_id = extract_user_from_jwt(auth_header)
    
    conversation_history = get_conversation_history(user_id, case_identifier) if user_id and case_identifier else []
    
    query_embedding = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)
    
    supreme_references = []
    law_references = []
    case_references = []

    D_sup, I_sup = supreme_index.search(query_embedding, top_k//2)
    supreme_references.extend([supreme_chunks[i] for i in I_sup[0] if i < len(supreme_chunks)])
    
    D_ref, I_ref = ref_index.search(query_embedding, top_k//2)
    law_references.extend([ref_chunks[i] for i in I_ref[0] if i < len(ref_chunks)])

    if case_identifier:
        try:
            index, chunks = load_case_db(case_identifier)
            D_c, I_c = index.search(query_embedding, top_k//2)
            case_references.extend([chunks[i] for i in I_c[0] if i < len(chunks)])
        except Exception as e:
            print(f"Case data not found for {case_identifier}: {e}")

    conversation_context = ""
    if conversation_history:
        newline = chr(10)
        context_lines = []
        for turn in conversation_history[-3:]:
            context_lines.append(f"Q: {turn['query']}{newline}A: {turn['response'][:150]}...")
        
        conversation_context = f"""
    Previous Conversation Context (for continuity):
    {newline.join(context_lines)}
    ---
    """

    newline = chr(10)
    
    law_context = f"Legal Provisions (IPC, CrPC, CPC):{newline}{newline.join(law_references)}" if law_references else "Legal Provisions: None available"
    supreme_context = f"Supreme Court Precedents:{newline}{newline.join(supreme_references)}" if supreme_references else "Supreme Court Precedents: None available"
    case_context = f"Case-Specific Documents:{newline}{newline.join(case_references)}" if case_references else "Case-Specific Documents: None available"
    
    prompt = f"""
    You are an expert legal assistant with memory of our conversation and access to comprehensive legal databases.
    Consider the conversation history when providing your response to maintain context continuity.
    Return the result ONLY as valid JSON. Do not include explanations, markdown, or extra text.

    IMPORTANT: Only respond to queries related to legal matters, cases, laws, regulations, court proceedings, or legal advice. 
    If the query is not related to legal matters (such as general conversation, personal questions, non-legal topics, etc.), 
    politely decline to answer and redirect the user to ask legal-related questions.

    {conversation_context}

    LEGAL DATABASE SOURCES:
    
    {law_context}
    
    ---
    
    {supreme_context}
    
    ---
    
    {case_context}

    Current Lawyer's Query:
    {query}

    JSON Schema:
    {{
    "answer": ["point 1", "point 2", "point 3", ...],
    "IPC": [
        {{"IPC section and section number":"description : One line explanation"}},
        ...
        OR "NaN"
    ],
    "CPC": [
        {{"CPC section and section number":"description : One line explanation"}},
        ...
        OR "NaN"
    ],
    "CRPC": [
        {{"CRPC section and section number":"description : One line explanation"}},
        ...
        OR "NaN"
    ],
    "Supreme": [
        {{"Case number & Case Name": "details : Three-Four points result or relevant facts or the points that the lawyer can use in the current case"}},
        ...
        OR "NaN"
    ]
    }}

    Rules:
    - Always return valid JSON only.
    - ONLY answer legal-related queries. For non-legal questions, respond with: {{"answer": ["I can only assist with legal matters and case-related questions. Please ask me about laws, regulations, court cases, or legal procedures."], "IPC": "NaN", "CPC": "NaN", "CRPC": "NaN", "Supreme": "NaN"}}
    - Consider conversation history for context continuity and follow-up questions.
    - "answer" must be an array of technical points answering the lawyer's query.
    - Extract IPC sections from "Legal Provisions" data, Supreme Court cases from "Supreme Court Precedents" data.
    - CPC and CrPC sections should be identified from "Legal Provisions" data.
    - If no relevant information for IPC/CPC/CRPC/Supreme, put "NaN" as the value.
    - Do not invent legal citations beyond the provided context.
    - Be concise but do not omit important technical details.
    - Reference previous conversation when relevant (e.g., "As discussed earlier...").
    - Prioritize case-specific documents when available for personalized legal advice.
    """
        
    llm_model = genai.GenerativeModel("gemini-2.0-flash")
    response = llm_model.generate_content(prompt)

    try:
        response_json = json.loads(response.text)
    except json.JSONDecodeError:
        cleaned = response.text.strip().strip("```json").strip("```")
        response_json = json.loads(cleaned)

    if user_id and case_identifier:
        answer_text = " ".join(response_json.get("answer", [])) if isinstance(response_json.get("answer"), list) else str(response_json.get("answer", ""))
        save_conversation_turn(user_id, case_identifier, query, answer_text)

    return response_json