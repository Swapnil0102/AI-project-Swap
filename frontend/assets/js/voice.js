let recognition;
const synth = window.speechSynthesis;

/* -----------------------------
   Voice Input (Speech → Text)
------------------------------*/
function startVoiceInput() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input not supported in this browser.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
    };

    recognition.onerror = function () {
        alert("Voice input error. Try again.");
    };

    recognition.start();
}

/* -----------------------------
     Voice Output (Text → Speech)
------------------------------*/
function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1.1;

    synth.speak(utter);
}
