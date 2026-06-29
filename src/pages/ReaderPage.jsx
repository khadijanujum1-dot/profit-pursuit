import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Store } from "@/lib/store";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function ReaderPage() {
  const { id } = useParams();
  const [edition, setEdition] = useState(null);
  const [siblings, setSiblings] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const ed = await Store.getEdition(id);
      if (!active) return;
      setEdition(ed);
      const all = (await Store.getEditions()).filter((e) => e.status === "published");
      const currentIndex = all.findIndex((e) => e.id === id);
      setSiblings({
        prev: currentIndex > 0 ? all[currentIndex - 1] : null,
        next: currentIndex >= 0 && currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
      });
      setLoading(false);
      window.scrollTo(0, 0);
    };
    load();
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <GoldAuraBackground />
        <div className="relative z-10">
          <div className="w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!edition || !edition.flipbook_url) {
    return (
      <div className="min-h-screen bg-black text-white">
        <GoldAuraBackground />
        <div className="relative z-10">
        <Navbar mode="public" />
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <h1 className="font-heading text-3xl text-white mb-2">Edition Not Found</h1>
          <p className="text-white/40 text-sm mb-6">This edition may not have a flipbook available yet.</p>
          <Link to="/archive" className="text-gold text-sm tracking-wider uppercase hover:underline">← Back to Archive</Link>
        </div>
        <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <div className="relative z-10">
      <Navbar mode="public" />

      <div className="pt-28 pb-8 px-6 text-center">
        <span className="text-gold/50 text-xs tracking-[0.3em] uppercase">Edition {edition.edition_number}</span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mt-2">{edition.title}</h1>
        {edition.description && <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">{edition.description}</p>}
      </div>

      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <iframe
            src={edition.flipbook_url}
            title={edition.title}
            className="w-full border border-gold/15"
            style={{ height: "80vh", minHeight: "500px" }}
            allowFullScreen
          />
        </div>
      </div>

      {/* Prev/Next Nav */}
      <div className="max-w-6xl mx-auto px-6 pb-16 flex items-center justify-between">
        {siblings.prev ? (
          <Link to={`/read/${siblings.prev.id}`} className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm tracking-wider uppercase">
            <ArrowLeft size={14} /> Previous
          </Link>
        ) : <div />}
        <Link to="/archive" className="text-white/40 text-sm tracking-wider uppercase hover:text-gold transition-colors">All Editions</Link>
        {siblings.next ? (
          <Link to={`/read/${siblings.next.id}`} className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm tracking-wider uppercase">
            Next <ArrowRight size={14} />
          </Link>
        ) : <div />}
      </div>

      <Footer />
      </div>
    </div>
  );
}