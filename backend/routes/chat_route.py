from flask import Blueprint, request, jsonify
from controllers.chat_controller import handle_ai_chat

chat_bp = Blueprint("chat_bp", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.json

    user_message = data.get("message", "")
    session_id = data.get("session_id", "default")

    reply = handle_ai_chat(user_message, session_id)

    return jsonify({"reply": reply})
