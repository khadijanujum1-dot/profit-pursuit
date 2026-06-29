import { useEffect, useRef } from "react";

export default function ParticleCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.max(15, Math.floor(canvas.width / 35));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
        type: Math.random() > 0.75 ? "arrow" : "dot",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const drawArrow = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 8, size / 8);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(4, -7);
      ctx.lineTo(0, -5);
      ctx.lineTo(-4, -7);
      ctx.closePath();
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.type === "arrow") {
          drawArrow(p.x, p.y, p.size * 5, p.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}