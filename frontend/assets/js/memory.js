/* ---------------------------------------
    Save message in local memory
----------------------------------------*/
function saveChat(message) {
    let history = JSON.parse(localStorage.getItem("chat_memory") || "[]");

    history.push({
        text: message.text,
        sender: message.sender,
        time: Date.now()
    });

    localStorage.setItem("chat_memory", JSON.stringify(history));
}

/* ---------------------------------------
    Load all saved chat messages
----------------------------------------*/
function loadChat() {
    return JSON.parse(localStorage.getItem("chat_memory") || "[]");
}

/* ---------------------------------------
    Clear chat memory (optional button)
----------------------------------------*/
function clearChatMemory() {
    localStorage.removeItem("chat_memory");
}
