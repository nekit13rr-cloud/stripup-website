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
document.addEventListener("DOMContentLoaded", () => {
  // === FAQ ===
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

        // Закрываем все ответы (если нужно только одно открыто)
        faqItems.forEach(i => {
          const a = i.querySelector(".faq-answer");
          if (a) a.style.maxHeight = null;
        });

        // Открываем выбранный
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

  // === Ползунки калькулятора ===
  const sliders = document.querySelectorAll("input[type='range']");

  sliders.forEach(slider => {
    const outputSelector = slider.dataset.output; // можно в HTML указать data-output="#id"
    const output = outputSelector ? document.querySelector(outputSelector) : null;

    const updateValue = () => {
      if (output) output.textContent = slider.value;
    };

    slider.addEventListener("input", updateValue);
    updateValue(); // начальное значение
  });
});
