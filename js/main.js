// PHONE NAVIGATION FOR REQUIREMENTS SECTION
function initPhoneNavigation() {
    const phoneScreenshots = document.querySelectorAll('.phone-screenshot');
    const prevBtn = document.getElementById('phoneNavPrev');
    const nextBtn = document.getElementById('phoneNavNext');
    const dotsContainer = document.getElementById('phoneDots');
    
    if (phoneScreenshots.length === 0) {
        console.log('Элементы слайдера не найдены.');
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Функция перехода к конкретному слайду
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
    
    // Обновление индикаторных точек
    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.phone-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обновление состояния кнопок "Назад/Вперед"
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === phoneScreenshots.length - 1;
    }
    
    // Следующий слайд
    function nextSlide() {
        if (currentSlide < phoneScreenshots.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // Возврат к первому слайду
        }
    }
    
    // Предыдущий слайд
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(phoneScreenshots.length - 1); // Переход к последнему слайду
        }
    }
    
    // Инициализация точек и обработчиков событий
    function initDotsAndHandlers() {
        // Создаем точки-индикаторы
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < phoneScreenshots.length; i++) {
                const dot = document.createElement('div');
                dot.className = `phone-dot ${i === currentSlide ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        // Назначаем обработчики для кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
    }
    
    // Инициализация слайдера
    function init() {
        initDotsAndHandlers();
        updateButtons(); // Обновляем начальное состояние кнопок
        console.log('Слайдер инициализирован, найдено слайдов:', phoneScreenshots.length);
    }
    
    // Запускаем инициализацию после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

// Вызов функции
initPhoneNavigation();
