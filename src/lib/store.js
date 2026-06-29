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
};

export const Store = {
  LOGO_URL,
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
    const { data } = await supabase.from("team_members").select("*").order("order", { ascending: true });
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
