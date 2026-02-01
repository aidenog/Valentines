'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

const confettiEmojis = ['❤️', '💕', '💖', '💗', '💝', '🌹', '✨', '💫'];
const Confetti = forwardRef<{ trigger: () => void }, {}>(function Confetti(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCountRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useImperativeHandle(ref, () => ({
    trigger: () => {
      triggerConfetti();
    },
  }));

  const triggerConfetti = () => {
    if (!containerRef.current) return;

    // Create 50 confetti particles
    for (let i = 0; i < 50; i++) {
      const particle: Particle = {
        id: particleCountRef.current++,
        left: Math.random() * 100,
        delay: Math.random() * 0.1,
        duration: 2 + Math.random() * 1,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      };

      particlesRef.current.push(particle);

      const el = document.createElement('div');
      el.className = 'fixed pointer-events-none text-2xl md:text-4xl';
      el.textContent = particle.emoji;
      el.style.left = `${particle.left}%`;
      el.style.top = '-20px';
      el.style.opacity = '1';
      el.style.animation = `confetti-fall ${particle.duration}s ease-in forwards`;
      el.style.animationDelay = `${particle.delay}s`;
      el.style.transform = `rotate(${Math.random() * 360}deg)`;

      containerRef.current?.appendChild(el);

      // Remove element after animation completes
      setTimeout(() => {
        el.remove();
        particlesRef.current = particlesRef.current.filter((p) => p.id !== particle.id);
      }, (particle.delay + particle.duration) * 1000);
    }
  };

  useEffect(() => {
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .animate-fade-in {
        animation: fade-in 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
});

Confetti.displayName = 'Confetti';

export default Confetti;
