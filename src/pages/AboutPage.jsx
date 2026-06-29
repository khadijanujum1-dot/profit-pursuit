import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import CountUp from "@/components/shared/CountUp";
import { useTeam } from "@/hooks/useStore";
import { TrendingUp, Globe, Lightbulb, Target } from "lucide-react";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

const pillars = [
  { title: "Student Led", desc: "Written, designed, and produced entirely by students" },
  { title: "Business Focus", desc: "Economics, finance, entrepreneurship & markets" },
  { title: "School Wide", desc: "Representing voices from across GEMS Millennium" },
  { title: "Published Online", desc: "Accessible to students, parents, and the community" },
];

const categories = ["Marketing", "Accounting", "Business", "Economics", "Cost & Revenue", "Finance", "Entrepreneurship"];

const features = [
  { icon: TrendingUp, title: "Market Insights", desc: "Expert analysis on stocks, trends, and investment" },
  { icon: Globe, title: "Economic Trends", desc: "Understanding global shifts and their impact" },
  { icon: Lightbulb, title: "Smart Strategies", desc: "Actionable approaches for sustainable growth" },
  { icon: Target, title: "Financial Freedom", desc: "Building wealth through informed decisions" },
];

export default function AboutPage() {
  const team = useTeam();
  const activeTeam = team.filter((t) => t.active);
  const deptOrder = ["Leadership", "Accounts", "Business", "Cost Accounting", "Economics", "Marketing", "Design Editor"];
  const departments = deptOrder.filter((d) => activeTeam.some((t) => t.department === d));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <div className="relative z-10">
      <Navbar mode="public" />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">About Profit Pursuit</h1>
          <div className="w-12 h-1 bg-gold mx-auto mb-6" />
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            A student-driven business and economics magazine championing critical thinking, financial literacy, and the entrepreneurial spirit.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Who We Are */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel className="justify-start">Who We Are</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Inspiring the Next Generation of Business Leaders
            </h2>
            <div className="w-12 h-1 bg-gold mb-8" />
            <p className="text-white/50 leading-relaxed mb-4">
              Profit Pursuit is the official business and economics magazine of GEMS Millennium School, Sharjah. Founded by passionate students, we aim to explore the world of business, economics, and finance through the lens of young minds.
            </p>
            <p className="text-white/50 leading-relaxed">
              Each edition features student articles, market analyses, entrepreneur spotlights, and thought-provoking opinion pieces — all written, designed, and published by students.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="bg-black/40 border border-gold/8 p-6 hover:border-gold/20 transition-all">
                <h4 className="font-heading text-gold text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-white/40 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Strip */}
      <section className="py-16 px-6 bg-navy/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-heading text-2xl md:text-3xl text-white/80 italic leading-relaxed">
            "Our mission is to bridge the gap between classroom learning and the real world of commerce — empowering students to think critically about the economic forces that shape our lives."
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>What We Cover</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-center mb-12">Our Scope</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-black/40 border border-gold/8 p-6 text-center hover:border-gold/20 transition-all">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="text-gold" size={22} />
                </div>
                <h3 className="font-heading text-white text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Banner */}
      <div className="bg-white py-5 overflow-hidden">
        <div className="flex items-center justify-center gap-8 flex-wrap px-6">
          {categories.map((cat) => (
            <span key={cat} className="text-black text-xs tracking-[0.25em] uppercase font-semibold">{cat}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-heading text-4xl md:text-5xl font-bold text-gold"><CountUp end={4} /></div>
            <span className="text-white/40 text-xs tracking-wider uppercase mt-2 block">Editions</span>
          </div>
          <div>
            <div className="font-heading text-4xl md:text-5xl font-bold text-gold"><CountUp end={14} suffix="+" /></div>
            <span className="text-white/40 text-xs tracking-wider uppercase mt-2 block">Team Members</span>
          </div>
          <div>
            <div className="font-heading text-4xl md:text-5xl font-bold text-gold"><CountUp end={1000} suffix="+" /></div>
            <span className="text-white/40 text-xs tracking-wider uppercase mt-2 block">Readers</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>The People Behind It</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-center mb-12">The Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const members = activeTeam.filter((m) => m.department === dept);
              return (
                <div key={dept} className="bg-black/40 border border-gold/8 p-6 hover:border-gold/25 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gold/10">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold text-sm font-heading font-bold">{dept.charAt(0)}</span>
                    </div>
                    <h3 className="font-heading text-gold text-lg font-semibold tracking-wide">{dept}</h3>
                  </div>
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gold text-base font-heading font-bold">{member.name?.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <span className="text-white font-heading font-semibold block">{member.name}</span>
                          {member.bio && <span className="text-white/30 text-xs">{member.bio}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}