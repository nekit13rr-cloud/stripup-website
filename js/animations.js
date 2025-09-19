/* Дополнительные анимации для hero секции */
@keyframes textShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Эффект свечения для текста */
.text-gradient {
  background: linear-gradient(
    45deg,
    #ff6b9d,
    #ff4b91,
    #ff6b9d,
    #ff4b91
  );
  background-size: 300% 300%;
  animation: textShine 3s ease-in-out infinite;
}

/* Анимация появления элементов с задержкой */
.hero-left > *:nth-child(1) { animation-delay: 0.1s; }
.hero-left > *:nth-child(2) { animation-delay: 0.3s; }
.hero-left > *:nth-child(3) { animation-delay: 0.5s; }
.hero-left > *:nth-child(4) { animation-delay: 0.7s; }
.hero-left > *:nth-child(5) { animation-delay: 0.9s; }
