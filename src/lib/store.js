export const LOGO_URL = "https://cdn.enter.pro/resources/uid_100131742/d2739da0-35e5-4b.png";
const ADMIN_PASSWORD = "profitpursuitgms";
const DATA_VERSION = "3";

const KEYS = {
  editions: "pp_editions",
  messages: "pp_messages",
  team: "pp_team",
  settings: "pp_settings",
  activity: "pp_activity",
  admin_session: "pp_admin_session",
};

const SEED_EDITIONS = [
  {
    id: 1, edition_number: 1, title: "The Genesis",
    description: "The inaugural edition exploring the foundations of business, economics, and the entrepreneurial mindset.",
    cover_image: "https://i.postimg.cc/vmTHL9Xf/Screenshot-2026-06-01-203536.png",
    flipbook_url: "https://online.fliphtml5.com/ikmof/mrlo/",
    publish_date: "2023-09-01", featured: false, status: "published",
  },
  {
    id: 2, edition_number: 2, title: "Markets & Minds",
    description: "Diving deep into market dynamics, consumer psychology, and the forces shaping modern commerce.",
    cover_image: "https://i.postimg.cc/T2LC13MY/image.png",
    flipbook_url: "https://online.fliphtml5.com/wehog/rclq/#p=1",
    publish_date: "2024-01-15", featured: false, status: "published",
  },
  {
    id: 3, edition_number: 3, title: "The Future of Global Trade",
    description: "Exploring the evolving landscape of international commerce, supply chains, and emerging markets.",
    cover_image: "https://i.postimg.cc/7LjJWDsD/Screenshot-2026-06-01-205412.png",
    flipbook_url: "https://flipbook.so/flip/qht7YLNq2lZU6s3YNy3u?new=1",
    publish_date: "2024-06-01", featured: true, status: "published",
  },
  {
    id: 4, edition_number: 4, title: "Coming Soon",
    description: "Our next edition is in the works. Stay tuned for more insights and innovation.",
    cover_image: "", flipbook_url: "",
    publish_date: "", featured: false, status: "coming_soon",
  },
];

const SEED_TEAM = [
  { id: 1, name: "Ms. Pravitha Raju", role: "Teacher in Charge", department: "Leadership", bio: "Guiding the next generation of business leaders.", avatar: "", active: true, order: 0 },
  { id: 2, name: "Mannat", role: "Accounts", department: "Accounts", bio: "Financial analysis and accounting insights.", avatar: "", active: true, order: 1 },
  { id: 3, name: "Namrita", role: "Accounts", department: "Accounts", bio: "Numbers tell the story behind every business.", avatar: "", active: true, order: 2 },
  { id: 4, name: "Kiran", role: "Business", department: "Business", bio: "Exploring business models and strategy.", avatar: "", active: true, order: 3 },
  { id: 5, name: "Sophia", role: "Business", department: "Business", bio: "Uncovering what makes businesses succeed.", avatar: "", active: true, order: 4 },
  { id: 6, name: "Melanie", role: "Cost Accounting", department: "Cost Accounting", bio: "Breaking down cost structures and efficiency.", avatar: "", active: true, order: 5 },
  { id: 7, name: "Joshua", role: "Cost Accounting", department: "Cost Accounting", bio: "Every cost tells a story of decisions made.", avatar: "", active: true, order: 6 },
  { id: 8, name: "Archana", role: "Economics", department: "Economics", bio: "Decoding the forces that move economies.", avatar: "", active: true, order: 7 },
  { id: 9, name: "Hasini", role: "Economics", department: "Economics", bio: "From inflation to GDP — making sense of it all.", avatar: "", active: true, order: 8 },
  { id: 10, name: "Angel", role: "Marketing", department: "Marketing", bio: "The art and science of connecting with audiences.", avatar: "", active: true, order: 9 },
  { id: 11, name: "Hamdan", role: "Marketing", department: "Marketing", bio: "Digital strategy and brand storytelling.", avatar: "", active: true, order: 10 },
  { id: 12, name: "Dania", role: "Design Editor", department: "Design Editor", bio: "Bringing visual excellence to every page.", avatar: "", active: true, order: 11 },
  { id: 13, name: "Khadija", role: "Design Editor", department: "Design Editor", bio: "Creative direction and layout design.", avatar: "", active: true, order: 12 },
  { id: 14, name: "Neha", role: "Design Editor", department: "Design Editor", bio: "Typography and visual storytelling.", avatar: "", active: true, order: 13 },
];

