// Этот файл может содержать дополнительные анимации, если потребуется
// В данный момент основные анимации уже в CSS

// Пример: анимация появления элементов при скролле
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
});