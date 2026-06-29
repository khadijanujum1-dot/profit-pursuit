import React from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "@/lib/store";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <img src={LOGO_URL} alt="Profit Pursuit" className="h-16 object-contain" />
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/" className="text-white/50 hover:text-gold transition-colors">Home</Link>
          <Link to="/archive" className="text-white/50 hover:text-gold transition-colors">Archive</Link>
          <Link to="/about" className="text-white/50 hover:text-gold transition-colors">About</Link>
          <Link to="/contact" className="text-white/50 hover:text-gold transition-colors">Contact</Link>
        </div>
        <p className="text-white/30 text-xs tracking-wider">
          © {new Date().getFullYear()} Profit Pursuit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}