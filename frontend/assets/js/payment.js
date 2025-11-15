// Backend Payment Verification API
const PAYMENT_URL = "http://localhost:5000/api/payment/verify";

async function verifyPaymentBackend() {
    try {
        const response = await fetch(PAYMENT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                payment_id: "temp123" // You will replace this with real payment ID later
            })
        });

        const data = await response.json();
        return data.access === true;
    } catch (error) {
        console.error("Payment verification error:", error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".unlock-btn");

    btn.addEventListener("click", async () => {
        btn.innerText = "Verifying…";

        // Call backend
        const paid = await verifyPaymentBackend();

        if (paid) {
            // Give user access
            localStorage.setItem("chat_unlocked", "1");
            window.location.href = "chat.html";
        } else {
            alert("❌ Payment not verified. Please try again.");
            btn.innerText = "I Have Paid ❤️";
        }
    });
});
