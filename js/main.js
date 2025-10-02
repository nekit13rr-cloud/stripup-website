// CALCULATOR WITH SHIFTS
document.addEventListener('DOMContentLoaded', function() {
    console.log('StripUp Shifts Calculator initialized');
    
    // Получаем все элементы калькулятора
    const shiftsSlider = document.getElementById('shiftsWeek');
    const incomeSlider = document.getElementById('incomePerShift');
    const tariffSelect = document.getElementById('tariffSelect');
    
    const shiftsValue = document.getElementById('shiftsWeekValue');
    const incomeValue = document.getElementById('incomePerShiftValue');
    
    const resultPerShift = document.getElementById('resultPerShift');
    const resultPerWeek = document.getElementById('resultPerWeek');
    const resultPerMonth = document.getElementById('resultPerMonth');
    
    // Проверяем что все элементы найдены
    if (!shiftsSlider || !incomeSlider) {
        console.log('Calculator elements not found - page without calculator');
        return;
    }
    
    console.log('All calculator elements found');
    
    // Функция форматирования чисел
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Функция обновления значений ползунков
    function updateSliderValues() {
        if (shiftsValue) shiftsValue.textContent = shiftsSlider.value + ' смен';
        if (incomeValue) incomeValue.textContent = formatNumber(incomeSlider.value) + ' ₽';
    }
    
    // Функция расчета дохода
    function calculateIncome() {
        const shiftsPerWeek = parseInt(shiftsSlider.value);
        const incomePerShift = parseInt(incomeSlider.value);
        const tariff = parseFloat(tariffSelect.value);
        
        console.log('Calculating income:', { shiftsPerWeek, incomePerShift, tariff });
        
        // Расчет доходов
        const shiftIncome = incomePerShift * (1 - tariff);
        const weeklyIncome = shiftIncome * shiftsPerWeek;
        const monthlyIncome = weeklyIncome * 4;
        
        // Обновление результатов
        if (resultPerShift) resultPerShift.textContent = formatNumber(Math.round(shiftIncome)) + ' ₽';
        if (resultPerWeek) resultPerWeek.textContent = formatNumber(Math.round(weeklyIncome)) + ' ₽';
        if (resultPerMonth) resultPerMonth.textContent = formatNumber(Math.round(monthlyIncome)) + ' ₽';
    }
    
    // Назначаем обработчики событий
    shiftsSlider.addEventListener('input', function() {
        updateSliderValues();
        calculateIncome();
    });
    
    incomeSlider.addEventListener('input', function() {
        updateSliderValues();
        calculateIncome();
    });
    
    tariffSelect.addEventListener('change', function() {
        calculateIncome();
    });
    
    // Инициализация при загрузке
    updateSliderValues();
    calculateIncome();
    
    console.log('Shifts calculator setup complete');
});
// SINGLE PHONE TESTIMONIALS SLIDER
function initSinglePhoneTestimonials() {
    const screenshots = document.querySelectorAll('.screenshot');
    const prevBtn = document.getElementById('phoneSinglePrev');
    const nextBtn = document.getElementById('phoneSingleNext');
    const dotsContainer = document.getElementById('phoneSingleDots');
    
    // Данные для каждого отзыва
    const testimonialsData = [
        {
            name: "Аня, 22 года",
            stats: ["+120 000 ₽ в месяц", "Работает 6 месяцев"],
            text: "Никогда не думала, что смогу так легко зарабатывать из дома! Поддержка всегда на связи, помогают с любыми вопросами."
        },
        {
            name: "Катя, 25 лет", 
            stats: ["+85 000 ₽ в месяц", "В команде 1 год"],
            text: "После декрета искала возможность работать из дома. StripUp стал настоящим спасением! Гибкий график и отличная поддержка."
        },
        {
            name: "Маша, 19 лет",
            stats: ["+200 000 ₽ в месяц", "Начинала с нуля"],
            text: "Боялась начинать, но обучение с нуля очень помогло. Коуч буквально за руку провёл через все этапы. Теперь работаю в удовольствие!"
        },
        {
            name: "Вика, 21 год",
            stats: ["+65 000 ₽ в месяц", "Студентка"],
            text: "Учусь в универе, нужны были деньги на жизнь. StripUp идеально - работаю когда есть время, всё анонимно. Теперь сама оплачиваю учёбу!"
        }
    ];
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Создаем точки
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < screenshots.length; i++) {
            const dot = document.createElement('div');
            dot.className = `phone-single-dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Переход к слайду
    function goToSlide(slideIndex) {
        // Скрываем все скриншоты
        screenshots.forEach(screenshot => {
            screenshot.classList.remove('active');
        });
        
        currentSlide = slideIndex;
        
        // Показываем текущий скриншот
        screenshots[currentSlide].classList.add('active');
        
        // Обновляем информацию
        updateTestimonialInfo();
        updateDots();
        updateButtons();
    }
    
    // Обновляем информацию об отзыве
    function updateTestimonialInfo() {
        const data = testimonialsData[currentSlide];
        document.querySelector('.testimonial-name-single').textContent = data.name;
        
        const statsContainer = document.querySelector('.testimonial-stats-single');
        statsContainer.innerHTML = '';
        data.stats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.className = 'stat-single';
            statElement.textContent = stat;
            statsContainer.appendChild(statElement);
        });
        
        document.querySelector('.testimonial-text-single').textContent = `"${data.text}"`;
    }
    
    // Обновляем точки
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.phone-single-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обновляем кнопки
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === screenshots.length - 1;
    }
    
    // Следующий слайд
    function nextSlide() {
        if (currentSlide < screenshots.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // Возврат к началу
        }
    }
    
    // Предыдущий слайд
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(screenshots.length - 1); // Переход к последнему
        }
    }
    
    // Автопрокрутка
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // 4 секунды
    }
    
    // Останавливаем автопрокрутку при взаимодействии
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Инициализация
    function init() {
        createDots();
        goToSlide(0); // Начинаем с первого слайда
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
        const slider = document.querySelector('.testimonials-phone-single');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Swipe для мобильных
        let startX = 0;
        let endX = 0;
        
        const phoneScreen = document.querySelector('.phone-screen-single');
        if (phoneScreen) {
            phoneScreen.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            phoneScreen.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // Минимальная дистанция свайпа
                if (diff > 0) {
                    // Свайп влево - следующий слайд
                    nextSlide();
                } else {
                    // Свайп вправо - предыдущий слайд
                    prevSlide();
                }
            }
        }
    }
    
    init();
    console.log('Single phone testimonials initialized');
}

// Добавляем в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    initSinglePhoneTestimonials();
});
