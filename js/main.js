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
// КАЛЬКУЛЯТОР С ВЫБОРОМ СМЕН
function initCalculator() {
    console.log('Инициализация калькулятора со сменами...');
    
    const shiftButtons = document.querySelectorAll('.shift-option');
    const tariffSelect = document.getElementById('tariffSelect');
    
    const resultPerShift = document.getElementById('resultPerShift');
    const resultPerWeek = document.getElementById('resultPerWeek');
    const resultPerMonth = document.getElementById('resultPerMonth');
    
    if (shiftButtons.length === 0) return;
    
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    function calculateIncome() {
        const activeShiftBtn = document.querySelector('.shift-option.active');
        const shiftsPerWeek = parseInt(activeShiftBtn.dataset.shifts);
        const incomePerShift = 7000; // Фиксированные 7000 ₽, но не показываем пользователю
        const tariff = parseFloat(tariffSelect.value);
        
        const shiftIncome = incomePerShift * (1 - tariff);
        const weeklyIncome = shiftIncome * shiftsPerWeek;
        const monthlyIncome = weeklyIncome * 4;
        
        if (resultPerShift) resultPerShift.textContent = formatNumber(Math.round(shiftIncome)) + ' ₽';
        if (resultPerWeek) resultPerWeek.textContent = formatNumber(Math.round(weeklyIncome)) + ' ₽';
        if (resultPerMonth) resultPerMonth.textContent = formatNumber(Math.round(monthlyIncome)) + ' ₽';
    }
    
    shiftButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            shiftButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            calculateIncome();
        });
    });
    
    tariffSelect.addEventListener('change', calculateIncome);
    calculateIncome();
}

document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});
document.addEventListener("DOMContentLoaded", () => {
  const shiftsRadios = document.querySelectorAll('input[name="shifts"]');
  const periodRadios = document.querySelectorAll('input[name="period"]');
  const calcSum = document.getElementById("calcSum");

  function calculate() {
    let shifts = parseInt(document.querySelector('input[name="shifts"]:checked').value);
    let period = document.querySelector('input[name="period"]:checked').value;

    // Базовый доход за одну смену (можно менять под себя)
    let perShift = 7500;

    let total = 0;
    if (period === "week") total = shifts * perShift;
    if (period === "month") total = shifts * perShift * 4;
    if (period === "year") total = shifts * perShift * 48;

    calcSum.textContent = total.toLocaleString("ru-RU") + " руб.";
  }

  shiftsRadios.forEach(r => r.addEventListener("change", calculate));
  periodRadios.forEach(r => r.addEventListener("change", calculate));

  calculate(); // запуск при загрузке
});
