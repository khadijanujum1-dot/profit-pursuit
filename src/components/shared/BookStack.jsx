import React from "react";
import { TrendingUp, Coins, Newspaper } from "lucide-react";
import GalaxyBackground from "@/components/shared/GalaxyBackground";

export default function BookStack({ editions = [], settings = {} }) {
  const published = editions.filter((e) => e.status === "published");
  const featured = editions.find((e) => e.featured) || published[0];

  const mode = settings.book_cover_mode || "auto";
  const covers = settings.book_covers || ["", "", "", ""];

  const frontCover =
    mode === "same" ? settings.book_cover_url || covers[0] || featured?.cover_image :
    mode === "individual" ? covers[0] || featured?.cover_image :
    featured?.cover_image;

  const otherPublished = published.filter((e) => e.id !== featured?.id);
  const backRightEdition = otherPublished[0] || published[1] || featured;
  const backLeftEdition = otherPublished[1] || published[2] || otherPublished[0] || featured;

  const backRightCover =
    mode === "same" ? settings.book_cover_url || backRightEdition?.cover_image :
    mode === "individual" ? covers[1] || backRightEdition?.cover_image :
    backRightEdition?.cover_image;

  const backLeftCover =
    mode === "same" ? settings.book_cover_url || backLeftEdition?.cover_image :
    mode === "individual" ? covers[2] || backLeftEdition?.cover_image :
    backLeftEdition?.cover_image;

  const frontTitle = featured?.title || "Profit Pursuit";
  const frontSubtitle = featured?.subtitle || "The Future of Global Trade";
  const frontIssue = featured?.edition_number ? `EST. 2023 — ISSUE ${featured.edition_number}` : "EST. 2023";

  const books = [
    { cover: backLeftCover, title: backLeftEdition?.title || "The Genesis", subtitle: backLeftEdition?.subtitle || "Foundations of Business", rotation: 30, offset: "2cm", zIndex: 1 },
    { cover: backRightCover, title: backRightEdition?.title || "Markets & Minds", subtitle: backRightEdition?.subtitle || "Commerce in Motion", rotation: 15, offset: "1cm", zIndex: 2 },
    { cover: frontCover, title: frontTitle, subtitle: frontSubtitle, issue: frontIssue, rotation: 0, offset: "0cm", scale: 0.9, zIndex: 3 },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[520px]">
      {/* Galaxy background */}
      <div className="absolute pointer-events-none" style={{ inset: "-10% -5%", borderRadius: "16px", overflow: "hidden" }}>
        <GalaxyBackground />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-[8%] left-[6%] animate-float hidden sm:block" style={{ animationDelay: "0s" }}>
        <Coins className="text-gold/40" size={22} style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.4))" }} />
      </div>
      <div className="absolute top-[18%] right-[8%] animate-float hidden sm:block" style={{ animationDelay: "1.5s" }}>
        <TrendingUp className="text-gold/35" size={26} style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.4))" }} />
      </div>
      <div className="absolute bottom-[14%] left-[10%] animate-float hidden sm:block" style={{ animationDelay: "0.8s" }}>
        <Newspaper className="text-gold/25" size={20} style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.3))" }} />
      </div>
      <div className="absolute bottom-[20%] right-[6%] animate-float hidden sm:block" style={{ animationDelay: "2.2s" }}>
        <Coins className="text-gold/30" size={18} style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.3))" }} />
      </div>

      {/* Book stack — clean responsive scale via CSS */}
      <div className="book-stack-wrap relative" style={{ width: "320px", height: "440px" }}>
        {books.map((book, i) => (
          <BookCover key={i} {...book} />
        ))}
      </div>

      <style>{`
        .book-stack-wrap { transform: scale(0.62) translateX(-30px); transform-origin: center; }
        @media (min-width: 480px) { .book-stack-wrap { transform: scale(0.72) translateX(-30px); } }
        @media (min-width: 640px) { .book-stack-wrap { transform: scale(0.82) translateX(-25px); } }
        @media (min-width: 768px) { .book-stack-wrap { transform: scale(0.92) translateX(-20px); } }
        @media (min-width: 1024px) { .book-stack-wrap { transform: scale(1.05) translateX(-25px); } }
        @media (min-width: 1280px) { .book-stack-wrap { transform: scale(1.15) translateX(-30px); } }
      `}</style>
    </div>
  );
}

function BookCover({ cover, title, subtitle, issue, rotation, offset, scale = 1, zIndex }) {
  const hasImage = cover && cover.trim() !== "";

  return (
    <div
      className="absolute bottom-0 left-0"
      style={{
        width: "320px",
        height: "440px",
        transformOrigin: "0% 100%",
        transform: `translateX(${offset}) rotate(${rotation}deg) scale(${scale})`,
        zIndex,
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)",
          transform: "translateY(6px)",
          borderRadius: "2px",
        }}
      />
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          border: "2px solid #d4af37",
          borderRadius: "2px",
          background: hasImage
            ? `url(${cover}) center/cover`
            : "linear-gradient(135deg, #4a0e0e 0%, #630d0d 50%, #4a0e0e 100%)",
          boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.3), 0 12px 30px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: "8px", background: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(212,175,55,0.15), transparent)" }}
        />
        {hasImage ? (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.4)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }} />
          </>
        ) : (
          <MaroonCoverContent title={title} subtitle={subtitle} issue={issue} />
        )}
      </div>
    </div>
  );
}

function MaroonCoverContent({ title, subtitle, issue }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center">
      <div className="absolute inset-2 pointer-events-none" style={{ border: "1px solid rgba(212,175,55,0.35)" }} />
      <div className="relative z-10 mt-3">
        <h3 className="font-heading text-gold font-bold text-sm tracking-[0.2em] uppercase leading-tight">{title}</h3>
        <div className="w-12 h-px bg-gold/50 mx-auto mt-2" />
      </div>
      <div className="relative z-10 flex items-center justify-center">
        <div className="rounded-full flex items-center justify-center" style={{ width: "72px", height: "72px", border: "1.5px solid rgba(212,175,55,0.6)", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }}>
          <div className="rounded-full" style={{ width: "48px", height: "48px", border: "1px solid rgba(212,175,55,0.4)" }}>
            <div className="rounded-full mx-auto mt-2" style={{ width: "32px", height: "32px", border: "1px solid rgba(212,175,55,0.3)" }} />
          </div>
        </div>
      </div>
      <div className="relative z-10 px-2">
        <p className="font-heading text-white/70 text-[11px] tracking-[0.1em] uppercase leading-snug">{subtitle}</p>
      </div>
      <div className="relative z-10 mb-3">
        <div className="w-12 h-px bg-gold/50 mx-auto mb-2" />
        <p className="text-gold/60 text-[8px] tracking-[0.3em] uppercase font-medium">{issue}</p>
      </div>
    </div>
  );
}