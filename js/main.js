<script>
// ===============================
// 0) PHONE NAVIGATION (если есть)
// ===============================
(function initPhoneNavigation(){
  const screenshots = document.querySelectorAll('.phone-screenshot');
  const prevBtn = document.getElementById('phoneNavPrev');
  const nextBtn = document.getElementById('phoneNavNext');
  const dotsContainer = document.getElementById('phoneDots');
  if (!screenshots.length) return;

  let i = 0;
  function goTo(n){
    screenshots.forEach(s=>s.classList.remove('active'));
    i = (n + screenshots.length) % screenshots.length;
    screenshots[i].classList.add('active');
    updateDots(); updateBtns();
  }
  function updateBtns(){
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
  }
  function updateDots(){
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    screenshots.forEach((_, idx)=>{
      const d = document.createElement('div');
      d.className = 'phone-dot' + (idx===i ? ' active':'');
      d.addEventListener('click', ()=>goTo(idx));
      dotsContainer.appendChild(d);
    });
  }
  prevBtn && prevBtn.addEventListener('click', ()=>goTo(i-1));
  nextBtn && nextBtn.addEventListener('click', ()=>goTo(i+1));
  goTo(0);
})();

// ===============================
// 1) FAQ (под твою разметку .faq-q/.faq-a)
// ===============================
(function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', ()=>{
      item.classList.toggle('active');
    });
  });
})();

// ===============================
// 2) КАЛЬКУЛЯТОР (ЕДИНСТВЕННЫЙ)
// Разметка: name="shifts" | "tariff" | "period", сумма в #calcSum
// ===============================
(function initCalc(){
  const root = document.getElementById('calc');
  if (!root) return;
  const sumEl = root.querySelector('#calcSum');
  if (!sumEl) return;

  const shiftsInputs = root.querySelectorAll('input[name="shifts"]');
  const tariffInputs = root.querySelectorAll('input[name="tariff"]');
  const periodInputs = root.querySelectorAll('input[name="period"]');

  // Модель: подставь свою среднюю ГРОСС-выручку за смену
  const GROSS_PER_SHIFT = 10000; // руб.
  const WEEKS_IN_MONTH = 4.3;
  const WEEKS_IN_YEAR  = 52;

  const nf = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  const getChecked = (nodes, fb) => {
    for (const n of nodes) if (n.checked) return n.value;
    return fb;
  };

  let current = 0, raf;
  function animateTo(target, ms=450){
    cancelAnimationFrame(raf);
    const start = performance.now(), from = current;
    (function frame(t){
      const p = Math.min(1, (t-start)/ms);
      const e = 1 - Math.pow(1-p, 3);
      const val = Math.round(from + (target-from)*e);
      sumEl.textContent = nf.format(val) + ' руб.';
      if (p<1) raf = requestAnimationFrame(frame); else current = target;
    })(start);
  }

  function recalc(animate=true){
    const shifts = Number(getChecked(shiftsInputs, 5));     // 4/5/6
    const share  = Number(getChecked(tariffInputs, 0.7));   // 0.8/0.7/0.6
    const per    =        getChecked(periodInputs, 'month'); // week/month/year

    const weeks  = per === 'year' ? WEEKS_IN_YEAR : (per === 'week' ? 1 : WEEKS_IN_MONTH);
    const gross  = shifts * weeks * GROSS_PER_SHIFT;
    const net    = Math.max(0, Math.round(gross * share));

    if (animate) animateTo(net); else { current = net; sumEl.textContent = nf.format(net) + ' руб.'; }
  }

  // Слушатели
  [...shiftsInputs, ...tariffInputs, ...periodInputs].forEach(i=>{
    i.addEventListener('change', ()=>recalc(true));
    const lbl = i.closest('label.calc-option');
    if (lbl) lbl.addEventListener('click', ()=>setTimeout(()=>recalc(true),0));
  });

  recalc(false);
})();
</script>
