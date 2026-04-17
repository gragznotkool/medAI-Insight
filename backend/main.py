import re
import string
from dotenv import load_dotenv
import os
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Backend running"}
    
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(api_key)

def clean_text(text: str) -> str:
    """
    Preprocess clinical notes.
    - Lowercase
    - Remove punctuation
    - Remove extra whitespace
    """
    text = text.lower()
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text
