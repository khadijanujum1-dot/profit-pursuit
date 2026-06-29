import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Megaphone, Calculator, LineChart, Landmark, Ship, GraduationCap, Wallet, Rocket, Quote } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketTicker from "@/components/shared/MarketTicker";
import SectionLabel from "@/components/shared/SectionLabel";
import EditionCard from "@/components/shared/EditionCard";
import BookStack from "@/components/shared/BookStack";
import CountUp from "@/components/shared/CountUp";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ScrollProgress from "@/components/shared/ScrollProgress";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";
import { useEditions, useSettings } from "@/hooks/useStore";

const topics = [
  { num: "01", cat: "Business Studies", title: "Marketing", desc: "Brand strategy, consumer psychology, and how businesses attract customers.", icon: Megaphone },
  { num: "02", cat: "Finance", title: "Accounting & Costs", desc: "Financial statements, cost structures, and the numbers behind decisions.", icon: Calculator },
  { num: "03", cat: "Investing", title: "Stock Markets", desc: "Equity analysis, index movements, and what drives market sentiment.", icon: LineChart },
  { num: "04", cat: "Economics", title: "Macroeconomics", desc: "Inflation, interest rates, GDP growth, and central bank policy decoded.", icon: Landmark },
  { num: "05", cat: "Trade", title: "Global Trade", desc: "Supply chains, tariffs, and how international commerce shapes life.", icon: Ship },
  { num: "06", cat: "Skills", title: "Financial Literacy", desc: "Budgeting, investing, and compounding — essentials every student needs.", icon: GraduationCap },
  { num: "07", cat: "Wealth", title: "Personal Finance", desc: "Savings strategies, debt management, and building wealth from a young age.", icon: Wallet },
  { num: "08", cat: "Business", title: "Entrepreneurship", desc: "Startup culture, business models, and stories of young entrepreneurs.", icon: Rocket },
];

