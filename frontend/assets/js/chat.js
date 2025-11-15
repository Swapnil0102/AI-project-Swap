// ===============================
// DOM ELEMENTS
// ===============================
const messagesBox = document.getElementById("messages");
const input = document.getElementById("userInput");
const typing = document.getElementById("typingIndicator");

// Backend URL
const API_URL = "http://localhost:5000/api/chat/";

// Scroll to bottom
function scrollToBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Add message bubble
function addBubble(text, sender = "her") {
    const div = document.createElement("div");
    div.className = `bubble ${sender}`;
    div.innerText = text;
    messagesBox.appendChild(div);
    scrollToBottom();
}

// Send message to backend (Node.js)
async function sendMessageToBot(userMessage) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                session_id: "swapnil-session-1"
            })
        });

        const data = await response.json();
        return data.reply;
    } catch (err) {
        return "⚠️ Server error. Please check backend.";
    }
}

// MAIN send handler
async function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;

    // Show user's message
    addBubble(userText, "me");
    input.value = "";

    // Show typing indicator
    typing.style.display = "flex";
    scrollToBottom();

    // Call backend API
    const botReply = await sendMessageToBot(userText);

    // Hide typing
    typing.style.display = "none";

    // Show AI's reply
    addBubble(botReply, "her");
}

// Allow enter key to send message
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});
