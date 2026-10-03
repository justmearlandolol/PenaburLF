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
  user: "Pengguna",
  staff: "Petugas lapangan",
  moderator: "Moderator",
  admin: "Admin",
  developer: "Developer"
};

const STATUS_LABELS = {
  pending: "Menunggu verifikasi",
  available: "Tersedia",
  claimed: "Sudah diklaim",
  archived: "Diarsipkan",
  rejected: "Ditolak",
  under_review: "Dalam peninjauan",
  matched: "Cocok",
  resolved: "Selesai",
  approved: "Disetujui",
  completed: "Selesai",
  suggested: "Rekomendasi",
  confirmed: "Terkonfirmasi",
  dismissed: "Diabaikan",
  verified: "Terverifikasi",
  terbuka: "Terbuka",
  ditinjau: "Ditinjau",
  selesai: "Selesai"
};

const LEVEL_LABELS = { info: "Informasi", penting: "Penting", urgent: "Urgent" };

const ACTION_LABELS = {
  ubah_status: "Ubah status",
  tambah_found: "Tambah barang temuan",
  tambah_lost: "Tambah laporan kehilangan",
  hapus_found: "Hapus barang temuan",
  hapus_lost: "Hapus laporan kehilangan",
  ubah_foto_found: "Ubah foto barang",
  ubah_foto_lost: "Ubah foto laporan",
  hapus_foto_found: "Hapus foto barang",
  hapus_foto_lost: "Hapus foto laporan",
  buat_pengumuman: "Buat pengumuman",
  ubah_pengumuman: "Ubah pengumuman",
  hapus_pengumuman: "Hapus pengumuman",
  terbitkan_pengumuman: "Terbitkan pengumuman",
  tarik_pengumuman: "Tarik pengumuman",
  review_klaim: "Review klaim",
  serah_terima: "Serah terima barang",
  konfirmasi_pencocokan: "Konfirmasi pencocokan",
  abaikan_pencocokan: "Abaikan pencocokan",
  ubah_role: "Ubah role pengguna",
  blokir_pengguna: "Blokir pengguna",
  buka_blokir: "Buka blokir pengguna",
  kirim_notifikasi: "Kirim notifikasi"
};

const TICKET_CATEGORIES = ["Percakapan pengguna", "Laporan konten", "Penipuan / pemerasan", "Barang berharga", "Lainnya"];
const TICKET_STATUSES = ["terbuka", "ditinjau", "selesai"];

const NAV_ITEMS = [
  { key: "dashboard", label: "Ringkasan", min: "staff" },
  { key: "lost", label: "Barang hilang", min: "moderator" },
  { key: "found", label: "Barang temuan", min: "staff" },
  { key: "matches", label: "Pencocokan pintar", min: "moderator" },
  { key: "claims", label: "Klaim & serah terima", min: "staff" },
  { key: "users", label: "Pengguna", min: "admin" },
  { key: "announcements", label: "Pengumuman", min: "admin" },
  { key: "communication", label: "Notifikasi & tiket", min: "moderator" },
  { key: "audit", label: "Audit aktivitas", min: "admin" }
];

const SOURCES = [
  { key: "found", table: "found_items", columns: "*", limit: 400, bucket: "found-items" },
  { key: "lost", table: "lost_reports", columns: "*", limit: 400, bucket: "lost-reports" },
  { key: "claims", table: "claims", columns: "*", limit: 400 },
  { key: "profiles", table: "profiles", columns: "id, full_name, email, role, blocked, blocked_reason, blocked_at, last_seen_at, created_at", limit: 400 },
  { key: "matches", table: "item_matches", columns: "*", limit: 300 },
  { key: "announcements", table: "announcements", columns: "*", limit: 100 },
  { key: "handovers", table: "handover_records", columns: "*", limit: 200 },
  { key: "tickets", table: "moderation_tickets", columns: "*", limit: 200 },
  { key: "notifications", table: "notifications", columns: "*", limit: 200 },
  { key: "history", table: "item_status_history", columns: "*", limit: 400 },
  { key: "audit", table: "audit_logs", columns: "*", limit: 300 }
];

const state = {
  client: null,
  user: null,
  profile: null,
  role: "user",
  view: "dashboard",
  hydratingUserId: null,
  loadError: "",
  data: { found: [], lost: [], claims: [], profiles: [], matches: [], announcements: [], handovers: [], tickets: [], notifications: [], history: [], audit: [] },
  maps: { profiles: {}, found: {}, lost: {}, claims: {} },
  filters: {
    found: { search: "", category: "all", status: "all", color: "" },
    lost: { search: "", category: "all", status: "all", color: "" },
    claims: { search: "", status: "all" },
    users: { search: "", role: "all", status: "all" },
    audit: { search: "", action: "all" },
    communication: { status: "all" },
    matches: { min: "60" }
  },
  dates: { found: { from: "", to: "" }, lost: { from: "", to: "" } },
  loginMessage: "",
  loginType: "error",
  recoveryMode: false,
  pendingImage: false,
};

const elements = {
  loginView: document.getElementById("login-view"),
  panelView: document.getElementById("panel-view"),
  loginForm: document.getElementById("login-form"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  loginSubmit: document.getElementById("login-submit"),
  loginMessage: document.getElementById("login-message"),
  googleLogin: document.getElementById("google-login"),
  loginMethods: document.getElementById("login-methods"),
  recoveryView: document.getElementById("password-recovery-view"),
  recoveryForm: document.getElementById("recovery-form"),
  recoveryPassword: document.getElementById("recovery-password"),
  recoveryPasswordConfirm: document.getElementById("recovery-password-confirm"),
  recoverySubmit: document.getElementById("recovery-submit"),
  recoveryMessage: document.getElementById("recovery-message"),
  recoveryBack: document.getElementById("recovery-back"),
  cookieNoticeButton: document.getElementById("cookie-notice-button"),
  cookieNoticePanel: document.getElementById("cookie-notice-panel"),
  cookieNoticeClose: document.getElementById("cookie-notice-close"),
  setupNotice: document.getElementById("setup-notice"),
  accountName: document.getElementById("panel-account-name"),
  accountEmail: document.getElementById("panel-account-email"),
  accountRole: document.getElementById("panel-account-role"),
  logoutButton: document.getElementById("panel-logout"),
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

function t(key) {
  const dictionary = currentLanguage === "en"
    ? {
        emailPh: "BPK PENABUR email", passPh: "Password", submit: "Log in", forgot: "Lost password?",
        oauth: "Log in using your account on:", langLabel: "Language", close: "Close", cookieBtn: "Cookies notice",
        cookieTitle: "Session notice",
        cookieText: "The admin panel keeps your Supabase sign-in in browser storage. Password is never stored by the app.",
        recTitle: "Reset password", recCopy: "Create a new password for your BPK PENABUR account.",
        newPassPh: "New password", repeatPh: "Repeat password", save: "Save password", back: "Back to login",
        recPassLabel: "New password", recRepeatLabel: "Repeat password"
      }
    : {
        emailPh: "Email BPK PENABUR", passPh: "Kata sandi", submit: "Masuk", forgot: "Lupa kata sandi?",
        oauth: "Masuk menggunakan akun Anda:", langLabel: "Bahasa", close: "Tutup", cookieBtn: "Pemberitahuan cookie",
        cookieTitle: "Pemberitahuan sesi",
        cookieText: "Panel admin menyimpan sesi login Supabase di browser. Kata sandi tidak pernah disimpan aplikasi.",
        recTitle: "Atur ulang kata sandi", recCopy: "Buat kata sandi baru untuk akun BPK PENABUR Anda.",
        newPassPh: "Kata sandi baru", repeatPh: "Ulangi kata sandi", save: "Simpan kata sandi", back: "Kembali ke login",
        recPassLabel: "Kata sandi baru", recRepeatLabel: "Ulangi kata sandi"
      };
  return dictionary[key] || key;
}

let currentLanguage = "id";
try { currentLanguage = localStorage.getItem("language") === "en" ? "en" : "id"; } catch (error) { currentLanguage = "id"; }

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  const submit = document.getElementById("login-submit");
  const forgot = document.getElementById("forgot-password");
  const heading = document.getElementById("oauth-heading");
  const cookieButton = document.getElementById("cookie-notice-button");
  const cookieClose = document.getElementById("cookie-notice-close");
  const cookieTitle = document.getElementById("cookie-notice-title");
  const cookieText = document.getElementById("cookie-notice-text");
  if (emailInput) emailInput.placeholder = t("emailPh");
  if (passInput) passInput.placeholder = t("passPh");
  if (submit) submit.textContent = t("submit");
  if (forgot) forgot.textContent = t("forgot");
  if (heading) heading.textContent = t("oauth");
  if (cookieButton) cookieButton.textContent = t("cookieBtn");
  if (cookieClose) cookieClose.textContent = t("close");
  if (cookieTitle) cookieTitle.textContent = t("cookieTitle");
  if (cookieText) cookieText.textContent = t("cookieText");
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) languageSelect.value = currentLanguage;
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}
function escapeAttribute(value) { return escapeHtml(value); }

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
  if (!value) return "Belum dicatat";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum dicatat";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta"
  }).format(date);
}

