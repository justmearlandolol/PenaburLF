const SUPABASE_URL = "https://jnuzdskjvdttdyokajgt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudXpkc2tqdmR0dGR5b2thamd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MTY3NjQsImV4cCI6MjEwMjE5Mjc2NH0.6c1GiFeEkG9V47KDcTriQj6AsFaETaShSsOeSD1OERw";

const ALLOWED_DOMAIN = "@bpkpenabur.sch.id";
const PANEL_EMAILS = [
  "christian.1303123@bpkpenabur.sch.id",
  "arlando.1703014@bpkpenabur.sch.id"
];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const SESSION_LOCK_KEY = "panel-lf-session";

const CATEGORY_OPTIONS = [
  "Elektronik",
  "Alat tulis",
  "Buku",
  "Pakaian & aksesori",
  "Kartu / identitas",
  "Perlengkapan olahraga",
  "Lainnya"
];

const ROLE_RANK = { user: 0, staff: 1, moderator: 2, admin: 3, developer: 4 };
const ROLE_LABELS = {
  user: "Siswa / Pengguna",
  staff: "Petugas Pos",
  moderator: "Moderator",
  admin: "Admin",
  developer: "Developer"
};

const STATUS_LABELS = {
  pending: "Belum diperiksa",
  available: "Ada di pos",
  claimed: "Ada yang mengaku",
  archived: "Disimpan",
  rejected: "Tidak ditampilkan",
  under_review: "Sedang diperiksa",
  matched: "Sudah ada pasangan",
  resolved: "Sudah diambil",
  approved: "Disetujui",
  completed: "Sudah diambil",
  suggested: "Saran sistem",
  confirmed: "Sudah dicocokkan",
  dismissed: "Dilewati",
  verified: "Sudah diperiksa",
  terbuka: "Baru",
  ditinjau: "Sedang diperiksa",
  selesai: "Selesai"
};

const ACTION_LABELS = {
  ubah_status: "Ubah status barang",
  tambah_found: "Tambah barang temuan",
  tambah_lost: "Tambah laporan hilang",
  hapus_found: "Hapus barang temuan",
  hapus_lost: "Hapus laporan hilang",
  ubah_foto_found: "Ganti gambar barang",
  ubah_foto_lost: "Ganti gambar laporan",
  hapus_foto_found: "Hapus gambar barang",
  hapus_foto_lost: "Hapus gambar laporan",
  buat_pengumuman: "Buat pengumuman",
  ubah_pengumuman: "Ubah pengumuman",
  hapus_pengumuman: "Hapus pengumuman",
  terbitkan_pengumuman: "Tampilkan pengumuman",
  tarik_pengumuman: "Sembunyikan pengumuman",
  review_klaim: "Periksa klaim",
  serah_terima: "Serah terima barang",
  konfirmasi_pencocokan: "Cocokkan barang",
  abaikan_pencocokan: "Lewati saran",
  ubah_role: "Ubah jabatan pengguna",
  blokir_pengguna: "Blokir akun",
  buka_blokir: "Buka blokir akun",
  kirim_notifikasi: "Kirim pesan"
};

const LEVEL_LABELS = { info: "Biasa", penting: "Penting", urgent: "Sangat penting" };

const TICKET_CATEGORIES = ["Percakapan tidak sopan", "Laporan palsu", "Konten tidak pantas", "Barang berharga", "Lainnya"];
const TICKET_STATUSES = ["terbuka", "ditinjau", "selesai"];

const NAV_ITEMS = [
  { key: "dashboard", label: "Beranda", icon: "home", min: "staff" },
  { key: "lost", label: "Barang Hilang", icon: "search", min: "moderator" },
  { key: "found", label: "Barang Ditemukan", icon: "bag", min: "staff" },
  { key: "matches", label: "Cocokkan Barang", icon: "link", min: "moderator" },
  { key: "claims", label: "Klaim & Pengambilan", icon: "box", min: "staff" },
  { key: "users", label: "Pengguna", icon: "users", min: "admin" },
  { key: "announcements", label: "Pengumuman", icon: "megaphone", min: "admin" },
  { key: "communication", label: "Pesan & Masalah", icon: "mail", min: "moderator" },
  { key: "audit", label: "Catatan Aktivitas", icon: "clipboard", min: "admin" }
];

const SOURCES = [
  { key: "found", table: "found_items", columns: "*", limit: 400 },
  { key: "lost", table: "lost_reports", columns: "*", limit: 400 },
  { key: "claims", table: "claims", columns: "*", limit: 400 },
  { key: "profiles", table: "profiles", columns: "id, full_name, email, avatar_url, role, blocked, blocked_reason, blocked_at, last_seen_at, created_at", limit: 400 },
  { key: "matches", table: "item_matches", columns: "*", limit: 300 },
  { key: "announcements", table: "announcements", columns: "*", limit: 100 },
  { key: "handovers", table: "handover_records", columns: "*", limit: 200 },
  { key: "tickets", table: "moderation_tickets", columns: "*", limit: 200 },
  { key: "notifications", table: "notifications", columns: "*", limit: 200 },
  { key: "history", table: "item_status_history", columns: "*", limit: 400 },
  { key: "audit", table: "audit_logs", columns: "*", limit: 300 }
];

const DEFAULT_FILTERS = {
  found: { search: "", category: "all", status: "all", color: "", image: "all" },
  lost: { search: "", category: "all", status: "all", color: "", image: "all" },
  claims: { search: "", status: "all" },
  users: { search: "", role: "all", status: "all" },
  audit: { search: "", action: "all" },
  communication: { status: "all" },
  matches: { min: "60" }
};

const state = {
  client: null,
  user: null,
  profile: null,
  hasAvatarColumn: true,
  role: "user",
  view: "dashboard",
  hydratingUserId: null,
  loadError: "",
  loginMessage: "",
  loginType: "error",
  uploadingKey: "",
  settingsDraft: { blob: null, previewUrl: "", resetToGoogle: false },
  data: { found: [], lost: [], claims: [], profiles: [], matches: [], announcements: [], handovers: [], tickets: [], notifications: [], history: [], audit: [] },
  maps: { profiles: {}, found: {}, lost: {}, claims: {} },
  filters: JSON.parse(JSON.stringify(DEFAULT_FILTERS)),
  dates: { found: { from: "", to: "" }, lost: { from: "", to: "" } }
};

const elements = {
  loginView: document.getElementById("login-view"),
  panelView: document.getElementById("panel-view"),
  loginMessage: document.getElementById("login-message"),
  googleLogin: document.getElementById("google-login"),
  cookieNoticeButton: document.getElementById("cookie-notice-button"),
  cookieNoticePanel: document.getElementById("cookie-notice-panel"),
  cookieNoticeClose: document.getElementById("cookie-notice-close"),
  setupNotice: document.getElementById("setup-notice"),
  settingsButton: document.getElementById("panel-settings-button"),
  accountName: document.getElementById("panel-account-name"),
  accountEmail: document.getElementById("panel-account-email"),
  accountRole: document.getElementById("panel-account-role"),
  accountAvatarImg: document.getElementById("panel-avatar-img"),
  accountAvatarFallback: document.getElementById("panel-avatar-fallback"),
  nav: document.getElementById("panel-nav"),
  viewHost: document.getElementById("panel-view-host"),
  alert: document.getElementById("panel-alert"),
  main: document.getElementById("panel-main"),
  dialogRoot: document.getElementById("panel-dialog-root")
};

function isConfigured() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("YOUR_") &&
    !SUPABASE_ANON_KEY.includes("YOUR_")
  );
}

let currentLanguage = "id";
try { currentLanguage = localStorage.getItem("language") === "en" ? "en" : "id"; } catch (error) { currentLanguage = "id"; }

function t(key) {
  const dictionary = currentLanguage === "en"
    ? {
        oauth: "Sign in with your school Google account:", close: "Close", cookieBtn: "Cookies notice",
        cookieTitle: "Session notice",
        cookieText: "The admin panel keeps your Supabase sign-in saved in this browser and signs out when the browser is closed.",
        loginHint: "Use the Google account of an admin or developer."
      }
    : {
        oauth: "Masuk dengan akun Google sekolah:", close: "Tutup", cookieBtn: "Pemberitahuan cookie",
        cookieTitle: "Pemberitahuan sesi",
        cookieText: "Panel ini menyimpan sesi login Supabase di browser dan otomatis keluar saat browser ditutup.",
        loginHint: "Gunakan akun Google milik admin atau developer."
      };
  return dictionary[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  const pairs = [
    ["oauth-heading", "textContent", t("oauth")],
    ["login-hint", "textContent", t("loginHint")],
    ["cookie-notice-button", "textContent", t("cookieBtn")],
    ["cookie-notice-close", "textContent", t("close")],
    ["cookie-notice-title", "textContent", t("cookieTitle")],
    ["cookie-notice-text", "textContent", t("cookieText")]
  ];
  pairs.forEach(([id, property, value]) => {
    const element = document.getElementById(id);
    if (element) element[property] = value;
  });
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) languageSelect.value = currentLanguage;
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

const ICONS = {
  home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  bag: '<path d="M6 9.5a6 6 0 0 1 12 0V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/><path d="M9 9.5V7a3 3 0 0 1 6 0v2.5"/><path d="M9.5 14h5"/>',
  link: '<path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3"/>',
  box: '<path d="M12 3.2 4.5 7v10L12 20.8 19.5 17V7z"/><path d="M4.5 7 12 10.8 19.5 7"/><path d="M12 10.8V20.8"/><path d="m9.3 15.4 1.9 1.9 3.5-3.5"/>',
  users: '<path d="M8.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M2.8 20a5.7 5.7 0 0 1 11.4 0"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.9"/><path d="M15.6 14.5A5.7 5.7 0 0 1 21.2 20"/>',
  megaphone: '<path d="M4.5 10.2v3.6a1 1 0 0 0 1 1h1.8l6 4V5.2l-6 4H5.5a1 1 0 0 0-1 1z"/><path d="M17 9.2a3 3 0 0 1 0 5.6"/><path d="M19.4 6.6a6.4 6.4 0 0 1 0 10.8"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4.5 7.5 7.5 5.6 7.5-5.6"/>',
  clipboard: '<path d="M9 4.6H8a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.6a2 2 0 0 0-2-2h-1"/><rect x="9" y="3" width="6" height="3.2" rx="1"/><path d="M9.5 11.6h5"/><path d="M9.5 15.6h3.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11.2v5"/><path d="M12 7.9h.01"/>',
  camera: '<path d="M4 8.6h3l1.5-2h7l1.5 2h3a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.6a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.6" r="3.4"/>',
  image: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.6" cy="10" r="1.6"/><path d="m4 17.2 4.8-4.3 3.9 3.4 2.9-2.4 4.4 3.9"/>',
  swap: '<path d="M4 8.5h13.5l-3-3"/><path d="M20 15.5H6.5l3 3"/>'
};

function icon(name, className) {
  const path = ICONS[name];
  if (!path) return "";
  const classAttribute = className ? ` class="${className}"` : ' class="icon"';
  return `<svg${classAttribute} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
}

function isAllowedEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  const parts = email.split("@");
  return parts.length === 2 && Boolean(parts[0]) && !/\s/.test(parts[0]) && `@${parts[1]}` === ALLOWED_DOMAIN;
}

function normalizeRole(role) {
  const value = String(role || "").toLowerCase();
  return ROLE_LABELS[value] ? value : "user";
}

function atLeast(role, minimum) {
  return ROLE_RANK[normalizeRole(role)] >= ROLE_RANK[minimum];
}

function formatDate(value) {
  if (!value) return "Belum ada tanggal";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum ada tanggal";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta"
  }).format(date);
}

function relativeTime(value) {
  if (!value) return "Belum ada data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum ada data";
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "Hari ini";
  if (days === 1) return "Kemarin";
  if (days < 30) return `${days} hari lalu`;
  if (days < 365) return `${Math.floor(days / 30)} bulan lalu`;
  return `${Math.floor(days / 365)} tahun lalu`;
}

function toLocalInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).format(date).replace(" ", "T");
}

function isSafeImageUrl(value) {
  try {
    const parsed = new URL(value, window.location.href);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch (error) {
    return false;
  }
}

function renderImage(url, alt, className) {
  if (!url || !isSafeImageUrl(url)) return "";
  const classAttribute = className ? ` class="${escapeAttribute(className)}"` : "";
  return `<img${classAttribute} src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" loading="lazy">`;
}

function statusBadge(status) {
  const key = STATUS_LABELS[status] ? status : "pending";
  return `<span class="status-badge status-${escapeAttribute(key)}">${escapeHtml(STATUS_LABELS[key])}</span>`;
}

function roleBadge(role) {
  const key = ROLE_LABELS[role] ? role : "user";
  return `<span class="role-badge role-${escapeAttribute(key)}">${escapeHtml(ROLE_LABELS[key])}</span>`;
}

function categoryOptions(selected) {
  return [`<option value="all"${selected === "all" ? " selected" : ""}>Semua kategori</option>`]
    .concat(CATEGORY_OPTIONS.map((category) => `<option value="${escapeAttribute(category)}"${selected === category ? " selected" : ""}>${escapeHtml(category)}</option>`))
    .join("");
}

function formatSelectOptions(options, selected) {
  return options.map(([value, label]) => `<option value="${escapeAttribute(value)}"${selected === value ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");
}

function friendlyError(error) {
  console.error(error);
  if (error instanceof Error && !error.code && error.message) return error.message;
  const code = error && error.code ? String(error.code) : "";
  const message = String(error && error.message ? error.message : "");
  if (code === "23505") return "Datanya sudah ada, jadi tidak bisa disimpan dua kali.";
  if (code === "42501" || message.toLowerCase().includes("row-level security")) return "Kamu tidak punya izin untuk ini. Cek jabatan akunmu.";
  if (message.toLowerCase().includes("failed to fetch")) return "Tidak bisa menyambung ke internet atau database. Coba lagi ya.";
  if (message) return message;
  return "Ada masalah saat menyimpan. Coba lagi ya.";
}

function setAlert(message, type = "info") {
  if (!message) {
    elements.alert.hidden = true;
    elements.alert.textContent = "";
    elements.alert.className = "panel-alert";
    return;
  }
  elements.alert.hidden = false;
  elements.alert.textContent = message;
  elements.alert.className = `panel-alert alert-${type}`;
  if (typeof elements.alert.scrollIntoView === "function") elements.alert.scrollIntoView({ block: "nearest" });
}

function loadingMarkup(text) {
  return `<div class="loading-state" role="status">${escapeHtml(text)}</div>`;
}

function emptyMarkup(title, description) {
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p></div>`;
}

function helperNote(text) {
  return `<p class="helper-note">${icon("info")}<span>${text}</span></p>`;
}

function armSessionLock() {
  try {
    if (sessionStorage.getItem(SESSION_LOCK_KEY) === "1") return false;
    sessionStorage.setItem(SESSION_LOCK_KEY, "1");
    return true;
  } catch (error) {
    console.warn("Session storage tidak tersedia:", error);
    return false;
  }
}

function showLogin(message, type) {
  if (typeof message === "string") state.loginMessage = message;
  if (type) state.loginType = type;
  elements.loginView.hidden = false;
  elements.panelView.hidden = true;
  renderLoginMessage();
}

function renderLoginMessage() {
  if (!state.loginMessage) {
    elements.loginMessage.hidden = true;
    elements.loginMessage.textContent = "";
    elements.loginMessage.classList.remove("is-success");
    elements.loginMessage.classList.remove("is-info");
    return;
  }
  elements.loginMessage.hidden = false;
  elements.loginMessage.textContent = state.loginMessage;
  elements.loginMessage.classList.toggle("is-success", state.loginType === "success");
  elements.loginMessage.classList.toggle("is-info", state.loginType === "info");
}

function showPanel() {
  elements.loginView.hidden = true;
  elements.panelView.hidden = false;
}

function isSafeAvatarUrl(value) {
  if (!value) return false;
  const trimmed = String(value).trim();
  if (/^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=\s]+$/i.test(trimmed)) return true;
  return isSafeImageUrl(trimmed);
}

function localAvatarKey(userId) {
  return `lf-avatar:${userId}`;
}

function getLocalAvatar(userId) {
  if (!userId) return "";
  try {
    const stored = localStorage.getItem(localAvatarKey(userId)) || "";
    return isSafeAvatarUrl(stored) ? stored : "";
  } catch (error) {
    return "";
  }
}

function setLocalAvatar(userId, value) {
  if (!userId) return;
  try {
    if (value) localStorage.setItem(localAvatarKey(userId), value);
    else localStorage.removeItem(localAvatarKey(userId));
  } catch (error) {}
}

function getGoogleAvatarUrl(user) {
  if (!user) return "";
  const meta = user.user_metadata || {};
  const candidates = [meta.avatar_url, meta.picture];
  const identities = Array.isArray(user.identities) ? user.identities : [];
  identities.forEach((identity) => {
    const data = (identity && identity.identity_data) || {};
    candidates.push(data.avatar_url, data.picture);
  });
  for (const candidate of candidates) {
    if (candidate && isSafeImageUrl(candidate)) return candidate;
  }
  return "";
}

function resolveUserAvatar(user, profile) {
  if (profile && profile.avatar_url && isSafeAvatarUrl(profile.avatar_url)) return profile.avatar_url;
  const cached = user ? getLocalAvatar(user.id) : "";
  if (cached) return cached;
  const meta = (user && user.user_metadata) || {};
  if (meta.custom_avatar_url && isSafeAvatarUrl(meta.custom_avatar_url)) return meta.custom_avatar_url;
  return getGoogleAvatarUrl(user);
}

function getInitials(name, email) {
  const source = String(name || "").trim() || String(email || "").split("@")[0] || "A";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function renderPanelAccountIdentity() {
  if (!state.user || !state.profile) {
    elements.accountName.textContent = "";
    elements.accountEmail.textContent = "";
    elements.accountAvatarImg.removeAttribute("src");
    elements.accountAvatarImg.hidden = true;
    elements.accountAvatarFallback.hidden = false;
    elements.accountAvatarFallback.textContent = "";
    return;
  }
  const email = state.profile.email || state.user.email || "";
  const name = (state.profile.full_name || "").trim() || email.split("@")[0];
  const avatarUrl = resolveUserAvatar(state.user, state.profile);
  const initials = getInitials(name, email);

  elements.accountName.textContent = name;
  elements.accountEmail.textContent = email;
  elements.accountRole.textContent = ROLE_LABELS[state.role];
  elements.accountRole.className = `role-badge role-${state.role}`;
  elements.accountAvatarFallback.textContent = initials;

  if (avatarUrl) {
    elements.accountAvatarImg.src = avatarUrl;
    elements.accountAvatarImg.hidden = false;
    elements.accountAvatarFallback.hidden = true;
  } else {
    elements.accountAvatarImg.removeAttribute("src");
    elements.accountAvatarImg.hidden = true;
    elements.accountAvatarFallback.hidden = false;
  }
}

async function fetchOwnAdminProfile(userId) {
  const attempts = [
    { cols: "id, full_name, email, avatar_url, role, blocked", hasAvatar: true },
    { cols: "id, full_name, email, avatar_url, role", hasAvatar: true },
    { cols: "id, full_name, email, role, blocked", hasAvatar: false },
    { cols: "id, full_name, email, role", hasAvatar: false }
  ];
  let lastResult = null;
  for (const attempt of attempts) {
    const result = await state.client.from("profiles").select(attempt.cols).eq("id", userId).maybeSingle();
    lastResult = result;
    if (!result.error) {
      state.hasAvatarColumn = attempt.hasAvatar;
      return result;
    }
  }
  return lastResult;
}

async function initialize() {
  if (!isConfigured()) {
    showLogin("Konfigurasi Supabase belum lengkap pada file Admin.html.");
    return;
  }
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    elements.setupNotice.hidden = false;
    return;
  }

  state.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  const freshWindow = armSessionLock();

  state.client.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      state.user = null;
      state.profile = null;
      state.role = "user";
      state.hydratingUserId = null;
      renderPanelAccountIdentity();
      closeModal();
      showLogin();
      return;
    }
    if (session && session.user && !state.profile && !state.hydratingUserId) {
      window.setTimeout(() => hydrateUser(session.user), 0);
    }
  });

  state.client.auth.getSession().then(async ({ data, error }) => {
    if (error) {
      console.error("Sesi tidak dapat dipulihkan:", error);
      return;
    }
    const session = data ? data.session : null;
    if (!session || !session.user) return;
    if (freshWindow) {
      await state.client.auth.signOut();
      showLogin("Sesi panel berakhir otomatis karena jendela sebelumnya sudah ditutup. Silakan masuk kembali.", "info");
      return;
    }
    hydrateUser(session.user);
  }).catch((error) => console.error("Sesi tidak dapat dipulihkan:", error));
}

