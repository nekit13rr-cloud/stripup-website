const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Petal {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 10 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = 0.01 + Math.random() * 0.02;
  }
  update() {
    this.y += this.speed;
    this.angle += this.spin;
    if(this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'rgba(255, 200, 220, 0.8)';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

const petals = Array.from({length: 50}, () => new Petal());

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
