/* ---------- Falling sakura petals (canvas) ---------- */
function initSakuraPetals() {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', () => { 
    W = canvas.width = innerWidth; 
    H = canvas.height = innerHeight; 
  });

  class Petal {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * W;
      this.y = -10 - Math.random() * 100; // Уменьшил начальную высоту
      this.size = 6 + Math.random() * 18;
      this.speedY = 0.6 + Math.random() * 1.4;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1);
      this.alpha = 0.6 + Math.random() * 0.4;
      this.color = `rgba(255, ${(190 + Math.floor(Math.random() * 40))}, ${(180 + Math.floor(Math.random() * 60))}, ${this.alpha})`;
    }
    update(){
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.3;
      this.angle += this.spin;
      if(this.y > H + 30) this.reset();
    }
    draw(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.5);
      ctx.quadraticCurveTo(this.size * 0.6, -this.size * 0.6, this.size * 0.5, 0);
      ctx.quadraticCurveTo(this.size * 0.2, this.size * 0.9, 0, this.size * 0.8);
      ctx.quadraticCurveTo(-this.size * 0.2, this.size * 0.9, -this.size * 0.5, 0);
      ctx.quadraticCurveTo(-this.size * 0.6, -this.size * 0.6, 0, -this.size * 0.5);
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = [];
  for(let i = 0; i < 40; i++) petals.push(new Petal());

  function anim(){
    // Прозрачный фон для canvas (чтобы был виден розовый фон body)
    ctx.clearRect(0, 0, W, H);
    
    for(const p of petals){ 
      p.update(); 
      p.draw(); 
    }
    
    requestAnimationFrame(anim);
  }
  
  anim();
}

// Убираем sparkle particles, так как они не видны на розовом фоне
// function createSparkleParticles() {
//   // Эта функция больше не нужна
// }

// Initialize only sakura petals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSakuraPetals();
  // createSparkleParticles(); // Отключено
});
