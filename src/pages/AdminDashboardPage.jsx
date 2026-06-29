import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import EditionsManager from "@/components/admin/EditionsManager";
import TeamManager from "@/components/admin/TeamManager";
import MessagesInbox from "@/components/admin/MessagesInbox";
import { useEditions, useMessages, useTeam, useSettings, useActivity } from "@/hooks/useStore";
import { Store } from "@/lib/store";
import ImageUpload from "@/components/shared/ImageUpload";
import { BookOpen, Mail, Users, Star, Settings as SettingsIcon, Activity, Zap, Image as ImageIcon, Star as StarIcon } from "lucide-react";
import { toast } from "sonner";
import GoldAuraBackground from "@/components/shared/GoldAuraBackground";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const editions = useEditions();
  const messages = useMessages();
  const team = useTeam();
  const settings = useSettings();
  const activity = useActivity();

  useEffect(() => {
    if (!Store.isAuthed()) navigate("/403");
    window.scrollTo(0, 0);
  }, [navigate]);

  const [section, setSection] = useState("editions");
  const [bookMode, setBookMode] = useState(settings.book_cover_mode || "auto");
  const [bookUrl, setBookUrl] = useState(settings.book_cover_url || "");
  const [bookCovers, setBookCovers] = useState(settings.book_covers || ["", "", "", ""]);
  const [logoUrl, setLogoUrl] = useState(settings.logo_url || "");

  const featured = editions.find((e) => e.featured) || editions.find((e) => e.status === "published");

  const stats = [
    { label: "Editions", value: editions.length, icon: BookOpen },
    { label: "Messages", value: messages.length, icon: Mail },
    { label: "Team Members", value: team.length, icon: Users },
    { label: "Published", value: editions.filter((e) => e.status === "published").length, icon: Star },
  ];

  const sections = [
    { id: "editions", label: "Editions", icon: BookOpen },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "featured", label: "Featured", icon: StarIcon },
    { id: "bookcover", label: "Book Cover", icon: ImageIcon },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: SettingsIcon },
    { id: "activity", label: "Activity Log", icon: Activity },
  ];

  const saveBookCover = async () => {
    try {
      await Store.updateSettings({ book_cover_mode: bookMode, book_cover_url: bookUrl, book_covers: bookCovers });
      toast.success("Book cover settings saved!");
    } catch {
      toast.error("Failed to save book cover settings");
    }
  };

  const saveSettings = async () => {
    try {
      await Store.updateSettings({ logo_url: logoUrl });
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <GoldAuraBackground />
      <div className="relative z-10">
      <Navbar mode="dashboard" />

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-black/40 border border-gold/8 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center">
                <s.icon className="text-gold" size={20} />
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-white">{s.value}</div>
                <span className="text-white/40 text-xs tracking-wider uppercase">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Nav */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-gold/10 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm tracking-wider transition-colors whitespace-nowrap ${section === s.id ? "text-gold border-b-2 border-gold" : "text-white/40 hover:text-gold"}`}
            >
              <s.icon size={14} /> {s.label}
            </button>
          ))}
        </div>

        <div className="bg-black/20 border border-gold/8 rounded-lg p-6">
          {section === "editions" && <EditionsManager />}

          {section === "messages" && <MessagesInbox />}

          {section === "featured" && (
            <div>
              <h3 className="font-heading text-xl text-white font-semibold mb-4">Featured Edition Selector</h3>
              <p className="text-white/40 text-sm mb-6">Select which edition appears as the featured book on the homepage.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {editions.filter((e) => e.status === "published").map((ed) => (
                  <button
                    key={ed.id}
                    onClick={async () => { try { await Store.setFeatured(ed.id); toast.success("Featured edition updated!"); } catch { toast.error("Failed to update featured edition"); } }}
                    className={`text-left p-4 border transition-all ${ed.featured ? "border-gold bg-gold/5" : "border-gold/8 hover:border-gold/30"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {ed.cover_image && <img src={ed.cover_image} alt="" className="w-10 h-14 object-cover" />}
                      <div>
                        <span className="text-gold/40 text-[10px] tracking-wider uppercase">Edition {ed.edition_number}</span>
                        <div className="text-white font-semibold text-sm">{ed.title}</div>
                      </div>
                    </div>
                    {ed.featured && <span className="text-gold text-xs">★ Currently Featured</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === "bookcover" && (
            <div>
              <h3 className="font-heading text-xl text-white font-semibold mb-4">Book Cover Manager</h3>
              <p className="text-white/40 text-sm mb-6">Choose how covers appear on the homepage book stack — 3 books total: 1 front (straight) + 2 behind (tilted left &amp; right).</p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setBookMode("auto")} className={`px-5 py-2.5 text-sm tracking-wider uppercase ${bookMode === "auto" ? "bg-gold text-black font-semibold" : "border border-gold/15 text-white/50"}`}>Auto (Featured)</button>
                  <button onClick={() => setBookMode("same")} className={`px-5 py-2.5 text-sm tracking-wider uppercase ${bookMode === "same" ? "bg-gold text-black font-semibold" : "border border-gold/15 text-white/50"}`}>Same for All</button>
                  <button onClick={() => setBookMode("individual")} className={`px-5 py-2.5 text-sm tracking-wider uppercase ${bookMode === "individual" ? "bg-gold text-black font-semibold" : "border border-gold/15 text-white/50"}`}>Individual</button>
                </div>

                {bookMode === "same" && (
                  <ImageUpload
                    value={bookUrl}
                    onChange={setBookUrl}
                    previewClass="w-12 h-16"
                    label="Cover Image (applied to all 3 books)"
                  />
                )}

                {bookMode === "individual" && (
                  <div className="space-y-4">
                    {["Front Book (straight)", "Back Book — tilted right", "Back Book — tilted left"].map((label, i) => (
                      <ImageUpload
                        key={i}
                        value={bookCovers[i] || (i === 0 ? featured?.cover_image : "") || ""}
                        onChange={(url) => { const next = [...bookCovers]; next[i] = url; setBookCovers(next); }}
                        label={i === 0 ? `${label} (leave empty to use featured cover)` : label}
                      />
                    ))}
                  </div>
                )}

                <button onClick={saveBookCover} className="bg-gold text-black px-6 py-2.5 text-sm tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors">Save</button>
              </div>
            </div>
          )}

          {section === "team" && <TeamManager />}

          {section === "settings" && (
            <div>
              <h3 className="font-heading text-xl text-white font-semibold mb-4">Site Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-2">Logo URL</label>
                  <div className="flex items-center gap-4">
                    <input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="flex-1 bg-black/50 border border-gold/15 text-white px-4 py-2.5 text-sm focus:border-gold/40 focus:outline-none" />
                    {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 object-contain" />}
                  </div>
                </div>
                <button onClick={saveSettings} className="bg-gold text-black px-6 py-2.5 text-sm tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors">Save Settings</button>
              </div>
            </div>
          )}

          {section === "activity" && (
            <div>
              <h3 className="font-heading text-xl text-white font-semibold mb-4">Activity Log</h3>
              {activity.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-8">No activity yet.</p>
              ) : (
                <div className="space-y-1">
                  {activity.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-3 py-2 border-b border-gold/5 text-sm">
                      <Zap size={12} className="text-gold/40 flex-shrink-0" />
                      <span className="text-white/60">{entry.action}</span>
                      <span className="text-white/30 text-xs">— {entry.detail}</span>
                      <span className="text-white/20 text-xs ml-auto">{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}