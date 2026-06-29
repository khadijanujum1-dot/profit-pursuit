import React from "react";

/**
 * GoldAuraBackground — highly visible, complex animated gold background
 * with flowing waves, sweeping streaks, light beams, particles, and
 * concentric ripples. Designed so the page never looks blank.
 */

// Wavy gold ribbons — full-width flowing sine-wave bands
const WAVES = [
  { top: "8%", amp: 30, dur: "12s", delay: "0s", opacity: 0.35, thickness: 120, hue: "212,175,55" },
  { top: "25%", amp: 45, dur: "16s", delay: "2s", opacity: 0.25, thickness: 160, hue: "245,200,80" },
  { top: "42%", amp: 25, dur: "10s", delay: "1s", opacity: 0.3, thickness: 100, hue: "212,175,55" },
  { top: "60%", amp: 50, dur: "18s", delay: "3s", opacity: 0.22, thickness: 180, hue: "230,170,40" },
  { top: "78%", amp: 35, dur: "14s", delay: "0.5s", opacity: 0.28, thickness: 140, hue: "212,175,55" },
  { top: "90%", amp: 20, dur: "11s", delay: "2.5s", opacity: 0.2, thickness: 90, hue: "245,200,80" },
];

// Diagonal light beams — cinematic sweeping streaks
const BEAMS = [
  { top: "5%", duration: "6s", delay: "0s", length: 400, opacity: 0.7 },
  { top: "18%", duration: "8s", delay: "1s", length: 350, opacity: 0.5 },
  { top: "35%", duration: "7s", delay: "0.5s", length: 450, opacity: 0.6 },
  { top: "50%", duration: "9s", delay: "2s", length: 380, opacity: 0.45 },
  { top: "65%", duration: "6.5s", delay: "1.5s", length: 420, opacity: 0.55 },
  { top: "80%", duration: "8.5s", delay: "3s", length: 360, opacity: 0.4 },
  { top: "92%", duration: "7.5s", delay: "0.8s", length: 440, opacity: 0.5 },
];

// Thin gold threads — secondary flowing lines
const THREADS = [
  { top: "15%", duration: "10s", delay: "0s", opacity: 0.3 },
  { top: "30%", duration: "13s", delay: "2s", opacity: 0.22 },
  { top: "48%", duration: "11s", delay: "1s", opacity: 0.28 },
  { top: "62%", duration: "14s", delay: "3.5s", opacity: 0.2 },
  { top: "75%", duration: "12s", delay: "1.8s", opacity: 0.25 },
  { top: "88%", duration: "15s", delay: "2.8s", opacity: 0.18 },
];

// Floating gold particles
const PARTICLES = Array.from({ length: 30 }, () => ({
  top: `${Math.random() * 95}%`,
  left: `${Math.random() * 95}%`,
  size: Math.random() > 0.6 ? 4 : 3,
  dur: `${6 + Math.random() * 6}s`,
  delay: `${Math.random() * 5}s`,
  opacity: 0.3 + Math.random() * 0.4,
}));

// Concentric ripple rings
const RINGS = [
  { left: "20%", top: "35%", size: 200, dur: "8s", delay: "0s", opacity: 0.12 },
  { left: "75%", top: "55%", size: 260, dur: "10s", delay: "3s", opacity: 0.1 },
  { left: "50%", top: "80%", size: 180, dur: "9s", delay: "1.5s", opacity: 0.14 },
];

