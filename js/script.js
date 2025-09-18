// Анимация появления блоков при скролле
document.addEventListener("scroll", () => {
  document.querySelectorAll(".benefit-card, .tariff-card").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.transition = "all .8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});
