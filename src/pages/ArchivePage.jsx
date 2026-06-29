import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import EditionCard from "@/components/shared/EditionCard";
import { useEditions } from "@/hooks/useStore";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function ArchivePage() {
  const editions = useEditions();
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editions.map((ed) => <EditionCard key={ed.id} edition={ed} />)}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