function relativeTime(value) {
  if (!value) return "Belum ada data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum ada data";
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays <= 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 30) return `${diffDays} hari lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
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
  if (code === "23505") return "Data serupa sudah tercatat sebelumnya.";
  if (code === "42501" || message.toLowerCase().includes("row-level security")) return "Akses ditolak oleh kebijakan keamanan database. Periksa role akun Anda.";
  if (message.toLowerCase().includes("failed to fetch")) return "Tidak dapat terhubung ke Supabase. Periksa koneksi internet.";
  if (message) return message;
  return "Terjadi kesalahan. Silakan coba lagi.";
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
  elements.loginMethods.hidden = state.recoveryMode;
  elements.recoveryView.hidden = !state.recoveryMode;
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

async function initialize() {
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  state.recoveryMode = new URLSearchParams(hash).get("type") === "recovery"
    || new URLSearchParams(window.location.search).get("type") === "recovery";
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

  if (state.recoveryMode) showLogin("");

  state.client.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      state.recoveryMode = true;
      state.loginMessage = "";
      showLogin("");
      window.setTimeout(() => elements.recoveryPassword.focus(), 0);
      return;
    }
    if (event === "SIGNED_OUT") {
      state.user = null;
      state.profile = null;
      state.role = "user";
      state.hydratingUserId = null;
      state.recoveryMode = false;
      closeModal();
      showLogin();
      return;
    }
    if (session && session.user && !state.profile && !state.hydratingUserId && !state.recoveryMode) {
      window.setTimeout(() => hydrateUser(session.user), 0);
    }
  });

  state.client.auth.getSession().then(async ({ data, error }) => {
    if (error) {
      console.error("Sesi tidak dapat dipulihkan:", error);
      return;
    }
    if (state.recoveryMode) return;
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

  if (!isAllowedEmail(email) || !PANEL_EMAILS.includes(email)) {
    await state.client.auth.signOut();
    showLogin("Akun ini tidak memiliki akses ke panel admin. Gunakan akun pengelola yang terdaftar.");
    return;
  }

  state.hydratingUserId = user.id;
  try {
    const { data: profile, error } = await state.client
      .from("profiles")
      .select("id, full_name, email, role, blocked")
      .eq("id", user.id)
      .maybeSingle();

    if (error || !profile) {
      console.error("Profil tidak ditemukan:", error);
      await state.client.auth.signOut();
      showLogin("Profil akun belum tersedia. Pastikan skema Supabase sudah dipasang.");
      return;
    }
    if (profile.blocked) {
      await state.client.auth.signOut();
      showLogin("Akun ini sedang diblokir oleh pengelola.");
      return;
    }

    state.user = user;
    state.profile = profile;
    state.role = normalizeRole(profile.role);
    state.loginMessage = "";

    const name = (profile.full_name || "").trim() || email.split("@")[0];
    elements.accountName.textContent = name;
    elements.accountEmail.textContent = profile.email || email;
    elements.accountRole.textContent = ROLE_LABELS[state.role];
    elements.accountRole.className = `role-badge role-${state.role}`;

    showPanel();
    await refreshAll();
    renderView();
    if (state.role === "user") setAlert("Role akun pengelola ini belum tercatat di database. Jalankan berkas supabase_admin_panel.sql di Supabase SQL Editor.", "error");
  } catch (error) {
    console.error("Profil tidak dapat dimuat:", error);
    await state.client.auth.signOut();
    showLogin(friendlyError(error));
  } finally {
    state.hydratingUserId = null;
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = elements.loginEmail.value.trim().toLowerCase();
  const password = elements.loginPassword.value;

  if (!isAllowedEmail(email)) {
    showLogin("Gunakan akun email BPK PENABUR untuk masuk.");
    elements.loginEmail.focus();
    return;
  }
  if (!PANEL_EMAILS.includes(email)) {
    showLogin("Akun ini tidak memiliki akses ke panel admin.");
    elements.loginEmail.focus();
    return;
  }
  if (!password) {
    showLogin("Masukkan kata sandi akun Anda.");
    elements.loginPassword.focus();
    return;
  }

  const originalText = elements.loginSubmit.textContent;
  elements.loginSubmit.disabled = true;
  elements.loginSubmit.textContent = "Memeriksa…";
  state.loginMessage = "";
  try {
    const { data, error } = await state.client.auth.signInWithPassword({ email, password });
    if (error) {
      const lower = String(error.message || "").toLowerCase();
      showLogin(lower.includes("invalid") ? "Email atau kata sandi tidak sesuai." : friendlyError(error));
      return;
    }
    if (data && data.user) await hydrateUser(data.user);
  } catch (error) {
    showLogin(friendlyError(error));
  } finally {
    elements.loginSubmit.disabled = false;
    elements.loginSubmit.textContent = originalText;
  }
}

async function handleForgotPassword() {
  const email = elements.loginEmail.value.trim().toLowerCase();
  if (!isAllowedEmail(email)) {
    showLogin("Masukkan email BPK PENABUR yang valid terlebih dahulu.");
    elements.loginEmail.focus();
    return;
  }
  const button = document.getElementById("forgot-password");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Mengirim…";
  try {
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await state.client.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    showLogin("Jika email terdaftar, instruksi atur ulang kata sandi akan dikirim ke email tersebut.", "success");
  } catch (error) {
    showLogin(friendlyError(error));
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function handleGoogleLogin() {
  const button = elements.googleLogin;
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
    showLogin("Google login belum tersedia untuk panel admin.");
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
}

function showRecoveryMessage(text, type = "error") {
  elements.recoveryMessage.textContent = text;
  elements.recoveryMessage.hidden = !text;
  elements.recoveryMessage.classList.toggle("is-success", type === "success");
}

async function handleRecoverySubmit(event) {
  event.preventDefault();
  if (!state.client) {
    showRecoveryMessage("Supabase belum dikonfigurasi.");
    return;
  }
  const password = elements.recoveryPassword.value;
  const confirmation = elements.recoveryPasswordConfirm.value;
  if (password.length < 8) {
    showRecoveryMessage("Kata sandi baru minimal 8 karakter.");
    elements.recoveryPassword.focus();
    return;
  }
  if (password !== confirmation) {
    showRecoveryMessage("Konfirmasi kata sandi belum cocok.");
    elements.recoveryPasswordConfirm.focus();
    return;
  }

  elements.recoverySubmit.disabled = true;
  elements.recoverySubmit.textContent = "Menyimpan…";
  showRecoveryMessage("");
  try {
    const { error } = await state.client.auth.updateUser({ password });
    if (error) throw error;
    state.loginMessage = "Kata sandi berhasil diperbarui. Silakan masuk kembali.";
    state.loginType = "success";
    elements.recoveryForm.reset();
    const { error: signOutError } = await state.client.auth.signOut();
    if (signOutError) {
      state.recoveryMode = false;
      showLogin(state.loginMessage, "success");
    }
  } catch (error) {
    showRecoveryMessage(friendlyError(error));
  } finally {
    elements.recoverySubmit.disabled = false;
    elements.recoverySubmit.textContent = "Simpan kata sandi";
  }
}

async function returnFromRecovery() {
  state.recoveryMode = false;
  showLogin("");
  if (state.client) {
    const { error } = await state.client.auth.signOut();
    if (error) console.warn("Sesi pemulihan tidak dapat ditutup:", error);
  }
}

async function handleLogout() {
  elements.logoutButton.disabled = true;
  setAlert("");
  try {
    await state.client.auth.signOut();
    elements.loginPassword.value = "";
  } catch (error) {
    setAlert(friendlyError(error), "error");
  } finally {
    elements.logoutButton.disabled = false;
  }
}

async function refreshAll() {
  const results = await Promise.all(SOURCES.map((source) =>
    state.client.from(source.table).select(source.columns).order("created_at", { ascending: false }).limit(source.limit)
  ));

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
    ? `Sebagian data belum dapat dimuat (${failed.join(", ")}). Jalankan file supabase_admin_panel.sql di Supabase SQL Editor, lalu muat ulang halaman ini.`
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
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) throw new Error("Gunakan file JPG, PNG, atau WebP.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran gambar maksimum 5 MB.");
  const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
  const randomId = window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const path = `${state.user.id}/${Date.now()}-${randomId}.${extension}`;
  state.pendingImage = true;
  const { error } = await state.client.storage.from(bucket).upload(path, file, {
    cacheControl: "3600", contentType: file.type, upsert: false
  });
  state.pendingImage = false;
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
      aria-selected="${state.view === item.key}" data-action="go-view" data-view="${item.key}">${escapeHtml(item.label)}</button>`).join("");
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
  const statusOptions = options.statuses;
  return `
    <div class="panel-filters">
      <div class="filter-control">
        <label for="filter-search">Cari laporan</label>
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
          <option value="all">Semua status</option>${formatSelectOptions(statusOptions, filter.status)}
        </select>
      </div>
      <div class="filter-control">
        <label for="filter-color">Warna</label>
        <input id="filter-color" type="text" autocomplete="off" data-scope="${scope}" data-field="color" data-kind="text"
          placeholder="mis. hitam" value="${escapeAttribute(filter.color)}">
      </div>
      <div class="filter-control">
        <label for="filter-from">Tanggal dari</label>
        <input id="filter-from" type="date" data-scope="${scope}" data-field="from" data-kind="date" value="${escapeAttribute(dates.from)}">
      </div>
      <div class="filter-control">
        <label for="filter-to">Tanggal sampai</label>
        <input id="filter-to" type="date" data-scope="${scope}" data-field="to" data-kind="date" value="${escapeAttribute(dates.to)}">
      </div>
      <div class="filter-control" style="align-content:end">
        <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="${scope}">Reset filter</button>
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
  if (!reporter) return "Pelapor: akun tidak tersedia";
  return `Pelapor: ${escapeHtml(reporter.full_name || reporter.email)} · ${escapeHtml(reporter.email)}`;
}

function imageBlock(row, meta) {
  if (!row.image_path) {
    return `<div class="record-media">
      <div class="record-image"><div class="photo-missing">Belum ada foto</div></div>
      <div class="record-image-actions">
        <button class="button button-secondary button-small" type="button" data-action="upload-image"
          data-id="${escapeAttribute(row.id)}" data-meta="${meta}">Tambah foto</button>
      </div>
    </div>`;
  }
  return `<div class="record-media">
    <div class="record-image">${row.imageUrl ? renderImage(row.imageUrl, `Foto ${row.name || "barang"}`, "") : `<div class="photo-missing">Foto tidak dapat dimuat</div>`}</div>
    <div class="record-image-actions">
      <button class="button button-secondary button-small" type="button" data-action="upload-image"
        data-id="${escapeAttribute(row.id)}" data-meta="${meta}">Ganti foto</button>
      <button class="button button-danger button-small" type="button" data-action="delete-image"
        data-id="${escapeAttribute(row.id)}" data-meta="${meta}">Hapus foto</button>
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
  return detail ? `<p class="record-text"><strong>Dicocokkan dengan:</strong> ${detail}</p>` : "";
}

const VIEWS = {};

