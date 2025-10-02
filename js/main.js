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
// Mobile menu: open/close + backdrop + lock scroll + sticky header
(function(){
  const header   = document.querySelector('header');
  const toggle   = document.getElementById('mnavToggle');
  const drawer   = document.getElementById('mnavDrawer');
  const closeBtn = document.getElementById('mnavClose');
  const backdrop = document.getElementById('mnavBackdrop');

  function openMenu(){
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    if (backdrop) { backdrop.hidden = false; backdrop.classList.add('is-visible'); }
    document.body.classList.add('mnav-lock');
    toggle && toggle.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
      setTimeout(()=>{ backdrop.hidden = true; }, 200); // после анимации
    }
    document.body.classList.remove('mnav-lock');
    toggle && toggle.setAttribute('aria-expanded','false');
  }

  toggle  && toggle.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  backdrop && backdrop.addEventListener('click', closeMenu);
  drawer  && drawer.querySelectorAll('a.mnav-link, a.mnav-cta').forEach(a=>{
    a.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeMenu(); });

  // sticky header класс при скролле
  const onScroll = ()=> header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
document.addEventListener('DOMContentLoaded', function(){
  const header   = document.querySelector('header');
  const toggle   = document.getElementById('mnavToggle');
  const drawer   = document.getElementById('mnavDrawer');
  const closeBtn = document.getElementById('mnavClose');
  const backdrop = document.getElementById('mnavBackdrop');

  // Диагностика
  console.log('mnav wired:', {
    toggle: !!toggle, drawer: !!drawer, closeBtn: !!closeBtn, backdrop: !!backdrop
  });

  if (!toggle || !drawer || !backdrop || !closeBtn) return;

  function openMenu(){
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    backdrop.hidden = false;
    backdrop.classList.add('is-visible');
    document.body.classList.add('mnav-lock');
    toggle.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    backdrop.classList.remove('is-visible');
    setTimeout(()=>{ backdrop.hidden = true; }, 200);
    document.body.classList.remove('mnav-lock');
    toggle.setAttribute('aria-expanded','false');
  }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a.mnav-link, a.mnav-cta').forEach(a=> a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Лёгкий sticky-эффект шапки
  const onScroll = ()=> header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

