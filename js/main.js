// Анимация появления элементов
document.addEventListener('DOMContentLoaded', function() {
  const heroElements = document.querySelectorAll('.hero-left > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.4s ease ${index * 0.1}s`;
  });
  
  setTimeout(() => {
    heroElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }, 100);
});

// Плавная прокрутка
document.querySelector('.btn-ghost').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
  });
});