const SEED_SETTINGS = {
  logo_url: LOGO_URL,
  book_cover_mode: "auto",
  book_cover_url: "",
  book_covers: ["", "", "", ""],
  site_title: "Profit Pursuit",
  site_subtitle: "Est. 2023",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const listeners = new Set();
function notify() { listeners.forEach((fn) => fn()); }

function addActivity(action, detail) {
  const log = read(KEYS.activity, []);
  log.unshift({ id: Date.now(), action, detail, timestamp: new Date().toISOString() });
  write(KEYS.activity, log.slice(0, 50));
}

function seedIfEmpty() {
  if (!localStorage.getItem(KEYS.editions)) write(KEYS.editions, SEED_EDITIONS);
  if (!localStorage.getItem(KEYS.messages)) write(KEYS.messages, []);
  if (!localStorage.getItem(KEYS.team)) write(KEYS.team, SEED_TEAM);
  if (!localStorage.getItem(KEYS.settings)) write(KEYS.settings, SEED_SETTINGS);
  if (!localStorage.getItem(KEYS.activity)) write(KEYS.activity, []);
  if (localStorage.getItem("pp_version") !== DATA_VERSION) {
    write(KEYS.team, SEED_TEAM);
    write(KEYS.settings, SEED_SETTINGS);
    localStorage.setItem("pp_version", DATA_VERSION);
  }
}

export const Store = {
  LOGO_URL,
  KEYS,
  seedIfEmpty,
  addActivity,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  getEditions: () => read(KEYS.editions, []),
  getEdition: (id) => read(KEYS.editions, []).find((e) => e.id === id),
  getFeatured: () => read(KEYS.editions, []).find((e) => e.featured) || read(KEYS.editions, []).find((e) => e.status === "published"),
  createEdition: (data) => {
    const eds = read(KEYS.editions, []);
    const id = Math.max(0, ...eds.map((e) => e.id)) + 1;
    const newEd = { ...data, id, created_date: new Date().toISOString() };
    eds.push(newEd); write(KEYS.editions, eds);
    addActivity("Edition Created", `Edition #${id} created`); notify();
    return newEd;
  },
  updateEdition: (id, data) => {
    const eds = read(KEYS.editions, []);
    const idx = eds.findIndex((e) => e.id === id);
    if (idx >= 0) { eds[idx] = { ...eds[idx], ...data }; write(KEYS.editions, eds); addActivity("Edition Updated", `Edition #${id} updated`); notify(); }
  },
  deleteEdition: (id) => {
    write(KEYS.editions, read(KEYS.editions, []).filter((e) => e.id !== id));
    addActivity("Edition Deleted", `Edition #${id} deleted`); notify();
  },
  setFeatured: (id) => {
    const eds = read(KEYS.editions, []).map((e) => ({ ...e, featured: e.id === id }));
    write(KEYS.editions, eds); addActivity("Featured Updated", `Featured edition set to #${id}`); notify();
  },

  getMessages: () => read(KEYS.messages, []),
  createMessage: (data) => {
    const msgs = read(KEYS.messages, []);
    const id = Math.max(0, ...msgs.map((m) => m.id)) + 1;
    const newMsg = { ...data, id, created_date: new Date().toISOString(), read: false };
    msgs.push(newMsg); write(KEYS.messages, msgs);
    addActivity("Message Received", `New message from ${data.name}`); notify();
    return newMsg;
  },
  deleteMessage: (id) => {
    write(KEYS.messages, read(KEYS.messages, []).filter((m) => m.id !== id));
    addActivity("Message Deleted", `Message #${id} deleted`); notify();
  },
  markMessageRead: (id) => {
    const msgs = read(KEYS.messages, []);
    const idx = msgs.findIndex((m) => m.id === id);
    if (idx >= 0) { msgs[idx].read = true; write(KEYS.messages, msgs); notify(); }
  },

  getTeam: () => read(KEYS.team, []),
  createTeamMember: (data) => {
    const team = read(KEYS.team, []);
    const id = Math.max(0, ...team.map((t) => t.id)) + 1;
    const newMember = { ...data, id }; team.push(newMember); write(KEYS.team, team);
    addActivity("Team Member Added", `${data.name} added`); notify();
    return newMember;
  },
  updateTeamMember: (id, data) => {
    const team = read(KEYS.team, []);
    const idx = team.findIndex((t) => t.id === id);
    if (idx >= 0) { team[idx] = { ...team[idx], ...data }; write(KEYS.team, team); notify(); }
  },
  deleteTeamMember: (id) => {
    write(KEYS.team, read(KEYS.team, []).filter((t) => t.id !== id));
    addActivity("Team Member Removed", `Member #${id} removed`); notify();
  },

  getSettings: () => read(KEYS.settings, SEED_SETTINGS),
  updateSettings: (data) => {
    const settings = { ...read(KEYS.settings, SEED_SETTINGS), ...data };
    write(KEYS.settings, settings); addActivity("Settings Updated", "Site settings modified"); notify();
  },

  getActivity: () => read(KEYS.activity, []),

  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      write(KEYS.admin_session, true); addActivity("Admin Login", "Successful login"); notify();
      return { success: true };
    }
    return { success: false, error: "Invalid password" };
  },
  logout: () => {
    localStorage.removeItem(KEYS.admin_session); addActivity("Admin Logout", "Logged out"); notify();
  },
  isAuthed: () => read(KEYS.admin_session, false) === true,
};

if (typeof window !== "undefined") {
  Store.seedIfEmpty();

  // Cross-tab sync: when another tab writes to a known localStorage key,
  // notify local listeners so all hooks re-read and re-render.
  const knownKeys = new Set(Object.values(KEYS));
  window.addEventListener("storage", (e) => {
    if (e.key && knownKeys.has(e.key)) {
      notify();
    }
  });
}