import React, { useEffect, useRef } from "react";

const MatrixCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴ0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const fontSize = Math.max(12, Math.floor(Math.min(width, height) / 80));
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height));

    let raf = 0;

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.08)"; // fade out a bit for trailing effect
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff6a"; // matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      raf = requestAnimationFrame(draw);
    }

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 w-full h-full z-0 pointer-events-none"}
      style={{ mixBlendMode: "screen", opacity: 0.12 }}
    />
  );
};

export default MatrixCanvas;