async function hydrateUser(user) {
  if (!user || state.profile || state.hydratingUserId === user.id) return;
  const email = String(user.email || "").trim().toLowerCase();

  if (!isAllowedEmail(email)) {
    await state.client.auth.signOut();
    showLogin("Pakai akun Google BPK PENABUR untuk masuk ke panel admin ya.");
    return;
  }

  state.hydratingUserId = user.id;
  try {
    const { data: profile, error } = await fetchOwnAdminProfile(user.id);

    if (error || !profile) {
      console.error("Profil tidak ditemukan:", error);
      await state.client.auth.signOut();
      showLogin("Profil akun belum ada. Pastikan file sql.txt terbaru sudah dijalankan di Supabase SQL Editor.");
      return;
    }
    if (profile.blocked) {
      await state.client.auth.signOut();
      showLogin("Akun ini sedang diblokir oleh pengelola.");
      return;
    }

    const normalizedRole = normalizeRole(profile.role);
    if (!PANEL_EMAILS.includes(email) && !atLeast(normalizedRole, "staff")) {
      await state.client.auth.signOut();
      showLogin("Akun ini bukan pengelola panel. Pakai akun admin atau developer BPK PENABUR.");
      return;
    }

    const googleAvatar = getGoogleAvatarUrl(user);
    if (state.hasAvatarColumn && !profile.avatar_url && !getLocalAvatar(user.id) && googleAvatar) {
      profile.avatar_url = googleAvatar;
      state.client.from("profiles").update({ avatar_url: googleAvatar }).eq("id", user.id).then(() => {});
    }

    state.user = user;
    state.profile = profile;
    state.role = normalizedRole;
    state.loginMessage = "";
    renderPanelAccountIdentity();

    showPanel();
    await refreshAll();
    renderView();
    if (state.role === "user") setAlert("Jabatan akun pengelola ini belum tercatat di database. Atur role admin di Supabase SQL Editor.", "error");
  } catch (error) {
    console.error("Profil tidak dapat dimuat:", error);
    await state.client.auth.signOut();
    showLogin(friendlyError(error));
  } finally {
    state.hydratingUserId = null;
  }
}

async function handleGoogleLogin() {
  const button = elements.googleLogin;
  if (!state.client) {
    showLogin("Supabase belum tersambung, jadi login Google belum bisa dipakai.");
    return;
  }
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = "Membuka Google…";
  try {
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await state.client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, queryParams: { hd: "bpkpenabur.sch.id", prompt: "select_account" } }
    });
    if (error) throw error;
  } catch (error) {
    console.error("Google OAuth gagal:", error);
    showLogin("Login Google belum berhasil. Pastikan akun Google BPK PENABUR dan penyedia Google di Supabase sudah aktif.");
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
}

async function handleLogout() {
  setAlert("");
  try {
    closeModal();
    await state.client.auth.signOut();
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function refreshAll() {
  const results = await Promise.all(SOURCES.map(async (source) => {
    const primary = await state.client.from(source.table).select(source.columns).order("created_at", { ascending: false }).limit(source.limit);
    if (!primary.error || source.key !== "profiles") return primary;
    const fallbackWithAvatar = await state.client.from("profiles").select("id, full_name, email, avatar_url, role, created_at").order("created_at", { ascending: false }).limit(source.limit);
    if (!fallbackWithAvatar.error) return fallbackWithAvatar;
    return state.client.from("profiles").select("id, full_name, email, role, created_at").order("created_at", { ascending: false }).limit(source.limit);
  }));

  const failed = [];
  results.forEach((result, index) => {
    const source = SOURCES[index];
    if (result.error) {
      failed.push(source.table);
      return;
    }
    state.data[source.key] = result.data || [];
  });

  state.loadError = failed.length
    ? `Sebagian data belum bisa dimuat (${failed.join(", ")}). Jalankan file supabase_admin_panel.sql di Supabase SQL Editor, lalu muat ulang halaman ini.`
    : "";

  state.data.found = await attachSignedImages(state.data.found, "found-items");
  state.data.lost = await attachSignedImages(state.data.lost, "lost-reports");

  state.maps.profiles = Object.fromEntries(state.data.profiles.map((row) => [row.id, row]));
  state.maps.found = Object.fromEntries(state.data.found.map((row) => [row.id, row]));
  state.maps.lost = Object.fromEntries(state.data.lost.map((row) => [row.id, row]));
  state.maps.claims = Object.fromEntries(state.data.claims.map((row) => [row.id, row]));

  if (state.loadError) setAlert(state.loadError, "error");
}

async function attachSignedImages(rows, bucket) {
  return Promise.all((rows || []).map(async (row) => {
    if (!row.image_path) return { ...row, imageUrl: null };
    try {
      const { data, error } = await state.client.storage.from(bucket).createSignedUrl(row.image_path, 3600);
      if (error) return { ...row, imageUrl: null };
      return { ...row, imageUrl: data && data.signedUrl ? data.signedUrl : null };
    } catch (error) {
      return { ...row, imageUrl: null };
    }
  }));
}

async function signedUrl(bucket, path) {
  if (!path) return null;
  const { data, error } = await state.client.storage.from(bucket).createSignedUrl(path, 3600);
  if (error) {
    setAlert(friendlyError(error), "error");
    return null;
  }
  return data && data.signedUrl ? data.signedUrl : null;
}

async function uploadImage(file, bucket) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) throw new Error("File harus JPG, PNG, atau WebP ya.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran gambar maksimal 5 MB ya.");
  const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
  const randomId = window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const path = `${state.user.id}/${Date.now()}-${randomId}.${extension}`;
  const { error } = await state.client.storage.from(bucket).upload(path, file, {
    cacheControl: "3600", contentType: file.type, upsert: false
  });
  if (error) throw error;
  return path;
}

async function removeStoredImage(bucket, path) {
  if (!path) return;
  await state.client.storage.from(bucket).remove([path]).catch(() => null);
}

function availableNav() {
  return NAV_ITEMS.filter((item) => atLeast(state.role, item.min));
}

function renderPanelShell() {
  if (!availableNav().some((item) => item.key === state.view)) state.view = "dashboard";
  elements.nav.innerHTML = availableNav().map((item) => `
    <button class="panel-navlink${state.view === item.key ? " is-active" : ""}" type="button" role="tab"
      aria-selected="${state.view === item.key}" data-action="go-view" data-view="${item.key}">${icon(item.icon)}<span>${escapeHtml(item.label)}</span></button>`).join("");
}

function renderView() {
  elements.setupNotice.hidden = true;
  renderPanelShell();
  const view = VIEWS[state.view] || VIEWS.dashboard;
  elements.viewHost.innerHTML = view.shell();
  renderRegion();
}

function renderRegion() {
  const region = document.getElementById("view-region");
  if (!region) return;
  const view = VIEWS[state.view] || VIEWS.dashboard;
  region.innerHTML = view.region();
}

function filterBar(scope, options) {
  const filter = state.filters[scope];
  const dates = state.dates[scope] || { from: "", to: "" };
  return `
    <div class="panel-filters">
      <div class="filter-control">
        <label for="filter-search">Cari barang</label>
        <input id="filter-search" type="search" autocomplete="off" data-scope="${scope}" data-field="search" data-kind="text"
          placeholder="${escapeAttribute(options.searchHint)}" value="${escapeAttribute(filter.search)}">
      </div>
      <div class="filter-control">
        <label for="filter-category">Kategori</label>
        <select id="filter-category" data-scope="${scope}" data-field="category" data-kind="value">${categoryOptions(filter.category)}</select>
      </div>
      <div class="filter-control">
        <label for="filter-status">Status</label>
        <select id="filter-status" data-scope="${scope}" data-field="status" data-kind="value">
          <option value="all">Semua status</option>${formatSelectOptions(options.statuses, filter.status)}
        </select>
      </div>
      <div class="filter-control">
        <label for="filter-color">Warna</label>
        <input id="filter-color" type="text" autocomplete="off" data-scope="${scope}" data-field="color" data-kind="text"
          placeholder="contoh: hitam" value="${escapeAttribute(filter.color)}">
      </div>
      <div class="filter-control">
        <label for="filter-image">Gambar</label>
        <select id="filter-image" data-scope="${scope}" data-field="image" data-kind="value">
          ${formatSelectOptions([["all", "Semua"], ["with", "Sudah ada gambar"], ["without", "Belum ada gambar"]], filter.image)}
        </select>
      </div>
      <div class="filter-control">
        <label for="filter-from">Tanggal dari</label>
        <input id="filter-from" type="date" data-scope="${scope}" data-field="from" data-kind="date" value="${escapeAttribute(dates.from)}">
      </div>
      <div class="filter-control">
        <label for="filter-to">Sampai tanggal</label>
        <input id="filter-to" type="date" data-scope="${scope}" data-field="to" data-kind="date" value="${escapeAttribute(dates.to)}">
      </div>
      <div class="filter-control" style="align-content:end">
        <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="${scope}">Hapus filter</button>
      </div>
    </div>`;
}

