// CALCULATOR CODE - вставляем в main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('StripUp Calculator initialized');
    
    // Получаем все элементы калькулятора
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
        if (hoursValue) hoursValue.textContent = hoursSlider.value;
        if (daysValue) daysValue.textContent = daysSlider.value;
        if (rateValue) rateValue.textContent = formatNumber(rateSlider.value);
    }
    
    // Функция расчета дохода
    function calculateIncome() {
        const hoursPerDay = parseFloat(hoursSlider.value);
        const daysPerWeek = parseInt(daysSlider.value);
        const hourRate = parseInt(rateSlider.value);
        const tariff = parseFloat(tariffSelect.value);
        
        console.log('Calculating income:', { hoursPerDay, daysPerWeek, hourRate, tariff });
        
        // Расчет доходов
        const hourlyIncome = hourRate * (1 - tariff);
        const dailyIncome = hourlyIncome * hoursPerDay;
        const weeklyIncome = dailyIncome * daysPerWeek;
        const monthlyIncome = weeklyIncome * 4;
        
        // Обновление результатов
        if (resultPerHour) resultPerHour.textContent = formatNumber(Math.round(hourlyIncome)) + ' ₽';
        if (resultPerDay) resultPerDay.textContent = formatNumber(Math.round(dailyIncome)) + ' ₽';
        if (resultPerWeek) resultPerWeek.textContent = formatNumber(Math.round(weeklyIncome)) + ' ₽';
        if (resultPerMonth) resultPerMonth.textContent = formatNumber(Math.round(monthlyIncome)) + ' ₽';
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