VIEWS.dashboard = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Panel pengelola</p>
          <h1>Ringkasan operasional</h1>
          <p>Pantau laporan masuk, hasil pengembalian barang, dan antrean yang membutuhkan tindakan petugas.</p>
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
        ${statCard("Barang hilang bulan ini", lostThisMonth, `Total laporan kehilangan ${lost.length}`)}
        ${statCard("Barang temuan bulan ini", foundThisMonth, `Total barang temuan ${found.length}`)}
        ${statCard("Tingkat pengembalian", `${successRate}%`, `${returned} barang berstatus selesai`)}
        ${statCard("Rata-rata waktu simpan", averageDays === null ? "—" : `${averageDays} hari`, durations.length ? `${durations.length} serah terima tercatat` : "Belum ada serah terima")}
        ${statCard("Klaim menunggu", pendingClaims, "Perlu verifikasi bukti kepemilikan")}
        ${statCard("Perlu moderasi", pendingModeration, "Laporan berstatus menunggu")}
        ${statCard("Akun diblokir", blockedUsers, `${state.data.profiles.length} pengguna terdaftar`)}
        ${statCard("Tiket terbuka", state.data.tickets.filter((row) => row.status !== "selesai").length, "Tiket moderasi belum ditutup")}
      </div>

      <div class="panel-grid">
        <section class="card">
          <h2>Kategori paling sering dilaporkan <span>hilang &amp; temuan</span></h2>
          ${topCategories.length ? `<div class="chart">${topCategories.map(([category, count], index) => `
            <div class="chart-row">
              <span class="chart-label">${escapeHtml(category)}</span>
              <span class="chart-track"><span class="chart-fill${index % 2 ? " is-alt" : ""}" style="width:${Math.max(6, Math.round((count / maxCategory) * 100))}%"></span></span>
              <span class="chart-value">${count}</span>
            </div>`).join("")}</div>`
            : emptyMarkup("Belum ada data kategori", "Grafik muncul setelah ada laporan dari pengguna.")}
        </section>

        <section class="card">
          <h2>Antrean tindakan</h2>
          <ul class="activity-list">
            ${actionQueue("Laporan menunggu moderasi", pendingModeration, "lost", "Periksa laporan baru sebelum tayang.")}
            ${actionQueue("Klaim menunggu verifikasi", pendingClaims, "claims", "Cocokkan bukti kepemilikan dengan barang.")}
            ${actionQueue("Pencocokan belum ditinjau", unreviewedMatches(), "matches", "Rekomendasi otomatis sistem menunggu validasi.")}
            ${actionQueue("Foto bukti klaim belum diperiksa", claimsWithEvidence(), "claims", "Bukti unggahan pemohon tersedia.")}
          </ul>
        </section>
      </div>

      <div class="panel-grid">
        <section class="card">
          <h2>Aktivitas pengelola terbaru</h2>
          ${activity.length ? `<ul class="activity-list">${activity.map((row) => `
            <li class="activity-item">
              <strong>${escapeHtml(ACTION_LABELS[row.action] || row.action)}</strong>
              <span>${escapeHtml(row.actor_email || "sistem")} · ${escapeHtml(formatDate(row.created_at))}</span>
            </li>`).join("")}</ul>`
            : emptyMarkup("Belum ada aktivitas", "Log audit akan terisi setelah pengelola melakukan tindakan.")}
        </section>

        <section class="card">
          <h2>Barang terbaru masuk</h2>
          ${found.length ? `<ul class="activity-list">${found.slice(0, 6).map((row) => `
            <li class="activity-item">
              <strong>${escapeHtml(row.name || "Tanpa nama")}</strong>
              <span>${escapeHtml(row.category || "Tanpa kategori")} · ${escapeHtml(formatDate(row.created_at))}</span>
            </li>`).join("")}</ul>`
            : emptyMarkup("Belum ada barang temuan", "Laporan barang ditemukan akan tampil di sini.")}
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
          <p class="section-kicker">Manajemen laporan</p>
          <h1>Laporan barang hilang</h1>
          <p>Verifikasi, moderasi, dan pantau seluruh laporan kehilangan yang dikirim pengguna.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <button class="button button-secondary" type="button" data-action="export" data-scope="lost">Ekspor CSV</button>
        </div>
      </div>
      ${filterBar("lost", {
        searchHint: "Nama barang, deskripsi, lokasi, pelapor…",
        statuses: [["pending", "Menunggu verifikasi"], ["under_review", "Dalam peninjauan"], ["matched", "Cocok"], ["resolved", "Selesai"], ["rejected", "Ditolak"]]
      })}
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.lost
      .filter((row) => matchesFilters(row, "lost", "lost_at", "last_seen_location"))
      .sort((a, b) => new Date(b.lost_at || b.created_at) - new Date(a.lost_at || a.created_at));

    if (state.loadError) return loadingMarkup("Data belum lengkap. Periksa skema database.");
    if (!rows.length) return emptyMarkup("Tidak ada laporan yang cocok", "Ubah kata kunci atau filter yang dipakai.");
    return `<div class="list-heading"><h2>Daftar laporan</h2><span>${rows.length} laporan</span></div>
      <div class="record-list">${rows.map((row) => lostCard(row, row.status)).join("")}</div>`;
  }
};