function matchesFilters(row, scope, dateField, locationField) {
  const filter = state.filters[scope];
  const dates = state.dates[scope] || { from: "", to: "" };
  const query = filter.search.trim().toLowerCase();

  if (filter.category && filter.category !== "all" && row.category !== filter.category) return false;
  if (filter.status && filter.status !== "all" && row.status !== filter.status) return false;
  if (filter.color && !String(row.color || "").toLowerCase().includes(filter.color.toLowerCase())) return false;
  if (filter.image === "with" && !row.image_path) return false;
  if (filter.image === "without" && row.image_path) return false;

  const when = new Date(row[dateField] || row.created_at);
  if (dates.from) {
    const from = new Date(`${dates.from}T00:00:00`);
    if (!Number.isNaN(from.getTime()) && when < from) return false;
  }
  if (dates.to) {
    const to = new Date(`${dates.to}T23:59:59`);
    if (!Number.isNaN(to.getTime()) && when > to) return false;
  }

  if (query) {
    const reporter = state.maps.profiles[row.reported_by];
    const haystack = [
      row.name, row.category, row.description, row.distinctive_features, row.additional_info,
      row[locationField], row.color, row.storage_location,
      reporter ? reporter.full_name : "", reporter ? reporter.email : ""
    ].filter(Boolean).join(" ").toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  return true;
}

function reporterLine(row) {
  const reporter = state.maps.profiles[row.reported_by];
  if (!reporter) return "<span><b>Pelapor:</b> akun tidak ditemukan</span>";
  const name = reporter.full_name || reporter.email;
  return `<span><b>Pelapor:</b> ${escapeHtml(name)}</span>`;
}

function imageUploadKey(meta, id) {
  return `${meta}:${id}`;
}

function imageBlock(row, meta) {
  const hasImage = Boolean(row.image_path);
  const busy = state.uploadingKey === imageUploadKey(meta, row.id);
  const label = hasImage ? "Ganti gambar" : "Upload gambar";
  const preview = hasImage
    ? (row.imageUrl ? renderImage(row.imageUrl, `Gambar ${row.name || "barang"}`, "") : `<div class="photo-placeholder">Gambar tidak bisa dibuka</div>`)
    : `<div class="photo-placeholder">${icon("image", "icon-lg")}<span>Belum ada gambar</span></div>`;
  const deleteButton = hasImage
    ? `<button class="button button-danger button-small" type="button" data-action="delete-image" data-id="${escapeAttribute(row.id)}" data-meta="${meta}">Hapus gambar</button>`
    : "";
  return `
    <div class="photo-box">
      <div class="photo-frame${hasImage ? "" : " is-empty"}">${preview}</div>
      <div class="photo-actions">
        <label class="upload-control${busy ? " is-busy" : ""}">
          <input type="file" accept="image/jpeg,image/png,image/webp" data-action="upload-image" data-id="${escapeAttribute(row.id)}" data-meta="${meta}">
          <span class="button button-primary button-small">${busy ? "Mengunggah…" : `${icon("camera")}<span>${escapeHtml(label)}</span>`}</span>
        </label>
        ${deleteButton}
        <p class="photo-hint">Pilih file JPG, PNG, atau WebP. Ukuran maksimal 5 MB.</p>
      </div>
    </div>`;
}

function actionButton(label, action, id, extra = "", style = "button-secondary") {
  return `<button class="button ${style} button-small" type="button" data-action="${action}" data-id="${escapeAttribute(id)}"${extra}>${escapeHtml(label)}</button>`;
}

function matchesForItem(itemId, type) {
  return state.data.matches.filter((row) => (type === "found" ? row.found_item_id === itemId : row.lost_report_id === itemId));
}

function matchSummary(itemId, type) {
  const rows = matchesForItem(itemId, type).filter((row) => row.status === "confirmed");
  if (!rows.length) return "";
  const detail = rows.map((row) => {
    const other = type === "found" ? state.maps.lost[row.lost_report_id] : state.maps.found[row.found_item_id];
    return other ? `“${escapeHtml(other.name || "tanpa nama")}”` : "";
  }).filter(Boolean).join(", ");
  return detail ? `<p class="record-text"><strong>Sudah dicocokkan dengan:</strong> ${detail}</p>` : "";
}

const VIEWS = {};

VIEWS.dashboard = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Panel pengelola</p>
          <h1>Beranda</h1>
          <p>Halo! Di sini kamu bisa lihat barang hilang, barang temuan, dan hal yang harus segera dikerjakan.</p>
        </div>
        <button class="button button-secondary" type="button" data-action="refresh-data">Muat ulang data</button>
      </div>
      <div id="view-region">${VIEWS.dashboard.region()}</div>`;
  },
  region() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lost = state.data.lost;
    const found = state.data.found;
    const claims = state.data.claims;

    const lostThisMonth = lost.filter((row) => new Date(row.lost_at || row.created_at) >= monthStart).length;
    const foundThisMonth = found.filter((row) => new Date(row.found_at || row.created_at) >= monthStart).length;
    const returned = found.filter((row) => row.status === "resolved").length;
    const pool = found.filter((row) => ["available", "claimed", "matched", "resolved", "archived"].includes(row.status)).length;
    const successRate = pool ? Math.round((returned / pool) * 100) : 0;

    const durations = state.data.handovers.map((row) => {
      const item = state.maps.found[row.found_item_id];
      if (!item || !item.created_at) return null;
      const delta = new Date(row.created_at).getTime() - new Date(item.created_at).getTime();
      return delta >= 0 ? delta / 86400000 : null;
    }).filter((value) => value !== null);
    const averageDays = durations.length
      ? Math.round((durations.reduce((sum, value) => sum + value, 0) / durations.length) * 10) / 10
      : null;

    const pendingClaims = claims.filter((row) => row.status === "pending").length;
    const pendingModeration = found.filter((row) => row.status === "pending").length + lost.filter((row) => row.status === "pending").length;
    const blockedUsers = state.data.profiles.filter((row) => row.blocked).length;

    const categoryCounts = {};
    findCategoryCounts(categoryCounts, found);
    findCategoryCounts(categoryCounts, lost);
    const topCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const maxCategory = topCategories.length ? topCategories[0][1] : 0;

    const activity = state.data.audit.slice(0, 6);
    return `
      <div class="stat-grid">
        ${statCard("Barang hilang bulan ini", lostThisMonth, `Semua laporan hilang: ${lost.length}`)}
        ${statCard("Barang ditemukan bulan ini", foundThisMonth, `Semua barang temuan: ${found.length}`)}
        ${statCard("Barang yang sudah diambil", `${successRate}%`, `${returned} barang selesai`)}
        ${statCard("Rata-rata lama disimpan", averageDays === null ? "—" : `${averageDays} hari`, durations.length ? `Dari ${durations.length} serah terima` : "Belum ada serah terima")}
        ${statCard("Klaim menunggu", pendingClaims, "Harus segera diperiksa")}
        ${statCard("Laporan belum diperiksa", pendingModeration, "Menunggu persetujuanmu")}
        ${statCard("Akun diblokir", blockedUsers, `Dari ${state.data.profiles.length} pengguna`)}
        ${statCard("Masalah belum selesai", state.data.tickets.filter((row) => row.status !== "selesai").length, "Dari menu Pesan & Masalah")}
      </div>

      <div class="panel-grid">
        <section class="card">
          <h2>Barang yang paling sering hilang <span>hilang + temuan</span></h2>
          ${topCategories.length ? `<div class="chart">${topCategories.map(([category, count], index) => `
            <div class="chart-row">
              <span class="chart-label">${escapeHtml(category)}</span>
              <span class="chart-track"><span class="chart-fill${index % 2 ? " is-alt" : ""}" style="width:${Math.max(6, Math.round((count / maxCategory) * 100))}%"></span></span>
              <span class="chart-value">${count}</span>
            </div>`).join("")}</div>`
            : emptyMarkup("Belum ada data", "Grafik muncul setelah ada laporan dari pengguna.")}
        </section>

        <section class="card">
          <h2>Yang harus segera dikerjakan</h2>
          <ul class="activity-list">
            ${actionQueue("Laporan belum diperiksa", pendingModeration, "found", "Setujui atau tolak laporan baru.")}
            ${actionQueue("Klaim menunggu bukti", pendingClaims, "claims", "Periksa bukti kepemilikan pemohon.")}
            ${actionQueue("Saran pencocokan baru", unreviewedMatches(), "matches", "Nilai apakah pasangannya benar.")}
            ${actionQueue("Bukti klaim belum dibuka", claimsWithEvidence(), "claims", "Ada berkas bukti dari pemohon.")}
          </ul>
        </section>
      </div>

      <div class="panel-grid">
        <section class="card">
          <h2>Apa yang baru dilakukan pengelola</h2>
          ${activity.length ? `<ul class="activity-list">${activity.map((row) => `
            <li class="activity-item">
              <strong>${escapeHtml(ACTION_LABELS[row.action] || row.action)}</strong>
              <span>${escapeHtml(row.actor_email || "sistem")} · ${escapeHtml(formatDate(row.created_at))}</span>
            </li>`).join("")}</ul>`
            : emptyMarkup("Belum ada aktivitas", "Catatan muncul setelah pengelola melakukan tindakan.")}
        </section>

        <section class="card">
          <h2>Barang terbaru yang masuk</h2>
          ${found.length ? `<ul class="activity-list">${found.slice(0, 6).map((row) => `
            <li class="activity-item">
              <strong>${escapeHtml(row.name || "Tanpa nama")}</strong>
              <span>${escapeHtml(row.category || "Tanpa kategori")} · ${escapeHtml(formatDate(row.created_at))}</span>
            </li>`).join("")}</ul>`
            : emptyMarkup("Belum ada barang temuan", "Barang temuan akan tampil di sini.")}
        </section>
      </div>`;
  }
};

function statCard(label, value, note) {
  return `<article class="stat-card">
    <p class="stat-label">${escapeHtml(label)}</p>
    <p class="stat-value">${escapeHtml(String(value))}</p>
    <p class="stat-note">${escapeHtml(note)}</p>
  </article>`;
}

function actionQueue(label, count, view, note) {
  return `<li class="activity-item">
    <strong>${escapeHtml(label)}: ${count}</strong>
    <span>${escapeHtml(note)} ${count > 0 ? `<button class="text-button" type="button" data-action="go-view" data-view="${view}">Buka</button>` : ""}</span>
  </li>`;
}

function findCategoryCounts(target, rows) {
  rows.forEach((row) => {
    const key = row.category || "Tanpa kategori";
    target[key] = (target[key] || 0) + 1;
  });
}

function unreviewedMatches() {
  return state.data.matches.filter((row) => row.status === "suggested").length;
}

function claimsWithEvidence() {
  return state.data.claims.filter((row) => row.evidence_path && row.status === "pending").length;
}

VIEWS.lost = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Barang hilang</p>
          <h1>Barang Hilang</h1>
          <p>Semua laporan dari siswa yang kehilangan barang. Kamu bisa menyetujui, menolak, mengedit, dan memasang gambar.</p>
        </div>
        <button class="button button-secondary" type="button" data-action="export" data-scope="lost">Unduh daftar (Excel/CSV)</button>
      </div>
      ${helperNote("Tombol <b>Setujui / Tolak</b> untuk memeriksa laporan. Tombol <b>Upload gambar</b> ada di kartu barang.")}
      ${filterBar("lost", {
        searchHint: "Tulis nama barang, warna, lokasi…",
        statuses: [["pending", "Belum diperiksa"], ["under_review", "Sedang diperiksa"], ["matched", "Sudah ada pasangan"], ["resolved", "Sudah diambil"], ["rejected", "Tidak ditampilkan"]]
      })}
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.lost
      .filter((row) => matchesFilters(row, "lost", "lost_at", "last_seen_location"))
      .sort((a, b) => new Date(b.lost_at || b.created_at) - new Date(a.lost_at || a.created_at));

    if (state.loadError) return loadingMarkup("Data belum lengkap. Periksa skema database.");
    if (!rows.length) return emptyMarkup("Belum ada laporan yang cocok", "Coba ubah kata pencarian atau hapus filternya.");
    return `<div class="list-heading"><h2>Daftar laporan kehilangan</h2><span>${rows.length} laporan</span></div>
      <div class="record-list">${rows.map((row) => lostCard(row)).join("")}</div>`;
  }
};

function lostCard(row) {
  const canModerate = atLeast(state.role, "moderator");
  const actions = [];
  if (canModerate) {
    if (row.status === "pending") {
      actions.push(actionButton("Periksa laporan", "lost-status", row.id, ' data-status="under_review"', "button-primary"));
      actions.push(actionButton("Tolak", "lost-status", row.id, ' data-status="rejected"', "button-danger"));
    } else if (row.status === "under_review") {
      actions.push(actionButton("Sudah ada pasangan", "lost-status", row.id, ' data-status="matched"', "button-primary"));
      actions.push(actionButton("Tandai selesai", "lost-status", row.id, ' data-status="resolved"'));
      actions.push(actionButton("Tolak", "lost-status", row.id, ' data-status="rejected"', "button-danger"));
    } else if (row.status === "matched") {
      actions.push(actionButton("Tandai selesai", "lost-status", row.id, ' data-status="resolved"', "button-primary"));
    } else if (row.status === "rejected") {
      actions.push(actionButton("Tampilkan lagi", "lost-status", row.id, ' data-status="under_review"'));
    }
    actions.push(actionButton("Edit laporan", "edit-lost", row.id));
    actions.push(actionButton("Riwayat", "show-history", row.id, ' data-type="lost"'));
  }
  if (atLeast(state.role, "admin")) {
    actions.push(actionButton("Hapus", "delete-record", row.id, ' data-meta="lost"', "button-danger"));
  }

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Laporan tanpa nama")}</h3></div>
      <div class="record-meta">
        <span><b>Kategori:</b> ${escapeHtml(row.category || "belum diisi")}</span>
        <span><b>Terakhir terlihat di:</b> ${escapeHtml(row.last_seen_location || "belum diisi")}</span>
        <span><b>Hilang pada:</b> ${escapeHtml(formatDate(row.lost_at || row.created_at))}</span>
        ${row.color ? `<span><b>Warna:</b> ${escapeHtml(row.color)}</span>` : ""}
        ${reporterLine(row)}
      </div>
      ${imageBlock(row, "lost")}
      ${row.description ? `<p class="record-text"><strong>Ciri-ciri:</strong> ${escapeHtml(row.description)}</p>` : ""}
      ${row.distinctive_features ? `<p class="record-text"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
      ${row.additional_info ? `<p class="record-text"><strong>Info tambahan:</strong> ${escapeHtml(row.additional_info)}</p>` : ""}
      ${matchSummary(row.id, "lost")}
    </div>
    ${actions.length ? `<div class="record-actions">${actions.join("")}</div>` : ""}
  </article>`;
}

VIEWS.found = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Barang temuan</p>
          <h1>Barang Ditemukan</h1>
          <p>Barang yang sudah ditemukan dan sekarang disimpan di pos Lost &amp; Found.</p>
        </div>
        <button class="button button-secondary" type="button" data-action="export" data-scope="found">Unduh daftar (Excel/CSV)</button>
      </div>
      ${helperNote("Setelah barang disetujui, barang otomatis muncul di halaman siswa. Gambar bisa kamu tambah atau ganti kapan saja.")}
      ${filterBar("found", {
        searchHint: "Tulis nama barang, warna, tempat ditemukan…",
        statuses: [["pending", "Belum diperiksa"], ["available", "Ada di pos"], ["claimed", "Ada yang mengaku"], ["matched", "Sudah ada pasangan"], ["resolved", "Sudah diambil"], ["archived", "Disimpan"], ["rejected", "Tidak ditampilkan"]]
      })}
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.found
      .filter((row) => matchesFilters(row, "found", "found_at", "location_found"))
      .sort((a, b) => new Date(b.found_at || b.created_at) - new Date(a.found_at || a.created_at));

    if (state.loadError) return loadingMarkup("Data belum lengkap. Periksa skema database.");
    if (!rows.length) return emptyMarkup("Belum ada barang yang cocok", "Coba ubah kata pencarian atau hapus filternya.");
    return `<div class="list-heading"><h2>Daftar barang temuan</h2><span>${rows.length} barang</span></div>
      <div class="record-list">${rows.map((row) => foundCard(row)).join("")}</div>`;
  }
};

function foundCard(row) {
  const canModerate = atLeast(state.role, "moderator");
  const canHandle = atLeast(state.role, "staff");
  const actions = [];
  if (row.status === "pending" && canModerate) {
    actions.push(actionButton("Setujui & tampilkan", "found-status", row.id, ' data-status="available"', "button-primary"));
    actions.push(actionButton("Tolak", "found-status", row.id, ' data-status="rejected"', "button-danger"));
  } else if (row.status === "available") {
    if (canHandle) actions.push(actionButton("Ada yang mengaku", "found-status", row.id, ' data-status="claimed"', "button-primary"));
    if (canModerate) actions.push(actionButton("Simpan ke gudang", "found-status", row.id, ' data-status="archived"'));
  } else if (row.status === "claimed") {
    if (canHandle) actions.push(actionButton("Sudah diambil", "found-status", row.id, ' data-status="resolved"', "button-primary"));
    if (canModerate) actions.push(actionButton("Simpan ke gudang", "found-status", row.id, ' data-status="archived"'));
  } else if (row.status === "matched") {
    if (canHandle) actions.push(actionButton("Ada yang mengaku", "found-status", row.id, ' data-status="claimed"', "button-primary"));
  } else if (row.status === "rejected") {
    if (canModerate) actions.push(actionButton("Tampilkan", "found-status", row.id, ' data-status="available"'));
  }
  if (canModerate) {
    actions.push(actionButton("Edit barang", "edit-found", row.id));
    actions.push(actionButton("Riwayat", "show-history", row.id, ' data-type="found"'));
  }
  if (atLeast(state.role, "admin")) {
    actions.push(actionButton("Hapus", "delete-record", row.id, ' data-meta="found"', "button-danger"));
  }

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Barang tanpa nama")}</h3></div>
      <div class="record-meta">
        <span><b>Kategori:</b> ${escapeHtml(row.category || "belum diisi")}</span>
        <span><b>Ditemukan di:</b> ${escapeHtml(row.location_found || "belum diisi")}</span>
        <span><b>Ditemukan pada:</b> ${escapeHtml(formatDate(row.found_at || row.created_at))}</span>
        ${row.color ? `<span><b>Warna:</b> ${escapeHtml(row.color)}</span>` : ""}
        ${row.storage_location ? `<span><b>Disimpan di:</b> ${escapeHtml(row.storage_location)}</span>` : ""}
        ${reporterLine(row)}
      </div>
      ${imageBlock(row, "found")}
      ${row.description ? `<p class="record-text"><strong>Deskripsi:</strong> ${escapeHtml(row.description)}</p>` : ""}
      ${row.distinctive_features ? `<p class="record-text"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
      ${matchSummary(row.id, "found")}
    </div>
    ${actions.length ? `<div class="record-actions">${actions.join("")}</div>` : ""}
  </article>`;
}

VIEWS.matches = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Cocokkan barang</p>
          <h1>Cocokkan Barang Hilang &amp; Temuan</h1>
          <p>Sistem menghitung kemiripan nama, kategori, warna, lokasi, dan waktu. Kamu hanya perlu menilai benar atau tidak.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <label class="field" style="min-width:160px">
            <span>Kemiripan minimal</span>
            <select class="inline-select" data-scope="matches" data-field="min" data-kind="value">
              ${formatSelectOptions([["50", "50% ke atas"], ["60", "60% ke atas"], ["70", "70% ke atas"], ["80", "80% ke atas"]], state.filters.matches.min)}
            </select>
          </label>
          <button class="button button-primary" type="button" data-action="run-matching">Cari pasangan otomatis</button>
          <button class="button button-secondary" type="button" data-action="manual-match">Cocokkan sendiri</button>
        </div>
      </div>
      ${helperNote("Klik <b>Cocokkan</b> kalau dua laporan ini memang barang yang sama. Pemiliknya akan dapat pemberitahuan.")}
      <div id="view-region"></div>`;
  },
  region() {
    if (!atLeast(state.role, "moderator")) {
      return emptyMarkup("Belum bisa dibuka", "Menu ini untuk moderator ke atas.");
    }
    const suggestions = computeSuggestions();
    const saved = state.data.matches.slice(0, 40);

    return `
      <h2 class="section-title">Saran dari sistem</h2>
      ${suggestions.length ? `<div class="record-list">${suggestions.map(matchCard).join("")}</div>`
        : emptyMarkup("Belum ada saran baru", "Klik tombol “Cari pasangan otomatis” kalau ada barang hilang dan barang temuan baru.")}

      <h2 class="section-title">Sudah pernah dicocokkan</h2>
      ${saved.length ? `<div class="record-list">${saved.map(savedMatchCard).join("")}</div>`
        : emptyMarkup("Belum ada riwayat pencocokan", "Pasangan yang kamu cocokkan atau lewati akan muncul di sini.")}`;
  }
};

const STOPWORDS = ["yang", "dan", "di", "ke", "dari", "untuk", "dengan", "saya", "ada", "ini", "itu", "warna", "berwarna", "barang", "hilang", "menemukan", "the", "of", "and", "a"];

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.includes(token));
}

