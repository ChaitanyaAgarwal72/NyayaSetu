import os
from typing import Optional, Tuple
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()

HOST = os.getenv("DB_HOST") or os.getenv("MYSQLHOST")
PORT = int(os.getenv("DB_PORT") or os.getenv("MYSQLPORT") or 3306)
USER = os.getenv("DB_USER") or os.getenv("MYSQLUSER")
PASSWORD = os.getenv("DB_PASSWORD") or os.getenv("MYSQLPASSWORD")
DATABASE = os.getenv("DB_NAME") or os.getenv("MYSQLDATABASE")

def get_mysql_connection():
    if not all([HOST, USER, PASSWORD, DATABASE]):
        raise RuntimeError(
            "Missing DB credentials. Ensure DB_HOST/USER/PASSWORD/NAME or Railway MYSQL* env vars are set."
        )
    try:
        conn = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE,
        )
        return conn
    except Error as e:
        raise RuntimeError(f"MySQL connection failed: {e}")

def fetch_latest_hearing_pdf_by_case_number(case_number: str) -> Optional[Tuple[bytes, str]]:
    query = """SELECT ch.hearing_pdf, c.language FROM case_hearings ch JOIN cases ca ON ch.case_number = ca.case_number JOIN 
            clients c ON ca.client_id = c.client_id WHERE ch.case_number = %s ORDER BY ch.created_at DESC LIMIT 1;"""
    conn = None
    try:
        conn = get_mysql_connection()
        with conn.cursor() as cur:
            cur.execute(query, (case_number,))
            row = cur.fetchone()
            if row:
                hearing_pdf, language = row
                return hearing_pdf, language
            return None
    finally:
        if conn:
            conn.close()
