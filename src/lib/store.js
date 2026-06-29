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
};

export const Store = {
  LOGO_URL,
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
    await supabase.from('editions').update(data).eq('id', id);
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