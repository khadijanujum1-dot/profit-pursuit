import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Bell } from "lucide-react";

export default function EditionCard({ edition }) {
  const isComingSoon = edition.status === "coming_soon";

  if (isComingSoon) {
    return (
      <div className="group relative">
        <div className="aspect-[3/4] relative overflow-hidden border border-gold/15 shimmer-bg flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mb-4">
            <Bell className="text-gold/40" size={20} />
          </div>
          <span className="text-gold/50 text-xs tracking-[0.2em] uppercase">Coming Soon</span>
          <h3 className="font-heading text-white text-lg font-semibold mt-2">Edition {edition.edition_number}</h3>
          <p className="text-white/30 text-xs mt-2">{edition.description}</p>
          <button className="mt-4 text-gold text-xs tracking-wider uppercase border border-gold/30 px-4 py-2 hover:bg-gold/10 transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/read/${edition.id}`} className="group block">
      <div className="aspect-[3/4] relative overflow-hidden border border-gold/15">
        {edition.cover_image ? (
          <img
            src={edition.cover_image}
            alt={edition.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-black flex items-center justify-center">
            <BookOpen className="text-gold/20" size={32} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {edition.featured && (
          <span className="absolute top-3 left-3 bg-gold text-black text-[10px] tracking-wider uppercase px-2 py-1 font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gold/50 text-[10px] tracking-[0.2em] uppercase">Edition {edition.edition_number}</span>
          {edition.publish_date && (
            <span className="text-white/30 text-[10px]">
              · {new Date(edition.publish_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
        </div>
        <h3 className="font-heading text-white text-lg font-semibold group-hover:text-gold transition-colors">
          {edition.title}
        </h3>
        <p className="text-white/40 text-xs mt-1 line-clamp-2">{edition.description}</p>
        <span className="text-gold text-xs tracking-wider uppercase mt-2 inline-block group-hover:underline">
          Read Edition →
        </span>
      </div>
    </Link>
  );
}