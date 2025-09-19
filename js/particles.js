/* ---------- Анимация лепестков сакуры ---------- */
function initSakuraPetals() {
    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    class SakuraPetal {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * W;
            this.y = -20 - Math.random() * 50;
            this.size = 10 + Math.random() * 15;
            this.speedY = 0.5 + Math.random() * 1.2;
            this.speedX = Math.random() * 1.0 - 0.5;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1);
            this.alpha = 0.6 + Math.random() * 0.4;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.angle) * 0.5;
            this.angle += this.spin;
            
            if (this.y > H + 30) this.reset();
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            
            // Розовый лепесток сакуры
            ctx.fillStyle = `rgba(255, 200, 220, ${this.alpha})`;
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.quadraticCurveTo(this.size/2, -this.size/4, this.size/2, 0);
            ctx.quadraticCurveTo(this.size/4, this.size/2, 0, this.size/2);
            ctx.quadraticCurveTo(-this.size/4, this.size/2, -this.size/2, 0);
            ctx.quadraticCurveTo(-this.size/2, -this.size/4, 0, -this.size/2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    const petals = [];
    for (let i = 0; i < 45; i++) {
        petals.push(new SakuraPetal());
    }

    function animate() {
        // Прозрачный фон для canvas (чтобы был виден розовый фон body)
        ctx.clearRect(0, 0, W, H);
        
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

document.addEventListener('DOMContentLoaded', initSakuraPetals);
