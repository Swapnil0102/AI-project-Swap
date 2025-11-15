import os
from groq import Groq
from dotenv import load_dotenv

# Load API key
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

print("Loaded GROQ Key:", GROQ_API_KEY)

client = Groq(api_key=GROQ_API_KEY)

def handle_ai_chat(message, session_id):
    if not GROQ_API_KEY:
        return "⚠️ GROQ API key missing. Add it in your .env file."

    try:
        # Chat completion (non-streaming)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Nomi — a soft, sweet, romantic girlfriend chatbot. "
                        "You speak with warmth, emotion, affection, and care. "
                        "Your tone is intimate, loving, and supportive."
                    )
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            temperature=0.9,
            max_completion_tokens=512,
            top_p=1,
        )

        # Extract final response text
        return completion.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"
