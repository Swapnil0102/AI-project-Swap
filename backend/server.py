from flask import Flask
from flask_cors import CORS
from routes.chat_route import chat_bp
from routes.payment_route import payment_bp


app = Flask(__name__)
CORS(app)

# Register Routes
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(payment_bp, url_prefix="/api/payment")

@app.route("/")
def home():
    return {"message": "Backend is running successfully 😎"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
