document.addEventListener("DOMContentLoaded", () => {
  const calc = document.getElementById("calc");
  if (!calc) return;

  const calcSum = calc.querySelector("#calcSum");
  const shiftsRadios = calc.querySelectorAll('input[name="shifts"]');
  const periodRadios = calc.querySelectorAll('input[name="period"]');
  const tariffRadios = calc.querySelectorAll('input[name="tariff"]'); // ← добавили

  if (!calcSum || !shiftsRadios.length || !periodRadios.length || !tariffRadios.length) {
    console.warn("Calc: не найдены элементы", {
      calcSum: !!calcSum,
      shifts: shiftsRadios.length,
      period: periodRadios.length,
      tariff: tariffRadios.length
    });
    return;
  }

  // Константы модели (подставь свои при необходимости)
  const PER_SHIFT = 10000;     // средняя выручка за смену (гросс)
  const WEEKS_IN_MONTH = 4.3;
  const WEEKS_IN_YEAR  = 52;
  const nf = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

  const val = (nodes, fb) => {
    const n = [...nodes].find(i => i.checked);
    return n ? n.value : fb;
  };

  function recalc() {
    const shifts = parseInt(val(shiftsRadios, "5"), 10);
    const period = val(periodRadios, "month");
    const share  = parseFloat(val(tariffRadios, "0.7")); // ← применяем тариф

    let weeks = 1;
    if (period === "month") weeks = WEEKS_IN_MONTH;
    else if (period === "year") weeks = WEEKS_IN_YEAR;

    const net = Math.round(shifts * PER_SHIFT * weeks * share);
    calcSum.textContent = nf.format(net) + " руб.";
  }

  // Слушатели на все три группы (включая тариф!)
  [...shiftsRadios, ...periodRadios, ...tariffRadios].forEach(r =>
    r.addEventListener("change", recalc)
  );

  recalc(); // первый расчёт
});
