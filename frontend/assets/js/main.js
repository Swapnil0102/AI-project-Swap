
// Smooth fade-in animation for index.html
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".preview-card");
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 200 * i);
    });
});
