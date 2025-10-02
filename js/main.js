// PHONE NAVIGATION FOR REQUIREMENTS SECTION
function initPhoneNavigation() {
    const phoneScreenshots = document.querySelectorAll('.phone-screenshot');
    const prevBtn = document.getElementById('phoneNavPrev');
    const nextBtn = document.getElementById('phoneNavNext');
    const dotsContainer = document.getElementById('phoneDots');
    
    if (phoneScreenshots.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Создаем точки
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < phoneScreenshots.length; i++) {
            const dot = document.createElement('div');
            dot.className = `phone-dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Переход к слайду
    function goToSlide(slideIndex) {
        // Скрываем все скриншоты
        phoneScreenshots.forEach(screenshot => {
            screenshot.classList.remove('active');
        });
        
        currentSlide = slideIndex;
        
        // Показываем текущий скриншот
        phoneScreenshots[currentSlide].classList.add('active');
        
        updateDots();
        updateButtons();
    }
    
    // Обновляем точки
    function updateDots() {
        const dots = dotsContainer?.querySelectorAll('.phone-dot');
        if (!dots) return;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обновляем кнопки
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === phoneScreenshots.length - 1;
    }
    
    // Следующий слайд
    function nextSlide() {
        if (currentSlide < phoneScreenshots.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    }
    
    // Предыдущий слайд
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(phoneScreenshots.length - 1);
        }
    }
    
    // Автопрокрутка (медленная)
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 6000); // 6 секунд - медленнее
    }
    
    // Останавливаем автопрокрутку при взаимодействии
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Инициализация
    function init() {
        createDots();
        goToSlide(0);
        startAutoSlide();
        
        // События
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        // Останавливаем автопрокрутку при hover
        const phoneSection = document.querySelector('.testimonials-phone-side');
        if (phoneSection) {
            phoneSection.addEventListener('mouseenter', stopAutoSlide);
            phoneSection.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    init();
}

// Добавляем в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    initPhoneNavigation();
});
