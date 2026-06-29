import React, { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import { Store } from "@/lib/store";
import { toast } from "sonner";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await Store.createMessage(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <div className="relative z-10">
      <Navbar mode="public" />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">Contact Us</h1>
          <div className="w-12 h-1 bg-gold mx-auto" />
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">We'd love to hear from you</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Whether you're a student wanting to contribute, a parent with a question, or simply a reader — reach out to the Profit Pursuit team.
              </p>
            </div>
            <div className="bg-black/40 border border-gold/8 p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm">School</span>
                  <p className="text-white/50 text-sm mt-1">GEMS Millennium School — Sharjah</p>
                </div>
              </div>
            </div>
            <div className="border-l-2 border-gold/20 pl-5">
              <p className="text-white/50 text-sm italic">"Your story, your insight — we want to read it."</p>
              <span className="text-gold/40 text-xs tracking-[0.15em] uppercase mt-2 block">The Profit Pursuit Team</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle className="text-emerald-400 mb-4" size={40} />
                <h3 className="font-heading text-xl text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="text-gold text-sm tracking-wider uppercase hover:underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gold/60 text-[10px] tracking-[0.2em] uppercase block mb-2">Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-black/40 border border-gold/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-gold/60 text-[10px] tracking-[0.2em] uppercase block mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full bg-black/40 border border-gold/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-gold/60 text-[10px] tracking-[0.2em] uppercase block mb-2">Subject</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" className="w-full bg-black/40 border border-gold/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-gold/60 text-[10px] tracking-[0.2em] uppercase block mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." className="w-full bg-black/40 border border-gold/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending} className="w-full bg-gold text-black py-3.5 text-sm tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-50">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}