function tokenSimilarity(left, right) {
  const a = tokenize(left);
  const b = tokenize(right);
  if (!a.length || !b.length) return 0;
  let hits = 0;
  a.forEach((token) => {
    if (b.some((other) => other === token || other.includes(token) || token.includes(other))) hits += 1;
  });
  return hits / a.length;
}

function differenceInDays(later, earlier) {
  const a = new Date(later);
  const b = new Date(earlier);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  return Math.abs((a.getTime() - b.getTime()) / 86400000);
}

function similarityScore(found, lost) {
  const reasons = [];
  let score = 0;
  let weight = 0;

  const nameScore = Math.max(
    tokenSimilarity(found.name, lost.name),
    tokenSimilarity(`${found.description} ${found.distinctive_features}`, `${lost.description} ${lost.distinctive_features}`)
  );
  score += nameScore * 30;
  weight += 30;
  if (nameScore >= 0.5) reasons.push("nama/deskripsi mirip");

  if (found.category && lost.category) {
    if (found.category === lost.category) {
      score += 20;
      reasons.push("kategori sama");
    }
    weight += 20;
  } else {
    score += 10;
    weight += 20;
  }

  const foundColor = String(found.color || "").toLowerCase();
  const lostColor = String(lost.color || "").toLowerCase();
  if (foundColor && lostColor) {
    if (foundColor === lostColor || foundColor.includes(lostColor) || lostColor.includes(foundColor)) {
      score += 15;
      reasons.push("warna sama");
    }
    weight += 15;
  } else {
    score += 9;
    weight += 15;
  }

  const locationScore = tokenSimilarity(found.location_found, lost.last_seen_location);
  if (found.location_found && lost.last_seen_location) {
    score += locationScore * 20;
    if (locationScore >= 0.5) reasons.push("lokasi berdekatan");
  } else {
    score += 10;
  }
  weight += 20;

  const days = differenceInDays(found.found_at || found.created_at, lost.lost_at || lost.created_at);
  if (days === null) {
    score += 8;
  } else if (days <= 1) {
    score += 15;
    reasons.push("waktunya dekat (1 hari atau kurang)");
  } else if (days <= 3) {
    score += 12;
    reasons.push(`selisih ${Math.round(days)} hari`);
  } else if (days <= 7) {
    score += 8;
    reasons.push(`selisih ${Math.round(days)} hari`);
  } else if (days <= 14) {
    score += 4;
  }

  return { score: Math.round((score / (weight || 1)) * 100), reasons };
}

function computeSuggestions() {
  const minimum = Number(state.filters.matches.min) || 60;
  const savedPairs = new Set(state.data.matches.map((row) => `${row.found_item_id}:${row.lost_report_id}`));
  const results = [];

  state.data.lost.forEach((lost) => {
    if (lost.status === "rejected") return;
    state.data.found.forEach((found) => {
      if (["rejected", "archived", "resolved"].includes(found.status)) return;
      const pair = `${found.id}:${lost.id}`;
      if (savedPairs.has(pair)) return;
      const analysis = similarityScore(found, lost);
      if (analysis.score < minimum) return;
      results.push({ found, lost, score: analysis.score, reasons: analysis.reasons });
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 25);
}

function scoreClass(score) {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
}

function matchCard(entry) {
  const canValidate = atLeast(state.role, "moderator");
  return `<article class="record">
    <div class="record-main">
      <div class="match-pair">
        <div class="match-side">
          <h4>${icon("search")}<span>Yang hilang: ${escapeHtml(entry.lost.name || "Tanpa nama")}</span></h4>
          <p>${escapeHtml(entry.lost.category || "Tanpa kategori")} · ${escapeHtml(entry.lost.last_seen_location || "lokasi belum diisi")} · ${escapeHtml(formatDate(entry.lost.lost_at || entry.lost.created_at))}</p>
        </div>
        <div class="match-arrow">${icon("swap", "icon-lg")}</div>
        <div class="match-side">
          <h4>${icon("bag")}<span>Yang ditemukan: ${escapeHtml(entry.found.name || "Tanpa nama")}</span></h4>
          <p>${escapeHtml(entry.found.category || "Tanpa kategori")} · ${escapeHtml(entry.found.location_found || "lokasi belum diisi")} · ${escapeHtml(formatDate(entry.found.found_at || entry.found.created_at))}</p>
        </div>
      </div>
      <div class="match-reasons">
        <span class="score-badge ${scoreClass(entry.score)}">Mirip ${entry.score}%</span>
        ${entry.reasons.map((reason) => `<span class="reason">${escapeHtml(reason)}</span>`).join("")}
      </div>
    </div>
    ${canValidate ? `<div class="record-actions">
      <button class="button button-primary button-small" type="button" data-action="confirm-suggestion"
        data-found="${escapeAttribute(entry.found.id)}" data-lost="${escapeAttribute(entry.lost.id)}" data-score="${entry.score}">Cocokkan</button>
      <button class="button button-secondary button-small" type="button" data-action="dismiss-suggestion"
        data-found="${escapeAttribute(entry.found.id)}" data-lost="${escapeAttribute(entry.lost.id)}" data-score="${entry.score}">Bukan pasangan</button>
      <button class="button button-quiet button-small" type="button" data-action="go-view" data-view="lost">Lihat laporan hilang</button>
    </div>` : ""}
  </article>`;
}

function savedMatchCard(row) {
  const found = state.maps.found[row.found_item_id];
  const lost = state.maps.lost[row.lost_report_id];
  const canValidate = atLeast(state.role, "moderator");
  const reviewer = state.maps.profiles[row.reviewed_by];
  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(lost ? lost.name : "Laporan hilang")}${icon("swap")}${escapeHtml(found ? found.name : "Barang temuan")}</h3></div>
      <div class="record-meta">
        <span class="score-badge ${scoreClass(row.score)}">Mirip ${row.score}%</span>
        <span>${row.method === "manual" ? "Dicocokkan manual" : "Dari saran sistem"}</span>
        <span>Dibuat ${escapeHtml(formatDate(row.created_at))}</span>
        ${reviewer ? `<span>Diperiksa oleh ${escapeHtml(reviewer.full_name || reviewer.email)}</span>` : ""}
      </div>
    </div>
    ${canValidate && row.status === "suggested" ? `<div class="record-actions">
      <button class="button button-primary button-small" type="button" data-action="confirm-match" data-id="${row.id}">Cocokkan</button>
      <button class="button button-secondary button-small" type="button" data-action="dismiss-match" data-id="${row.id}">Bukan pasangan</button>
    </div>` : ""}
  </article>`;
};

VIEWS.claims = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Klaim &amp; pengambilan</p>
          <h1>Klaim &amp; Pengambilan Barang</h1>
          <p>Di sini kamu memeriksa bukti kepemilikan, lalu mencatat saat barang diserahkan ke pemiliknya.</p>
        </div>
      </div>
      ${helperNote("Langkahnya: periksa bukti → <b>Setujui</b> → <b>Serah terima barang</b> saat barang sudah diambil.")}
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari pemohon atau barang</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="claims" data-field="search" data-kind="text"
            placeholder="Tulis nama, email, atau nama barang…" value="${escapeAttribute(state.filters.claims.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-status">Status klaim</label>
          <select id="filter-status" data-scope="claims" data-field="status" data-kind="value">
            <option value="all">Semua status</option>
            ${formatSelectOptions([["pending", "Menunggu diperiksa"], ["approved", "Sudah disetujui"], ["rejected", "Ditolak"], ["completed", "Sudah diambil"]], state.filters.claims.status)}
          </select>
        </div>
        <div class="filter-control" style="align-content:end">
          <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="claims">Hapus filter</button>
        </div>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    const filter = state.filters.claims;
    const query = filter.search.trim().toLowerCase();
    const rows = state.data.claims.filter((row) => {
      if (filter.status !== "all" && row.status !== filter.status) return false;
      if (!query) return true;
      const claimant = state.maps.profiles[row.claimant_id];
      const item = state.maps.found[row.found_item_id];
      const haystack = [claimant ? claimant.full_name : "", claimant ? claimant.email : "", item ? item.name : "", item ? item.category : "", row.proof_description]
        .filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(query);
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (!rows.length) return emptyMarkup("Belum ada klaim", "Kalau ada siswa yang mengaku pemilik barang, klaimnya muncul di sini.");

    return `<div class="list-heading"><h2>Daftar klaim</h2><span>${rows.length} klaim</span></div>
      <div class="record-list">${rows.map(claimCard).join("")}</div>

      <h2 class="section-title">Riwayat status barang</h2>
      ${state.data.history.length ? `<div class="table-wrap"><table class="data-table">
        <thead><tr><th>Waktu</th><th>Barang</th><th>Perubahan</th><th>Oleh</th></tr></thead>
        <tbody>${state.data.history.slice(0, 20).map((row) => {
          const item = row.item_type === "found" ? state.maps.found[row.item_id] : row.item_type === "lost" ? state.maps.lost[row.item_id] : null;
          const claim = row.item_type === "claim" ? state.maps.claims[row.item_id] : null;
          const claimItem = claim ? state.maps.found[claim.found_item_id] : null;
          const label = item ? item.name : claimItem ? `Klaim · ${claimItem.name}` : "Laporan";
          const actor = state.maps.profiles[row.changed_by];
          return `<tr>
            <td>${escapeHtml(formatDate(row.created_at))}</td>
            <td class="cell-name">${escapeHtml(label || "Laporan")}</td>
            <td>${escapeHtml(STATUS_LABELS[row.previous_status] || row.previous_status || "dibuat")} → ${escapeHtml(STATUS_LABELS[row.new_status] || row.new_status)}</td>
            <td>${escapeHtml(actor ? (actor.full_name || actor.email) : "Sistem")}</td>
          </tr>`;
        }).join("")}</tbody>
      </table></div>` : emptyMarkup("Belum ada riwayat", "Riwayat muncul setelah status barang berubah.")}`;
  }
};

function claimCard(row) {
  const item = state.maps.found[row.found_item_id];
  const claimant = state.maps.profiles[row.claimant_id];
  const reviewer = state.maps.profiles[row.reviewed_by];
  const canVerify = atLeast(state.role, "staff");
  const handover = state.data.handovers.find((entry) => entry.claim_id === row.id);
  const actions = [];

  if (canVerify && row.status === "pending") {
    actions.push(actionButton("Setujui klaim", "claim-approve", row.id, "", "button-primary"));
    actions.push(actionButton("Tolak", "claim-reject", row.id, "", "button-danger"));
  }
  if (canVerify && row.status === "approved") {
    actions.push(actionButton("Serah terima barang", "claim-handover", row.id, "", "button-primary"));
    actions.push(actionButton("Tolak", "claim-reject", row.id, "", "button-danger"));
  }
  if (row.evidence_path) actions.push(actionButton("Lihat bukti", "claim-evidence", row.id));
  if (atLeast(state.role, "admin")) actions.push(actionButton("Hapus klaim", "delete-record", row.id, ' data-meta="claims"', "button-danger"));

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(item ? item.name : "Barang tidak ditemukan")}</h3></div>
      <div class="record-meta">
        <span><b>Yang mengaku:</b> ${escapeHtml(claimant ? (claimant.full_name || claimant.email) : "akun tidak ditemukan")}</span>
        ${claimant ? `<span>${escapeHtml(claimant.email)}</span>` : ""}
        <span><b>Diajukan:</b> ${escapeHtml(formatDate(row.created_at))}</span>
        ${reviewer ? `<span><b>Diperiksa oleh:</b> ${escapeHtml(reviewer.full_name || reviewer.email)}</span>` : ""}
      </div>
      ${row.proof_description ? `<p class="record-proof"><strong>Bukti yang dikirim pemohon:</strong> ${escapeHtml(row.proof_description)}</p>` : ""}
      ${row.review_note ? `<p class="record-text"><strong>Catatan pemeriksaan:</strong> ${escapeHtml(row.review_note)}</p>` : ""}
      ${handover ? `<p class="record-text"><strong>Sudah diambil oleh:</strong> ${escapeHtml(handover.receiver_name)} pada ${escapeHtml(formatDate(handover.created_at))}${handover.signature_path ? " · berita acara terlampir" : ""}</p>` : ""}
      ${item ? `<div class="record-meta"><span><b>Status barang sekarang:</b> ${escapeHtml(STATUS_LABELS[item.status] || item.status)}</span><span><b>Disimpan di:</b> ${escapeHtml(item.storage_location || "belum dicatat")}</span></div>` : ""}
    </div>
    ${actions.length ? `<div class="record-actions">${actions.join("")}</div>` : ""}
  </article>`;
}

VIEWS.users = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Pengguna</p>
          <h1>Daftar Pengguna</h1>
          <p>Atur jabatan petugas, blokir akun yang bikin masalah, dan lihat keaktifan mereka.</p>
        </div>
      </div>
      ${helperNote("Blokir dipakai kalau ada akun yang mengirim laporan palsu. Akun yang diblokir tidak bisa melapor lagi.")}
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari pengguna</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="users" data-field="search" data-kind="text"
            placeholder="Tulis nama atau email…" value="${escapeAttribute(state.filters.users.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-role">Jabatan</label>
          <select id="filter-role" data-scope="users" data-field="role" data-kind="value">
            <option value="all">Semua jabatan</option>
            ${formatSelectOptions(Object.entries(ROLE_LABELS), state.filters.users.role)}
          </select>
        </div>
        <div class="filter-control">
          <label for="filter-status">Kondisi akun</label>
          <select id="filter-status" data-scope="users" data-field="status" data-kind="value">
            <option value="all">Semua kondisi</option>
            ${formatSelectOptions([["active", "Aktif"], ["blocked", "Diblokir"]], state.filters.users.status)}
          </select>
        </div>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    const filter = state.filters.users;
    const query = filter.search.trim().toLowerCase();
    const rows = state.data.profiles.filter((row) => {
      if (filter.role !== "all" && row.role !== filter.role) return false;
      if (filter.status === "active" && row.blocked) return false;
      if (filter.status === "blocked" && !row.blocked) return false;
      if (!query) return true;
      return [row.full_name, row.email].filter(Boolean).join(" ").toLowerCase().includes(query);
    });

    if (!rows.length) return emptyMarkup("Tidak ada pengguna yang cocok", "Coba ubah filternya.");

    const canManage = atLeast(state.role, "admin");
    return `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>Pengguna</th><th>Jabatan</th><th>Kondisi</th><th>Laporan</th><th>Terakhir aktif</th><th></th></tr></thead>
      <tbody>${rows.map((row) => {
        const isSelf = row.id === state.user.id;
        const privileged = PANEL_EMAILS.includes(String(row.email || "").toLowerCase());
        const foundCount = state.data.found.filter((entry) => entry.reported_by === row.id).length;
        const lostCount = state.data.lost.filter((entry) => entry.reported_by === row.id).length;
        const claimCount = state.data.claims.filter((entry) => entry.claimant_id === row.id).length;
        const actions = [];
        if (canManage && !isSelf && !privileged) {
          actions.push(row.blocked
            ? actionButton("Buka blokir", "unblock-user", row.id)
            : actionButton("Blokir", "block-user", row.id, "", "button-danger"));
        }
        if (canManage) actions.push(actionButton("Kirim pesan", "notify-user", row.id));
        actions.push(actionButton("Lihat riwayat", "user-history", row.id));
        const isPenaburAccount = isAllowedEmail(row.email);
        const rowAvatar = row.avatar_url && isSafeAvatarUrl(row.avatar_url) ? row.avatar_url : "";
        const rowInitials = getInitials(row.full_name, row.email);
        return `<tr>
          <td>
            <div class="user-cell">
              <span class="user-cell-avatar">${rowAvatar ? `<img src="${escapeAttribute(rowAvatar)}" alt="" referrerpolicy="no-referrer">` : escapeHtml(rowInitials)}</span>
              <div>
                <span class="cell-name">${escapeHtml(row.full_name || "(tanpa nama)")}${isSelf ? " · kamu" : ""}</span><br>
                <span style="color:var(--muted);font-size:11.5px">${escapeHtml(row.email || "")}</span>
                ${row.blocked && row.blocked_reason ? `<br><span style="color:var(--danger);font-size:11.5px">Alasan diblokir: ${escapeHtml(row.blocked_reason)}</span>` : ""}
              </div>
            </div>
          </td>
          <td>${canManage && !isSelf && !privileged && isPenaburAccount
            ? `<select class="inline-select" data-action="change-role" data-id="${escapeAttribute(row.id)}">
                 ${formatSelectOptions([["user", ROLE_LABELS.user], ["staff", ROLE_LABELS.staff], ["moderator", ROLE_LABELS.moderator]], normalizeRole(row.role))}
               </select>`
            : roleBadge(normalizeRole(row.role))}</td>
          <td>${row.blocked ? statusBadge("blocked") : statusBadge("available")}</td>
          <td>${foundCount + lostCount} laporan · ${claimCount} klaim</td>
          <td>${escapeHtml(relativeTime(row.last_seen_at || row.created_at))}</td>
          <td><div class="cell-actions">${actions.join("")}</div></td>
        </tr>`;
      }).join("")}</tbody>
    </table></div>`;
  }
};