export default function GoldAuraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep black gradient base */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #0a0805 0%, #000000 80%)" }}
      />

      {/* Large soft gold radial glows */}
      <div
        className="absolute"
        style={{
          top: "10%", left: "15%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "gold-glow-pulse 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "5%", right: "10%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(245,200,80,0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
          animation: "gold-glow-pulse 10s ease-in-out 2s infinite",
        }}
      />

      {/* Flowing gold waves — SVG sine-wave bands with animated path */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        style={{ opacity: 1 }}
      >
        <defs>
          {WAVES.map((w, i) => (
            <linearGradient key={i} id={`wave-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={`rgba(${w.hue}, 0)`} />
              <stop offset="30%" stopColor={`rgba(${w.hue}, ${w.opacity})`} />
              <stop offset="50%" stopColor={`rgba(${w.hue}, ${w.opacity * 1.4})`} />
              <stop offset="70%" stopColor={`rgba(${w.hue}, ${w.opacity})`} />
              <stop offset="100%" stopColor={`rgba(${w.hue}, 0)`} />
            </linearGradient>
          ))}
        </defs>
        {WAVES.map((w, i) => {
          const y = (parseInt(w.top) / 100) * 900;
          return (
            <g key={`wave-${i}`} style={{ animation: `wave-shift-${i % 3} ${w.dur} ease-in-out ${w.delay} infinite` }}>
              <path
                d={`M -200 ${y} Q 180 ${y - w.amp} 360 ${y} T 720 ${y} T 1080 ${y} T 1440 ${y} T 1800 ${y}`}
                fill="none"
                stroke={`url(#wave-grad-${i})`}
                strokeWidth={w.thickness / 10}
                style={{ filter: `blur(${w.thickness / 8}px)` }}
              />
              <path
                d={`M -200 ${y} Q 180 ${y - w.amp} 360 ${y} T 720 ${y} T 1080 ${y} T 1440 ${y} T 1800 ${y}`}
                fill="none"
                stroke={`rgba(${w.hue}, ${w.opacity * 1.5})`}
                strokeWidth="1.5"
                style={{ filter: `blur(1px)`, boxShadow: `0 0 10px rgba(${w.hue}, 0.5)` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Diagonal light beams — sweeping streaks */}
      {BEAMS.map((b, i) => (
        <div
          key={`beam-${i}`}
          className="absolute"
          style={{
            top: b.top,
            left: `-${b.length}px`,
            width: `${b.length}px`,
            height: "2px",
            background: `linear-gradient(90deg, transparent, rgba(212,175,55,${b.opacity}) 40%, rgba(245,200,80,${b.opacity * 1.3}) 50%, rgba(212,175,55,${b.opacity}) 60%, transparent)`,
            filter: "blur(1px)",
            boxShadow: `0 0 15px rgba(212,175,55,${b.opacity * 0.6})`,
            transform: "rotate(-10deg)",
            animation: `beam-sweep ${b.duration} linear ${b.delay} infinite`,
          }}
        />
      ))}

      {/* Thin flowing gold threads */}
      {THREADS.map((t, i) => (
        <div
          key={`thread-${i}`}
          className="absolute"
          style={{
            top: t.top,
            left: "-600px",
            width: "600px",
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(212,175,55,${t.opacity}) 50%, transparent)`,
            boxShadow: `0 0 8px rgba(212,175,55,${t.opacity * 0.5})`,
            transform: "rotate(-7deg)",
            animation: `beam-sweep ${t.duration} linear ${t.delay} infinite`,
          }}
        />
      ))}

      {/* Concentric ripple rings */}
      {RINGS.map((r, i) => (
        <div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            left: r.left,
            top: r.top,
            width: `${r.size}px`,
            height: `${r.size}px`,
            border: `1px solid rgba(212,175,55,${r.opacity})`,
            boxShadow: `0 0 20px rgba(212,175,55,${r.opacity * 0.5}) inset`,
            animation: `ring-expand ${r.dur} ease-out ${r.delay} infinite`,
          }}
        />
      ))}

      {/* Floating gold particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "#d4af37",
            boxShadow: `0 0 8px rgba(212,175,55,${p.opacity})`,
            animation: `particle-float ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Bottom horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          background: "linear-gradient(to top, rgba(212,175,55,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <style>{`
        @keyframes beam-sweep {
          0% { transform: translateX(0) rotate(-10deg); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateX(100vw) rotate(-10deg); opacity: 0; }
        }
        @keyframes wave-shift-0 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-60px); }
        }
        @keyframes wave-shift-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(80px); }
        }
        @keyframes wave-shift-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-40px); }
        }
        @keyframes gold-glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes particle-float {
          0%, 100% { opacity: 0.2; transform: translateY(0px) scale(0.8); }
          50% { opacity: 0.8; transform: translateY(-30px) scale(1.3); }
        }
      `}</style>
    </div>
  );
}