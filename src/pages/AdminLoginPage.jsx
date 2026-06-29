import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAdmin } from "@/hooks/useAdmin";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, logout } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countdown > 0) return;

    const result = login(password);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(true);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setCountdown(60);
        setAttempts(0);
      }
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <GoldAuraBackground />
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(180,130,40,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <Navbar mode="logo-only" />

      <div className="flex-1 flex items-center justify-center px-6 pt-16 relative z-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
          <div className="w-16 h-16 border border-gold/20 rounded-lg flex items-center justify-center mx-auto mb-6 bg-black/40">
            <Lock className="text-gold/60" size={28} />
          </div>

          <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gold/50 text-xs tracking-[0.2em] uppercase mb-8">Profit Pursuit Control Panel</p>

          <div className={`relative ${error ? "animate-shake" : ""}`}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              disabled={countdown > 0}
              placeholder="Enter password"
              className={`w-full bg-black/50 border text-white text-center px-4 py-3.5 text-sm placeholder:text-white/20 focus:outline-none transition-colors mb-4 ${error ? "border-red-500" : "border-gold/20 focus:border-gold/40"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-white/30 hover:text-gold">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-xs mb-4">Incorrect password. {3 - attempts - 1} attempts remaining.</p>}
          {countdown > 0 && <p className="text-red-400 text-xs mb-4">Too many attempts. Try again in {countdown}s.</p>}

          <button
            type="submit"
            disabled={countdown > 0}
            className="w-full bg-gold text-black py-3.5 text-sm tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-30"
          >
            Access Panel <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}