/* ---------- Улучшенная анимация лепестков сакуры ---------- */
function initSakuraPetals() {
    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    
    // Обработчик изменения размера окна
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
            this.y = -20 - Math.random() * 100;
            this.size = 8 + Math.random() * 20;
            this.speedY = 0.7 + Math.random() * 1.5;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1);
            this.alpha = 0.7 + Math.random() * 0.3;
            this.amplitude = 0.5 + Math.random() * 1.5;
            this.hue = 330 + Math.random() * 30; // розовые оттенки
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.angle) * this.amplitude;
            this.angle += this.spin;
            
            // Если лепесток ушел за нижнюю границу, reset
            if (this.y > H + 50) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            
            // Создаем лепесток сакуры
            ctx.fillStyle = `hsla(${this.hue}, 70%, 80%, ${this.alpha})`;
            ctx.beginPath();
            
            // Форма лепестка сакуры
            ctx.moveTo(0, -this.size * 0.5);
            ctx.bezierCurveTo(
                this.size * 0.7, -this.size * 0.3,
                this.size * 0.6, this.size * 0.4,
                0, this.size * 0.6
            );
            ctx.bezierCurveTo(
                -this.size * 0.6, this.size * 0.4,
                -this.size * 0.7, -this.size * 0.3,
                0, -this.size * 0.5
            );
            
            ctx.fill();
            ctx.restore();
        }
    }

    // Создаем лепестки
    const petals = [];
    const petalCount = Math.floor(window.innerWidth / 20); // Количество зависит от ширины экрана
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            petals.push(new SakuraPetal());
        }, i * 200);
    }

    // Функция анимации
    function animate() {
        // Создаем полупрозрачный фон для эффекта шлейфа
        ctx.fillStyle = 'rgba(255, 150, 180, 0.05)';
        ctx.fillRect(0, 0, W, H);
        
        // Обновляем и рисуем лепестки
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Запускаем анимацию
    animate();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSakuraPetals();
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', initSakuraPetals);
});
