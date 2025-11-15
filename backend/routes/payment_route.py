from flask import Blueprint, request, jsonify
import random
import time

payment_bp = Blueprint("payment_bp", __name__)

# Temporary in-memory DB
USER_PAYMENT_MAP = {}


# ---------------------------------------------------
# 1️⃣ Generate unique amount for user
# ---------------------------------------------------
@payment_bp.route("/create-unique-amount", methods=["POST"])
def create_unique_amount():
    data = request.json
    user_id = data.get("user_id")
    base_amount = data.get("base_amount", 49)

    if not user_id:
        return jsonify({"error": "user_id missing"}), 400

    # unique 2-digit code
    unique_code = random.randint(10, 99)

    final_amount = float(f"{base_amount}.{unique_code}")

    # Save it for verification
    USER_PAYMENT_MAP[user_id] = {
        "expected_amount": final_amount,
        "timestamp": int(time.time())
    }

    return jsonify({
        "user_id": user_id,
        "final_amount": final_amount
    }), 200



# ---------------------------------------------------
# 2️⃣ Verify payment by matching amount
# ---------------------------------------------------
@payment_bp.route("/verify-payment", methods=["POST"])
def verify_payment():
    data = request.json
    user_id = data.get("user_id")
    paid_amount = data.get("paid_amount")  # you will pass this manually or via automation

    if user_id not in USER_PAYMENT_MAP:
        return jsonify({"access": False, "message": "No payment request found"}), 400

    expected = USER_PAYMENT_MAP[user_id]["expected_amount"]

    if float(paid_amount) == float(expected):
        return jsonify({"access": True, "message": "Payment verified"}), 200

    return jsonify({"access": False, "message": "Payment not matched"}), 400
