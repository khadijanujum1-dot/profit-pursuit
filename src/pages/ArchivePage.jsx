import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import EditionCard from "@/components/shared/EditionCard";
import { useEditions } from "@/hooks/useStore";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

const filters = ["ALL", "2023", "2024", "COMING SOON"];

export default function ArchivePage() {
  const editions = useEditions();
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = editions.filter((ed) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "COMING SOON") return ed.status === "coming_soon";
    if (ed.publish_date) return ed.publish_date.startsWith(activeFilter);
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <div className="relative z-10">
      <Navbar mode="public" />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <SectionLabel>All Issues</SectionLabel>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">The Archive</h1>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
          <p className="text-white/40 max-w-md mx-auto">Every edition. Every insight. All in one place.</p>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 text-xs tracking-wider uppercase transition-all ${activeFilter === f ? "bg-gold text-black font-semibold" : "border border-gold/15 text-white/50 hover:border-gold/40 hover:text-gold"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ed) => <EditionCard key={ed.id} edition={ed} />)}
          </div>

          {filtered.length > 6 && (
            <div className="flex justify-center gap-2 mt-12">
              {[0, 1].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-gold" : "bg-gold/20"}`} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}