VIEWS.announcements = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Pengumuman</p>
          <h1>Pengumuman untuk Pengguna</h1>
          <p>Tulis pengumuman, lalu tekan Terbitkan supaya langsung muncul di halaman siswa.</p>
        </div>
        <button class="button button-primary" type="button" data-action="new-announcement">Buat pengumuman</button>
      </div>
      ${helperNote("Contoh isi pengumuman: “Barang temuan yang tidak diambil dalam 30 hari akan diserahkan ke sekolah.”")}
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.announcements.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (!rows.length) return emptyMarkup("Belum ada pengumuman", "Tekan tombol “Buat pengumuman” untuk membuat yang pertama.");
    return `<div class="record-list">${rows.map((row) => {
      const author = state.maps.profiles[row.created_by];
      const active = row.is_published && (!row.expires_at || new Date(row.expires_at) > new Date());
      return `<article class="record">
        <div class="record-main">
          <div class="record-title">
            <span class="status-badge ${active ? "status-available" : "status-archived"}">${active ? "Tampil di halaman siswa" : row.is_published ? "Sudah terlalu lama" : "Belum ditampilkan"}</span>
            <h3>${escapeHtml(row.title || "Tanpa judul")}</h3>
            <span class="reason">${escapeHtml(LEVEL_LABELS[row.level] || row.level)}</span>
          </div>
          <div class="record-meta">
            <span>Dibuat ${escapeHtml(formatDate(row.created_at))}</span>
            ${row.expires_at ? `<span>Selesai pada ${escapeHtml(formatDate(row.expires_at))}</span>` : ""}
            ${author ? `<span>Oleh ${escapeHtml(author.full_name || author.email)}</span>` : ""}
          </div>
          ${row.body ? `<p class="record-text">${escapeHtml(row.body)}</p>` : ""}
        </div>
        <div class="record-actions">
          <button class="button ${row.is_published ? "button-secondary" : "button-primary"} button-small" type="button"
            data-action="toggle-announcement" data-id="${escapeAttribute(row.id)}" data-published="${row.is_published ? "false" : "true"}">
            ${row.is_published ? "Sembunyikan" : "Terbitkan"}
          </button>
          <button class="button button-secondary button-small" type="button" data-action="edit-announcement" data-id="${escapeAttribute(row.id)}">Edit</button>
          <button class="button button-danger button-small" type="button" data-action="delete-record" data-id="${escapeAttribute(row.id)}" data-meta="announcements">Hapus</button>
        </div>
      </article>`;
    }).join("")}</div>`;
  }
};

VIEWS.communication = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Pesan &amp; masalah</p>
          <h1>Pesan &amp; Masalah</h1>
          <p>Kirim pesan ke pengguna dan catat masalah yang perlu ditangani.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <button class="button button-primary" type="button" data-action="new-notification">Kirim pesan</button>
          <button class="button button-secondary" type="button" data-action="new-ticket">Catat masalah</button>
        </div>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    const filter = state.filters.communication;
    const tickets = state.data.tickets.filter((row) => filter.status === "all" || row.status === filter.status);
    const notifications = state.data.notifications.slice(0, 12);

    return `
      <section class="card">
        <h2>Masalah yang dicatat</h2>
        <div class="filter-control" style="max-width:280px;margin-bottom:12px">
          <label for="filter-status">Status masalah</label>
          <select id="filter-status" data-scope="communication" data-field="status" data-kind="value">
            <option value="all">Semua status</option>
            ${formatSelectOptions(TICKET_STATUSES.map((value) => [value, STATUS_LABELS[value] || value]), filter.status)}
          </select>
        </div>
        ${tickets.length ? `<div class="record-list">${tickets.map(ticketCard).join("")}</div>`
          : emptyMarkup("Belum ada masalah dicatat", "Pakai tombol “Catat masalah” kalau ada kejadian yang perlu ditindak.")}
      </section>

      <section class="card" style="margin-top:14px">
        <h2>Pesan yang baru dikirim</h2>
        ${notifications.length ? `<div class="table-wrap"><table class="data-table">
          <thead><tr><th>Waktu</th><th>Penerima</th><th>Judul</th><th>Jenis</th></tr></thead>
          <tbody>${notifications.map((row) => {
            const target = state.maps.profiles[row.user_id];
            return `<tr>
              <td>${escapeHtml(formatDate(row.created_at))}</td>
              <td>${escapeHtml(target ? (target.full_name || target.email) : "Pengguna")}</td>
              <td class="cell-name">${escapeHtml(row.title)}</td>
              <td>${escapeHtml(row.kind || "sistem")}</td>
            </tr>`;
          }).join("")}</tbody>
        </table></div>` : emptyMarkup("Belum ada pesan", "Pesan otomatis tercatat saat klaim dan pencocokan diproses.")}
      </section>`;
  }
};