const voices = [
  { quote: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett", role: "CEO, Berkshire Hathaway" },
  { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", role: "Founding Father & Economist" },
  { quote: "Marketing is no longer about the stuff that you make, but about the stories you tell.", author: "Seth Godin", role: "Author & Marketing Expert" },
];

export default function HomePage() {
  const editions = useEditions();
  const settings = useSettings();
  const featured = editions.find((e) => e.featured) || editions.find((e) => e.status === "published");
  const published = editions.filter((e) => e.status === "published");

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar mode="public" />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 overflow-hidden bg-black">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold/50" />
                <span className="text-gold/70 text-[10px] tracking-[0.4em] uppercase font-medium">GEMS Millennium School — Sharjah</span>
              </div>
              <h1 className="font-heading font-bold leading-[1.02] mb-4 sm:mb-5" style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)", textShadow: "0 0 40px rgba(212,175,55,0.25)" }}>
                <span className="title-shimmer">INSIGHTS.</span>
                <br />
                INNOVATION.
                <br />
                <span className="title-shimmer">IMPACT.</span>
              </h1>
              <div className="w-16 h-px bg-gold mb-6" />
              <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-xs sm:max-w-sm">
                Your trusted source for intelligent analysis, business trends, and commerce leadership from GEMS Millennium School.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/archive" className="btn-shine-wrap flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:scale-105 border border-gold text-gold bg-gold/8 hover:bg-gold/15">
                  <BookOpen size={14} /> Browse All Editions
                </Link>
                {featured && (
                  <Link to={`/read/${featured.id}`} className="btn-shine-wrap btn-pulse-gold flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:scale-105 border border-gold/40 text-gold hover:bg-gold/10">
                    View Latest Edition
                  </Link>
                )}
              </div>
            </div>

            <div className="animate-fade-up order-first lg:order-last mt-2 lg:mt-0" style={{ animationDelay: "0.2s" }}>
              <BookStack editions={editions} settings={settings} />
            </div>
          </div>
        </section>

        {/* Markets Ticker */}
        <MarketTicker />

        {/* Featured Edition Showcase */}
        {featured && (
          <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-navy/20">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 rounded-full animate-spin-slow" style={{ width: "700px", height: "700px", transform: "translate(-50%, -50%)", background: "conic-gradient(from 0deg, transparent, rgba(212,175,55,0.04), transparent, rgba(212,175,55,0.03), transparent)", filter: "blur(60px)" }} />
              <div className="absolute top-1/2 left-1/2 rounded-full" style={{ width: "900px", height: "900px", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 55%)", filter: "blur(80px)" }} />
            </div>
            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <ScrollReveal className="relative flex justify-center order-2 lg:order-1" direction="scale">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-full animate-pulse-gold" style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(245,166,35,0.25) 0%, rgba(200,134,10,0.1) 30%, transparent 65%)", filter: "blur(60px)" }} />
                </div>
                {featured.cover_image && (
                  <img src={featured.cover_image} alt={featured.title} className="relative w-60 sm:w-72 md:w-80 lg:w-96 aspect-[3/4] object-cover border border-gold/20 animate-fade-up" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 150px rgba(212,175,55,0.2)" }} />
                )}
              </ScrollReveal>
              <ScrollReveal className="order-1 lg:order-2" direction="right">
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-gold text-black px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-bold">Issue {featured.edition_number}</span>
                  <span className="text-gold/50 text-xs tracking-[0.3em] uppercase">Featured Edition</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{featured.title}</h2>
                <div className="w-16 h-1 bg-gold mb-6" />
                <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">{featured.description}</p>
                <Link to={`/read/${featured.id}`} className="btn-shine-wrap inline-flex items-center gap-3 bg-gold text-black px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold hover:bg-gold-light transition-all duration-300 hover:scale-105">
                  <BookOpen size={18} /> Read the Full Edition <ArrowRight size={16} />
                </Link>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* What We Cover */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <ScrollReveal className="max-w-7xl mx-auto" direction="up">
            <SectionLabel>What We Cover</SectionLabel>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">Commerce &amp; Beyond</h2>
            <p className="text-white/40 text-sm text-center max-w-xl mx-auto mb-10 sm:mb-14">
              Covering every facet of the business world — from classroom theory to real-world markets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {topics.map((t, i) => (
                <ScrollReveal key={t.num} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="card-toggle group bg-black/40 border border-gold/8 p-5 sm:p-6 transition-all duration-500 relative h-full">
                    <span className="absolute top-4 right-4 font-heading text-3xl font-bold text-gold/8 group-hover:text-gold/20 transition-colors">{t.num}</span>
                    <div className="icon-toggle w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20">
                      <t.icon className="text-gold" size={20} />
                    </div>
                    <span className="text-gold/40 text-[10px] tracking-[0.25em] uppercase block mb-1">{t.cat}</span>
                    <h3 className="font-heading text-white text-lg font-semibold mb-2">{t.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Voices of Commerce */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <ScrollReveal className="max-w-6xl mx-auto" direction="up">
            <SectionLabel>Wisdom</SectionLabel>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-14">Voices of Commerce</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {voices.map((v, i) => (
                <ScrollReveal key={i} delay={i * 120} direction="scale">
                  <div className="card-toggle bg-black/40 border border-gold/8 p-6 sm:p-8 relative transition-all duration-500 h-full">
                    <Quote className="text-gold/30 mb-4" size={28} />
                    <p className="font-heading text-white/80 text-base sm:text-lg leading-relaxed italic mb-6">{v.quote}</p>
                    <div className="pt-4 border-t border-gold/10">
                      <span className="text-gold font-heading font-semibold block">{v.author}</span>
                      <span className="text-white/30 text-xs">{v.role}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Stats Strip */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-navy/20">
          <ScrollReveal className="max-w-5xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center" direction="scale">
            <div className="card-toggle border border-transparent rounded-lg py-4">
              <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gold"><CountUp end={4} /></div>
              <span className="text-white/40 text-[10px] sm:text-xs tracking-wider uppercase mt-2 block">Editions Published</span>
            </div>
            <div className="card-toggle border border-transparent rounded-lg py-4">
              <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gold"><CountUp end={50} suffix="+" /></div>
              <span className="text-white/40 text-[10px] sm:text-xs tracking-wider uppercase mt-2 block">Student Contributors</span>
            </div>
            <div className="card-toggle border border-transparent rounded-lg py-4">
              <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gold"><CountUp end={8} /></div>
              <span className="text-white/40 text-[10px] sm:text-xs tracking-wider uppercase mt-2 block">Core Topics</span>
            </div>
          </ScrollReveal>
        </section>

        {/* Editions Preview */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <ScrollReveal className="max-w-6xl mx-auto" direction="up">
            <SectionLabel>Editions</SectionLabel>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-12">Recent Editions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {published.slice(0, 3).map((ed, i) => (
                <ScrollReveal key={ed.id} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
                  <EditionCard edition={ed} />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <Footer />
      </div>
    </div>
  );
}