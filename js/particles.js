/* ---------- Falling sakura petals (canvas) ---------- */
function initSakuraPetals() {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  window.addEventListener('resize', ()=>{ W = canvas.width = innerWidth; H = canvas.height = innerHeight; });

  class Petal {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * W;
      this.y = -10 - Math.random()*H;
      this.size = 6 + Math.random()*18;
      this.speedY = 0.6 + Math.random()*1.4;
      this.speedX = Math.random()*1.2 - 0.6;
      this.angle = Math.random() * Math.PI*2;
      this.spin = (Math.random()*0.02) * (Math.random()>0.5?1:-1);
      this.alpha = 0.6 + Math.random()*0.4;
      this.color = `rgba(255, ${(190 + Math.floor(Math.random()*40))}, ${(180 + Math.floor(Math.random()*60))}, ${this.alpha})`; // peachy-pink
    }
    update(){
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle)*0.3;
      this.angle += this.spin;
      if(this.y > H + 30) this.reset();
    }
    draw(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -this.size*0.5);
      ctx.quadraticCurveTo(this.size*0.6, -this.size*0.6, this.size*0.5, 0);
      ctx.quadraticCurveTo(this.size*0.2, this.size*0.9, 0, this.size*0.8);
      ctx.quadraticCurveTo(-this.size*0.2, this.size*0.9, -this.size*0.5, 0);
      ctx.quadraticCurveTo(-this.size*0.6, -this.size*0.6, 0, -this.size*0.5);
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = [];
  for(let i=0;i<40;i++) petals.push(new Petal());

  function anim(){
    ctx.clearRect(0,0,W,H);
    for(const p of petals){ p.update(); p.draw(); }
    requestAnimationFrame(anim);
  }
  anim();
}

/* ---------- Sparkle particles effect ---------- */
function createSparkleParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  // Create sparkles periodically
  setInterval(() => {
    const particle = document.createElement('div');
    particle.classList.add('sparkle-particle');
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 5 + 2;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    container.appendChild(particle);
    
    // Animate the particle
    const animationDuration = Math.random() * 2000 + 2000;
    const keyframes = [
      { opacity: 0, transform: 'translateY(0) scale(0)' },
      { opacity: 1, transform: 'translateY(-20px) scale(1)' },
      { opacity: 0, transform: 'translateY(-40px) scale(0)' }
    ];
    
    particle.animate(keyframes, {
      duration: animationDuration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    // Remove particle after animation
    setTimeout(() => {
      container.removeChild(particle);
    }, animationDuration);
  }, 300);
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSakuraPetals();
  createSparkleParticles();
});