function ticketCard(row) {
  const subject = state.maps.profiles[row.subject_id];
  const opener = state.maps.profiles[row.opened_by];
  const actions = TICKET_STATUSES.filter((status) => status !== row.status)
    .map((status) => actionButton(STATUS_LABELS[status] || status, "ticket-status", row.id, ` data-status="${status}"`));
  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.category || "Masalah")}</h3></div>
      <div class="record-meta">
        <span><b>Pengguna:</b> ${escapeHtml(subject ? (subject.full_name || subject.email) : "tidak diketahui")}</span>
        <span>Dicatat oleh ${escapeHtml(opener ? (opener.full_name || opener.email) : "Sistem")}</span>
        <span>${escapeHtml(formatDate(row.created_at))}</span>
      </div>
      ${row.detail ? `<p class="record-text">${escapeHtml(row.detail)}</p>` : ""}
      ${row.resolution ? `<p class="record-proof"><strong>Tindak lanjut:</strong> ${escapeHtml(row.resolution)}</p>` : ""}
    </div>
    <div class="record-actions">
      ${actions.join("")}
      <button class="button button-secondary button-small" type="button" data-action="ticket-note" data-id="${escapeAttribute(row.id)}">Tulis tindak lanjut</button>
    </div>
  </article>`;
}

VIEWS.audit = {
  shell() {
    const actions = Object.keys(ACTION_LABELS);
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Catatan aktivitas</p>
          <h1>Catatan Aktivitas Pengelola</h1>
          <p>Semua tindakan pengelola tercatat otomatis: siapa yang mengubah status atau menyetujui klaim.</p>
        </div>
        <button class="button button-secondary" type="button" data-action="export" data-scope="audit">Unduh catatan (Excel/CSV)</button>
      </div>
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari aktivitas</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="audit" data-field="search" data-kind="text"
            placeholder="Tulis email atau nama barang…" value="${escapeAttribute(state.filters.audit.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-action">Jenis tindakan</label>
          <select id="filter-action" data-scope="audit" data-field="action" data-kind="value">
            <option value="all">Semua tindakan</option>
            ${formatSelectOptions(actions.map((key) => [key, ACTION_LABELS[key]]), state.filters.audit.action)}
          </select>
        </div>
        <div class="filter-control" style="align-content:end">
          <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="audit">Hapus filter</button>
        </div>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    const filter = state.filters.audit;
    const query = filter.search.trim().toLowerCase();
    const rows = state.data.audit.filter((row) => {
      if (filter.action !== "all" && row.action !== filter.action) return false;
      if (!query) return true;
      return [row.actor_email, row.action, row.entity, describeDetail(row), JSON.stringify(row.detail || {})]
        .filter(Boolean).join(" ").toLowerCase().includes(query);
    }).slice(0, 120);

    if (!rows.length) return emptyMarkup("Belum ada catatan", "Catatan terisi otomatis setelah ada tindakan pengelola.");
    return `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>Waktu</th><th>Pengelola</th><th>Tindakan</th><th>Objek</th><th>Keterangan</th></tr></thead>
      <tbody>${rows.map((row) => `<tr>
        <td>${escapeHtml(formatDate(row.created_at))}</td>
        <td>${escapeHtml(row.actor_email || "sistem")}${row.actor_role ? `<br><span style="color:var(--muted);font-size:11px">${escapeHtml(ROLE_LABELS[row.actor_role] || row.actor_role)}</span>` : ""}</td>
        <td class="cell-name">${escapeHtml(ACTION_LABELS[row.action] || row.action)}</td>
        <td>${escapeHtml(row.entity || "—")}</td>
        <td>${escapeHtml(describeDetail(row))}</td>
      </tr>`).join("")}</tbody>
    </table></div>`;
  }
};

function describeDetail(row) {
  const detail = row.detail || {};
  if (row.action === "ubah_status") return `${STATUS_LABELS[detail.dari] || detail.dari || "—"} → ${STATUS_LABELS[detail.ke] || detail.ke || "—"}`;
  if (detail.judul) return `“${detail.judul}”${typeof detail.terbit === "boolean" ? (detail.terbit ? " · tampil" : " · belum tampil") : ""}`;
  if (detail.role) return `Jabatan baru: ${ROLE_LABELS[detail.role] || detail.role}`;
  if (detail.status) return `Status: ${STATUS_LABELS[detail.status] || detail.status}${detail.catatan ? ` · ${detail.catatan}` : ""}`;
  if (detail.penerima) return `Penerima: ${detail.penerima}`;
  if (detail.skor !== undefined) return `Kemiripan ${detail.skor}%`;
  if (detail.alasan) return `Alasan: ${detail.alasan}`;
  if (detail.nama) return detail.nama;
  return "";
}

async function updateStatus(table, id, status, successMessage) {
  const { error } = await state.client.from(table).update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) {
    setAlert(friendlyError(error), "error");
    return;
  }
  await refreshAll();
  renderView();
  setAlert(successMessage || "Status berhasil diubah.", "success");
}

async function deleteRecord(meta, id) {
  const config = {
    found: { table: "found_items", label: "barang temuan ini" },
    lost: { table: "lost_reports", label: "laporan kehilangan ini" },
    claims: { table: "claims", label: "klaim ini" },
    announcements: { table: "announcements", label: "pengumuman ini" }
  }[meta];
  if (!config) return;

  const approved = await confirmAction({
    title: "Hapus data ini?",
    message: `${config.label} akan dihapus permanen (tidak bisa dikembalikan) dan tercatat di catatan aktivitas.`,
    confirmLabel: "Ya, hapus"
  });
  if (!approved) return;

  try {
    if (meta === "found" || meta === "lost") {
      const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
      const bucket = meta === "found" ? "found-items" : "lost-reports";
      if (source && source.image_path) await removeStoredImage(bucket, source.image_path);
    }
    const { error } = await state.client.from(config.table).delete().eq("id", id);
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert("Data sudah dihapus.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function changeItemImage(meta, id, file) {
  const config = { found: { table: "found_items", bucket: "found-items" }, lost: { table: "lost_reports", bucket: "lost-reports" } }[meta];
  if (!config) return;
  const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
  const key = imageUploadKey(meta, id);
  state.uploadingKey = key;
  renderView();
  try {
    const path = await uploadImage(file, config.bucket);
    const { error } = await state.client.from(config.table).update({ image_path: path, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      await removeStoredImage(config.bucket, path);
      throw error;
    }
    if (source && source.image_path) await removeStoredImage(config.bucket, source.image_path);
    state.uploadingKey = "";
    await refreshAll();
    renderView();
    setAlert("Gambar berhasil diunggah.", "success");
  } catch (error) {
    state.uploadingKey = "";
    renderView();
    setAlert(friendlyError(error), "error");
  }
}

async function deleteItemImage(meta, id) {
  const config = { found: { table: "found_items", bucket: "found-items" }, lost: { table: "lost_reports", bucket: "lost-reports" } }[meta];
  if (!config) return;
  const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
  const approved = await confirmAction({
    title: "Hapus gambar ini?",
    message: "Gambarnya akan dihapus, tapi data laporannya tetap ada. Tindakan ini tercatat di catatan aktivitas.",
    confirmLabel: "Ya, hapus gambar"
  });
  if (!approved) return;

  try {
    const { error } = await state.client.from(config.table).update({ image_path: null, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw error;
    if (source && source.image_path) await removeStoredImage(config.bucket, source.image_path);
    await refreshAll();
    renderView();
    setAlert("Gambar sudah dihapus.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function runMatching() {
  const suggestions = computeSuggestions();
  if (!suggestions.length) {
    setAlert("Belum ada pasangan baru yang mirip saat ini. Coba turunkan kemiripan minimal jadi 50%.", "info");
    return;
  }
  try {
    await Promise.all(suggestions.map((entry) =>
      state.client.rpc("panel_save_match", {
        p_found_item_id: entry.found.id,
        p_lost_report_id: entry.lost.id,
        p_score: entry.score,
        p_method: "auto"
      })
    ));
    await refreshAll();
    renderView();
    setAlert(`${suggestions.length} saran pencocokan sudah disimpan. Tinggal kamu nilai benar atau tidak.`, "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function confirmSuggestion(foundId, lostId, score) {
  try {
    const { data, error } = await state.client.rpc("panel_save_match", {
      p_found_item_id: foundId,
      p_lost_report_id: lostId,
      p_score: Number(score) || 0,
      p_method: "auto"
    });
    if (error) throw error;
    const { error: confirmError } = await state.client.rpc("panel_confirm_match", { p_match_id: data, p_note: null });
    if (confirmError) throw confirmError;
    await refreshAll();
    renderView();
    setAlert("Barang sudah dicocokkan. Pemiliknya menerima pemberitahuan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function dismissSuggestion(foundId, lostId, score) {
  try {
    const { data, error } = await state.client.rpc("panel_save_match", {
      p_found_item_id: foundId,
      p_lost_report_id: lostId,
      p_score: Number(score) || 0,
      p_method: "auto"
    });
    if (error) throw error;
    const { error: dismissError } = await state.client.rpc("panel_dismiss_match", { p_match_id: data });
    if (dismissError) throw dismissError;
    await refreshAll();
    renderView();
    setAlert("Saran dilewati, jadi tidak muncul lagi.", "info");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function reviewMatch(matchId, decision) {
  try {
    const rpcName = decision === "confirm" ? "panel_confirm_match" : "panel_dismiss_match";
    const args = decision === "confirm" ? { p_match_id: Number(matchId), p_note: null } : { p_match_id: Number(matchId) };
    const { error } = await state.client.rpc(rpcName, args);
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert(decision === "confirm" ? "Barang sudah dicocokkan." : "Saran sudah dilewati.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function reviewClaim(claimId, status, note) {
  try {
    const { error } = await state.client.rpc("panel_review_claim", {
      p_claim_id: claimId,
      p_status: status,
      p_note: note || null
    });
    if (error) throw error;
    await refreshAll();
    renderView();
    const messages = {
      approved: "Klaim disetujui. Barang ditandai “ada yang mengaku” dan pemohon menerima pemberitahuan.",
      rejected: "Klaim ditolak. Barang kembali berstatus “ada di pos”.",
      completed: "Barang ditandai sudah diambil."
    };
    setAlert(messages[status] || "Klaim sudah diperbarui.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function recordHandover(claimId, receiverName, note, signatureFile) {
  try {
    let signaturePath = null;
    if (signatureFile) signaturePath = await uploadImage(signatureFile, "handover");
    const { error } = await state.client.rpc("panel_record_handover", {
      p_claim_id: claimId,
      p_receiver_name: receiverName,
      p_signature_path: signaturePath,
      p_note: note || null
    });
    if (error) {
      if (signaturePath) await removeStoredImage("handover", signaturePath);
      throw error;
    }
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Serah terima tercatat. Barang ditandai sudah diambil.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

function openModal(innerHtml, options = {}) {
  elements.dialogRoot.innerHTML = `
    <div class="panel-dialog" data-action="modal-backdrop">
      <section class="panel-modal${options.narrow ? " is-narrow" : ""}" role="dialog" aria-modal="true" aria-label="${escapeAttribute(options.title || "Dialog")}">
        ${innerHtml}
      </section>
    </div>`;
  const focusTarget = elements.dialogRoot.querySelector("input, select, textarea, button");
  if (focusTarget) focusTarget.focus();
}

function closeModal() {
  elements.dialogRoot.innerHTML = "";
}

function modalHeader(title, description) {
  return `<div class="panel-modal-header">
    <div>
      <h2>${escapeHtml(title)}</h2>
      ${description ? `<p>${escapeHtml(description)}</p>` : ""}
    </div>
    <button class="icon-button" type="button" aria-label="Tutup" data-action="close-modal">×</button>
  </div>`;
}

function confirmAction({ title, message, confirmLabel = "Lanjutkan", danger = true }) {
  return new Promise((resolve) => {
    openModal(`
      ${modalHeader(title)}
      <div class="panel-modal-content">
        <p class="notice">${escapeHtml(message)}</p>
        <div class="form-actions" style="border:0;margin:0;padding:0">
          <button class="button ${danger ? "button-danger" : "button-primary"}" type="button" data-confirm="true">${escapeHtml(confirmLabel)}</button>
          <button class="button button-secondary" type="button" data-confirm="false">Batal</button>
        </div>
      </div>`, { narrow: true, title });

    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      closeModal();
      resolve(value);
    };
    elements.dialogRoot.querySelectorAll("[data-confirm]").forEach((button) => {
      button.addEventListener("click", () => finish(button.dataset.confirm === "true"), { once: true });
    });
    const backdrop = elements.dialogRoot.querySelector("[data-action='modal-backdrop']");
    if (backdrop) {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) finish(false);
      });
    }
  });
}

function promptModal({ title, message, field, required = true, confirmLabel = "Simpan", danger = true }) {
  return new Promise((resolve) => {
    openModal(`
      ${modalHeader(title)}
      <div class="panel-modal-content">
        <p class="notice">${escapeHtml(message)}</p>
        <form id="panel-prompt">
          <label class="field" for="prompt-value"><span>${escapeHtml(field)}</span>
            <input id="prompt-value" name="value" type="text" maxlength="400"${required ? " required" : ""}></label>
          <div class="form-actions">
            <button class="button ${danger ? "button-danger" : "button-primary"}" type="submit">${escapeHtml(confirmLabel)}</button>
            <button class="button button-secondary" type="button" data-prompt-cancel="true">Batal</button>
          </div>
        </form>
      </div>`, { narrow: true, title });

    const form = document.getElementById("panel-prompt");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = String(new FormData(form).get("value") || "").trim();
      closeModal();
      resolve(value);
    });
    const cancel = elements.dialogRoot.querySelector("[data-prompt-cancel]");
    if (cancel) cancel.addEventListener("click", () => {
      closeModal();
      resolve(null);
    }, { once: true });
  });
}

function imageField(label, hint) {
  return `<label class="field field-full" for="edit-image"><span>${escapeHtml(label)} <span class="field-hint">(opsional)</span></span>
    <input id="edit-image" name="image" type="file" accept="image/jpeg,image/png,image/webp">
    <span class="field-hint">${escapeHtml(hint)}</span></label>`;
}

function openFoundEditor(id) {
  const item = state.maps.found[id];
  if (!item) return;
  const currentImage = item.imageUrl
    ? `<div class="photo-frame">${renderImage(item.imageUrl, "Gambar barang", "")}</div>`
    : `<div class="photo-frame is-empty"><div class="photo-placeholder">Belum ada gambar</div></div>`;
  openModal(`
    ${modalHeader("Edit barang temuan", "Ubah data barang yang tampil di halaman siswa.")}
    <div class="panel-modal-content">
      <form id="panel-edit-found" data-id="${escapeAttribute(item.id)}">
        <div class="form-grid">
          <label class="field" for="edit-name"><span>Nama barang</span>
            <input id="edit-name" name="name" type="text" required minlength="2" maxlength="120" value="${escapeAttribute(item.name || "")}"></label>
          <label class="field" for="edit-category"><span>Kategori</span>
            <select id="edit-category" name="category" required>
              <option value="" disabled${!item.category ? " selected" : ""}>Pilih kategori</option>
              ${CATEGORY_OPTIONS.map((category) => `<option value="${escapeAttribute(category)}"${item.category === category ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}
            </select></label>
          <label class="field field-full" for="edit-description"><span>Deskripsi</span>
            <textarea id="edit-description" name="description" required minlength="5" maxlength="2000">${escapeHtml(item.description || "")}</textarea></label>
          <label class="field field-full" for="edit-features"><span>Ciri khusus</span>
            <textarea id="edit-features" name="distinctive_features" maxlength="1500">${escapeHtml(item.distinctive_features || "")}</textarea></label>
          <label class="field" for="edit-location"><span>Ditemukan di</span>
            <input id="edit-location" name="location_found" type="text" maxlength="180" required value="${escapeAttribute(item.location_found || "")}"></label>
          <label class="field" for="edit-storage"><span>Disimpan di</span>
            <input id="edit-storage" name="storage_location" type="text" maxlength="180" value="${escapeAttribute(item.storage_location || "")}"></label>
          <label class="field" for="edit-color"><span>Warna dominan</span>
            <input id="edit-color" name="color" type="text" maxlength="40" value="${escapeAttribute(item.color || "")}"></label>
          <label class="field" for="edit-date"><span>Tanggal ditemukan</span>
            <input id="edit-date" name="found_at" type="datetime-local" required value="${escapeAttribute(toLocalInput(item.found_at))}"></label>
          <label class="field field-full" for="edit-additional"><span>Info tambahan</span>
            <textarea id="edit-additional" name="additional_info" maxlength="1500">${escapeHtml(item.additional_info || "")}</textarea></label>
          <label class="field" for="edit-status"><span>Status</span>
            <select id="edit-status" name="status">
              ${formatSelectOptions([["pending", "Belum diperiksa"], ["available", "Ada di pos"], ["claimed", "Ada yang mengaku"], ["matched", "Sudah ada pasangan"], ["resolved", "Sudah diambil"], ["archived", "Disimpan"], ["rejected", "Tidak ditampilkan"]], item.status)}
            </select></label>
          ${imageField("Ganti gambar", "Pilih file JPG, PNG, atau WebP. Maksimal 5 MB.")}
        </div>
        <div class="notice" style="margin:12px 0 0">${currentImage}<p class="photo-hint">Gambar yang sekarang dipakai.</p></div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan perubahan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitFoundEditor(form) {
  const id = form.dataset.id;
  const item = state.maps.found[id];
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  const data = new FormData(form);
  const imageFile = data.get("image");
  const photo = imageFile && imageFile.size > 0 ? imageFile : null;

  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const payload = {
      name: String(data.get("name") || "").trim(),
      category: String(data.get("category") || "").trim(),
      description: String(data.get("description") || "").trim(),
      distinctive_features: String(data.get("distinctive_features") || "").trim() || null,
      additional_info: String(data.get("additional_info") || "").trim() || null,
      location_found: String(data.get("location_found") || "").trim(),
      storage_location: String(data.get("storage_location") || "").trim() || null,
      color: String(data.get("color") || "").trim() || null,
      found_at: new Date(String(data.get("found_at"))).toISOString(),
      status: String(data.get("status") || "pending"),
      updated_at: new Date().toISOString()
    };
    let newPath = null;
    if (photo) {
      newPath = await uploadImage(photo, "found-items");
      payload.image_path = newPath;
    }
    const { error } = await state.client.from("found_items").update(payload).eq("id", id);
    if (error) {
      if (newPath) await removeStoredImage("found-items", newPath);
      throw error;
    }
    if (newPath && item && item.image_path) await removeStoredImage("found-items", item.image_path);
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Perubahan barang temuan sudah disimpan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openLostEditor(id) {
  const item = state.maps.lost[id];
  if (!item) return;
  const currentImage = item.imageUrl
    ? `<div class="photo-frame">${renderImage(item.imageUrl, "Gambar barang", "")}</div>`
    : `<div class="photo-frame is-empty"><div class="photo-placeholder">Belum ada gambar</div></div>`;
  openModal(`
    ${modalHeader("Edit laporan kehilangan", "Ubah data laporan milik siswa.")}
    <div class="panel-modal-content">
      <form id="panel-edit-lost" data-id="${escapeAttribute(item.id)}">
        <div class="form-grid">
          <label class="field" for="edit-name"><span>Nama barang</span>
            <input id="edit-name" name="name" type="text" required minlength="2" maxlength="120" value="${escapeAttribute(item.name || "")}"></label>
          <label class="field" for="edit-category"><span>Kategori</span>
            <select id="edit-category" name="category" required>
              <option value="" disabled${!item.category ? " selected" : ""}>Pilih kategori</option>
              ${CATEGORY_OPTIONS.map((category) => `<option value="${escapeAttribute(category)}"${item.category === category ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}
            </select></label>
          <label class="field field-full" for="edit-description"><span>Ciri-ciri</span>
            <textarea id="edit-description" name="description" required minlength="5" maxlength="2000">${escapeHtml(item.description || "")}</textarea></label>
          <label class="field field-full" for="edit-features"><span>Ciri khusus</span>
            <textarea id="edit-features" name="distinctive_features" maxlength="1500">${escapeHtml(item.distinctive_features || "")}</textarea></label>
          <label class="field" for="edit-location"><span>Terakhir terlihat di</span>
            <input id="edit-location" name="last_seen_location" type="text" maxlength="180" required value="${escapeAttribute(item.last_seen_location || "")}"></label>
          <label class="field" for="edit-color"><span>Warna dominan</span>
            <input id="edit-color" name="color" type="text" maxlength="40" value="${escapeAttribute(item.color || "")}"></label>
          <label class="field" for="edit-date"><span>Tanggal hilang</span>
            <input id="edit-date" name="lost_at" type="datetime-local" required value="${escapeAttribute(toLocalInput(item.lost_at))}"></label>
          <label class="field" for="edit-status"><span>Status</span>
            <select id="edit-status" name="status">
              ${formatSelectOptions([["pending", "Belum diperiksa"], ["under_review", "Sedang diperiksa"], ["matched", "Sudah ada pasangan"], ["resolved", "Sudah diambil"], ["rejected", "Tidak ditampilkan"]], item.status)}
            </select></label>
          <label class="field field-full" for="edit-additional"><span>Info tambahan</span>
            <textarea id="edit-additional" name="additional_info" maxlength="1500">${escapeHtml(item.additional_info || "")}</textarea></label>
          ${imageField("Pasang gambar", "Pilih file JPG, PNG, atau WebP. Maksimal 5 MB.")}
        </div>
        <div class="notice" style="margin:12px 0 0">${currentImage}<p class="photo-hint">Gambar yang sekarang dipakai.</p></div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan perubahan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitLostEditor(form) {
  const id = form.dataset.id;
  const item = state.maps.lost[id];
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  const data = new FormData(form);
  const imageFile = data.get("image");
  const photo = imageFile && imageFile.size > 0 ? imageFile : null;

  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const payload = {
      name: String(data.get("name") || "").trim(),
      category: String(data.get("category") || "").trim(),
      description: String(data.get("description") || "").trim(),
      distinctive_features: String(data.get("distinctive_features") || "").trim() || null,
      additional_info: String(data.get("additional_info") || "").trim() || null,
      last_seen_location: String(data.get("last_seen_location") || "").trim(),
      color: String(data.get("color") || "").trim() || null,
      lost_at: new Date(String(data.get("lost_at"))).toISOString(),
      status: String(data.get("status") || "pending"),
      updated_at: new Date().toISOString()
    };
    let newPath = null;
    if (photo) {
      newPath = await uploadImage(photo, "lost-reports");
      payload.image_path = newPath;
    }
    const { error } = await state.client.from("lost_reports").update(payload).eq("id", id);
    if (error) {
      if (newPath) await removeStoredImage("lost-reports", newPath);
      throw error;
    }
    if (newPath && item && item.image_path) await removeStoredImage("lost-reports", item.image_path);
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Perubahan laporan kehilangan sudah disimpan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openAnnouncementForm(id) {
  const row = id ? state.data.announcements.find((entry) => entry.id === id) : null;
  const expires = row && row.expires_at ? String(row.expires_at).slice(0, 10) : "";
  openModal(`
    ${modalHeader(row ? "Edit pengumuman" : "Buat pengumuman", "Pengumuman langsung muncul di halaman siswa setelah diterbitkan.")}
    <div class="panel-modal-content">
      <form id="panel-announcement" data-id="${escapeAttribute(row ? row.id : "")}">
        <div class="form-grid">
          <label class="field field-full" for="ann-title"><span>Judul pengumuman</span>
            <input id="ann-title" name="title" type="text" required maxlength="140" value="${escapeAttribute(row ? row.title : "")}" placeholder="Contoh: Barang temuan diambil paling lambat 30 hari"></label>
          <label class="field" for="ann-level"><span>Seberapa penting?</span>
            <select id="ann-level" name="level">
              ${formatSelectOptions([["info", "Biasa"], ["penting", "Penting"], ["urgent", "Sangat penting"]], row ? row.level : "info")}
            </select></label>
          <label class="field" for="ann-expires"><span>Selesai tanggal <span class="field-hint">(boleh dikosongkan)</span></span>
            <input id="ann-expires" name="expires_at" type="date" value="${escapeAttribute(expires)}"></label>
          <label class="field field-full" for="ann-body"><span>Isi pengumuman</span>
            <textarea id="ann-body" name="body" required maxlength="2000" placeholder="Tulis dengan kalimat singkat dan jelas.">${escapeHtml(row ? row.body : "")}</textarea></label>
          <label class="field field-full" for="ann-publish"><span>Mau langsung ditampilkan?</span>
            <select id="ann-publish" name="is_published">
              ${formatSelectOptions([["false", "Simpan dulu (belum tampil)"], ["true", "Tampilkan sekarang"]], row && row.is_published ? "true" : "false")}
            </select></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">${row ? "Simpan perubahan" : "Simpan pengumuman"}</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitAnnouncement(form) {
  const id = form.dataset.id;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  const data = new FormData(form);
  const publish = String(data.get("is_published")) === "true";
  const expiresAt = String(data.get("expires_at") || "").trim();

  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const payload = {
      title: String(data.get("title") || "").trim(),
      body: String(data.get("body") || "").trim(),
      level: String(data.get("level") || "info"),
      is_published: publish,
      published_at: publish ? new Date().toISOString() : null,
      expires_at: expiresAt ? new Date(`${expiresAt}T23:59:59`).toISOString() : null,
      updated_at: new Date().toISOString()
    };

    if (id) {
      const { error } = await state.client.from("announcements").update(payload).eq("id", id);
      if (error) throw error;
      if (publish) await state.client.rpc("panel_publish_announcement", { p_id: id, p_published: true });
    } else {
      const { data: inserted, error } = await state.client.from("announcements").insert({ ...payload, created_by: state.user.id }).select("id").single();
      if (error) throw error;
      const newId = inserted && inserted.id ? inserted.id : null;
      if (publish && newId) await state.client.rpc("panel_publish_announcement", { p_id: newId, p_published: true });
    }

    closeModal();
    await refreshAll();
    renderView();
    setAlert(publish ? "Pengumuman sudah tampil di halaman siswa." : "Pengumuman disimpan tapi belum ditampilkan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function toggleAnnouncement(id, publish) {
  try {
    const { error } = await state.client.rpc("panel_publish_announcement", { p_id: id, p_published: publish });
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert(publish ? "Pengumuman sekarang tampil di halaman siswa." : "Pengumuman disembunyikan dari halaman siswa.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

function openNotificationForm(presetUserId) {
  const options = state.data.profiles
    .filter((row) => !row.blocked)
    .map((row) => [row.id, `${row.full_name || "(tanpa nama)"} · ${row.email}`]);
  openModal(`
    ${modalHeader("Kirim pesan ke pengguna", "Pesan muncul di daftar pemberitahuan pengguna.")}
    <div class="panel-modal-content">
      <form id="panel-notification">
        <div class="form-grid">
          <label class="field field-full" for="notif-target"><span>Kirim ke siapa?</span>
            <select id="notif-target" name="target" required>
              <option value="all">Semua pengguna</option>
              ${formatSelectOptions(options, presetUserId || "")}
            </select></label>
          <label class="field field-full" for="notif-title"><span>Judul pesan</span>
            <input id="notif-title" name="title" type="text" required maxlength="140" placeholder="Contoh: Barangmu kemungkinan sudah ditemukan"></label>
          <label class="field field-full" for="notif-body"><span>Isi pesan</span>
            <textarea id="notif-body" name="body" maxlength="1000" required placeholder="Tulis singkat dan jelas ya."></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Kirim pesan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitNotification(form) {
  const data = new FormData(form);
  const target = String(data.get("target") || "");
  const title = String(data.get("title") || "").trim();
  const body = String(data.get("body") || "").trim();
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Mengirim…";
  try {
    const recipients = target === "all"
      ? state.data.profiles.filter((row) => !row.blocked).map((row) => row.id)
      : [target];
    if (!recipients.length) throw new Error("Belum ada penerima yang bisa dikirim.");
    for (const userId of recipients) {
      const { error } = await state.client.rpc("panel_send_notification", { p_user_id: userId, p_title: title, p_body: body });
      if (error) throw error;
    }
    closeModal();
    await refreshAll();
    renderView();
    setAlert(`Pesan terkirim ke ${recipients.length} pengguna.`, "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openTicketForm() {
  const options = state.data.profiles.map((row) => [row.id, `${row.full_name || "(tanpa nama)"} · ${row.email}`]);
  openModal(`
    ${modalHeader("Catat masalah", "Catat kejadian yang perlu ditindak, contohnya laporan palsu atau percakapan tidak sopan.")}
    <div class="panel-modal-content">
      <form id="panel-ticket">
        <div class="form-grid">
          <label class="field" for="ticket-subject"><span>Pengguna yang berkaitan</span>
            <select id="ticket-subject" name="subject_id" required>
              <option value="" disabled selected>Pilih pengguna</option>
              ${formatSelectOptions(options, "")}
            </select></label>
          <label class="field" for="ticket-category"><span>Jenis masalah</span>
            <select id="ticket-category" name="category">
              ${formatSelectOptions(TICKET_CATEGORIES.map((value) => [value, value]), TICKET_CATEGORIES[0])}
            </select></label>
          <label class="field field-full" for="ticket-detail"><span>Ceritakan kejadiannya</span>
            <textarea id="ticket-detail" name="detail" required maxlength="1500"></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan catatan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitTicket(form) {
  const data = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const { error } = await state.client.from("moderation_tickets").insert({
      subject_id: String(data.get("subject_id")),
      opened_by: state.user.id,
      category: String(data.get("category") || TICKET_CATEGORIES[0]),
      detail: String(data.get("detail") || "").trim(),
      status: "terbuka"
    });
    if (error) throw error;
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Masalah sudah dicatat.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openTicketNote(ticketId) {
  const ticket = state.data.tickets.find((row) => String(row.id) === String(ticketId));
  if (!ticket) return;
  openModal(`
    ${modalHeader("Tulis tindak lanjut", "Apa yang sudah kamu lakukan untuk masalah ini?")}
    <div class="panel-modal-content">
      <form id="panel-ticket-note" data-id="${escapeAttribute(ticket.id)}">
        <label class="field" for="ticket-resolution"><span>Tindak lanjut</span>
          <textarea id="ticket-resolution" name="resolution" required maxlength="1500">${escapeHtml(ticket.resolution || "")}</textarea></label>
        <label class="field" for="ticket-status"><span>Status masalah</span>
          <select id="ticket-status" name="status">
            ${formatSelectOptions(TICKET_STATUSES.map((value) => [value, STATUS_LABELS[value] || value]), ticket.status)}
          </select></label>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`, { narrow: true, title: "Tindak lanjut" });
}

async function submitTicketNote(form) {
  const data = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const { error } = await state.client.from("moderation_tickets").update({
      resolution: String(data.get("resolution") || "").trim(),
      status: String(data.get("status") || "ditinjau"),
      updated_at: new Date().toISOString()
    }).eq("id", form.dataset.id);
    if (error) throw error;
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Tindak lanjut sudah disimpan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openHandoverForm(claimId) {
  const claim = state.maps.claims[claimId];
  const claimant = claim ? state.maps.profiles[claim.claimant_id] : null;
  const item = claim ? state.maps.found[claim.found_item_id] : null;
  openModal(`
    ${modalHeader("Serah terima barang", "Isi saat barang benar-benar diserahkan ke pemiliknya.")}
    <div class="panel-modal-content">
      <p class="notice">Barang: <b>${escapeHtml(item ? item.name : "Barang temuan")}</b> · Diberikan kepada <b>${escapeHtml(claimant ? (claimant.full_name || claimant.email) : "pemilik")}</b></p>
      <form id="panel-handover" data-id="${escapeAttribute(claimId)}">
        <div class="form-grid">
          <label class="field" for="handover-name"><span>Nama penerima</span>
            <input id="handover-name" name="receiver_name" type="text" required maxlength="140" value="${escapeAttribute(claimant ? (claimant.full_name || "") : "")}"></label>
          <label class="field" for="handover-signature"><span>Tanda tangan / foto berita acara <span class="field-hint">(opsional)</span></span>
            <input id="handover-signature" name="signature" type="file" accept="image/png,image/jpeg,image/webp">
            <span class="field-hint">Unggah foto tanda tangan atau berita acaranya.</span></label>
          <label class="field field-full" for="handover-note"><span>Catatan</span>
            <textarea id="handover-note" name="note" maxlength="1000" placeholder="Contoh: barang diterima lengkap dan tidak rusak."></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan &amp; tandai sudah diambil</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitHandover(form) {
  const data = new FormData(form);
  const file = data.get("signature");
  const signature = file && file.size > 0 ? file : null;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    await recordHandover(form.dataset.id, String(data.get("receiver_name") || "").trim(), String(data.get("note") || "").trim(), signature);
  } finally {
    if (button.isConnected) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function openRejectClaimForm(claimId) {
  openModal(`
    ${modalHeader("Tolak klaim", "Tulis alasannya supaya pemohon mengerti.")}
    <div class="panel-modal-content">
      <form id="panel-reject-claim" data-id="${escapeAttribute(claimId)}">
        <label class="field" for="reject-note"><span>Alasan penolakan</span>
          <textarea id="reject-note" name="note" required minlength="5" maxlength="800" placeholder="Contoh: ciri barang yang disebut belum cocok dengan barangnya."></textarea></label>
        <div class="form-actions">
          <button class="button button-danger" type="submit">Tolak klaim</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`, { narrow: true, title: "Tolak klaim" });
}

async function submitRejectClaim(form) {
  const note = String(new FormData(form).get("note") || "").trim();
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Memproses…";
  await reviewClaim(form.dataset.id, "rejected", note);
  if (button.isConnected) {
    button.disabled = false;
    button.textContent = "Tolak klaim";
  }
}

function openManualMatchForm() {
  const foundOptions = state.data.found
    .filter((row) => !["rejected", "archived"].includes(row.status))
    .map((row) => [row.id, `${row.name || "Tanpa nama"} · ${row.category || "tanpa kategori"} · ${row.location_found || "lokasi belum diisi"}`]);
  const lostOptions = state.data.lost
    .filter((row) => row.status !== "rejected")
    .map((row) => [row.id, `${row.name || "Tanpa nama"} · ${row.category || "tanpa kategori"} · ${row.last_seen_location || "lokasi belum diisi"}`]);

  if (!foundOptions.length || !lostOptions.length) {
    setAlert("Butuh minimal satu laporan hilang dan satu barang temuan untuk mencocokkan manual.", "info");
    return;
  }

  openModal(`
    ${modalHeader("Cocokkan sendiri", "Pilih satu barang temuan dan satu laporan hilang yang kamu yakin barangnya sama.")}
    <div class="panel-modal-content">
      <form id="panel-manual-match">
        <div class="form-grid">
          <label class="field field-full" for="match-found"><span>Barang temuan</span>
            <select id="match-found" name="found_item_id" required>
              <option value="" disabled selected>Pilih barang temuan</option>
              ${formatSelectOptions(foundOptions, "")}
            </select></label>
          <label class="field field-full" for="match-lost"><span>Laporan kehilangan</span>
            <select id="match-lost" name="lost_report_id" required>
              <option value="" disabled selected>Pilih laporan kehilangan</option>
              ${formatSelectOptions(lostOptions, "")}
            </select></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan &amp; cocokkan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`);
}

async function submitManualMatch(form) {
  const data = new FormData(form);
  const foundId = String(data.get("found_item_id") || "");
  const lostId = String(data.get("lost_report_id") || "");
  if (!foundId || !lostId) return;
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    const found = state.maps.found[foundId];
    const lost = state.maps.lost[lostId];
    const analysis = similarityScore(found, lost);
    const { data: matchId, error } = await state.client.rpc("panel_save_match", {
      p_found_item_id: foundId,
      p_lost_report_id: lostId,
      p_score: analysis.score,
      p_method: "manual"
    });
    if (error) throw error;
    const { error: confirmError } = await state.client.rpc("panel_confirm_match", { p_match_id: matchId, p_note: "Dicocokkan manual oleh pengelola" });
    if (confirmError) throw confirmError;
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Barang sudah dicocokkan dan pemiliknya menerima pemberitahuan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = "Simpan & cocokkan";
  }
}

function openHistoryModal(id, type) {
  const item = type === "found" ? state.maps.found[id] : state.maps.lost[id];
  const rows = state.data.history.filter((row) => row.item_type === type && String(row.item_id) === String(id));
  openModal(`
    ${modalHeader(`Riwayat: ${item ? item.name : "Laporan"}`, "Ini daftar perubahan status barangnya.")}
    <div class="panel-modal-content">
      ${rows.length ? `<ul class="timeline">${rows.map((row) => {
        const actor = state.maps.profiles[row.changed_by];
        return `<li>
          <strong>${escapeHtml(STATUS_LABELS[row.previous_status] || row.previous_status || "dibuat")} → ${escapeHtml(STATUS_LABELS[row.new_status] || row.new_status)}</strong>
          <span>${escapeHtml(formatDate(row.created_at))} · ${escapeHtml(actor ? (actor.full_name || actor.email) : "Sistem")}</span>
        </li>`;
      }).join("")}</ul>` : emptyMarkup("Belum ada perubahan", "Riwayat muncul setelah status barang diubah.")}
    </div>`, { title: "Riwayat status" });
}

function openUserHistoryModal(userId) {
  const profile = state.maps.profiles[userId];
  const logs = state.data.audit.filter((row) => row.actor_id === userId).slice(0, 10);
  const found = state.data.found.filter((row) => row.reported_by === userId);
  const lost = state.data.lost.filter((row) => row.reported_by === userId);
  const claims = state.data.claims.filter((row) => row.claimant_id === userId);

  openModal(`
    ${modalHeader("Riwayat pengguna", profile ? (profile.full_name || profile.email) : "Pengguna")}
    <div class="panel-modal-content">
      <dl class="detail-grid">
        <div><dt>Email</dt><dd>${escapeHtml(profile ? profile.email : "-")}</dd></div>
        <div><dt>Jabatan</dt><dd>${escapeHtml(ROLE_LABELS[normalizeRole(profile ? profile.role : "user")])}</dd></div>
        <div><dt>Kondisi akun</dt><dd>${profile && profile.blocked ? "Diblokir" : "Aktif"}</dd></div>
        <div><dt>Terakhir aktif</dt><dd>${escapeHtml(relativeTime(profile ? (profile.last_seen_at || profile.created_at) : null))}</dd></div>
        <div><dt>Laporan kehilangan</dt><dd>${lost.length}</dd></div>
        <div><dt>Barang temuan</dt><dd>${found.length}</dd></div>
        <div><dt>Klaim diajukan</dt><dd>${claims.length}</dd></div>
        <div><dt>Daftar sejak</dt><dd>${escapeHtml(formatDate(profile ? profile.created_at : null))}</dd></div>
      </dl>
      ${logs.length ? `<h2 class="section-title">Tindakan di panel</h2><ul class="timeline">${logs.map((row) => `
        <li><strong>${escapeHtml(ACTION_LABELS[row.action] || row.action)}</strong><span>${escapeHtml(formatDate(row.created_at))} · ${escapeHtml(row.entity || "")}</span></li>`).join("")}</ul>` : ""}
    </div>`, { title: "Riwayat pengguna" });
}

function openEvidence(claimId) {
  const claim = state.maps.claims[claimId];
  if (!claim || !claim.evidence_path) {
    setAlert("Pemohon belum melampirkan berkas bukti.", "info");
    return;
  }
  signedUrl("claim-evidence", claim.evidence_path).then((url) => {
    if (url) window.open(url, "_blank", "noopener");
  });
}

function exportCsv(scope) {
  const csvDate = (value) => (value ? new Date(value).toISOString() : "");
  const profileOf = (id) => {
    const profile = state.maps.profiles[id];
    return profile ? (profile.email || profile.full_name || "") : "";
  };

  let rows = [];
  let columns = [];
  let filename = "lost-found.csv";

  if (scope === "lost") {
    rows = state.data.lost.filter((row) => matchesFilters(row, "lost", "lost_at", "last_seen_location"));
    columns = [
      ["Nama barang", (row) => row.name],
      ["Kategori", (row) => row.category],
      ["Warna", (row) => row.color],
      ["Terakhir terlihat", (row) => row.last_seen_location],
      ["Waktu hilang", (row) => csvDate(row.lost_at || row.created_at)],
      ["Status", (row) => STATUS_LABELS[row.status] || row.status],
      ["Pelapor", (row) => profileOf(row.reported_by)],
      ["Ciri-ciri", (row) => row.description]
    ];
    filename = "daftar-barang-hilang.csv";
  } else if (scope === "found") {
    rows = state.data.found.filter((row) => matchesFilters(row, "found", "found_at", "location_found"));
    columns = [
      ["Nama barang", (row) => row.name],
      ["Kategori", (row) => row.category],
      ["Warna", (row) => row.color],
      ["Ditemukan di", (row) => row.location_found],
      ["Disimpan di", (row) => row.storage_location],
      ["Waktu ditemukan", (row) => csvDate(row.found_at || row.created_at)],
      ["Status", (row) => STATUS_LABELS[row.status] || row.status],
      ["Pelapor", (row) => profileOf(row.reported_by)],
      ["Ada gambar?", (row) => (row.image_path ? "Ada" : "Belum ada")]
    ];
    filename = "daftar-barang-temuan.csv";
  } else {
    rows = state.data.audit.slice(0, 500);
    columns = [
      ["Waktu", (row) => csvDate(row.created_at)],
      ["Pengelola", (row) => row.actor_email],
      ["Tindakan", (row) => ACTION_LABELS[row.action] || row.action],
      ["Objek", (row) => row.entity],
      ["Keterangan", (row) => describeDetail(row)]
    ];
    filename = "catatan-aktivitas.csv";
  }

  if (!rows.length) {
    setAlert("Belum ada data untuk diunduh pada filter ini.", "info");
    return;
  }

  const cell = (value) => `"${String(value == null ? "" : value).replace(/"/g, '""')}"`;
  const lines = [columns.map(([label]) => cell(label)).join(";")];
  rows.forEach((row) => lines.push(columns.map(([, getter]) => cell(getter(row))).join(";")));

  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setAlert(`File ${filename} sedang diunduh.`, "success");
}

const ACTIONS = {
  "go-view": (button) => {
    state.view = button.dataset.view;
    setAlert("");
    renderView();
    elements.main.focus();
    if (typeof window.scrollTo === "function") window.scrollTo({ top: 0, behavior: "auto" });
  },
  "refresh-data": async () => {
    await refreshAll();
    renderView();
    if (!state.loadError) setAlert("Data sudah diperbarui.", "success");
  },
  "reset-filters": (button) => {
    const scope = button.dataset.scope;
    if (DEFAULT_FILTERS[scope]) state.filters[scope] = JSON.parse(JSON.stringify(DEFAULT_FILTERS[scope]));
    if (state.dates[scope]) state.dates[scope] = { from: "", to: "" };
    renderView();
  },
  "found-status": (button) => {
    const labels = {
      available: "Barang disetujui dan sekarang tampil di halaman siswa.",
      claimed: "Barang ditandai “ada yang mengaku”.",
      resolved: "Barang ditandai sudah diambil.",
      archived: "Barang disimpan ke gudang.",
      rejected: "Barang tidak ditampilkan."
    };
    updateStatus("found_items", button.dataset.id, button.dataset.status, labels[button.dataset.status]);
  },
  "lost-status": (button) => {
    const labels = {
      under_review: "Laporan sedang diperiksa.",
      matched: "Laporan ditandai sudah ada pasangannya.",
      resolved: "Laporan ditandai selesai.",
      rejected: "Laporan tidak ditampilkan."
    };
    updateStatus("lost_reports", button.dataset.id, button.dataset.status, labels[button.dataset.status]);
  },
  "edit-found": (button) => openFoundEditor(button.dataset.id),
  "edit-lost": (button) => openLostEditor(button.dataset.id),
  "delete-image": (button) => deleteItemImage(button.dataset.meta, button.dataset.id),
  "delete-record": (button) => deleteRecord(button.dataset.meta, button.dataset.id),
  "show-history": (button) => openHistoryModal(button.dataset.id, button.dataset.type),
  "run-matching": () => runMatching(),
  "manual-match": () => openManualMatchForm(),
  "confirm-suggestion": (button) => confirmSuggestion(button.dataset.found, button.dataset.lost, button.dataset.score),
  "dismiss-suggestion": (button) => dismissSuggestion(button.dataset.found, button.dataset.lost, button.dataset.score),
  "confirm-match": (button) => reviewMatch(button.dataset.id, "confirm"),
  "dismiss-match": (button) => reviewMatch(button.dataset.id, "dismiss"),
  "claim-approve": async (button) => {
    const approved = await confirmAction({
      title: "Setujui klaim ini?",
      message: "Pastikan bukti kepemilikannya sudah cocok. Barang akan ditandai “ada yang mengaku” dan pemohon menerima pemberitahuan.",
      confirmLabel: "Ya, setujui",
      danger: false
    });
    if (approved) reviewClaim(button.dataset.id, "approved", "Bukti kepemilikan sudah diperiksa petugas");
  },
  "claim-reject": (button) => openRejectClaimForm(button.dataset.id),
  "claim-handover": (button) => openHandoverForm(button.dataset.id),
  "claim-evidence": (button) => openEvidence(button.dataset.id),
  "new-announcement": () => openAnnouncementForm(null),
  "edit-announcement": (button) => openAnnouncementForm(button.dataset.id),
  "toggle-announcement": (button) => toggleAnnouncement(button.dataset.id, button.dataset.published === "true"),
  "new-notification": () => openNotificationForm(null),
  "notify-user": (button) => openNotificationForm(button.dataset.id),
  "new-ticket": () => openTicketForm(),
  "ticket-note": (button) => openTicketNote(button.dataset.id),
  "ticket-status": async (button) => {
    const { error } = await state.client.from("moderation_tickets").update({
      status: button.dataset.status,
      updated_at: new Date().toISOString()
    }).eq("id", button.dataset.id);
    if (error) {
      setAlert(friendlyError(error), "error");
      return;
    }
    await refreshAll();
    renderView();
    setAlert(`Status masalah diubah menjadi ${STATUS_LABELS[button.dataset.status] || button.dataset.status}.`, "success");
  },
  "block-user": async (button) => {
    const profile = state.maps.profiles[button.dataset.id];
    const answer = await promptModal({
      title: "Blokir akun ini?",
      message: `Akun ${profile ? profile.email : "ini"} tidak akan bisa melapor lagi.`,
      field: "Alasan blokir (boleh dikosongkan)",
      required: false,
      confirmLabel: "Ya, blokir"
    });
    if (answer === null) return;
    try {
      const { error } = await state.client.rpc("panel_set_blocked", { p_user_id: button.dataset.id, p_blocked: true, p_reason: answer || null });
      if (error) throw error;
      await refreshAll();
      renderView();
      setAlert("Akun sudah diblokir.", "success");
    } catch (error) {
      setAlert(friendlyError(error), "error");
    }
  },
  "unblock-user": async (button) => {
    const approved = await confirmAction({
      title: "Buka blokir akun?",
      message: "Akun ini bisa memakai layanan Lost & Found lagi.",
      confirmLabel: "Ya, buka blokir",
      danger: false
    });
    if (!approved) return;
    try {
      const { error } = await state.client.rpc("panel_set_blocked", { p_user_id: button.dataset.id, p_blocked: false, p_reason: null });
      if (error) throw error;
      await refreshAll();
      renderView();
      setAlert("Blokir akun sudah dibuka.", "success");
    } catch (error) {
      setAlert(friendlyError(error), "error");
    }
  },
  "user-history": (button) => openUserHistoryModal(button.dataset.id),
  "reset-google-avatar": () => handleSettingsResetAvatar(),
  "logout-from-settings": () => handleLogout(),
  export: (button, event) => {
    event.stopPropagation();
    exportCsv(button.dataset.scope);
  },
  "close-modal": () => closeModal()
};

async function prepareAvatarFile(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) throw new Error("File harus JPG, PNG, atau WebP ya.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran gambar maksimal 5 MB ya.");

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("File gambar tidak dapat dibaca."));
      element.src = objectUrl;
    });

    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    const side = Math.min(image.naturalWidth || image.width, image.naturalHeight || image.height);
    const sx = Math.floor(((image.naturalWidth || image.width) - side) / 2);
    const sy = Math.floor(((image.naturalHeight || image.height) - side) / 2);
    context.drawImage(image, sx, sy, side, side, 0, 0, size, size);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    return { blob, dataUrl };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function extractAvatarBucketPath(url) {
  if (!url) return "";
  const marker = "/storage/v1/object/public/avatars/";
  const index = String(url).indexOf(marker);
  if (index === -1) return "";
  return decodeURIComponent(String(url).slice(index + marker.length).split("?")[0]);
}

function openSettingsModal() {
  if (!state.user || !state.profile) return;
  state.settingsDraft = { blob: null, previewUrl: "", resetToGoogle: false };
  const email = state.profile.email || state.user.email || "";
  const name = (state.profile.full_name || "").trim() || email.split("@")[0];
  const currentAvatar = resolveUserAvatar(state.user, state.profile);
  const googleAvatar = getGoogleAvatarUrl(state.user);
  const initials = getInitials(name, email);

  openModal(`
    ${modalHeader("Pengaturan Akun", "Ubah foto profil, nama tampilan, atau keluar dari panel admin.")}
    <div class="panel-modal-content">
      <div id="panel-settings-message" class="form-message" role="alert" hidden style="margin-bottom:14px"></div>
      <div class="settings-profile-card">
        <div class="settings-avatar-large">
          <img id="panel-settings-avatar-preview" src="${escapeAttribute(currentAvatar)}" alt="" referrerpolicy="no-referrer" ${currentAvatar ? "" : "hidden"}>
          <span id="panel-settings-avatar-initials" ${currentAvatar ? "hidden" : ""}>${escapeHtml(initials)}</span>
        </div>
        <div class="settings-profile-meta">
          <strong id="panel-settings-display-name">${escapeHtml(name)}</strong>
          <span>${escapeHtml(email)}</span>
          <div class="settings-badges">
            <span class="role-badge">BPK PENABUR</span>
            ${roleBadge(state.role)}
          </div>
        </div>
      </div>

      <form id="panel-account-settings">
        <div class="settings-avatar-actions">
          <label class="upload-btn-wrap" for="panel-settings-avatar-input">
            <input id="panel-settings-avatar-input" type="file" accept="image/jpeg,image/png,image/webp">
            <span class="button button-secondary button-small">Ganti foto profil</span>
          </label>
          <button id="panel-settings-reset-avatar" class="button button-quiet button-small" type="button" data-action="reset-google-avatar" ${(!googleAvatar && !currentAvatar) ? "disabled" : ""}>Gunakan foto Google</button>
          <p class="settings-avatar-hint">JPG, PNG, atau WebP · maks. 5 MB · otomatis dipotong persegi.</p>
        </div>

        <label class="field" for="panel-settings-full-name">
          <span>Nama tampilan</span>
          <input id="panel-settings-full-name" name="full_name" type="text" required minlength="1" maxlength="120" value="${escapeAttribute(name)}">
        </label>

        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan perubahan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Tutup</button>
        </div>
      </form>

      <div class="settings-logout-box">
        <div class="settings-logout-copy">
          <strong>Keluar dari panel</strong>
          <span>Akhiri sesi login admin di perangkat ini.</span>
        </div>
        <button class="button button-danger button-small" type="button" data-action="logout-from-settings">Keluar</button>
      </div>
    </div>`, { narrow: true, title: "Pengaturan Akun" });

  const previewImg = document.getElementById("panel-settings-avatar-preview");
  const previewInitials = document.getElementById("panel-settings-avatar-initials");
  if (previewImg && previewInitials) {
    previewImg.addEventListener("error", () => {
      previewImg.hidden = true;
      previewInitials.hidden = false;
    });
  }
}

function setSettingsMessage(text, isSuccess = false) {
  const box = document.getElementById("panel-settings-message");
  if (!box) return;
  if (!text) {
    box.hidden = true;
    box.textContent = "";
    box.classList.remove("is-success");
    return;
  }
  box.hidden = false;
  box.textContent = text;
  box.classList.toggle("is-success", isSuccess);
}

function updateSettingsPreview(url, nameValue) {
  const previewImg = document.getElementById("panel-settings-avatar-preview");
  const previewInitials = document.getElementById("panel-settings-avatar-initials");
  const displayName = document.getElementById("panel-settings-display-name");
  const email = (state.profile && state.profile.email) || (state.user && state.user.email) || "";
  const cleanName = String(nameValue || "").trim() || email.split("@")[0];

  if (displayName) displayName.textContent = cleanName;
  if (previewInitials) previewInitials.textContent = getInitials(cleanName, email);

  if (previewImg && previewInitials) {
    if (url) {
      previewImg.src = url;
      previewImg.hidden = false;
      previewInitials.hidden = true;
    } else {
      previewImg.removeAttribute("src");
      previewImg.hidden = true;
      previewInitials.hidden = false;
    }
  }
}

async function handleSettingsAvatarChange(input) {
  const file = input.files && input.files[0] ? input.files[0] : null;
  if (!file) return;
  setSettingsMessage("");
  try {
    const { blob, dataUrl } = await prepareAvatarFile(file);
    state.settingsDraft = { blob, previewUrl: dataUrl, resetToGoogle: false };
    const nameInput = document.getElementById("panel-settings-full-name");
    updateSettingsPreview(dataUrl, nameInput ? nameInput.value : state.profile.full_name);
    const resetBtn = document.getElementById("panel-settings-reset-avatar");
    if (resetBtn) resetBtn.disabled = false;
  } catch (error) {
    setSettingsMessage(friendlyError(error), false);
  } finally {
    input.value = "";
  }
}

function handleSettingsResetAvatar() {
  if (!state.user) return;
  setSettingsMessage("");
  const googleAvatar = getGoogleAvatarUrl(state.user);
  state.settingsDraft = { blob: null, previewUrl: googleAvatar, resetToGoogle: true };
  const nameInput = document.getElementById("panel-settings-full-name");
  updateSettingsPreview(googleAvatar, nameInput ? nameInput.value : state.profile.full_name);
}

async function submitAccountSettings(form) {
  if (!state.user || !state.profile || !state.client) return;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  const formData = new FormData(form);
  const fullName = String(formData.get("full_name") || "").trim();
  if (!fullName) {
    setSettingsMessage("Nama tampilan tidak boleh kosong.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Menyimpan…";
  setSettingsMessage("");

  const previousAvatar = state.profile.avatar_url || "";
  let nextAvatarUrl = previousAvatar;
  let avatarChanged = false;

  try {
    if (state.settingsDraft.blob) {
      avatarChanged = true;
      const path = `${state.user.id}/avatar-${Date.now()}.jpg`;
      const uploadResult = await state.client.storage.from("avatars").upload(path, state.settingsDraft.blob, {
        cacheControl: "3600",
        contentType: "image/jpeg",
        upsert: true
      });

      if (!uploadResult.error) {
        const { data: urlData } = state.client.storage.from("avatars").getPublicUrl(path);
        nextAvatarUrl = urlData && urlData.publicUrl ? urlData.publicUrl : state.settingsDraft.previewUrl;
        setLocalAvatar(state.user.id, nextAvatarUrl);
        const oldStoredPath = extractAvatarBucketPath(previousAvatar);
        if (oldStoredPath && oldStoredPath.startsWith(`${state.user.id}/`) && oldStoredPath !== path) {
          state.client.storage.from("avatars").remove([oldStoredPath]).catch(() => {});
        }
      } else {
        nextAvatarUrl = state.settingsDraft.previewUrl;
        setLocalAvatar(state.user.id, nextAvatarUrl);
      }
    } else if (state.settingsDraft.resetToGoogle) {
      avatarChanged = true;
      nextAvatarUrl = getGoogleAvatarUrl(state.user) || null;
      setLocalAvatar(state.user.id, "");
      const oldStoredPath = extractAvatarBucketPath(previousAvatar);
      if (oldStoredPath && oldStoredPath.startsWith(`${state.user.id}/`)) {
        state.client.storage.from("avatars").remove([oldStoredPath]).catch(() => {});
      }
    }

    const updatePayload = { full_name: fullName };
    if (avatarChanged && state.hasAvatarColumn && (!nextAvatarUrl || !String(nextAvatarUrl).startsWith("data:"))) {
      updatePayload.avatar_url = nextAvatarUrl;
    }

    let profileResult = await state.client.from("profiles").update(updatePayload).eq("id", state.user.id);
    if (profileResult.error && Object.prototype.hasOwnProperty.call(updatePayload, "avatar_url")) {
      state.hasAvatarColumn = false;
      profileResult = await state.client.from("profiles").update({ full_name: fullName }).eq("id", state.user.id);
    }
    if (profileResult.error) throw profileResult.error;

    const authMetaUpdate = { full_name: fullName };
    if (avatarChanged) {
      authMetaUpdate.custom_avatar_url = nextAvatarUrl && !String(nextAvatarUrl).startsWith("data:") ? nextAvatarUrl : "";
    }
    await state.client.auth.updateUser({ data: authMetaUpdate }).catch(() => {});

    state.profile.full_name = fullName;
    if (avatarChanged) {
      state.profile.avatar_url = nextAvatarUrl || "";
    }
    if (state.maps.profiles[state.user.id]) {
      state.maps.profiles[state.user.id].full_name = fullName;
      if (avatarChanged) state.maps.profiles[state.user.id].avatar_url = nextAvatarUrl || "";
    }
    state.settingsDraft = { blob: null, previewUrl: "", resetToGoogle: false };
    renderPanelAccountIdentity();
    closeModal();
    renderView();
    setAlert("Pengaturan akun berhasil disimpan.", "success");
  } catch (error) {
    setSettingsMessage(friendlyError(error), false);
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

function handleDialogChange(event) {
  if (event.target && event.target.id === "panel-settings-avatar-input") {
    handleSettingsAvatarChange(event.target);
  }
}

function handleDialogInput(event) {
  if (event.target && event.target.id === "panel-settings-full-name") {
    const previewImg = document.getElementById("panel-settings-avatar-preview");
    const activeUrl = previewImg && !previewImg.hidden ? previewImg.getAttribute("src") : "";
    updateSettingsPreview(activeUrl, event.target.value);
  }
}

function handlePanelClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "modal-backdrop") {
    if (event.target === target) closeModal();
    return;
  }
  if (action === "upload-image") return;
  const handler = ACTIONS[action];
  if (handler) {
    event.preventDefault();
    handler(target, event);
  }
}

function handlePanelChange(event) {
  const uploadInput = event.target.closest("input[data-action='upload-image']");
  if (uploadInput) {
    const file = uploadInput.files && uploadInput.files[0] ? uploadInput.files[0] : null;
    if (file) changeItemImage(uploadInput.dataset.meta, uploadInput.dataset.id, file);
    else uploadInput.value = "";
    return;
  }
  const roleSelect = event.target.closest("[data-action='change-role']");
  if (roleSelect) {
    applyRoleChange(roleSelect.dataset.id, roleSelect.value, roleSelect);
    return;
  }
  const filter = event.target.closest("[data-scope]");
  if (!filter) return;
  const { scope, field, kind } = filter.dataset;
  if (kind === "date") {
    if (!state.dates[scope]) state.dates[scope] = { from: "", to: "" };
    state.dates[scope][field] = filter.value;
  } else if (state.filters[scope]) {
    state.filters[scope][field] = filter.value;
  }
  renderRegion();
}

async function applyRoleChange(userId, role, select) {
  const targetProfile = state.maps.profiles[userId];
  const previous = targetProfile ? targetProfile.role : "user";
  if (role !== "user" && (!targetProfile || !isAllowedEmail(targetProfile.email))) {
    select.value = previous;
    setAlert("Hanya akun BPK PENABUR yang dapat diberikan akses pengelola atau admin.", "error");
    return;
  }
  const approved = await confirmAction({
    title: "Ubah jabatan pengguna?",
    message: `Jabatan akan menjadi ${ROLE_LABELS[role] || role}. Hak akses di panel ikut menyesuaikan.`,
    confirmLabel: "Ya, ubah",
    danger: false
  });
  if (!approved) {
    select.value = previous;
    return;
  }
  try {
    const { error } = await state.client.rpc("panel_set_role", { p_user_id: userId, p_role: role });
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert(`Jabatan pengguna sekarang ${ROLE_LABELS[role] || role}.`, "success");
  } catch (error) {
    select.value = previous;
    setAlert(friendlyError(error), "error");
  }
}

function handlePanelSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  const handlers = {
    "panel-edit-found": submitFoundEditor,
    "panel-edit-lost": submitLostEditor,
    "panel-announcement": submitAnnouncement,
    "panel-notification": submitNotification,
    "panel-ticket": submitTicket,
    "panel-ticket-note": submitTicketNote,
    "panel-handover": submitHandover,
    "panel-reject-claim": submitRejectClaim,
    "panel-manual-match": submitManualMatch,
    "panel-account-settings": submitAccountSettings
  };
  const handler = handlers[form.id];
  if (!handler) return;
  event.preventDefault();
  handler(form);
}

function setCookieNoticeOpen(isOpen) {
  elements.cookieNoticePanel.hidden = !isOpen;
  elements.cookieNoticeButton.setAttribute("aria-expanded", String(isOpen));
}

window.addEventListener("beforeunload", (event) => {
  if (!state.uploadingKey) return undefined;
  event.preventDefault();
  event.returnValue = "Gambar belum selesai diunggah. Yakin mau keluar?";
  return event.returnValue;
});

elements.accountAvatarImg.addEventListener("error", () => {
  elements.accountAvatarImg.hidden = true;
  elements.accountAvatarFallback.hidden = false;
});
elements.settingsButton.addEventListener("click", openSettingsModal);
elements.googleLogin.addEventListener("click", handleGoogleLogin);
elements.cookieNoticeButton.addEventListener("click", () => setCookieNoticeOpen(elements.cookieNoticePanel.hidden));
elements.cookieNoticeClose.addEventListener("click", () => setCookieNoticeOpen(false));
document.querySelector(".panel-header").addEventListener("click", handlePanelClick);
elements.nav.addEventListener("click", handlePanelClick);
elements.viewHost.addEventListener("click", handlePanelClick);
elements.viewHost.addEventListener("submit", handlePanelSubmit);
elements.viewHost.addEventListener("change", handlePanelChange);
elements.viewHost.addEventListener("input", handlePanelChange);
elements.dialogRoot.addEventListener("click", handlePanelClick);
elements.dialogRoot.addEventListener("change", handleDialogChange);
elements.dialogRoot.addEventListener("input", handleDialogInput);
elements.dialogRoot.addEventListener("submit", handlePanelSubmit);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && elements.dialogRoot.firstElementChild) closeModal();
});

document.getElementById("language-select").addEventListener("change", (event) => {
  currentLanguage = event.target.value === "en" ? "en" : "id";
  try { localStorage.setItem("language", currentLanguage); } catch (error) { currentLanguage = "id"; }
  applyLanguage();
});

applyLanguage();
initialize();
