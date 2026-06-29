import React, { useState } from "react";
import { Store } from "@/lib/store";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { useTeam } from "@/hooks/useStore";
import { toast } from "sonner";

export default function TeamManager() {
  const team = useTeam();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openCreate = () => {
    setForm({ name: "", role: "", department: "", bio: "", avatar: "", active: true, order: team.length });
    setEditing("new");
  };
  const openEdit = (m) => { setForm({ ...m }); setEditing(m); };
  const close = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === "new") { await Store.createTeamMember(form); toast.success("Team member added!"); }
      else { await Store.updateTeamMember(editing.id, form); toast.success("Team member updated!"); }
      close();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this team member?")) return;
    try {
      await Store.deleteTeamMember(id); toast.success("Team member removed");
    } catch {
      toast.error("Failed to remove team member");
    }
  };

  const toggleActive = async (m) => {
    try {
      await Store.updateTeamMember(m.id, { active: !m.active });
    } catch {
      toast.error("Failed to update member");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-xl text-white font-semibold">Team Manager</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-gold text-black px-4 py-2 text-xs tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors">
          <Plus size={14} /> Add Member
        </button>
      </div>

      <div className="space-y-2">
        {team.map((m) => (
          <div key={m.id} className="flex items-center gap-4 bg-black/30 border border-gold/8 px-4 py-3 hover:border-gold/20 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              {m.avatar ? <img src={m.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : <span className="text-gold text-sm font-heading font-bold">{m.name?.charAt(0)}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-semibold">{m.name}</span>
                <button onClick={() => toggleActive(m)} className={`text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded ${m.active ? "text-emerald-400 bg-emerald-400/10" : "text-white/30 bg-white/5"}`}>
                  {m.active ? "Active" : "Inactive"}
                </button>
              </div>
              <span className="text-gold/50 text-xs">{m.role}</span>
              <p className="text-white/30 text-xs truncate">{m.bio}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(m)} className="text-white/40 hover:text-gold p-1"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(m.id)} className="text-white/40 hover:text-red-400 p-1"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={close}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleSave} className="bg-charcoal border border-gold/15 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading text-lg text-white">{editing === "new" ? "Add Member" : "Edit Member"}</h4>
              <button type="button" onClick={close} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Name</label>
                <input type="text" required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Role</label>
                <input type="text" required value={form.role || ""} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Department</label>
                <input type="text" value={form.department || ""} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Accounts, Marketing..." className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Bio</label>
                <textarea rows={2} value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none resize-none" />
              </div>
              <div>
                <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">Avatar URL</label>
                <input type="url" value={form.avatar || ""} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." className="w-full bg-black/50 border border-gold/15 text-white px-3 py-2 text-sm focus:border-gold/40 focus:outline-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active ?? true} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-gold" />
                <span className="text-white/60 text-sm">Active</span>
              </label>
            </div>
            <button type="submit" className="w-full mt-6 bg-gold text-black py-3 text-sm tracking-wider uppercase font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors">
              <Save size={14} /> {editing === "new" ? "Add" : "Save Changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}