/* ---------- Calculator ---------- */
function calculateIncome() {
  const hours = parseFloat(document.getElementById('hours').value) || 0;
  const rate = parseFloat(document.getElementById('hourlyRate').value) || 0;
  const tariff = parseFloat(document.getElementById('tariff').value) || 0.3;
  const result = Math.round((hours * rate) * (1 - tariff));
  document.getElementById('result').textContent = result.toLocaleString('ru-RU') + ' ₽';
  
  // Add animation to result
  const resultElement = document.getElementById('result');
  resultElement.style.transform = 'scale(1.1)';
  setTimeout(() => {
    resultElement.style.transform = 'scale(1)';
  }, 200);
}

function initCalculator() {
  document.getElementById('hours').addEventListener('input', calculateIncome);
  document.getElementById('hourlyRate').addEventListener('input', calculateIncome);
  document.getElementById('tariff').addEventListener('change', calculateIncome);
  calculateIncome();
}

/* ---------- Mobile navigation ---------- */
function initMobileNavigation() {
  const burger = document.getElementById('burgerBtn');
  if (burger) {
    burger.addEventListener('click', () => {
      // simple mobile nav modal
      const nav = document.createElement('div');
      nav.style.position='fixed';
      nav.style.inset='0';
      nav.style.background='linear-gradient(180deg,rgba(255,250,250,0.98),rgba(255,240,245,0.96))';
      nav.style.zIndex='120';
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'center';
      nav.style.justifyContent = 'center';
      nav.innerHTML = '<a href=\"#\" id=\"closeNav\" style=\"position:absolute;top:20px;right:20px;font-size:24px;color:var(--accent)\">×</a><div style=\"display:flex;flex-direction:column;gap:20px;text-align:center;font-size:18px;font-weight:600\">' +
        '<a href=\"#hero\" style="color:var(--text);text-decoration:none;padding:10px;transition:all 0.3s" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">Главная</a><a href=\"#about\" style="color:var(--text);text-decoration:none;padding:10px;transition:all 0.3s" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">О нас</a><a href=\"#tariffs\" style="color:var(--text);text-decoration:none;padding:10px;transition:all 0.3s" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">Тарифы</a><a href=\"#benefits\" style="color:var(--text);text-decoration:none;padding:10px;transition:all 0.3s" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">Преимущества</a><a href=\"#testimonials\" style="color:var(--text);text-decoration:none;padding:10px;transition:all 0.3s" onmouseover="this.style.color=\'var(--accent)\'" onmouseout="this.style.color=\'var(--text)\'">Отзывы</a>' +
        '</div>';
      document.body.appendChild(nav);
      nav.querySelector('#closeNav').addEventListener('click',(e)=>{e.preventDefault();nav.remove()});
      
      // Add animation to links
      setTimeout(() => {
        const links = nav.querySelectorAll('a');
        links.forEach((link, index) => {
          link.style.opacity = '0';
          link.style.transform = 'translateY(10px)';
          setTimeout(() => {
            link.style.transition = 'opacity 0.3s, transform 0.3s';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 10);
    });
  }
}

/* ---------- Testimonials slider ---------- */
function initTestimonialsSlider() {
  const tests = document.getElementById('testimonialsInner');
  if (!tests) return;
  
  let testIndex = 0;
  function showTest(idx){
    const width = tests.children[0].getBoundingClientRect().width + 18;
    tests.style.transform = 'translateX(' + (-idx * width) + 'px)';
    tests.style.transition = 'transform .5s';
  }
  
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', ()=>{ testIndex = Math.max(0,testIndex-1); showTest(testIndex)});
    nextBtn.addEventListener('click', ()=>{ testIndex = Math.min(tests.children.length-1,testIndex+1); showTest(testIndex)});
  }
}

/* ---------- FAQ accordion ---------- */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', ()=> {
      const item = q.parentElement;
      item.classList.toggle('open');
      const plusSign = q.querySelector('span');
      plusSign.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });
}

/* ---------- Animated counters (on scroll) ---------- */
function animateCount(el, to){
  const start = 0;
  const duration = 1200;
  let startTime = null;
  function tick(timestamp){
    if(!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime)/duration, 1);
    el.textContent = Math.floor(progress * (to - start) + start).toLocaleString('ru-RU');
    if(progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('.count');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        const el = ent.target;
        const to = parseInt(el.dataset.target,10) || 0;
        animateCount(el, to);
        io.unobserve(el);
      }
    });
  }, {threshold:0.3});
  counters.forEach(c=>io.observe(c));
}

/* ---------- Intersection fade-in for cards ---------- */
function initScrollAnimations() {
  const cards = document.querySelectorAll('.card, .stat, .testimonial');
  const io2 = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = 0;
        e.target.style.transform = 'translateY(14px)';
        setTimeout(()=>{ e.target.style.transition = 'opacity .8s, transform .8s'; e.target.style.opacity=1; e.target.style.transform='translateY(0)'; },120);
        io2.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  cards.forEach(c=> io2.observe(c));
}

/* ---------- Smooth scroll for internal links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href === '#') return;
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 60, behavior:'smooth' });
      }
    });
  });
}

/* ---------- Hover effect for cards ---------- */
function initCardHoverEffects() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ---------- Logo scroll to top ---------- */
function initLogoScroll() {
  document.getElementById('logoLink').addEventListener('click', e=>{ 
    e.preventDefault(); 
    window.scrollTo({top:0,behavior:'smooth'}) 
  });
}

/* ---------- Initialize everything ---------- */
document.addEventListener('DOMContentLoaded', function() {
  initCalculator();
  initMobileNavigation();
  initTestimonialsSlider();
  initFAQ();
  initCounters();
  initScrollAnimations();
  initSmoothScroll();
  initCardHoverEffects();
  initLogoScroll();
});
// Анимация чисел в статистике
function animateCounter() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Анимация появления элементов при скролле
function animateOnScroll() {
  const heroElements = document.querySelectorAll('.hero-left > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.6s ease ${index * 0.2}s`;
  });
  
  setTimeout(() => {
    heroElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }, 100);
}

// Параллакс эффект для аниме-девушки
function initParallax() {
  const animeGirl = document.querySelector('.anime-girl');
  
  window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    animeGirl.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  animateOnScroll();
  animateCounter();
  initParallax();
  
  // Анимация появления при скролле
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.hero-left > *').forEach(el => observer.observe(el));
});

// Плавная прокрутка для кнопки "Выбрать тариф"
document.querySelector('.btn-ghost').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  target.scrollIntoView({ behavior: 'smooth' });
});
