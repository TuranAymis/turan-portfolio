import React, { useEffect, useRef } from 'react';

const MatrixIntro: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random heights above screen
    }

    const chars = "TURANAYMISQAENGINEER0123456789<>[]{}/*-+=!@#$%^&";

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Matches ide-bg #0f172a roughly
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981'; // Emerald-500
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center gap-4">
         <div className="text-emerald-500 font-mono text-4xl md:text-6xl font-bold tracking-[0.2em] animate-pulse game-text-shadow">
            SYSTEM BOOT
         </div>
         <div className="text-emerald-500/70 font-mono text-sm tracking-widest">
            INITIALIZING NEURAL LINK...
         </div>
      </div>
    </div>
  );
};

export default MatrixIntro;