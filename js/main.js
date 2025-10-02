// Calculator functionality
document.addEventListener('DOMContentLoaded', function() {
  const calculateIncome = () => {
    const hours = parseFloat(document.getElementById('hours').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    const tariff = parseFloat(document.getElementById('tariff').value) || 0;
    
    const grossIncome = hours * hourlyRate;
    const netIncome = grossIncome * (1 - tariff);
    
    document.getElementById('result').textContent = `${Math.round(netIncome).toLocaleString('ru-RU')} ₽`;
  };

  // Initial calculation
  calculateIncome();

  // Event listeners
  document.getElementById('hours').addEventListener('input', calculateIncome);
  document.getElementById('hourlyRate').addEventListener('input', calculateIncome);
  document.getElementById('tariff').addEventListener('change', calculateIncome);

  // Calculator buttons
  document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      const input = document.getElementById(target);
      const isPlus = this.classList.contains('plus');
      const currentValue = parseFloat(input.value) || 0;
      
      if (isPlus) {
        input.value = currentValue + 1;
      } else {
        input.value = Math.max(0, currentValue - 1);
      }
      
      // Trigger animation
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
      
      input.dispatchEvent(new Event('input'));
    });
  });

  // Prevent negative values
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', function() {
      if (this.value < 0) this.value = 0;
      calculateIncome();
    });
  });

  // Add hover effect to calculator card
  const calculatorCard = document.querySelector('.calculator-card');
  if (calculatorCard) {
    calculatorCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 25px 70px rgba(255, 107, 107, 0.25)';
    });
    
    calculatorCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 20px 60px rgba(255, 107, 107, 0.2)';
    });
  }
});
// FAQ раскрытие
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');

    // Закрываем другие, если нужно оставить только один открытым
    document.querySelectorAll('.faq-item').forEach(other => {
      if(other !== item) other.classList.remove('active');
      // WORKING CALCULATOR 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator initialized');
    
    // Получаем все элементы
    const hoursSlider = document.getElementById('hoursDay');
    const daysSlider = document.getElementById('daysWeek');
    const rateSlider = document.getElementById('hourRate');
    const tariffSelect = document.getElementById('tariffSelect');
    
    const hoursValue = document.getElementById('hoursDayValue');
    const daysValue = document.getElementById('daysWeekValue');
    const rateValue = document.getElementById('hourRateValue');
    
    const resultPerHour = document.getElementById('resultPerHour');
    const resultPerDay = document.getElementById('resultPerDay');
    const resultPerWeek = document.getElementById('resultPerWeek');
    const resultPerMonth = document.getElementById('resultPerMonth');
    
    // Проверяем что все элементы найдены
    if (!hoursSlider || !daysSlider || !rateSlider) {
        console.error('Some slider elements not found');
        return;
    }
    
    // Функция форматирования чисел
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Функция обновления значений ползунков
    function updateSliderValues() {
        hoursValue.textContent = hoursSlider.value;
        daysValue.textContent = daysSlider.value;
        rateValue.textContent = formatNumber(rateSlider.value);
    }
    
    // Функция расчета дохода
    function calculateIncome() {
        const hoursPerDay = parseFloat(hoursSlider.value);
        const daysPerWeek = parseInt(daysSlider.value);
        const hourRate = parseInt(rateSlider.value);
        const tariff = parseFloat(tariffSelect.value);
        
        console.log('Calculating with:', { hoursPerDay, daysPerWeek, hourRate, tariff });
        
        // Расчет доходов
        const hourlyIncome = hourRate * (1 - tariff);
        const dailyIncome = hourlyIncome * hoursPerDay;
        const weeklyIncome = dailyIncome * daysPerWeek;
        const monthlyIncome = weeklyIncome * 4;
        
        // Обновление результатов
        resultPerHour.textContent = formatNumber(Math.round(hourlyIncome)) + ' ₽';
        resultPerDay.textContent = formatNumber(Math.round(dailyIncome)) + ' ₽';
        resultPerWeek.textContent = formatNumber(Math.round(weeklyIncome)) + ' ₽';
        resultPerMonth.textContent = formatNumber(Math.round(monthlyIncome)) + ' ₽';
    }
    
    // Назначаем обработчики событий
    hoursSlider.addEventListener('input', function() {
        updateSliderValues();
        calculateIncome();
    });
    
    daysSlider.addEventListener('input', function() {
        updateSliderValues();
        calculateIncome();
    });
    
    rateSlider.addEventListener('input', function() {
        updateSliderValues();
        calculateIncome();
    });
    
    tariffSelect.addEventListener('change', function() {
        calculateIncome();
    });
    
    // Инициализация при загрузке
    updateSliderValues();
    calculateIncome();
    
    console.log('Calculator setup complete');
});
    });
  });
});
