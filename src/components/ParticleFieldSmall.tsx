import React, { useEffect, useRef } from 'react';

export const ParticleFieldSmall: React.FC<{ color?: string; density?: number; className?: string }> = ({ color = '#00ff88', density = 0.0008, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth * devicePixelRatio;
    let height = canvas.clientHeight * devicePixelRatio;
    canvas.width = width;
    canvas.height = height;

    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const createParticles = () => {
      particles = [];
      const area = width * height;
      const count = Math.max(6, Math.floor(area * density));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.6 + 0.6,
          alpha: 0.2 + Math.random() * 0.6,
        });
      }
    };

    const onResize = () => {
      width = canvas.clientWidth * devicePixelRatio;
      height = canvas.clientHeight * devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      createParticles();
    };

    createParticles();
    window.addEventListener('resize', onResize);

    const tick = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // subtle background gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, `rgba(6,182,212,${p.alpha})`);
        g.addColorStop(0.6, `rgba(6,182,212,${p.alpha * 0.2})`);
        g.addColorStop(1, 'rgba(6,182,212,0)');

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-80 ${className}`}
      aria-hidden
    />
  );
};

export default ParticleFieldSmall;
