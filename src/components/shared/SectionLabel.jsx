import React from "react";

export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 mb-4 ${className}`}>
      <div className="w-8 h-px bg-gold/50" />
      <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">{children}</span>
      <div className="w-8 h-px bg-gold/50" />
    </div>
  );
}