function lostCard(row, status) {
  const canModerate = atLeast(state.role, "moderator");
  const actions = [];
  if (canModerate) {
    if (row.status === "pending") {
      actions.push(actionButton("Mulai tinjau", "lost-status", row.id, ' data-status="under_review"', "button-primary"));
      actions.push(actionButton("Tolak", "lost-status", row.id, ' data-status="rejected"', "button-danger"));
    } else if (row.status === "under_review") {
      actions.push(actionButton("Tandai cocok", "lost-status", row.id, ' data-status="matched"', "button-primary"));
      actions.push(actionButton("Selesaikan", "lost-status", row.id, ' data-status="resolved"'));
      actions.push(actionButton("Tolak", "lost-status", row.id, ' data-status="rejected"', "button-danger"));
    } else if (row.status === "matched") {
      actions.push(actionButton("Tandai selesai", "lost-status", row.id, ' data-status="resolved"', "button-primary"));
    } else if (row.status === "rejected") {
      actions.push(actionButton("Tayangkan kembali", "lost-status", row.id, ' data-status="under_review"'));
    }
    actions.push(actionButton("Edit", "edit-lost", row.id));
    actions.push(actionButton("Riwayat", "show-history", row.id, ' data-type="lost"'));
  }
  if (atLeast(state.role, "admin")) {
    actions.push(actionButton("Hapus", "delete-record", row.id, ' data-meta="lost"', "button-danger"));
  }

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Laporan tanpa nama")}</h3></div>
      <div class="record-meta">
        <span>${escapeHtml(row.category || "Tanpa kategori")}</span>
        <span>Terakhir terlihat: ${escapeHtml(row.last_seen_location || "Belum dicatat")}</span>
        <span>Waktu hilang: ${escapeHtml(formatDate(row.lost_at || row.created_at))}</span>
        ${row.color ? `<span>Warna: ${escapeHtml(row.color)}</span>` : ""}
      </div>
      <p class="record-meta">${reporterLine(row)}</p>
      ${row.description ? `<p class="record-text">${escapeHtml(row.description)}</p>` : ""}
      ${row.distinctive_features ? `<p class="record-text"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
      ${row.additional_info ? `<p class="record-text"><strong>Informasi tambahan:</strong> ${escapeHtml(row.additional_info)}</p>` : ""}
      ${imageBlock(row, "lost")}
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
          <p class="section-kicker">Manajemen laporan</p>
          <h1>Barang temuan</h1>
          <p>Kelola data barang yang ditemukan: moderasi tayang, perbarui foto, dan catat lokasi penyimpanan.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <button class="button button-secondary" type="button" data-action="export" data-scope="found">Ekspor CSV</button>
        </div>
      </div>
      ${filterBar("found", {
        searchHint: "Nama barang, ciri, lokasi temuan…",
        statuses: [["pending", "Menunggu verifikasi"], ["available", "Tersedia"], ["claimed", "Sudah diklaim"], ["matched", "Cocok"], ["resolved", "Selesai"], ["archived", "Diarsipkan"], ["rejected", "Ditolak"]]
      })}
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.found
      .filter((row) => matchesFilters(row, "found", "found_at", "location_found"))
      .sort((a, b) => new Date(b.found_at || b.created_at) - new Date(a.found_at || a.created_at));

    if (state.loadError) return loadingMarkup("Data belum lengkap. Periksa skema database.");
    if (!rows.length) return emptyMarkup("Tidak ada barang yang cocok", "Ubah kata kunci atau filter yang dipakai.");
    return `<div class="list-heading"><h2>Daftar barang</h2><span>${rows.length} barang</span></div>
      <div class="record-list">${rows.map((row) => foundCard(row)).join("")}</div>`;
  }
};

function foundCard(row) {
  const canModerate = atLeast(state.role, "moderator");
  const canHandle = atLeast(state.role, "staff");
  const actions = [];
  if (row.status === "pending" && canModerate) {
    actions.push(actionButton("Setujui & tayangkan", "found-status", row.id, ' data-status="available"', "button-primary"));
    actions.push(actionButton("Tolak", "found-status", row.id, ' data-status="rejected"', "button-danger"));
  } else if (row.status === "available") {
    if (canHandle) actions.push(actionButton("Tandai diklaim", "found-status", row.id, ' data-status="claimed"', "button-primary"));
    if (canModerate) actions.push(actionButton("Arsipkan", "found-status", row.id, ' data-status="archived"'));
  } else if (row.status === "claimed") {
    if (canHandle) actions.push(actionButton("Sudah diserahkan", "found-status", row.id, ' data-status="resolved"', "button-primary"));
    if (canModerate) actions.push(actionButton("Arsipkan", "found-status", row.id, ' data-status="archived"'));
  } else if (row.status === "matched") {
    if (canHandle) actions.push(actionButton("Tandai diklaim", "found-status", row.id, ' data-status="claimed"', "button-primary"));
  } else if (row.status === "rejected") {
    if (canModerate) actions.push(actionButton("Tayangkan", "found-status", row.id, ' data-status="available"'));
  }
  if (canModerate) {
    actions.push(actionButton("Edit", "edit-found", row.id));
    actions.push(actionButton("Riwayat", "show-history", row.id, ' data-type="found"'));
  }
  if (atLeast(state.role, "admin")) {
    actions.push(actionButton("Hapus", "delete-record", row.id, ' data-meta="found"', "button-danger"));
  }

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Barang tanpa nama")}</h3></div>
      <div class="record-meta">
        <span>${escapeHtml(row.category || "Tanpa kategori")}</span>
        <span>Lokasi temuan: ${escapeHtml(row.location_found || "Belum dicatat")}</span>
        <span>Ditemukan: ${escapeHtml(formatDate(row.found_at || row.created_at))}</span>
        ${row.color ? `<span>Warna: ${escapeHtml(row.color)}</span>` : ""}
        ${row.storage_location ? `<span>Penyimpanan: ${escapeHtml(row.storage_location)}</span>` : ""}
      </div>
      <p class="record-meta">${reporterLine(row)}</p>
      ${row.description ? `<p class="record-text">${escapeHtml(row.description)}</p>` : ""}
      ${row.distinctive_features ? `<p class="record-text"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
      ${imageBlock(row, "found")}
      ${matchSummary(row.id, "found")}
    </div>
    ${actions.length ? `<div class="record-actions">${actions.join("")}</div>` : ""}
  </article>`;
}

VIEWS.matches = {
  shell() {
    const minimum = state.filters.matches.min;
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Pencocokan pintar</p>
          <h1>Rekomendasi &amp; pencocokan manual</h1>
          <p>Sistem menghitung kemiripan kategori, warna, lokasi, nama barang, dan jarak waktu antara laporan hilang dan barang temuan.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <label class="field" style="min-width:150px">
            <span>Ambang kemiripan</span>
            <select class="inline-select" data-scope="matches" data-field="min" data-kind="value">
              ${formatSelectOptions([["50", "50% ke atas"], ["60", "60% ke atas"], ["70", "70% ke atas"], ["80", "80% ke atas"]], minimum)}
            </select>
          </label>
          <button class="button button-primary" type="button" data-action="run-matching">Jalankan pencocokan otomatis</button>
          <button class="button button-secondary" type="button" data-action="manual-match">Pencocokan manual</button>
        </div>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    if (atLeast(state.role, "moderator") === false) {
      return emptyMarkup("Akses terbatas", "Fitur pencocokan tersedia untuk moderator ke atas.");
    }
    const suggestions = computeSuggestions();
    const saved = state.data.matches.slice(0, 40);

    return `
      <h2 class="section-title">Rekomendasi otomatis <span class="list-heading"></span></h2>
      <p class="helper-note">Ditemukan ${suggestions.length} pasangan dengan kemiripan di atas ${escapeHtml(state.filters.matches.min)}%. Konfirmasi pasangan yang benar agar laporan ditandai cocok dan pemilik menerima notifikasi.</p>
      ${suggestions.length ? `<div class="record-list">${suggestions.map(matchCard).join("")}</div>`
        : emptyMarkup("Belum ada rekomendasi", "Tambahkan laporan hilang dan barang temuan, lalu jalankan pencocokan otomatis.")}

      <h2 class="section-title">Riwayat pencocokan</h2>
      ${saved.length ? `<div class="record-list">${saved.map(savedMatchCard).join("")}</div>`
        : emptyMarkup("Belum ada pencocokan tersimpan", "Pasangan yang Anda konfirmasi atau abaikan akan tercatat di sini.")}`;
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

  const nameScore = Math.max(tokenSimilarity(found.name, lost.name), tokenSimilarity(`${found.description} ${found.distinctive_features}`, `${lost.description} ${lost.distinctive_features}`));
  score += nameScore * 30;
  weight += 30;
  if (nameScore >= 0.5) reasons.push("Nama/deskripsi mirip");

  if (found.category && lost.category) {
    if (found.category === lost.category) {
      score += 20;
      reasons.push("Kategori sama");
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
      reasons.push("Warna sama");
    }
    weight += 15;
  } else {
    score += 9;
    weight += 15;
  }

  const locationScore = tokenSimilarity(found.location_found, lost.last_seen_location);
  if (found.location_found && lost.last_seen_location) {
    score += locationScore * 20;
    if (locationScore >= 0.5) reasons.push("Lokasi berdekatan");
  } else {
    score += 10;
  }
  weight += 20;

  const days = differenceInDays(found.found_at || found.created_at, lost.lost_at || lost.created_at);
  if (days === null) {
    score += 8;
  } else if (days <= 1) {
    score += 15;
    reasons.push("Selisih waktu ≤ 1 hari");
  } else if (days <= 3) {
    score += 12;
    reasons.push(`Selisih ${Math.round(days)} hari`);
  } else if (days <= 7) {
    score += 8;
    reasons.push(`Selisih ${Math.round(days)} hari`);
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
          <h4>Hilang · ${escapeHtml(entry.lost.name || "Tanpa nama")}</h4>
          <p>${escapeHtml(entry.lost.category || "Tanpa kategori")} · ${escapeHtml(entry.lost.last_seen_location || "Lokasi belum dicatat")} · ${escapeHtml(formatDate(entry.lost.lost_at || entry.lost.created_at))}</p>
        </div>
        <div class="match-arrow" aria-hidden="true">↔</div>
        <div class="match-side">
          <h4>Temuan · ${escapeHtml(entry.found.name || "Tanpa nama")}</h4>
          <p>${escapeHtml(entry.found.category || "Tanpa kategori")} · ${escapeHtml(entry.found.location_found || "Lokasi belum dicatat")} · ${escapeHtml(formatDate(entry.found.found_at || entry.found.created_at))}</p>
        </div>
      </div>
      <div class="match-reasons">
        <span class="score-badge ${scoreClass(entry.score)}">Kemiripan ${entry.score}%</span>
        ${entry.reasons.map((reason) => `<span class="reason">${escapeHtml(reason)}</span>`).join("")}
      </div>
    </div>
    ${canValidate ? `<div class="record-actions">
      <button class="button button-primary button-small" type="button" data-action="confirm-suggestion"
        data-found="${escapeAttribute(entry.found.id)}" data-lost="${escapeAttribute(entry.lost.id)}" data-score="${entry.score}">Konfirmasi</button>
      <button class="button button-secondary button-small" type="button" data-action="dismiss-suggestion"
        data-found="${escapeAttribute(entry.found.id)}" data-lost="${escapeAttribute(entry.lost.id)}" data-score="${entry.score}">Abaikan</button>
      <button class="button button-quiet button-small" type="button" data-action="go-view" data-view="lost">Buka laporan hilang</button>
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
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(lost ? lost.name : "Laporan hilang")} ↔ ${escapeHtml(found ? found.name : "Barang temuan")}</h3></div>
      <div class="record-meta">
        <span class="score-badge ${scoreClass(row.score)}">Kemiripan ${row.score}%</span>
        <span>${row.method === "manual" ? "Pencocokan manual" : "Pencocokan otomatis"}</span>
        <span>Dibuat ${escapeHtml(formatDate(row.created_at))}</span>
        ${reviewer ? `<span>Ditinjau: ${escapeHtml(reviewer.full_name || reviewer.email)}</span>` : ""}
      </div>
    </div>
    ${canValidate && row.status === "suggested" ? `<div class="record-actions">
      <button class="button button-primary button-small" type="button" data-action="confirm-match" data-id="${row.id}">Konfirmasi</button>
      <button class="button button-secondary button-small" type="button" data-action="dismiss-match" data-id="${row.id}">Abaikan</button>
    </div>` : ""}
  </article>`;
}

VIEWS.claims = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Klaim &amp; serah terima</p>
          <h1>Verifikasi kepemilikan</h1>
          <p>Periksa bukti kepemilikan, catat berita acara serah terima, dan ikuti alur status laporan.</p>
        </div>
      </div>
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari pemohon / barang</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="claims" data-field="search" data-kind="text"
            placeholder="Nama, email, nama barang…" value="${escapeAttribute(state.filters.claims.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-status">Status klaim</label>
          <select id="filter-status" data-scope="claims" data-field="status" data-kind="value">
            <option value="all">Semua status</option>
            ${formatSelectOptions([["pending", "Menunggu"], ["approved", "Disetujui"], ["rejected", "Ditolak"], ["completed", "Selesai"]], state.filters.claims.status)}
          </select>
        </div>
        <div class="filter-control" style="align-content:end">
          <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="claims">Reset filter</button>
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

    if (!rows.length) return emptyMarkup("Belum ada pengajuan klaim", "Klaim dari pengguna akan tampil di halaman ini.");

    return `<div class="list-heading"><h2>Pengajuan klaim</h2><span>${rows.length} klaim</span></div>
      <div class="record-list">${rows.map(claimCard).join("")}</div>

      <h2 class="section-title">Log status barang</h2>
      ${state.data.history.length ? `<div class="table-wrap"><table class="data-table">
        <thead><tr><th>Waktu</th><th>Barang</th><th>Perubahan status</th><th>Oleh</th></tr></thead>
        <tbody>${state.data.history.slice(0, 25).map((row) => {
          const item = row.item_type === "found" ? state.maps.found[row.item_id] : row.item_type === "lost" ? state.maps.lost[row.item_id] : null;
          const claimItem = row.item_type === "claim" ? state.maps.found[(state.maps.claims[row.item_id] || {}).found_item_id] : null;
          const label = item ? item.name : claimItem ? `Klaim · ${claimItem.name}` : "Laporan";
          const actor = state.maps.profiles[row.changed_by];
          return `<tr>
            <td>${escapeHtml(formatDate(row.created_at))}</td>
            <td class="cell-name">${escapeHtml(label || "Laporan")}</td>
            <td>${escapeHtml(STATUS_LABELS[row.previous_status] || row.previous_status || "—")} → ${escapeHtml(STATUS_LABELS[row.new_status] || row.new_status)}</td>
            <td>${escapeHtml(actor ? (actor.full_name || actor.email) : "Sistem")}</td>
          </tr>`;
        }).join("")}</tbody>
      </table></div>` : emptyMarkup("Belum ada riwayat status", "Riwayat tercatat otomatis saat status laporan berubah.")}`;
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
  if (item) actions.push(actionButton("Buka barang", "open-item", item.id));
  if (row.evidence_path) actions.push(actionButton("Lihat bukti", "claim-evidence", row.id));
  if (atLeast(state.role, "admin")) actions.push(actionButton("Hapus klaim", "delete-record", row.id, ' data-meta="claims"', "button-danger"));

  return `<article class="record">
    <div class="record-main">
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(item ? item.name : "Barang tidak tersedia")}</h3></div>
      <div class="record-meta">
        <span>Pemohon: ${escapeHtml(claimant ? (claimant.full_name || claimant.email) : "Akun tidak tersedia")}</span>
        <span>${escapeHtml(claimant ? claimant.email : "")}</span>
        <span>Diajukan ${escapeHtml(formatDate(row.created_at))}</span>
        ${reviewer ? `<span>Diverifikasi: ${escapeHtml(reviewer.full_name || reviewer.email)}</span>` : ""}
      </div>
      ${row.proof_description ? `<p class="record-proof">${escapeHtml(row.proof_description)}</p>` : ""}
      ${row.review_note ? `<p class="record-text"><strong>Catatan verifikasi:</strong> ${escapeHtml(row.review_note)}</p>` : ""}
      ${handover ? `<p class="record-text"><strong>Serah terima:</strong> ${escapeHtml(handover.receiver_name)} · ${escapeHtml(formatDate(handover.created_at))}${handover.signature_path ? " · berita acara terlampir" : ""}</p>` : ""}
      ${item ? `<div class="record-meta"><span>Status barang saat ini: ${escapeHtml(STATUS_LABELS[item.status] || item.status)}</span><span>Penyimpanan: ${escapeHtml(item.storage_location || "Belum dicatat")}</span></div>` : ""}
    </div>
    ${actions.length ? `<div class="record-actions">${actions.join("")}</div>` : ""}
  </article>`;
}

VIEWS.users = {
  shell() {
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Manajemen pengguna</p>
          <h1>Pengguna &amp; hak akses</h1>
          <p>Atur role petugas, blokir akun palsu, dan tinjau keaktifan pengguna.</p>
        </div>
      </div>
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari pengguna</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="users" data-field="search" data-kind="text"
            placeholder="Nama atau email…" value="${escapeAttribute(state.filters.users.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-role">Role</label>
          <select id="filter-role" data-scope="users" data-field="role" data-kind="value">
            <option value="all">Semua role</option>
            ${formatSelectOptions(Object.entries(ROLE_LABELS), state.filters.users.role)}
          </select>
        </div>
        <div class="filter-control">
          <label for="filter-status">Status akun</label>
          <select id="filter-status" data-scope="users" data-field="status" data-kind="value">
            <option value="all">Semua status</option>
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

    if (!rows.length) return emptyMarkup("Tidak ada pengguna yang cocok", "Ubah filter pencarian.");

    const canManage = atLeast(state.role, "admin");
    return `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>Pengguna</th><th>Role</th><th>Status</th><th>Laporan</th><th>Aktivitas</th><th></th></tr></thead>
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
        if (canManage) actions.push(actionButton("Notifikasi", "notify-user", row.id));
        actions.push(actionButton("Riwayat", "user-history", row.id));
        return `<tr>
          <td>
            <span class="cell-name">${escapeHtml(row.full_name || "(tanpa nama)")}${isSelf ? " · Anda" : ""}</span><br>
            <span style="color:var(--muted);font-size:11.5px">${escapeHtml(row.email || "")}</span>
            ${row.blocked && row.blocked_reason ? `<br><span style="color:var(--danger);font-size:11.5px">Alasan blokir: ${escapeHtml(row.blocked_reason)}</span>` : ""}
          </td>
          <td>${canManage && !isSelf && !privileged
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
          <h1>Pengumuman pengguna</h1>
          <p>Kirim pengumuman yang langsung tampil di halaman utama pengguna.</p>
        </div>
        <button class="button button-primary" type="button" data-action="new-announcement">Buat pengumuman</button>
      </div>
      <div id="view-region"></div>`;
  },
  region() {
    const rows = state.data.announcements.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (!rows.length) return emptyMarkup("Belum ada pengumuman", "Buat pengumuman pertama untuk ditampilkan di halaman pengguna.");
    return `<div class="record-list">${rows.map((row) => {
      const author = state.maps.profiles[row.created_by];
      const active = row.is_published && (!row.expires_at || new Date(row.expires_at) > new Date());
      return `<article class="record">
        <div class="record-main">
          <div class="record-title">
            <span class="status-badge ${active ? "status-available" : "status-archived"}">${active ? "Tayang" : row.is_published ? "Kedaluwarsa" : "Draf"}</span>
            <h3>${escapeHtml(row.title || "Tanpa judul")}</h3>
            <span class="reason">${escapeHtml(LEVEL_LABELS[row.level] || row.level)}</span>
          </div>
          <div class="record-meta">
            <span>Dibuat ${escapeHtml(formatDate(row.created_at))}</span>
            ${row.published_at ? `<span>Terbit ${escapeHtml(formatDate(row.published_at))}</span>` : ""}
            ${row.expires_at ? `<span>Berakhir ${escapeHtml(formatDate(row.expires_at))}</span>` : ""}
            ${author ? `<span>Oleh ${escapeHtml(author.full_name || author.email)}</span>` : ""}
          </div>
          ${row.body ? `<p class="record-text">${escapeHtml(row.body)}</p>` : ""}
        </div>
        <div class="record-actions">
          <button class="button ${row.is_published ? "button-secondary" : "button-primary"} button-small" type="button"
            data-action="toggle-announcement" data-id="${escapeAttribute(row.id)}" data-published="${row.is_published ? "false" : "true"}">
            ${row.is_published ? "Tarik dari halaman pengguna" : "Terbitkan"}
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
          <p class="section-kicker">Komunikasi</p>
          <h1>Notifikasi &amp; tiket moderasi</h1>
          <p>Kirim pemberitahuan ke pengguna dan catat penanganan tiket percakapan atau laporan konten.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <button class="button button-primary" type="button" data-action="new-notification">Kirim notifikasi</button>
          <button class="button button-secondary" type="button" data-action="new-ticket">Tambah tiket</button>
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
        <h2>Tiket moderasi <span>percakapan, konten, dan indikasi penipuan</span></h2>
        <div class="filter-control" style="max-width:280px;margin-bottom:12px">
          <label for="filter-status">Status tiket</label>
          <select id="filter-status" data-scope="communication" data-field="status" data-kind="value">
            <option value="all">Semua status</option>
            ${formatSelectOptions(TICKET_STATUSES.map((value) => [value, STATUS_LABELS[value] || value]), filter.status)}
          </select>
        </div>
        ${tickets.length ? `<div class="record-list">${tickets.map(ticketCard).join("")}</div>`
          : emptyMarkup("Belum ada tiket", "Tiket moderasi membantu mencatat tindak lanjut percakapan antar-pengguna.")}
      </section>

      <section class="card" style="margin-top:14px">
        <h2>Notifikasi terakhir <span>12 pengiriman terbaru</span></h2>
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
        </table></div>` : emptyMarkup("Belum ada notifikasi", "Notifikasi otomatis tercatat saat klaim dan pencocokan diproses.")}
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
      <div class="record-title">${statusBadge(row.status)}<h3>${escapeHtml(row.category || "Tiket")}</h3></div>
      <div class="record-meta">
        <span>Pengguna: ${escapeHtml(subject ? (subject.full_name || subject.email) : "Tidak diketahui")}</span>
        <span>Dibuka oleh: ${escapeHtml(opener ? (opener.full_name || opener.email) : "Sistem")}</span>
        <span>${escapeHtml(formatDate(row.created_at))}</span>
      </div>
      ${row.detail ? `<p class="record-text">${escapeHtml(row.detail)}</p>` : ""}
      ${row.resolution ? `<p class="record-proof"><strong>Tindak lanjut:</strong> ${escapeHtml(row.resolution)}</p>` : ""}
    </div>
    <div class="record-actions">
      ${actions.join("")}
      <button class="button button-secondary button-small" type="button" data-action="ticket-note" data-id="${escapeAttribute(row.id)}">Catat tindak lanjut</button>
    </div>
  </article>`;
}

