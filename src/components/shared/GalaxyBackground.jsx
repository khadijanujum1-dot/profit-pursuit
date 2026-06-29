import React, { useMemo } from "react";

/**
 * GalaxyBackground — smooth, wave-like cosmic backdrop in gold.
 * Flowing nebula waves, a gently breathing galaxy core, and
 * softly drifting star particles. No harsh twinkling.
 */

function makeStars(count, seed = 1) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      top: `${(i * 37 * seed) % 100}%`,
      left: `${(i * 53 * seed + 11) % 100}%`,
      size: (i % 4 === 0 ? 2 : 1),
      dur: `${8 + (i % 6)}s`,
      delay: `${(i % 6) * 0.8}s`,
      opacity: 0.2 + ((i * 13) % 6) / 10,
    });
  }
  return arr;
}

const WAVES = [
  { y: 120, amp: 40, dur: "14s", delay: "0s", opacity: 0.12, w: 2, hue: "212,175,55" },
  { y: 220, amp: 55, dur: "18s", delay: "2s", opacity: 0.09, w: 2, hue: "245,200,80" },
  { y: 320, amp: 35, dur: "12s", delay: "1s", opacity: 0.1, w: 1.5, hue: "212,175,55" },
  { y: 400, amp: 50, dur: "20s", delay: "3s", opacity: 0.08, w: 2, hue: "230,170,40" },
];

export default function GalaxyBackground() {
  const stars = useMemo(() => makeStars(50, 3), []);
  const dustStars = useMemo(() => makeStars(25, 7), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(40,25,5,0.9) 0%, rgba(10,5,0,0.95) 35%, #000000 75%)",
        }}
      />

      {/* Nebula cloud — slow drifting gold */}
      <div
        className="absolute"
        style={{
          top: "0%", left: "0%",
          width: "100%", height: "100%",
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.16) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(245,166,35,0.1) 0%, transparent 45%)",
          filter: "blur(50px)",
          animation: "nebula-drift 24s ease-in-out infinite alternate",
        }}
      />

      {/* Smooth flowing wave bands — SVG sine waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 500 500"
      >
        <defs>
          {WAVES.map((w, i) => (
            <linearGradient key={i} id={`gal-wave-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={`rgba(${w.hue}, 0)`} />
              <stop offset="50%" stopColor={`rgba(${w.hue}, ${w.opacity * 2.5})`} />
              <stop offset="100%" stopColor={`rgba(${w.hue}, 0)`} />
            </linearGradient>
          ))}
        </defs>
        {WAVES.map((w, i) => (
          <path
            key={`wave-${i}`}
            d={`M -100 ${w.y} Q 0 ${w.y - w.amp} 100 ${w.y} T 300 ${w.y} T 500 ${w.y} T 700 ${w.y}`}
            fill="none"
            stroke={`url(#gal-wave-${i})`}
            strokeWidth={w.w}
            style={{
              filter: `blur(${i % 2 === 0 ? 2 : 4}px)`,
              animation: `wave-flow-${i % 3} ${w.dur} ease-in-out ${w.delay} infinite`,
            }}
          />
        ))}
      </svg>

      {/* Spiral galaxy core — breathing, with smooth wave arms */}
      <div
        className="absolute"
        style={{
          top: "50%", left: "50%",
          width: "100%", height: "100%",
        }}
      >
        {/* Core glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", left: "50%",
            width: "180px", height: "180px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,220,120,0.35) 0%, rgba(212,175,55,0.15) 30%, transparent 70%)",
            filter: "blur(25px)",
            animation: "galaxy-breathe 8s ease-in-out infinite",
          }}
        />
        {/* Spiral arm — slowly rotating */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", left: "50%",
            width: "360px", height: "360px",
            transform: "translate(-50%, -50%)",
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.1) 30deg, transparent 60deg, transparent 180deg, rgba(245,200,80,0.06) 210deg, transparent 240deg)",
            filter: "blur(30px)",
            animation: "galaxy-rotate 45s linear infinite",
          }}
        />
        {/* Bright galactic center */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", left: "50%",
            width: "36px", height: "36px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,240,180,0.6) 0%, rgba(255,200,80,0.25) 50%, transparent 80%)",
            filter: "blur(10px)",
            animation: "galaxy-breathe 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Softly drifting stars — no harsh twinkle */}
      {stars.map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: "#fff8e0",
            boxShadow: `0 0 ${s.size * 3}px rgba(255,220,120,${s.opacity})`,
            animation: `star-float ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* Gold dust — gentle drift */}
      {dustStars.map((s, i) => (
        <div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: "#d4af37",
            boxShadow: `0 0 ${s.size * 4}px rgba(212,175,55,${s.opacity})`,
            animation: `star-float ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes star-float {
          0%, 100% { opacity: 0.2; transform: translateY(0px) scale(0.9); }
          50% { opacity: 0.6; transform: translateY(-12px) scale(1.1); }
        }
        @keyframes wave-flow-0 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }
        @keyframes wave-flow-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(40px); }
        }
        @keyframes wave-flow-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        @keyframes galaxy-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes galaxy-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes nebula-drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          100% { transform: translate(15px, -10px) scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
}