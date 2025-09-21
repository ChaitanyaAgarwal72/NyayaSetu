from flask import Flask, request, jsonify
from utils.text_processing import extract_text_from_pdf
from services.summarizer import summarize_text
from services.vector_store import VectorStore
from services.rag_chatbot import chatbot_response
from utils.db import fetch_latest_hearing_pdf_by_case_number
import os
import tempfile

app = Flask(__name__)

try:
    store = None
except Exception:
    store = None

@app.route("/nyayasetu/store/hearing", methods=["POST"])
def store_hearing():
    try:
        # Try multiple ways to get case_number
        case_number = (
            request.headers.get("case_number") or 
            request.headers.get("X-Case-Number") or 
            request.headers.get("x-case-number")
        )
        
        payload = request.get_json() or {}
        
        if not case_number:
            case_number = payload.get("case_number")
        
        if not case_number:
            return jsonify({"error": "case_number required in headers or body"}), 400
        
        temp_path = None
        try:
            # Fetch the latest hearing PDF from MySQL database
            result = fetch_latest_hearing_pdf_by_case_number(case_number)
        except ValueError:
            return jsonify({"error": "case_number must be a valid string"}), 400

        if not result:
            return jsonify({"error": "No hearing PDF found for this case_number"}), 404
        
        pdf_bytes, db_language = result

        # Create temporary file to extract text from PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            temp_path = tmp.name
            tmp.write(pdf_bytes)
            
        # Extract text from the PDF
        text = extract_text_from_pdf(temp_path)

        # Add/Update the document in vector database
        case_store = VectorStore(case_number=case_number)
        case_store.add_document(text)
        
        return jsonify({
            "message": "Hearing PDF successfully added/updated in vector database",
            "case_number": case_number,
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

@app.route("/nyayasetu/summary/getSummary", methods=["POST"])
def get_summary():
    try:
        # Try multiple ways to get case_number
        case_number = (
            request.headers.get("case_number") or 
            request.headers.get("X-Case-Number") or 
            request.headers.get("x-case-number")
        )
        
        payload = request.get_json() or {}
        
        # If not in headers, try body
        if not case_number:
            case_number = payload.get("case_number")
        
        lang = payload.get("lang") or payload.get("language")
        
        if not case_number:
            return jsonify({"error": "case_number required in headers or body"}), 400
        
        temp_path = None
        try:
            # Fetch the hearing PDF from MySQL database
            result = fetch_latest_hearing_pdf_by_case_number(case_number)
        except ValueError:
            return jsonify({"error": "case_number must be a valid string"}), 400

        if not result:
            return jsonify({"error": "No hearing PDF found for this case_number"}), 404
        
        pdf_bytes, db_language = result
        
        # Use database language (client's preference) as primary, request lang as fallback
        if db_language and db_language.strip():
            lang = db_language
        elif not lang:
            lang = "en"  # Default fallback

        # Create temporary file to extract text from PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            temp_path = tmp.name
            tmp.write(pdf_bytes)
            
        # Extract text from the hearing PDF
        text = extract_text_from_pdf(temp_path)

        # Send extracted text to summarizer to get LLM response
        summary = summarize_text(text, lang)

        return jsonify(summary)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@app.route("/nyayasetu/rag/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        auth_header = request.headers.get('Authorization')
        
        question = data.get("question")
        case_number = data.get("case_number", None)

        if not question:
            return jsonify({"error": "Question is required"}), 400

        # Pass auth header for JWT-based memory
        result = chatbot_response(question, case_number=case_number, auth_header=auth_header)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)