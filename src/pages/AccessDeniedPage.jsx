import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function AccessDeniedPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <GoldAuraBackground />
      {/* Red vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(139,26,26,0.15) 0%, transparent 70%)" }} />

      <Navbar mode="logo-only" />

      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center animate-pulse-gold rounded-full border border-gold/20">
            <Lock className="text-gold" size={28} />
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-bold text-red-500 mb-4">403</h1>
          <h2 className="font-heading text-2xl text-white mb-3">Access Denied</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            You don't have permission to access this page. Please log in as an administrator to continue.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="bg-gold text-black px-6 py-3 text-sm tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors">
              Go Back Home
            </Link>
            <Link to="/admin" className="border border-gold/30 text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-gold/10 transition-colors">
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}