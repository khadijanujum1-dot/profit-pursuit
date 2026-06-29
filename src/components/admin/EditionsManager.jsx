import React, { useState } from "react";
import { Store } from "@/lib/store";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { useEditions } from "@/hooks/useStore";
import { toast } from "sonner";
import ImageUpload from "@/components/shared/ImageUpload";

export default function EditionsManager() {
  const editions = useEditions();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openCreate = () => {
    setForm({ edition_number: "", title: "", description: "", cover_image: "", flipbook_url: "", publish_date: "", featured: false, status: "published" });
    setEditing("new");
  };
  const openEdit = (ed) => {
    setForm({ ...ed });
    setEditing(ed);
  };
  const close = () => setEditing(null);

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, edition_number: Number(form.edition_number) };
    if (editing === "new") {
      Store.createEdition(data);
      toast.success("Edition created!");
    } else {
      Store.updateEdition(editing.id, data);
      toast.success("Edition updated!");
    }
    close();
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this edition?")) return;
    Store.deleteEdition(id);
    toast.success("Edition deleted");
  };

  const handleSetFeatured = (id) => {
    Store.setFeatured(id);
    toast.success("Featured edition updated");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-xl text-white font-semibold">Editions Manager</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-gold text-black px-4 py-2 text-xs tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors">
          <Plus size={14} /> Add Edition
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gold/50 text-[10px] tracking-wider uppercase border-b border-gold/10">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Cover</th>
              <th className="py-3 px-2">Title</th>
              <th className="py-3 px-2 hidden lg:table-cell">Flipbook URL</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Featured</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editions.map((ed) => (
              <tr key={ed.id} className="border-b border-gold/5 hover:bg-gold/5">
                <td className="py-3 px-2 text-gold/40 font-mono">{ed.edition_number}</td>
                <td className="py-3 px-2">
                  {ed.cover_image ? (
                    <img src={ed.cover_image} alt="" className="w-10 h-14 object-cover rounded-sm" />
                  ) : (
                    <div className="w-10 h-14 bg-navy rounded-sm" />
                  )}
                </td>
                <td className="py-3 px-2 text-white">{ed.title}</td>
                <td className="py-3 px-2 hidden lg:table-cell text-white/40 text-xs max-w-[200px] truncate">{ed.flipbook_url || "—"}</td>
                <td className="py-3 px-2 text-white/40 text-xs">{ed.publish_date || "—"}</td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleSetFeatured(ed.id)}
                    className={`text-[10px] tracking-wider uppercase px-2 py-1 rounded ${ed.featured ? "bg-gold/20 text-gold" : "bg-white/5 text-white/30 hover:text-gold"}`}
                  >
                    {ed.featured ? "★ Featured" : "Set Featured"}
                  </button>
                </td>
                <td className="py-3 px-2">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(ed)} className="text-white/40 hover:text-gold p-1"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(ed.id)} className="text-white/40 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={close}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleSave} className="bg-charcoal border border-gold/15 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading text-lg text-white">{editing === "new" ? "Create Edition" : "Edit Edition"}</h4>
              <button type="button" onClick={close} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Edition Number</label>
                  <input type="number" required value={form.edition_number || ""} onChange={(e) => setForm({ ...form, edition_number: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
                </div>
                <div>
                  <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Publish Date</label>
                  <input type="date" value={form.publish_date || ""} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Title</label>
                <input type="text" required value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Description</label>
                <textarea rows={2} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none resize-none" />
              </div>
              <ImageUpload
                value={form.cover_image || ""}
                onChange={(url) => setForm({ ...form, cover_image: url })}
                label="Cover Image"
              />
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">FlipBook URL</label>
                <input type="url" value={form.flipbook_url || ""} onChange={(e) => setForm({ ...form, flipbook_url: e.target.value })} placeholder="https://..." className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-gold" />
                  <span className="text-white/60 text-sm">Featured Edition</span>
                </label>
                <select value={form.status || "published"} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-black/50 border border-gold/15 text-white px-3 py-1.5 text-sm focus:border-gold/40 focus:outline-none">
                  <option value="published">Published</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-gold text-black py-3 text-sm tracking-wider uppercase font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors">
              <Save size={14} /> {editing === "new" ? "Create" : "Save Changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}