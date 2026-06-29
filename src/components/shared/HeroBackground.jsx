import React from "react";

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 95}%`,
  size: Math.random() > 0.6 ? 3 : 2,
  dur: `${7 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
}));

// Aurora curtain ribbons — tall, thin, flowing vertical bands
const CURTAINS = [
  { left: "5%", width: "180px", duration: "12s", delay: "0s", opacity: 0.6, hue: "212,175,55" },
  { left: "18%", width: "220px", duration: "16s", delay: "2s", opacity: 0.5, hue: "245,166,35" },
  { left: "35%", width: "200px", duration: "14s", delay: "1s", opacity: 0.65, hue: "212,175,55" },
  { left: "52%", width: "240px", duration: "18s", delay: "3s", opacity: 0.55, hue: "245,166,35" },
  { left: "68%", width: "190px", duration: "13s", delay: "0.5s", opacity: 0.6, hue: "212,175,55" },
  { left: "82%", width: "210px", duration: "15s", delay: "2.5s", opacity: 0.5, hue: "200,150,30" },
];

// Diagonal light streaks — cinematic sweeping beams
const STREAKS = [
  { top: "10%", left: "-10%", width: "500px", height: "2px", duration: "9s", delay: "0s", opacity: 0.4 },
  { top: "35%", left: "-15%", width: "600px", height: "1px", duration: "11s", delay: "2s", opacity: 0.3 },
  { top: "65%", left: "-20%", width: "550px", height: "2px", duration: "10s", delay: "4s", opacity: 0.35 },
  { top: "85%", left: "-10%", width: "450px", height: "1px", duration: "12s", delay: "1s", opacity: 0.25 },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep black base */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, #0a0a0a 0%, #000000 100%)" }} />

      {/* Northern lights aurora curtains — flowing gold ribbons */}
      <div className="absolute inset-0">
        {CURTAINS.map((c, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: c.left,
              width: c.width,
              height: "100%",
              background: `linear-gradient(180deg,
                transparent 0%,
                rgba(${c.hue}, ${c.opacity * 0.1}) 15%,
                rgba(${c.hue}, ${c.opacity * 0.5}) 35%,
                rgba(${c.hue}, ${c.opacity * 0.7}) 50%,
                rgba(${c.hue}, ${c.opacity * 0.5}) 65%,
                rgba(${c.hue}, ${c.opacity * 0.15}) 85%,
                transparent 100%)`,
              filter: "blur(35px)",
              transformOrigin: "50% 0%",
              animation: `aurora-curtain-${i} ${c.duration} ease-in-out ${c.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Cinematic diagonal light streaks */}
      {STREAKS.map((s, i) => (
        <div
          key={`streak-${i}`}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.width,
            height: s.height,
            background: `linear-gradient(90deg, transparent, rgba(212,175,55,${s.opacity}), transparent)`,
            transform: "rotate(15deg)",
            animation: `streak-sweep ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* Soft gold horizon glow at the base */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "40%",
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating gold orbs */}
      <div className="absolute top-[20%] left-[15%] rounded-full animate-float" style={{ width: "8px", height: "8px", background: "rgba(212,175,55,0.6)", boxShadow: "0 0 20px rgba(212,175,55,0.8)", animationDelay: "0.5s" }} />
      <div className="absolute top-[60%] left-[80%] rounded-full animate-float" style={{ width: "6px", height: "6px", background: "rgba(245,166,35,0.5)", boxShadow: "0 0 15px rgba(245,166,35,0.7)", animationDelay: "1.8s" }} />
      <div className="absolute top-[75%] left-[25%] rounded-full animate-float" style={{ width: "5px", height: "5px", background: "rgba(212,175,55,0.4)", boxShadow: "0 0 12px rgba(212,175,55,0.6)", animationDelay: "3s" }} />

      {/* Small gold particles — gentle drift */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "#d4af37",
            boxShadow: "0 0 6px rgba(212,175,55,0.6)",
            animation: `particle-drift ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes aurora-curtain-0 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.5; }
          25% { transform: translateX(40px) skewX(-8deg) scaleY(1.05); opacity: 0.7; }
          50% { transform: translateX(-30px) skewX(6deg) scaleY(0.95); opacity: 0.4; }
          75% { transform: translateX(20px) skewX(-4deg) scaleY(1.02); opacity: 0.6; }
        }
        @keyframes aurora-curtain-1 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.4; }
          30% { transform: translateX(-50px) skewX(10deg) scaleY(1.08); opacity: 0.6; }
          60% { transform: translateX(35px) skewX(-7deg) scaleY(0.92); opacity: 0.35; }
          80% { transform: translateX(-15px) skewX(4deg) scaleY(1.04); opacity: 0.5; }
        }
        @keyframes aurora-curtain-2 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.55; }
          20% { transform: translateX(30px) skewX(-6deg) scaleY(1.06); opacity: 0.75; }
          50% { transform: translateX(-40px) skewX(8deg) scaleY(0.94); opacity: 0.45; }
          80% { transform: translateX(25px) skewX(-3deg) scaleY(1.03); opacity: 0.6; }
        }
        @keyframes aurora-curtain-3 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.45; }
          25% { transform: translateX(-45px) skewX(7deg) scaleY(1.07); opacity: 0.65; }
          55% { transform: translateX(30px) skewX(-9deg) scaleY(0.93); opacity: 0.4; }
          80% { transform: translateX(-20px) skewX(5deg) scaleY(1.05); opacity: 0.55; }
        }
        @keyframes aurora-curtain-4 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.5; }
          30% { transform: translateX(35px) skewX(-8deg) scaleY(1.05); opacity: 0.7; }
          60% { transform: translateX(-25px) skewX(6deg) scaleY(0.96); opacity: 0.4; }
          85% { transform: translateX(15px) skewX(-3deg) scaleY(1.02); opacity: 0.55; }
        }
        @keyframes aurora-curtain-5 {
          0%, 100% { transform: translateX(0) skewX(0deg) scaleY(1); opacity: 0.4; }
          25% { transform: translateX(-30px) skewX(9deg) scaleY(1.08); opacity: 0.6; }
          55% { transform: translateX(40px) skewX(-6deg) scaleY(0.92); opacity: 0.35; }
          80% { transform: translateX(-10px) skewX(4deg) scaleY(1.04); opacity: 0.5; }
        }
        @keyframes particle-drift {
          0%, 100% { opacity: 0; transform: translateY(0px) scale(0.7); }
          50% { opacity: 0.6; transform: translateY(-30px) scale(1.1); }
        }
        @keyframes streak-sweep {
          0% { opacity: 0; transform: translateX(-200px) rotate(15deg); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateX(400px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}