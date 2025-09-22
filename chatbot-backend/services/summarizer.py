import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)


def summarize_text(text, lang):
    
    if text is None or text.strip() == "":
        return {"error": "No text provided for summarization."}

    if lang and lang.lower() != "en" and lang.lower() != "english":
        lang_instruction = f"IMPORTANT: The client_view section MUST be written in {lang} language. Translate all client-facing content to {lang}."
        client_header = f"Client View (Simple {lang} Summary)"
    else:
        lang_instruction = "Write client_view in English."
        client_header = "Client View (Simple English Summary)"

    lang_hint = (
        f"Translate client-facing sections into {lang}."
        if lang and lang.lower() not in ["en", "english"]
        else "Use English for client sections."
    )

    prompt = f"""
    You are an expert legal assistant that creates structured case summaries. 
    Analyze the provided legal case text and return the result ONLY as valid JSON 
    matching the schema below. Do not include markdown, explanations, or extra text. 
    Return only pure JSON.

    {lang_instruction}

    CASE TEXT TO ANALYZE:
    {text}

    REQUIRED JSON OUTPUT SCHEMA:

    {{
      "lawyer_view": {{
        "header": "Lawyer View (Full Technical, Point-wise)",
        "points": [
          "Each point must be technical, precise, and not miss any important detail from the case text."
        ]
      }},
      "client_view": {{
        "header": "{client_header}",
        "points": [
          "Each point should explain the outcome in clear, simple, layman-friendly language{', written in ' + lang if lang and lang.lower() not in ['en', 'english'] else ''}."
        ]
      }},
      "next_date": "",
      "current_status": "Must be one of: 'Pending', 'Ongoing', 'Reserved for Judgment', 'Disposed', 'Appeal Filed', 'Closed'",
      "lawyer_checkpoints": [
        "Bullet points listing exactly what the lawyer must do before the next hearing, in technical terms."
      ]
    }}

    INSTRUCTIONS:
    1. Extract information accurately from the provided case text.
    2. Use the exact structure and section headers shown above.
    3. Lawyer View must be detailed, technical, and cover all key case elements (parties, appeals, subject matter, arguments, analysis, decision, implications, next legal action).
    4. Client View must be simplified{' and written in ' + lang if lang and lang.lower() not in ['en', 'english'] else ''}, avoiding technical jargon.
    5. Include specific dates, case numbers, and court orders when available.
    6. Return each point as a separate array element (do not merge into long paragraphs).
    7. If any section has no relevant information, write: "NaN".
    8. If this is the last hearing date, write "Case closed" for next_date.
    9. For current_status, ONLY use one of these exact values with their specific meanings:
       - 'Pending': Case filed but not yet heard
       - 'Ongoing': Case under trial/hearings
       - 'Reserved for Judgment': Waiting for decision
       - 'Disposed': Case decided/judgment given
       - 'Appeal Filed': Appeal submitted
       - 'Closed': Fully closed
       Choose the most appropriate status based on the case text content.
    10. Ensure the final output is strictly valid JSON as per the schema above, with no additional text or formatting.
    """

    llm_model = genai.GenerativeModel("gemini-2.0-flash")
    response = llm_model.generate_content(prompt, generation_config={'max_output_tokens': 2000})

    print("=" * 80)
    print("DEBUG SUMMARIZER: FULL LLM RESPONSE")
    print("=" * 80)
    print(f"Response text length: {len(response.text) if response.text else 0}")
    print("Raw response text:")
    print("-" * 40)
    if response.text:
        # Print the response with line numbers for easier debugging
        lines = response.text.split('\n')
        for i, line in enumerate(lines, 1):
            print(f"{i:3}: {line}")
    else:
        print("(Empty response)")
    print("-" * 40)
    print(f"Response repr: {repr(response.text)}")
    print("=" * 80)

    try:
        summary_json = json.loads(response.text)
        print("DEBUG SUMMARIZER: ✅ First JSON parse successful")
    except json.JSONDecodeError as e:
        print(f"DEBUG SUMMARIZER: ❌ First JSON parse failed: {e}")
        print(f"Error at character position: {e.pos if hasattr(e, 'pos') else 'unknown'}")
        if hasattr(e, 'pos') and e.pos and response.text:
            # Show context around the error position
            error_pos = e.pos
            start = max(0, error_pos - 50)
            end = min(len(response.text), error_pos + 50)
            print(f"Context around error: ...{response.text[start:end]}...")
        
        print(f"DEBUG SUMMARIZER: Attempting to clean response...")
        
        # More robust cleaning
        cleaned = response.text
        if cleaned:
            # Remove markdown code blocks
            cleaned = cleaned.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            cleaned = cleaned.strip()
            
            print(f"DEBUG SUMMARIZER: Cleaned text length: {len(cleaned)}")
            print("Cleaned text:")
            print("-" * 40)
            cleaned_lines = cleaned.split('\n')
            for i, line in enumerate(cleaned_lines, 1):
                print(f"{i:3}: {line}")
            print("-" * 40)
            
            try:
                summary_json = json.loads(cleaned)
                print("DEBUG SUMMARIZER: ✅ Second JSON parse successful")
            except json.JSONDecodeError as e2:
                print(f"DEBUG SUMMARIZER: ❌ Second JSON parse failed: {e2}")
                print(f"Error at character position: {e2.pos if hasattr(e2, 'pos') else 'unknown'}")
                if hasattr(e2, 'pos') and e2.pos and cleaned:
                    # Show context around the error position in cleaned text
                    error_pos = e2.pos
                    start = max(0, error_pos - 50)
                    end = min(len(cleaned), error_pos + 50)
                    print(f"Context around error in cleaned text: ...{cleaned[start:end]}...")
                
                print("DEBUG SUMMARIZER: Returning error response")
                return {
                    "error": "Failed to parse LLM response as JSON",
                    "raw_response": response.text,
                    "cleaned_response": cleaned,
                    "parse_error": str(e2)
                }
        else:
            print("DEBUG SUMMARIZER: Empty response from LLM")
            return {
                "error": "Empty response from LLM",
                "raw_response": response.text
            }

    print("DEBUG SUMMARIZER: ✅ Returning parsed JSON")
    return summary_json