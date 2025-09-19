/* Простые анимации */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-left > *:nth-child(1) { transition-delay: 0.1s; }
.hero-left > *:nth-child(2) { transition-delay: 0.2s; }
.hero-left > *:nth-child(3) { transition-delay: 0.3s; }
.hero-left > *:nth-child(4) { transition-delay: 0.4s; }
