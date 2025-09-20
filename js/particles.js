const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Petal {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;

    // Слой лепестка: 1=близкий, 2=средний, 3=далёкий
    this.layer = Math.ceil(Math.random() * 3);

    // Размер и скорость зависят от слоя
    if (this.layer === 1) { this.size = 12 + Math.random() * 6; this.speedY = 1.8 + Math.random(); }
    else if (this.layer === 2) { this.size = 8 + Math.random() * 4; this.speedY = 1 + Math.random(); }
    else { this.size = 5 + Math.random() * 3; this.speedY = 0.5 + Math.random() * 0.5; }

    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 1.5 - 0.75;

    const pinkGradients = [
      ['rgba(255,182,193,0.6)','rgba(255,192,203,0.2)'],
      ['rgba(255,105,180,0.6)','rgba(255,160,180,0.2)'],
      ['rgba(255,175,200,0.6)','rgba(255,182,193,0.2)']
    ];
    this.gradientColors = pinkGradients[Math.floor(Math.random()*pinkGradients.length)];
    this.shape = Math.random() > 0.5 ? 0 : 1;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // лёгкое колебание по X
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height + this.size) this.y = -this.size;
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = canvas.width + this.size;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);

    let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    grad.addColorStop(0, this.gradientColors[0]);
    grad.addColorStop(1, this.gradientColors[1]);

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (this.shape === 0) {
      ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, 2 * Math.PI);
    } else {
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(this.size * 0.3, -this.size*0.3, 0, this.size);
      ctx.quadraticCurveTo(-this.size * 0.3, -this.size*0.3, 0, -this.size);
    }
    ctx.fill();
    ctx.restore();
  }
}

const petals = [];
for (let i = 0; i < 120; i++) petals.push(new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

animate();