VIEWS.audit = {
  shell() {
    const actions = Object.keys(ACTION_LABELS);
    return `
      <div class="page-heading">
        <div>
          <p class="section-kicker">Audit trail</p>
          <h1>Log aktivitas pengelola</h1>
          <p>Setiap perubahan status, penghapusan, dan keputusan klaim tercatat otomatis beserta pelakunya.</p>
        </div>
        <div class="form-actions" style="margin:0;padding:0;border:0">
          <button class="button button-secondary" type="button" data-action="export" data-scope="audit">Ekspor CSV</button>
        </div>
      </div>
      <div class="panel-filters three">
        <div class="filter-control">
          <label for="filter-search">Cari aktivitas</label>
          <input id="filter-search" type="search" autocomplete="off" data-scope="audit" data-field="search" data-kind="text"
            placeholder="Email pengelola, nama barang…" value="${escapeAttribute(state.filters.audit.search)}">
        </div>
        <div class="filter-control">
          <label for="filter-action">Jenis tindakan</label>
          <select id="filter-action" data-scope="audit" data-field="action" data-kind="value">
            <option value="all">Semua tindakan</option>
            ${formatSelectOptions(actions.map((key) => [key, ACTION_LABELS[key]]), state.filters.audit.action)}
          </select>
        </div>
        <div class="filter-control" style="align-content:end">
          <button class="button button-quiet button-small" type="button" data-action="reset-filters" data-scope="audit">Reset filter</button>
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

    if (!rows.length) return emptyMarkup("Belum ada catatan aktivitas", "Log akan terisi otomatis setelah ada tindakan pengelola.");
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
  if (detail.judul) return `“${detail.judul}”${typeof detail.terbit === "boolean" ? (detail.terbit ? " · tayang" : " · draf") : ""}`;
  if (detail.role) return `Role baru: ${ROLE_LABELS[detail.role] || detail.role}`;
  if (detail.status) return `Status: ${STATUS_LABELS[detail.status] || detail.status}${detail.catatan ? ` · ${detail.catatan}` : ""}`;
  if (detail.penerima) return `Penerima: ${detail.penerima}`;
  if (detail.skor !== undefined) return `Kemiripan ${detail.skor}%`;
  if (detail.alasan) return `Alasan: ${detail.alasan}`;
  if (detail.nama) return detail.nama;
  return "";
}

async function updateStatus(table, id, status, successMessage) {
  const payload = { status, updated_at: new Date().toISOString() };
  const { error } = await state.client.from(table).update(payload).eq("id", id);
  if (error) {
    setAlert(friendlyError(error), "error");
    return;
  }
  await refreshAll();
  renderView();
  setAlert(successMessage || "Status berhasil diperbarui.", "success");
}

async function deleteRecord(meta, id) {
  const config = {
    found: { table: "found_items", label: "barang temuan ini", bucket: "found-items" },
    lost: { table: "lost_reports", label: "laporan kehilangan ini", bucket: "lost-reports" },
    claims: { table: "claims", label: "pengajuan klaim ini" },
    announcements: { table: "announcements", label: "pengumuman ini" }
  }[meta];
  if (!config) return;

  const approved = await confirmAction({
    title: "Konfirmasi penghapusan",
    message: `Hapus ${config.label}? Data dan foto terkait akan dihapus permanen dan tercatat di log audit.`,
    confirmLabel: "Hapus permanen"
  });
  if (!approved) return;

  try {
    if (config.bucket) {
      const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
      if (source && source.image_path) await removeStoredImage(config.bucket, source.image_path);
    }
    const { error } = await state.client.from(config.table).delete().eq("id", id);
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert("Data berhasil dihapus dan tercatat pada log audit.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

function pickImageFile() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.addEventListener("change", () => resolve(input.files && input.files[0] ? input.files[0] : null), { once: true });
    input.addEventListener("cancel", () => resolve(null), { once: true });
    input.click();
  });
}

async function changeItemImage(meta, id) {
  const config = { found: { table: "found_items", bucket: "found-items" }, lost: { table: "lost_reports", bucket: "lost-reports" } }[meta];
  if (!config) return;
  const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
  const file = await pickImageFile();
  if (!file) return;

  try {
    const path = await uploadImage(file, config.bucket);
    const { error } = await state.client.from(config.table).update({ image_path: path, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      await removeStoredImage(config.bucket, path);
      throw error;
    }
    if (source && source.image_path) await removeStoredImage(config.bucket, source.image_path);
    await refreshAll();
    renderView();
    setAlert("Foto barang berhasil diperbarui.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function deleteItemImage(meta, id) {
  const config = { found: { table: "found_items", bucket: "found-items" }, lost: { table: "lost_reports", bucket: "lost-reports" } }[meta];
  if (!config) return;
  const source = meta === "found" ? state.maps.found[id] : state.maps.lost[id];
  const approved = await confirmAction({
    title: "Hapus foto",
    message: "Foto barang ini akan dihapus dari penyimpanan. Data laporan tetap tersimpan dan tindakan ini tercatat di log audit.",
    confirmLabel: "Hapus foto"
  });
  if (!approved) return;

  try {
    const { error } = await state.client.from(config.table).update({ image_path: null, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw error;
    if (source && source.image_path) await removeStoredImage(config.bucket, source.image_path);
    await refreshAll();
    renderView();
    setAlert("Foto barang dihapus.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

async function runMatching() {
  const suggestions = computeSuggestions();
  if (!suggestions.length) {
    setAlert("Tidak ada pasangan baru yang melewati ambang kemiripan saat ini.", "info");
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
    setAlert(`${suggestions.length} rekomendasi pencocokan disimpan dan menunggu validasi Anda.`, "success");
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
    setAlert("Pencocokan dikonfirmasi. Pemilik laporan kehilangan menerima notifikasi.", "success");
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
    setAlert("Rekomendasi diabaikan dan tidak dimunculkan lagi.", "info");
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
    setAlert(decision === "confirm" ? "Pencocokan dikonfirmasi." : "Pencocokan diabaikan.", "success");
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
      approved: "Klaim disetujui. Barang ditandai sudah diklaim dan pemohon menerima notifikasi.",
      rejected: "Klaim ditolak dan status barang dikembalikan menjadi tersedia.",
      completed: "Barang ditandai sudah diserahkan."
    };
    setAlert(messages[status] || "Klaim diperbarui.", "success");
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
    setAlert("Berita acara serah terima tercatat. Barang ditandai selesai.", "success");
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

    const buttons = elements.dialogRoot.querySelectorAll("[data-confirm]");
    buttons.forEach((button) => button.addEventListener("click", () => {
      closeModal();
      resolve(button.dataset.confirm === "true");
    }, { once: true }));
    const backdrop = elements.dialogRoot.querySelector("[data-action='modal-backdrop']");
    if (backdrop) {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) {
          closeModal();
          resolve(false);
        }
      });
    }
  });
}

function openFoundEditor(id) {
  const item = state.maps.found[id];
  if (!item) return;
  openModal(`
    ${modalHeader("Edit barang temuan", "Perbarui data barang yang tampil di halaman pengguna.")}
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
          <label class="field" for="edit-location"><span>Lokasi ditemukan</span>
            <input id="edit-location" name="location_found" type="text" maxlength="180" required value="${escapeAttribute(item.location_found || "")}"></label>
          <label class="field" for="edit-storage"><span>Lokasi penyimpanan</span>
            <input id="edit-storage" name="storage_location" type="text" maxlength="180" value="${escapeAttribute(item.storage_location || "")}"></label>
          <label class="field" for="edit-color"><span>Warna dominan</span>
            <input id="edit-color" name="color" type="text" maxlength="40" value="${escapeAttribute(item.color || "")}"></label>
          <label class="field" for="edit-date"><span>Tanggal / waktu ditemukan</span>
            <input id="edit-date" name="found_at" type="datetime-local" required value="${escapeAttribute(toLocalInput(item.found_at))}"></label>
          <label class="field field-full" for="edit-additional"><span>Informasi tambahan</span>
            <textarea id="edit-additional" name="additional_info" maxlength="1500">${escapeHtml(item.additional_info || "")}</textarea></label>
          <label class="field" for="edit-status"><span>Status</span>
            <select id="edit-status" name="status">
              ${formatSelectOptions([["pending", "Menunggu verifikasi"], ["available", "Tersedia"], ["claimed", "Sudah diklaim"], ["matched", "Cocok"], ["resolved", "Selesai"], ["archived", "Diarsipkan"], ["rejected", "Ditolak"]], item.status)}
            </select></label>
          <label class="field" for="edit-image"><span>Ganti foto <span class="field-hint">(opsional)</span></span>
            <input id="edit-image" name="image" type="file" accept="image/jpeg,image/png,image/webp">
            <span class="field-hint">JPG, PNG, atau WebP · maksimum 5 MB.</span></label>
        </div>
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
    setAlert("Perubahan barang temuan disimpan.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openLostEditor(id) {
  const item = state.maps.lost[id];
  if (!item) return;
  openModal(`
    ${modalHeader("Edit laporan kehilangan", "Perbarui data laporan milik pengguna.")}
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
          <label class="field field-full" for="edit-description"><span>Deskripsi</span>
            <textarea id="edit-description" name="description" required minlength="5" maxlength="2000">${escapeHtml(item.description || "")}</textarea></label>
          <label class="field field-full" for="edit-features"><span>Ciri khusus</span>
            <textarea id="edit-features" name="distinctive_features" maxlength="1500">${escapeHtml(item.distinctive_features || "")}</textarea></label>
          <label class="field" for="edit-location"><span>Lokasi terakhir terlihat</span>
            <input id="edit-location" name="last_seen_location" type="text" maxlength="180" required value="${escapeAttribute(item.last_seen_location || "")}"></label>
          <label class="field" for="edit-color"><span>Warna dominan</span>
            <input id="edit-color" name="color" type="text" maxlength="40" value="${escapeAttribute(item.color || "")}"></label>
          <label class="field" for="edit-date"><span>Tanggal / waktu hilang</span>
            <input id="edit-date" name="lost_at" type="datetime-local" required value="${escapeAttribute(toLocalInput(item.lost_at))}"></label>
          <label class="field" for="edit-status"><span>Status</span>
            <select id="edit-status" name="status">
              ${formatSelectOptions([["pending", "Menunggu verifikasi"], ["under_review", "Dalam peninjauan"], ["matched", "Cocok"], ["resolved", "Selesai"], ["rejected", "Ditolak"]], item.status)}
            </select></label>
          <label class="field field-full" for="edit-additional"><span>Informasi tambahan</span>
            <textarea id="edit-additional" name="additional_info" maxlength="1500">${escapeHtml(item.additional_info || "")}</textarea></label>
          <label class="field field-full" for="edit-image"><span>Pasang foto <span class="field-hint">(opsional)</span></span>
            <input id="edit-image" name="image" type="file" accept="image/jpeg,image/png,image/webp">
            <span class="field-hint">JPG, PNG, atau WebP · maksimum 5 MB.</span></label>
        </div>
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
    setAlert("Perubahan laporan kehilangan disimpan.", "success");
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
    ${modalHeader(row ? "Edit pengumuman" : "Buat pengumuman", "Pengumuman tayang langsung di halaman utama pengguna setelah diterbitkan.")}
    <div class="panel-modal-content">
      <form id="panel-announcement" data-id="${escapeAttribute(row ? row.id : "")}">
        <div class="form-grid">
          <label class="field field-full" for="ann-title"><span>Judul</span>
            <input id="ann-title" name="title" type="text" required maxlength="140" value="${escapeAttribute(row ? row.title : "")}"></label>
          <label class="field" for="ann-level"><span>Tingkat prioritas</span>
            <select id="ann-level" name="level">
              ${formatSelectOptions([["info", "Informasi"], ["penting", "Penting"], ["urgent", "Urgent"]], row ? row.level : "info")}
            </select></label>
          <label class="field" for="ann-expires"><span>Berakhir pada <span class="field-hint">(opsional)</span></span>
            <input id="ann-expires" name="expires_at" type="date" value="${escapeAttribute(expires)}"></label>
          <label class="field field-full" for="ann-body"><span>Isi pengumuman</span>
            <textarea id="ann-body" name="body" required maxlength="2000">${escapeHtml(row ? row.body : "")}</textarea></label>
          <label class="field field-full" for="ann-publish"><span>Status terbit</span>
            <select id="ann-publish" name="is_published">
              ${formatSelectOptions([["false", "Simpan sebagai draf"], ["true", "Terbitkan sekarang"]], row && row.is_published ? "true" : "false")}
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
    } else {
      const { error } = await state.client.from("announcements").insert({ ...payload, created_by: state.user.id });
      if (error) throw error;
    }

    if (publish) {
      const announcementId = id || (await latestAnnouncementId());
      if (announcementId) await state.client.rpc("panel_publish_announcement", { p_id: announcementId, p_published: true });
    }

    closeModal();
    await refreshAll();
    renderView();
    setAlert(publish ? "Pengumuman diterbitkan dan pengguna menerima notifikasi." : "Pengumuman disimpan sebagai draf.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function latestAnnouncementId() {
  const { data, error } = await state.client.from("announcements").select("id").order("created_at", { ascending: false }).limit(1);
  if (error || !data || !data.length) return null;
  return data[0].id;
}

async function toggleAnnouncement(id, publish) {
  try {
    const { error } = await state.client.rpc("panel_publish_announcement", { p_id: id, p_published: publish });
    if (error) throw error;
    await refreshAll();
    renderView();
    setAlert(publish ? "Pengumuman tayang di halaman pengguna." : "Pengumuman ditarik dari halaman pengguna.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
  }
}

function openNotificationForm(presetUserId) {
  const options = state.data.profiles
    .filter((row) => !row.blocked)
    .map((row) => [row.id, `${row.full_name || "(tanpa nama)"} · ${row.email}`]);
  openModal(`
    ${modalHeader("Kirim notifikasi", "Notifikasi tampil pada daftar pemberitahuan pengguna.")}
    <div class="panel-modal-content">
      <p class="notice">Email notifikasi dikirim oleh Supabase bila pengiriman email diaktifkan pada project. Panel ini mencatat notifikasi dalam sistem.</p>
      <form id="panel-notification">
        <div class="form-grid">
          <label class="field field-full" for="notif-target"><span>Penerima</span>
            <select id="notif-target" name="target" required>
              <option value="all">Semua pengguna aktif</option>
              ${formatSelectOptions(options, presetUserId || "")}
            </select></label>
          <label class="field field-full" for="notif-title"><span>Judul</span>
            <input id="notif-title" name="title" type="text" required maxlength="140"></label>
          <label class="field field-full" for="notif-body"><span>Isi pesan</span>
            <textarea id="notif-body" name="body" maxlength="1000" required></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Kirim</button>
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
    if (!recipients.length) throw new Error("Tidak ada penerima yang tersedia.");

    for (const userId of recipients) {
      const { error } = await state.client.rpc("panel_send_notification", { p_user_id: userId, p_title: title, p_body: body });
      if (error) throw error;
    }
    closeModal();
    await refreshAll();
    renderView();
    setAlert(`Notifikasi terkirim ke ${recipients.length} pengguna.`, "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function openTicketForm() {
  const options = state.data.profiles.map((row) => [row.id, `${row.full_name || "(tanpa nama)"} · ${row.email}`]);
  openModal(`
    ${modalHeader("Tambah tiket moderasi", "Catat indikasi percakapan tidak wajar, konten tidak pantas, atau upaya pemerasan.")}
    <div class="panel-modal-content">
      <form id="panel-ticket">
        <div class="form-grid">
          <label class="field" for="ticket-subject"><span>Pengguna terkait</span>
            <select id="ticket-subject" name="subject_id" required>
              <option value="" disabled selected>Pilih pengguna</option>
              ${formatSelectOptions(options, "")}
            </select></label>
          <label class="field" for="ticket-category"><span>Kategori</span>
            <select id="ticket-category" name="category">
              ${formatSelectOptions(TICKET_CATEGORIES.map((value) => [value, value]), TICKET_CATEGORIES[0])}
            </select></label>
          <label class="field field-full" for="ticket-detail"><span>Uraian</span>
            <textarea id="ticket-detail" name="detail" required maxlength="1500"></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan tiket</button>
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
    setAlert("Tiket moderasi dibuat.", "success");
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
    ${modalHeader("Catat tindak lanjut", "Hasil pemeriksaan tiket moderasi.")}
    <div class="panel-modal-content">
      <form id="panel-ticket-note" data-id="${escapeAttribute(ticket.id)}">
        <label class="field" for="ticket-resolution"><span>Tindak lanjut</span>
          <textarea id="ticket-resolution" name="resolution" required maxlength="1500">${escapeHtml(ticket.resolution || "")}</textarea></label>
        <label class="field" for="ticket-status"><span>Status</span>
          <select id="ticket-status" name="status">
            ${formatSelectOptions(TICKET_STATUSES.map((value) => [value, STATUS_LABELS[value] || value]), ticket.status)}
          </select></label>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan</button>
          <button class="button button-secondary" type="button" data-action="close-modal">Batal</button>
        </div>
      </form>
    </div>`, { narrow: true, title: "Tindak lanjut tiket" });
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
    setAlert("Tindak lanjut tiket tersimpan.", "success");
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
    ${modalHeader("Berita acara serah terima", "Dicatat saat barang diserahkan kepada pemiliknya.")}
    <div class="panel-modal-content">
      <p class="notice">Barang: <strong>${escapeHtml(item ? item.name : "Barang temuan")}</strong> · Diserahkan kepada <strong>${escapeHtml(claimant ? (claimant.full_name || claimant.email) : "pemilik")}</strong></p>
      <form id="panel-handover" data-id="${escapeAttribute(claimId)}">
        <div class="form-grid">
          <label class="field" for="handover-name"><span>Nama penerima</span>
            <input id="handover-name" name="receiver_name" type="text" required maxlength="140" value="${escapeAttribute(claimant ? (claimant.full_name || "") : "")}"></label>
          <label class="field" for="handover-signature"><span>Tanda tangan digital <span class="field-hint">(gambar, opsional)</span></span>
            <input id="handover-signature" name="signature" type="file" accept="image/png,image/jpeg,image/webp">
            <span class="field-hint">Unggah hasil tanda tangan atau foto berita acara.</span></label>
          <label class="field field-full" for="handover-note"><span>Catatan</span>
            <textarea id="handover-note" name="note" maxlength="1000" placeholder="Kondisi barang, identitas tambahan yang diperiksa…"></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Simpan &amp; tandai selesai</button>
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
    ${modalHeader("Tolak klaim", "Alasan akan dikirim kepada pemohon.")}
    <div class="panel-modal-content">
      <form id="panel-reject-claim" data-id="${escapeAttribute(claimId)}">
        <label class="field" for="reject-note"><span>Alasan penolakan</span>
          <textarea id="reject-note" name="note" required minlength="5" maxlength="800" placeholder="Mis. ciri kepemilikan tidak sesuai dengan barang."></textarea></label>
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
    .map((row) => [row.id, `${row.name || "Tanpa nama"} · ${row.category || "tanpa kategori"} · ${row.location_found || "lokasi belum dicatat"}`]);
  const lostOptions = state.data.lost
    .filter((row) => row.status !== "rejected")
    .map((row) => [row.id, `${row.name || "Tanpa nama"} · ${row.category || "tanpa kategori"} · ${row.last_seen_location || "lokasi belum dicatat"}`]);

  if (!foundOptions.length || !lostOptions.length) {
    setAlert("Pencocokan manual memerlukan minimal satu laporan hilang dan satu barang temuan.", "info");
    return;
  }

  openModal(`
    ${modalHeader("Pencocokan manual", "Jodohkan dua laporan yang menurut Anda merujuk pada barang yang sama.")}
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
          <button class="button button-primary" type="submit">Simpan &amp; konfirmasi</button>
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
    const { error: confirmError } = await state.client.rpc("panel_confirm_match", { p_match_id: matchId, p_note: "Pencocokan manual oleh admin" });
    if (confirmError) throw confirmError;
    closeModal();
    await refreshAll();
    renderView();
    setAlert("Pencocokan manual dikonfirmasi dan pemilik laporan diberi notifikasi.", "success");
  } catch (error) {
    setAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = "Simpan & konfirmasi";
  }
}

function openHistoryModal(id, type) {
  const item = type === "found" ? state.maps.found[id] : state.maps.lost[id];
  const rows = state.data.history.filter((row) => row.item_type === type && String(row.item_id) === String(id));
  openModal(`
    ${modalHeader(`Riwayat status · ${item ? item.name : "Laporan"}`, "Setiap perubahan status tercatat otomatis dengan pelakunya.")}
    <div class="panel-modal-content">
      ${rows.length ? `<ul class="timeline">${rows.map((row) => {
        const actor = state.maps.profiles[row.changed_by];
        return `<li>
          <strong>${escapeHtml(STATUS_LABELS[row.previous_status] || row.previous_status || "Dibuat")} → ${escapeHtml(STATUS_LABELS[row.new_status] || row.new_status)}</strong>
          <span>${escapeHtml(formatDate(row.created_at))} · ${escapeHtml(actor ? (actor.full_name || actor.email) : "Sistem")}</span>
        </li>`;
      }).join("")}</ul>` : emptyMarkup("Belum ada perubahan status", "Riwayat muncul setelah status laporan diperbarui.")}
    </div>`, { title: "Riwayat status" });
}

function openUserHistoryModal(userId) {
  const profile = state.maps.profiles[userId];
  const logs = state.data.audit.filter((row) => row.actor_id === userId).slice(0, 10);
  const found = state.data.found.filter((row) => row.reported_by === userId);
  const lost = state.data.lost.filter((row) => row.reported_by === userId);
  const claims = state.data.claims.filter((row) => row.claimant_id === userId);

  openModal(`
    ${modalHeader("Riwayat keaktifan pengguna", profile ? (profile.full_name || profile.email) : "Pengguna")}
    <div class="panel-modal-content">
      <dl class="detail-grid">
        <div><dt>Email</dt><dd>${escapeHtml(profile ? profile.email : "-")}</dd></div>
        <div><dt>Role</dt><dd>${escapeHtml(ROLE_LABELS[normalizeRole(profile ? profile.role : "user")])}</dd></div>
        <div><dt>Status akun</dt><dd>${profile && profile.blocked ? "Diblokir" : "Aktif"}</dd></div>
        <div><dt>Terakhir aktif</dt><dd>${escapeHtml(relativeTime(profile ? (profile.last_seen_at || profile.created_at) : null))}</dd></div>
        <div><dt>Laporan kehilangan</dt><dd>${lost.length}</dd></div>
        <div><dt>Barang temuan</dt><dd>${found.length}</dd></div>
        <div><dt>Klaim diajukan</dt><dd>${claims.length}</dd></div>
        <div><dt>Terdaftar sejak</dt><dd>${escapeHtml(formatDate(profile ? profile.created_at : null))}</dd></div>
      </dl>
      ${logs.length ? `<h2 class="section-title">Tindakan pada panel</h2><ul class="timeline">${logs.map((row) => `
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
    if (!url) return;
    window.open(url, "_blank", "noopener");
  });
}

function exportCsv(scope) {
  const formatters = {
    csvDate: (value) => (value ? new Date(value).toISOString() : ""),
    profile: (id) => {
      const profile = state.maps.profiles[id];
      return profile ? (profile.email || profile.full_name || "") : "";
    }
  };

  let rows = [];
  let columns = [];
  let filename = "lost-found.csv";

  if (scope === "lost") {
    rows = state.data.lost.filter((row) => matchesFilters(row, "lost", "lost_at", "last_seen_location"));
    columns = [
      { label: "Nama", value: (row) => row.name },
      { label: "Kategori", value: (row) => row.category },
      { label: "Warna", value: (row) => row.color },
      { label: "Lokasi terakhir", value: (row) => row.last_seen_location },
      { label: "Waktu hilang", value: (row) => formatters.csvDate(row.lost_at || row.created_at) },
      { label: "Status", value: (row) => STATUS_LABELS[row.status] || row.status },
      { label: "Pelapor", value: (row) => formatters.profile(row.reported_by) },
      { label: "Deskripsi", value: (row) => row.description }
    ];
    filename = "laporan-barang-hilang.csv";
  } else if (scope === "found") {
    rows = state.data.found.filter((row) => matchesFilters(row, "found", "found_at", "location_found"));
    columns = [
      { label: "Nama", value: (row) => row.name },
      { label: "Kategori", value: (row) => row.category },
      { label: "Warna", value: (row) => row.color },
      { label: "Lokasi temuan", value: (row) => row.location_found },
      { label: "Penyimpanan", value: (row) => row.storage_location },
      { label: "Waktu ditemukan", value: (row) => formatters.csvDate(row.found_at || row.created_at) },
      { label: "Status", value: (row) => STATUS_LABELS[row.status] || row.status },
      { label: "Pelapor", value: (row) => formatters.profile(row.reported_by) },
      { label: "Deskripsi", value: (row) => row.description }
    ];
    filename = "barang-temuan.csv";
  } else {
    rows = state.data.audit.slice(0, 500);
    columns = [
      { label: "Waktu", value: (row) => formatters.csvDate(row.created_at) },
      { label: "Pengelola", value: (row) => row.actor_email },
      { label: "Tindakan", value: (row) => ACTION_LABELS[row.action] || row.action },
      { label: "Objek", value: (row) => row.entity },
      { label: "Keterangan", value: (row) => describeDetail(row) }
    ];
    filename = "log-audit-panel.csv";
  }

  if (!rows.length) {
    setAlert("Tidak ada data untuk diekspor pada filter saat ini.", "info");
    return;
  }

  const cell = (value) => `"${String(value == null ? "" : value).replace(/"/g, '""')}"`;
  const lines = [columns.map((column) => cell(column.label)).join(";")];
  rows.forEach((row) => lines.push(columns.map((column) => cell(column.value(row))).join(";")));

  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setAlert(`Ekspor ${filename} dimulai.`, "success");
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
    if (!state.loadError) setAlert("Data terbaru berhasil dimuat.", "success");
  },
  "reset-filters": (button) => {
    const scope = button.dataset.scope;
    if (state.filters[scope]) {
      Object.keys(state.filters[scope]).forEach((key) => { state.filters[scope][key] = key === "min" ? "60" : key === "category" || key === "status" || key === "role" ? "all" : ""; });
    }
    if (state.dates[scope]) state.dates[scope] = { from: "", to: "" };
    renderView();
  },
  "found-status": (button) => {
    const labels = {
      available: "Barang disetujui dan tayang di halaman pengguna.",
      claimed: "Barang ditandai sudah diklaim.",
      resolved: "Barang ditandai sudah diserahkan.",
      archived: "Barang diarsipkan.",
      rejected: "Laporan ditolak dan tidak tayang."
    };
    updateStatus("found_items", button.dataset.id, button.dataset.status, labels[button.dataset.status]);
  },
  "lost-status": (button) => {
    const labels = {
      under_review: "Laporan masuk tahap peninjauan.",
      matched: "Laporan ditandai cocok dengan barang temuan.",
      resolved: "Laporan ditandai selesai.",
      rejected: "Laporan ditolak."
    };
    updateStatus("lost_reports", button.dataset.id, button.dataset.status, labels[button.dataset.status]);
  },
  "edit-found": (button) => openFoundEditor(button.dataset.id),
  "edit-lost": (button) => openLostEditor(button.dataset.id),
  "upload-image": (button) => changeItemImage(button.dataset.meta, button.dataset.id),
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
      title: "Setujui klaim",
      message: "Bukti kepemilikan sudah sesuai? Barang akan ditandai sudah diklaim dan pemohon menerima notifikasi.",
      confirmLabel: "Setujui klaim",
      danger: false
    });
    if (approved) reviewClaim(button.dataset.id, "approved", "Bukti kepemilikan diverifikasi petugas");
  },
  "claim-reject": (button) => openRejectClaimForm(button.dataset.id),
  "claim-handover": (button) => openHandoverForm(button.dataset.id),
  "claim-evidence": (button) => openEvidence(button.dataset.id),
  "open-item": (button) => {
    const item = state.maps.found[button.dataset.id];
    if (!item) return;
    state.view = "found";
    state.filters.found.search = item.name || "";
    renderView();
    if (typeof window.scrollTo === "function") window.scrollTo({ top: 0, behavior: "auto" });
  },
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
    setAlert(`Status tiket diperbarui menjadi ${STATUS_LABELS[button.dataset.status] || button.dataset.status}.`, "success");
  },
  "block-user": async (button) => {
    const profile = state.maps.profiles[button.dataset.id];
    const answer = await promptModal({
      title: "Blokir pengguna",
      message: `Blokir akun ${profile ? profile.email : "ini"}? Pengguna tidak dapat lagi melaporkan barang.`,
      field: "Alasan blokir (opsional)",
      required: false,
      confirmLabel: "Blokir akun"
    });
    if (answer === null) return;
    try {
      const { error } = await state.client.rpc("panel_set_blocked", { p_user_id: button.dataset.id, p_blocked: true, p_reason: answer || null });
      if (error) throw error;
      await refreshAll();
      renderView();
      setAlert("Akun diblokir dan tercatat pada log audit.", "success");
    } catch (error) {
      setAlert(friendlyError(error), "error");
    }
  },
  "unblock-user": async (button) => {
    const approved = await confirmAction({
      title: "Buka blokir",
      message: "Akun ini akan dapat kembali menggunakan layanan Lost & Found.",
      confirmLabel: "Buka blokir",
      danger: false
    });
    if (!approved) return;
    try {
      const { error } = await state.client.rpc("panel_set_blocked", { p_user_id: button.dataset.id, p_blocked: false, p_reason: null });
      if (error) throw error;
      await refreshAll();
      renderView();
      setAlert("Blokir akun dibuka.", "success");
    } catch (error) {
      setAlert(friendlyError(error), "error");
    }
  },
  "user-history": (button) => openUserHistoryModal(button.dataset.id),
  export: (button, event) => {
    event.stopPropagation();
    exportCsv(button.dataset.scope);
  },
  "close-modal": () => closeModal()
};

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

function handlePanelClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "modal-backdrop") {
    if (event.target === target) closeModal();
    return;
  }
  const handler = ACTIONS[action];
  if (handler) {
    event.preventDefault();
    handler(target, event);
  }
}

function handlePanelChange(event) {
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
  const previous = state.maps.profiles[userId] ? state.maps.profiles[userId].role : "user";
  const approved = await confirmAction({
    title: "Ubah role pengguna",
    message: `Ubah role menjadi ${ROLE_LABELS[role] || role}? Hak akses pada panel menyesuaikan role tersebut.`,
    confirmLabel: "Ubah role",
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
    setAlert(`Role pengguna diperbarui menjadi ${ROLE_LABELS[role] || role}.`, "success");
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
    "panel-manual-match": submitManualMatch
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
  if (!state.pendingImage) return undefined;
  event.preventDefault();
  event.returnValue = "Unggahan foto belum selesai. Yakin ingin keluar?";
  return event.returnValue;
});

elements.loginForm.addEventListener("submit", handleLogin);
elements.recoveryForm.addEventListener("submit", handleRecoverySubmit);
elements.recoveryBack.addEventListener("click", returnFromRecovery);
document.getElementById("forgot-password").addEventListener("click", handleForgotPassword);
elements.googleLogin.addEventListener("click", handleGoogleLogin);
elements.cookieNoticeButton.addEventListener("click", () => setCookieNoticeOpen(elements.cookieNoticePanel.hidden));
elements.cookieNoticeClose.addEventListener("click", () => setCookieNoticeOpen(false));
elements.logoutButton.addEventListener("click", handleLogout);
document.querySelector(".panel-header").addEventListener("click", handlePanelClick);
elements.nav.addEventListener("click", handlePanelClick);
elements.viewHost.addEventListener("click", handlePanelClick);
elements.viewHost.addEventListener("submit", handlePanelSubmit);
elements.viewHost.addEventListener("change", handlePanelChange);
elements.viewHost.addEventListener("input", handlePanelChange);
elements.dialogRoot.addEventListener("click", handlePanelClick);
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
