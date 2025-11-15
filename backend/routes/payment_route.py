from flask import Blueprint, request, jsonify

payment_bp = Blueprint("payment_bp", __name__)

@payment_bp.route("/verify", methods=["POST"])
def verify_payment():
    data = request.json
    payment_id = data.get("payment_id")

    # ⚠️ Temporary logic
    # ALWAYS returns success for now
    # Later we connect UPI / Razorpay / Paytm
    return jsonify({
        "status": "success",
        "access": True,
        "message": "Payment verified successfully"
    })
