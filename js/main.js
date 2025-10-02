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
});
