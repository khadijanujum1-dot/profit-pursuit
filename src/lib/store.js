<<<<<<< HEAD
import { supabase } from "@/lib/supabase";

export const LOGO_URL = "https://cdn.enter.pro/resources/uid_100131742/d2739da0-35e5-4b.png";
const ADMIN_PASSWORD = "profitpursuitgms";
const ADMIN_KEY = "pp_admin_session";

const DEFAULT_SETTINGS = {
  logo_url: LOGO_URL,
  book_cover_mode: "auto",
  book_cover_url: "",
  book_covers: ["", "", "", ""],
  site_title: "Profit Pursuit",
  site_subtitle: "Est. 2023",
=======
export const LOGO_URL = "https://cdn.enter.pro/resources/uid_100131742/d2739da0-35e5-4b.png";
const ADMIN_PASSWORD = "profitpursuitgms";

import { supabase } from './supabase';

const listeners = new Set();
function notify() { listeners.forEach((fn) => fn()); }

const cache = {
  editions: null,
  messages: null,
  team: null,
  settings: null,
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
};

export const Store = {
  LOGO_URL,
<<<<<<< HEAD
  addActivity: (action, detail) => {
    supabase.from("activity_log").insert({ action, detail }).then(() => {});
  },

  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, "true");
      return { success: true };
    }
    return { success: false, error: "Invalid password" };
  },
  logout: () => localStorage.removeItem(ADMIN_KEY),
  isAuthed: () => localStorage.getItem(ADMIN_KEY) === "true",

  getEditions: async () => {
    const { data } = await supabase.from("editions").select("*").order("edition_number", { ascending: false });
    return data || [];
  },
  getEdition: async (id) => {
    const { data } = await supabase.from("editions").select("*").eq("id", id).single();
    return data;
  },
  createEdition: async (d) => {
    const { data } = await supabase.from("editions").insert(d).select().single();
    return data;
  },
  updateEdition: async (id, d) => {
    const { data } = await supabase.from("editions").update(d).eq("id", id).select().single();
    return data;
  },
  deleteEdition: async (id) => {
    await supabase.from("editions").delete().eq("id", id);
  },
  setFeatured: async (id) => {
    await supabase.from("editions").update({ featured: false }).neq("id", id);
    await supabase.from("editions").update({ featured: true }).eq("id", id);
  },

  getMessages: async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    return data || [];
  },
  createMessage: async (d) => {
    const { data } = await supabase.from("contact_messages").insert({ ...d, read: false }).select().single();
    return data;
  },
  deleteMessage: async (id) => {
    await supabase.from("contact_messages").delete().eq("id", id);
  },
  markMessageRead: async (id) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
  },

  getTeam: async () => {
    const { data } = await supabase.from("team_members").select("*").order("created_at", { ascending: true });
    return data || [];
  },
  createTeamMember: async (d) => {
    const { data } = await supabase.from("team_members").insert(d).select().single();
    return data;
  },
  updateTeamMember: async (id, d) => {
    await supabase.from("team_members").update(d).eq("id", id);
  },
  deleteTeamMember: async (id) => {
    await supabase.from("team_members").delete().eq("id", id);
  },

  getSettings: async () => {
    const { data } = await supabase.from("site_settings").select("*").limit(1).single();
    return data ? { ...DEFAULT_SETTINGS, ...data } : DEFAULT_SETTINGS;
  },
  updateSettings: async (d) => {
    const { data } = await supabase.from("site_settings").select("id").limit(1).single();
    if (data) {
      await supabase.from("site_settings").update(d).eq("id", data.id);
    } else {
      await supabase.from("site_settings").insert({ ...DEFAULT_SETTINGS, ...d });
    }
  },

  getActivity: async () => {
    const { data } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(50);
    return data || [];
  },
};
=======
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  getEditions: () => cache.editions || [],
  getMessages: () => cache.messages || [],
  getTeam: () => cache.team || [],
  getSettings: () => cache.settings || { logo_url: LOGO_URL, site_title: "Profit Pursuit", site_subtitle: "Est. 2023" },
  getActivity: () => [],

  async loadAll() {
    const [editions, messages, team, settings] = await Promise.all([
      supabase.from('editions').select('*').order('edition_number'),
      supabase.from('messages').select('*').order('created_date', { ascending: false }),
      supabase.from('team').select('*').order('order'),
      supabase.from('settings').select('*'),
    ]);
    cache.editions = editions.data || [];
    cache.messages = messages.data || [];
    cache.team = team.data || [];
    const s = {};
    (settings.data || []).forEach(row => { s[row.key] = row.value; });
    cache.settings = Object.keys(s).length > 0 ? s : { logo_url: LOGO_URL, site_title: "Profit Pursuit", site_subtitle: "Est. 2023" };
    notify();
  },

  async createEdition(data) {
    const { data: newEd } = await supabase.from('editions').insert(data).select().single();
    cache.editions = [...(cache.editions || []), newEd];
    notify(); return newEd;
  },
  async updateEdition(id, data) {
  console.log('ID being used:', id, typeof id);
  const { data: result, error } = await supabase.from('editions').update(data).eq('id', id).select();
  console.log('Rows updated:', result, 'Error:', error);
  cache.editions = (cache.editions || []).map(e => e.id === id ? { ...e, ...data } : e);
  notify();
},
  async deleteEdition(id) {
    await supabase.from('editions').delete().eq('id', id);
    cache.editions = (cache.editions || []).filter(e => e.id !== id);
    notify();
  },
  async setFeatured(id) {
    await supabase.from('editions').update({ featured: false }).neq('id', id);
    await supabase.from('editions').update({ featured: true }).eq('id', id);
    cache.editions = (cache.editions || []).map(e => ({ ...e, featured: e.id === id }));
    notify();
  },

  async createMessage(data) {
    const { data: newMsg } = await supabase.from('messages').insert({ ...data, read: false }).select().single();
    cache.messages = [newMsg, ...(cache.messages || [])];
    notify(); return newMsg;
  },
  async deleteMessage(id) {
    await supabase.from('messages').delete().eq('id', id);
    cache.messages = (cache.messages || []).filter(m => m.id !== id);
    notify();
  },
  async markMessageRead(id) {
    await supabase.from('messages').update({ read: true }).eq('id', id);
    cache.messages = (cache.messages || []).map(m => m.id === id ? { ...m, read: true } : m);
    notify();
  },

  async createTeamMember(data) {
    const { data: newMember } = await supabase.from('team').insert(data).select().single();
    cache.team = [...(cache.team || []), newMember];
    notify(); return newMember;
  },
  async updateTeamMember(id, data) {
    await supabase.from('team').update(data).eq('id', id);
    cache.team = (cache.team || []).map(t => t.id === id ? { ...t, ...data } : t);
    notify();
  },
  async deleteTeamMember(id) {
    await supabase.from('team').delete().eq('id', id);
    cache.team = (cache.team || []).filter(t => t.id !== id);
    notify();
  },

  async updateSettings(data) {
    for (const [key, value] of Object.entries(data)) {
      await supabase.from('settings').upsert({ key, value });
    }
    cache.settings = { ...(cache.settings || {}), ...data };
    notify();
  },

  login(password) {
    if (password === ADMIN_PASSWORD) return { success: true };
    return { success: false, error: "Invalid password" };
  },
  logout() {},
  isAuthed: () => localStorage.getItem('pp_admin_session') === 'true',
};
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
