import razorpay
import os

class RazorpayController:
    def __init__(self):
        self.key_id = os.getenv("RAZORPAY_KEY_ID")
        self.key_secret = os.getenv("RAZORPAY_KEY_SECRET")

        if not self.key_id or not self.key_secret:
            raise Exception("Razorpay keys missing — set RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET")

        # Initialize Razorpay client
        self.client = razorpay.Client(auth=(self.key_id, self.key_secret))


    # ---------------------------------------------------
    # Create Order with Notes (contains user_id)
    # ---------------------------------------------------
    def create_order_with_notes(self, amount, user_id):
        """
        amount: in rupees
        user_id: unique per user
        """

        order = self.client.order.create({
            "amount": amount * 100,        # convert to paise
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "user_id": user_id         # ★ important for auto-verification
            }
        })

        return order


    # ---------------------------------------------------
    # Fetch recent payments
    # ---------------------------------------------------
    def get_recent_payments(self, limit=10):
        """
        Fetches the last few Razorpay payments.
        """
        payments = self.client.payment.all(count=limit)
        return payments
