let USER_ID = localStorage.getItem("user_id");
if (!USER_ID) {
    USER_ID = "u" + Date.now();
    localStorage.setItem("user_id", USER_ID);
}

let FINAL_AMOUNT = null;

async function generateUniqueUPI() {
    const res = await fetch("/api/payment/create-unique-amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, base_amount: 49 })
    });

    const data = await res.json();
    FINAL_AMOUNT = data.final_amount;

    // Build UPI URL
    const upiURL = 
      `upi://pay?pa=YOUR_UPI_ID@okaxis&pn=JaanuApp&am=${FINAL_AMOUNT}&cu=INR&tn=User-${USER_ID}`;

    // Make link clickable
    document.getElementById("upiLink").href = upiURL;
    document.getElementById("upiLink").innerText = `Pay ₹${FINAL_AMOUNT}`;

    // QR Code
    document.getElementById("qrImage").src =
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiURL)}`;
}

document.getElementById("paidBtn").onclick = async function () {

    // For now we manually give paid amount (later will come from SMS/Email/OCR)
    const paidAmount = prompt("Enter the amount you paid (for now). Eg: 49.37");

    const res = await fetch("/api/payment/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: USER_ID,
            paid_amount: paidAmount
        })
    });

    const data = await res.json();

    if (data.access) {
        alert("Payment Verified! Premium Unlocked.");
        window.location.href = "/chat.html";
    } else {
        alert("Not verified: " + data.message);
    }
};


// On page load
window.onload = generateUniqueUPI;
