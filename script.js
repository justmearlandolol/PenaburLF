const SUPABASE_URL = "https://jnuzdskjvdttdyokajgt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudXpkc2tqdmR0dGR5b2thamd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MTY3NjQsImV4cCI6MjEwMjE5Mjc2NH0.6c1GiFeEkG9V47KDcTriQj6AsFaETaShSsOeSD1OERw";
const ALLOWED_DOMAIN = "@bpkpenabur.sch.id";
const PANEL_URL = "Admin.html";
const ANNOUNCEMENT_LIMIT = 3;
const PANEL_ROLE_LABELS = { staff: "Petugas", moderator: "Moderator", admin: "Admin", developer: "Developer" };
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const CATEGORY_OPTIONS = [
  "Elektronik",
  "Alat tulis",
  "Buku",
  "Pakaian & aksesori",
  "Kartu / identitas",
  "Perlengkapan olahraga",
  "Lainnya"
];
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
  completed: "Selesai"
};

const state = {
  client: null,
  user: null,
  profile: null,
  view: "foundItems",
  foundItems: [],
  selectedItem: null,
  claimExpanded: false,
  claimStatus: null,
  reportSuccess: null,
  filters: { search: "", category: "all", status: "all", sort: "newest" },
  myReports: { found: [], lost: [], claims: [], claimItems: {} },
  adminTab: "found",
  adminData: { found: [], lost: [], claims: [], itemsById: {}, profilesById: {} },
  announcements: [],
  panelRole: "user",
  loginMessage: "",
  loginMessageType: "error",
  recoveryMode: false,
  hydratingUserId: null,
  navigationToken: 0
};

const I18N = {
  id: {
    skip: "Lewati ke konten", emailLabel: "Email akun BPK PENABUR", emailPh: "Email BPK PENABUR",
    passLabel: "Kata sandi", passPh: "Kata sandi", submit: "Masuk", forgot: "Lupa kata sandi?",
    oauth: "Masuk menggunakan akun Anda:", langLabel: "Bahasa",
    setup: "<strong>Konfigurasi diperlukan</strong><span>Hubungkan project Supabase di <code>script.js</code> agar autentikasi dapat digunakan.</span>",
    recTitle: "Atur ulang kata sandi", recCopy: "Buat kata sandi baru untuk akun BPK PENABUR Anda.",
    newPassLabel: "Kata sandi baru", newPassPh: "Kata sandi baru", repeatLabel: "Ulangi kata sandi", repeatPh: "Ulangi kata sandi",
    save: "Simpan kata sandi", back: "Kembali ke login", cookieTitle: "Pemberitahuan sesi",
    cookieText: "Portal menggunakan penyimpanan browser Supabase untuk menjaga sesi login. Kata sandi tidak disimpan oleh aplikasi.",
    close: "Tutup", cookieBtn: "Pemberitahuan cookie",
    msgDomain: "Tolong gunakan akun BPK PENABUR untuk mengakses Lost & Found.",
    msgNeedPass: "Masukkan kata sandi akun BPK PENABUR Anda.",
    checking: "Memeriksa akun…",
    msgBad: "Email atau kata sandi tidak sesuai. Periksa kembali akun BPK PENABUR Anda.",
    msgNeedEmail: "Masukkan email BPK PENABUR yang valid terlebih dahulu.",
    sending: "Mengirim instruksi…",
    msgSent: "Jika email terdaftar, instruksi atur ulang kata sandi akan dikirim ke email tersebut."
  },
  en: {
    skip: "Skip to content", emailLabel: "BPK PENABUR account email", emailPh: "BPK PENABUR email",
    passLabel: "Password", passPh: "Password", submit: "Log in", forgot: "Lost password?",
    oauth: "Log in using your account on:", langLabel: "Language",
    setup: "<strong>Configuration required</strong><span>Connect your Supabase project in <code>script.js</code> to enable authentication.</span>",
    recTitle: "Reset password", recCopy: "Create a new password for your BPK PENABUR account.",
    newPassLabel: "New password", newPassPh: "New password", repeatLabel: "Repeat password", repeatPh: "Repeat password",
    save: "Save password", back: "Back to login", cookieTitle: "Session notice",
    cookieText: "This portal uses Supabase browser storage to keep you signed in. Your password is not stored by the app.",
    close: "Close", cookieBtn: "Cookies notice",
    msgDomain: "Please use your BPK PENABUR account to access Lost & Found.",
    msgNeedPass: "Enter your BPK PENABUR account password.",
    checking: "Checking account…",
    msgBad: "Incorrect email or password. Please check your BPK PENABUR account.",
    msgNeedEmail: "Enter a valid BPK PENABUR email first.",
    sending: "Sending instructions…",
    msgSent: "If the email is registered, password reset instructions will be sent to it."
  }
};

let currentLanguage = "id";
try { currentLanguage = localStorage.getItem("language") === "en" ? "en" : "id"; } catch (error) { currentLanguage = "id"; }

function t(key) {
  return I18N[currentLanguage][key];
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.innerHTML = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.getElementById("language-select").value = currentLanguage;
}

const elements = {
  loginView: document.getElementById("login-view"),
  appView: document.getElementById("application-view"),
  loginForm: document.getElementById("login-form"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  loginSubmit: document.getElementById("login-submit"),
  loginMessage: document.getElementById("login-message"),
  loginMethods: document.getElementById("login-methods"),
  forgotPassword: document.getElementById("forgot-password"),
  googleLogin: document.getElementById("google-login"),
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
  accountName: document.getElementById("account-name"),
  accountEmail: document.getElementById("account-email"),
  logoutButton: document.getElementById("logout-button"),
  adminNav: document.getElementById("admin-navigation-link"),
  accountBadge: document.getElementById("account-badge"),
  panelLink: document.getElementById("panel-link"),
  nav: document.getElementById("main-navigation"),
  mobileMenu: document.getElementById("mobile-menu-toggle"),
  appContent: document.getElementById("app-content"),
  appAlert: document.getElementById("app-alert"),
  mainContent: document.getElementById("main-content"),
  dialogRoot: document.getElementById("dialog-root")
};

function isConfigured() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("YOUR_") &&
    !SUPABASE_ANON_KEY.includes("YOUR_")
  );
}

function initialize() {
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  state.recoveryMode = new URLSearchParams(hash).get("type") === "recovery"
    || new URLSearchParams(window.location.search).get("type") === "recovery";
  if (!isConfigured()) {
    if (state.recoveryMode) showLogin();
    return;
  }
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    elements.setupNotice.hidden = false;
    elements.setupNotice.innerHTML = "<strong>Some error occurred</strong><span>Please try again later.</span>";
    return;
  }

  state.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  if (state.recoveryMode) showLogin();
  state.client.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      state.recoveryMode = true;
      state.loginMessage = "";
      showLogin();
      window.setTimeout(() => elements.recoveryPassword.focus(), 0);
      return;
    }
    if (event === "SIGNED_OUT") {
      state.user = null;
      state.profile = null;
      state.panelRole = "user";
      state.announcements = [];
      applyPanelIdentity();
      state.foundItems = [];
      state.selectedItem = null;
      state.hydratingUserId = null;
      state.navigationToken += 1;
      state.recoveryMode = false;
      showLogin();
      return;
    }
    if (session && session.user && !state.profile && !state.recoveryMode) {
      window.setTimeout(() => hydrateUser(session.user), 0);
    }
  });

  state.client.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Could not restore Supabase session:", error);
      return;
    }
    if (data && data.session && data.session.user && !state.recoveryMode) hydrateUser(data.session.user);
  }).catch((error) => console.error("Could not restore Supabase session:", error));
}

function isAllowedEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  const parts = email.split("@");
  return parts.length === 2 && Boolean(parts[0]) && !/\s/.test(parts[0]) && `@${parts[1]}` === ALLOWED_DOMAIN;
}

function showLogin(message, type) {
  if (typeof message === "string") state.loginMessage = message;
  if (type) state.loginMessageType = type;
  elements.loginView.hidden = false;
  elements.appView.hidden = true;
  elements.loginMethods.hidden = state.recoveryMode;
  elements.recoveryView.hidden = !state.recoveryMode;
  elements.nav.classList.remove("is-open");
  elements.mobileMenu.setAttribute("aria-expanded", "false");
  elements.mobileMenu.querySelector(".visually-hidden").textContent = "Buka navigasi";
  renderLoginMessage();
}

function renderLoginMessage() {
  const message = elements.loginMessage;
  if (!state.loginMessage) {
    message.hidden = true;
    message.textContent = "";
    message.classList.remove("is-success");
    return;
  }
  message.hidden = false;
  message.textContent = state.loginMessage;
  message.classList.toggle("is-success", state.loginMessageType === "success");
}

function setLoginMessage(text, type = "error") {
  state.loginMessage = text;
  state.loginMessageType = type;
  renderLoginMessage();
}

async function hydrateUser(user) {
  if (!user || !state.client || state.profile || state.hydratingUserId === user.id) return;
  if (!isAllowedEmail(user.email)) {
    await state.client.auth.signOut();
    showLogin(t("msgDomain"));
    return;
  }

  state.hydratingUserId = user.id;
  try {
    const { data: profile, error } = await state.client
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", user.id)
      .maybeSingle();

    if (error || !profile) {
      console.error("Profile lookup failed:", error);
      await state.client.auth.signOut();
      showLogin("Profil akun belum tersedia. Pastikan schema Supabase dan trigger pembuatan profil sudah dipasang.");
      return;
    }

    state.user = user;
    state.profile = profile;
    state.loginMessage = "";
    state.adminTab = "found";
    const name = (profile.full_name || "").trim() || (user.email || "").split("@")[0];
    elements.accountName.textContent = name;
    elements.accountEmail.textContent = profile.email || user.email || "";
    state.panelRole = normalizePanelRole(profile.role);
    applyPanelIdentity();
    elements.adminNav.hidden = state.panelRole === "user";
    elements.loginView.hidden = true;
    elements.appView.hidden = false;
    await navigateTo("foundItems");
  } catch (error) {
    console.error("Could not load profile:", error);
    await state.client.auth.signOut();
    showLogin("Tidak dapat memuat profil. Periksa konfigurasi Supabase dan coba lagi.");
  } finally {
    state.hydratingUserId = null;
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = elements.loginEmail.value.trim().toLowerCase();
  const password = elements.loginPassword.value;
  if (!isAllowedEmail(email)) {
    setLoginMessage("Tolong gunakan akun BPK PENABUR untuk mengakses Lost & Found.");
    elements.loginEmail.focus();
    return;
  }
  if (!password) {
    setLoginMessage(t("msgNeedPass"));
    elements.loginPassword.focus();
    return;
  }
  if (!state.client) {
    setLoginMessage("Autentikasi belum siap. Hubungkan Supabase URL dan anon key di script.js terlebih dahulu.");
    return;
  }

  const originalText = elements.loginSubmit.textContent;
  elements.loginSubmit.disabled = true;
  elements.loginSubmit.textContent = t("checking");
  setLoginMessage("");
  try {
    const { data, error } = await state.client.auth.signInWithPassword({ email, password });
    if (error) {
      const lowerMessage = String(error.message || "").toLowerCase();
      if (lowerMessage.includes("invalid login credentials") || lowerMessage.includes("invalid email or password")) {
        setLoginMessage(t("msgBad"));
      } else {
        setLoginMessage(friendlyError(error));
      }
      return;
    }
    if (data && data.user) await hydrateUser(data.user);
  } catch (error) {
    setLoginMessage(friendlyError(error));
  } finally {
    elements.loginSubmit.disabled = false;
    elements.loginSubmit.textContent = originalText;
  }
}

async function handleForgotPassword() {
  const email = elements.loginEmail.value.trim().toLowerCase();
  if (!isAllowedEmail(email)) {
    setLoginMessage(t("msgNeedEmail"));
    elements.loginEmail.focus();
    return;
  }
  if (!state.client) {
    setLoginMessage("Autentikasi belum siap. Hubungkan Supabase URL dan anon key di script.js terlebih dahulu.");
    return;
  }

  const originalText = elements.forgotPassword.textContent;
  elements.forgotPassword.disabled = true;
  elements.forgotPassword.textContent = t("sending");
  setLoginMessage("");
  try {
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await state.client.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    setLoginMessage(t("msgSent"), "success");
  } catch (error) {
    setLoginMessage(friendlyError(error));
  } finally {
    elements.forgotPassword.disabled = false;
    elements.forgotPassword.textContent = originalText;
  }
}

async function handleGoogleLogin() {
  if (!state.client) {
    setLoginMessage("Autentikasi belum siap. Hubungkan Supabase dan konfigurasi Google OAuth terlebih dahulu.");
    return;
  }
  const originalText = elements.googleLogin.innerHTML;
  elements.googleLogin.disabled = true;
  elements.googleLogin.innerHTML = "Membuka Google…";
  setLoginMessage("");
  try {
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await state.client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { hd: "bpkpenabur.sch.id", prompt: "select_account" }
      }
    });
    if (error) throw error;
  } catch (error) {
    setLoginMessage("Google login belum tersedia. Pastikan Google OAuth resmi BPK PENABUR sudah diaktifkan di Supabase.");
    console.error("Google OAuth failed:", error);
  } finally {
    elements.googleLogin.disabled = false;
    elements.googleLogin.innerHTML = originalText;
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
    showRecoveryMessage("Kata sandi baru harus terdiri dari minimal 8 karakter.");
    elements.recoveryPassword.focus();
    return;
  }
  if (password !== confirmation) {
    showRecoveryMessage("Konfirmasi kata sandi belum cocok.");
    elements.recoveryPasswordConfirm.focus();
    return;
  }

  const originalText = elements.recoverySubmit.textContent;
  elements.recoverySubmit.disabled = true;
  elements.recoverySubmit.textContent = "Menyimpan…";
  showRecoveryMessage("");
  try {
    const { error } = await state.client.auth.updateUser({ password });
    if (error) throw error;
    state.loginMessage = "Kata sandi berhasil diperbarui. Silakan masuk kembali.";
    state.loginMessageType = "success";
    elements.loginEmail.value = "";
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
    elements.recoverySubmit.textContent = originalText;
  }
}

async function returnFromRecovery() {
  state.recoveryMode = false;
  state.loginMessage = "";
  showLogin("");
  if (state.client) {
    const { error } = await state.client.auth.signOut();
    if (error) console.warn("Could not close recovery session:", error);
  }
}

async function handleLogout() {
  if (!state.client) return;
  elements.logoutButton.disabled = true;
  try {
    const { error } = await state.client.auth.signOut();
    if (error) throw error;
    state.user = null;
    state.profile = null;
    showLogin("");
    elements.loginPassword.value = "";
  } catch (error) {
    showAppAlert(friendlyError(error), "error");
  } finally {
    elements.logoutButton.disabled = false;
  }
}

function setAppAlert(message, type = "info") {
  if (!message) {
    elements.appAlert.hidden = true;
    elements.appAlert.textContent = "";
    elements.appAlert.className = "app-alert";
    return;
  }
  elements.appAlert.hidden = false;
  elements.appAlert.textContent = message;
  elements.appAlert.className = `app-alert alert-${type}`;
}

function setActiveNavigation(route) {
  const activeRoute = route === "itemDetail" ? "foundItems" : route;
  elements.nav.querySelectorAll("[data-route]").forEach((button) => {
    const active = button.dataset.route === activeRoute;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

async function navigateTo(route) {
  if (!state.profile || !state.user) return;
  if (route === "admin" && state.panelRole === "user") route = "foundItems";
  const navigationToken = ++state.navigationToken;
  state.view = route;
  if (route !== "reportLost" && route !== "reportFound") state.reportSuccess = null;
  if (route !== "itemDetail") {
    state.selectedItem = null;
    state.claimExpanded = false;
    state.claimStatus = null;
  }
  elements.nav.classList.remove("is-open");
  elements.mobileMenu.setAttribute("aria-expanded", "false");
  elements.mobileMenu.querySelector(".visually-hidden").textContent = "Buka navigasi";
  setActiveNavigation(route);
  setAppAlert("");

  if (route === "foundItems") {
    elements.appContent.innerHTML = loadingMarkup("Memuat barang ditemukan…");
    try {
      await loadFoundItems();
      if (navigationToken !== state.navigationToken) return;
      await loadAnnouncements();
      if (navigationToken !== state.navigationToken) return;
      renderFoundItemsPage();
    } catch (error) {
      if (navigationToken !== state.navigationToken) return;
      console.error("Could not load found items:", error);
      elements.appContent.innerHTML = errorMarkup("Daftar barang belum dapat dimuat.", "Periksa koneksi Supabase, tabel, dan RLS policy.");
    }
    return;
  }
  if (route === "itemDetail") {
    if (!state.selectedItem) {
      await navigateTo("foundItems");
      return;
    }
    try {
      await loadClaimStatus(state.selectedItem.id);
    } catch (error) {
      if (navigationToken !== state.navigationToken) return;
      console.error("Could not load claim status:", error);
      state.claimStatus = null;
    }
    if (navigationToken !== state.navigationToken) return;
    renderItemDetail();
    return;
  }
  if (route === "reportLost" || route === "reportFound") {
    renderReportPage(route);
    return;
  }
  if (route === "myReports") {
    elements.appContent.innerHTML = loadingMarkup("Memuat laporan Anda…");
    try {
      await loadMyReports();
      if (navigationToken !== state.navigationToken) return;
      renderMyReports();
    } catch (error) {
      if (navigationToken !== state.navigationToken) return;
      console.error("Could not load user reports:", error);
      elements.appContent.innerHTML = errorMarkup("Laporan belum dapat dimuat.", "Periksa koneksi Supabase dan kebijakan akses RLS.");
    }
    return;
  }
  if (route === "admin") {
    elements.appContent.innerHTML = loadingMarkup("Memuat data administrasi…");
    try {
      await loadAdminData();
      if (navigationToken !== state.navigationToken) return;
      renderAdminPage();
    } catch (error) {
      if (navigationToken !== state.navigationToken) return;
      console.error("Could not load admin data:", error);
      elements.appContent.innerHTML = errorMarkup("Data admin belum dapat dimuat.", "Pastikan akun Anda memiliki role admin dan RLS policy telah dipasang.");
    }
  }
}

async function loadFoundItems() {
  const { data, error } = await state.client
    .from("found_items")
    .select("id, name, category, description, distinctive_features, additional_info, location_found, found_at, image_path, status, created_at, updated_at")
    .in("status", ["available", "claimed"])
    .order("found_at", { ascending: false });
  if (error) throw error;
  state.foundItems = await attachSignedImages(data || [], "found-items");
}

async function attachSignedImages(rows, bucket) {
  return Promise.all((rows || []).map(async (row) => {
    if (!row.image_path) return { ...row, imageUrl: null };
    try {
      const { data, error } = await state.client.storage.from(bucket).createSignedUrl(row.image_path, 3600);
      if (error) return { ...row, imageUrl: null };
      return { ...row, imageUrl: data && data.signedUrl ? data.signedUrl : null };
    } catch (error) {
      console.warn("Could not create a signed image URL:", error);
      return { ...row, imageUrl: null };
    }
  }));
}

async function loadClaimStatus(itemId) {
  const { data, error } = await state.client
    .from("claims")
    .select("id, status, created_at")
    .eq("found_item_id", itemId)
    .eq("claimant_id", state.user.id)
    .maybeSingle();
  if (error) throw error;
  state.claimStatus = data || null;
}

function renderFoundItemsPage() {
  elements.appContent.innerHTML = `
    <section aria-labelledby="found-page-title">
      ${renderAnnouncementList()}
      <div class="page-heading">
        <div>

        </div>
      </div>
      <div class="filter-bar" aria-label="Pencarian dan filter barang">
        <div class="filter-control">
          <label for="found-search">Cari barang</label>
          <input id="found-search" type="search" autocomplete="off" placeholder="Nama, ciri, atau lokasi…" value="${escapeAttribute(state.filters.search)}">
        </div>
        <div class="filter-control">
          <label for="found-category">Kategori</label>
          <select id="found-category">${renderCategoryOptions(state.filters.category, true)}</select>
        </div>
        <div class="filter-control">
          <label for="found-status">Status</label>
          <select id="found-status">
            <option value="all" ${state.filters.status === "all" ? "selected" : ""}>Semua status</option>
            <option value="available" ${state.filters.status === "available" ? "selected" : ""}>Tersedia</option>
            <option value="claimed" ${state.filters.status === "claimed" ? "selected" : ""}>Sudah diklaim</option>
          </select>
        </div>
        <div class="filter-control">
          <label for="found-sort">Urutkan</label>
          <select id="found-sort">
            <option value="newest" ${state.filters.sort === "newest" ? "selected" : ""}>Terbaru</option>
            <option value="oldest" ${state.filters.sort === "oldest" ? "selected" : ""}>Terlama</option>
          </select>
        </div>
      </div>
      <div id="found-list-wrap" aria-live="polite"></div>
    </section>`;
  renderFoundList();
}

function renderFoundList() {
  const wrap = document.getElementById("found-list-wrap");
  if (!wrap) return;
  const query = state.filters.search.trim().toLocaleLowerCase("id-ID");
  const list = state.foundItems.filter((item) => {
    const categoryOkay = state.filters.category === "all" || item.category === state.filters.category;
    const statusOkay = state.filters.status === "all" || item.status === state.filters.status;
    const haystack = [item.name, item.category, item.description, item.distinctive_features, item.location_found]
      .filter(Boolean).join(" ").toLocaleLowerCase("id-ID");
    return categoryOkay && statusOkay && (!query || haystack.includes(query));
  }).sort((a, b) => {
    const dateA = new Date(a.found_at || a.created_at || 0).getTime();
    const dateB = new Date(b.found_at || b.created_at || 0).getTime();
    return state.filters.sort === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const emptyText = state.foundItems.length === 0
    ? ["Belum ada barang ditemukan", "Barang yang telah disetujui petugas akan muncul di sini."]
    : ["Tidak ada hasil yang cocok", "Coba ubah kata pencarian atau filter yang dipilih."];
  wrap.innerHTML = `
    <div class="list-heading">
      <h2>Daftar barang</h2>
      <span class="list-count">${list.length} ${list.length === 1 ? "barang" : "barang"}</span>
    </div>
    ${list.length ? `<div class="item-list">${list.map(renderFoundItemRow).join("")}</div>` : renderEmptyState(emptyText[0], emptyText[1])}`;
}

function renderFoundItemRow(item) {
  return `
    <article class="item-row">
      <div class="item-thumb">${renderImage(item.imageUrl, `Foto ${item.name}`, "") || `<span class="photo-fallback">Foto tidak tersedia</span>`}</div>
      <div class="item-copy">
        <h3>${escapeHtml(item.name || "Barang tanpa nama")}</h3>
        <div class="item-subline">
          <span>${escapeHtml(item.category || "Tanpa kategori")}</span>
          <span>${escapeHtml(item.location_found || "Lokasi belum dicatat")}</span>
          <span>${escapeHtml(formatDate(item.found_at || item.created_at))}</span>
        </div>
        ${item.description ? `<p class="item-excerpt">${escapeHtml(item.description)}</p>` : ""}
      </div>
      <div class="item-row-action">
        ${statusBadge(item.status)}
        <button class="button button-secondary button-small" type="button" data-action="open-item" data-id="${escapeAttribute(item.id)}">Lihat detail</button>
      </div>
    </article>`;
}
function renderItemDetail() {
  const item = state.selectedItem;
  if (!item) return;
  const hasExistingClaim = Boolean(state.claimStatus);
  const canClaim = item.status === "available" && !hasExistingClaim;
  const claimPanel = canClaim ? `
    <section class="claim-panel" aria-labelledby="claim-title">
      <h2 id="claim-title">Ajukan Claim</h2>
      <p>Jelaskan bukti kepemilikan yang hanya diketahui pemilik, misalnya ciri khusus atau isi barang. Informasi ini hanya ditinjau petugas.</p>
      ${state.claimExpanded ? `
        <form id="claim-form" class="claim-form">
          <label class="field" for="claim-proof"><span>Bukti kepemilikan</span>
            <textarea id="claim-proof" name="proof_description" minlength="10" maxlength="1500" required placeholder="Tuliskan ciri khusus yang dapat membantu petugas memverifikasi kepemilikan…"></textarea>
          </label>
          <div><button class="button button-primary" type="submit">Kirim pengajuan</button> <button class="button button-secondary" type="button" data-action="cancel-claim">Batal</button></div>
        </form>` : `<button class="button button-primary" type="button" data-action="start-claim">Ajukan Claim</button>`}
    </section>` : hasExistingClaim ? `
      <div class="claim-existing">Anda sudah mengajukan claim untuk barang ini. Status: ${statusBadge(state.claimStatus.status)}.</div>` : "";
  const canShowClaim = item.status === "available";

  elements.appContent.innerHTML = `
    <section aria-labelledby="detail-title">
      <button class="back-link" type="button" data-action="back-to-list">← <span>Kembali ke Barang Ditemukan</span></button>
      <div class="detail-layout">
        <div class="detail-photo">${renderImage(item.imageUrl, `Foto ${item.name}`, "") || `<span class="photo-fallback">Foto tidak tersedia</span>`}</div>
        <div class="detail-body">
          <div class="detail-title-row">
            <div><h1 id="detail-title">${escapeHtml(item.name || "Barang tanpa nama")}</h1><p class="detail-category">${escapeHtml(item.category || "Tanpa kategori")}</p></div>
            ${statusBadge(item.status)}
          </div>
          ${detailSection("Deskripsi", item.description)}
          ${detailSection("Ciri khusus", item.distinctive_features)}
          <dl class="detail-meta">
            ${metaItem("Lokasi ditemukan", item.location_found || "Belum dicatat")}
            ${metaItem("Waktu ditemukan", formatDate(item.found_at || item.created_at))}
          </dl>
          ${canShowClaim ? claimPanel : ""}
        </div>
      </div>
    </section>`;
}

function detailSection(label, value) {
  if (!value) return "";
  return `<section class="detail-section"><h2>${escapeHtml(label)}</h2><p>${escapeHtml(value)}</p></section>`;
}
function metaItem(label, value) {
  return `<div class="meta-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function renderReportPage(route) {
  const type = route === "reportLost" ? "lost" : "found";
  const isLost = type === "lost";
  const title = isLost ? "Lapor Kehilangan" : "Lapor Menemukan";
  if (state.reportSuccess === type) {
    elements.appContent.innerHTML = `
      <section aria-labelledby="report-success-title">
        <div class="page-heading"><div><p class="section-kicker">${isLost ? "Laporan kehilangan" : "Laporan barang ditemukan"}</p><h1 id="report-success-title">${isLost ? "Laporan terkirim" : "Terima kasih telah membantu"}</h1></div></div>
        <div class="confirmation">
          <h2>${isLost ? "Laporan Anda sudah tercatat." : "Laporan barang ditemukan sudah tercatat."}</h2>
          <p>${isLost ? "Petugas dapat meninjau laporan ini. Anda dapat memantau perkembangannya di halaman Laporan Saya." : "Laporan akan ditinjau petugas sebelum barang ditampilkan kepada pengguna lain."}</p>
          ${isLost ? "" : `<p class="instruction">Terima kasih telah membantu. Setelah melaporkan barang, silakan titipkan barang tersebut di laci Lost &amp; Found yang telah ditentukan oleh sekolah.</p>`}
          <div class="confirmation-actions">
            <button class="button button-primary" type="button" data-route="myReports">Lihat Laporan Saya</button>
            <button class="button button-secondary" type="button" data-action="new-report">Buat laporan lain</button>
          </div>
        </div>
      </section>`;
    return;
  }

  elements.appContent.innerHTML = `
    <section aria-labelledby="report-page-title">
      <div class="page-heading">
        <div><p class="section-kicker">Layanan Lost &amp; Found</p><h1 id="report-page-title">${title}</h1>
          <p>${isLost ? "Ceritakan barang yang hilang agar petugas dapat membantu mencocokkannya." : "Catat informasi barang agar petugas dapat memverifikasi dan mengelolanya."}</p>
        </div>
      </div>
      <form id="${isLost ? "report-lost-form" : "report-found-form"}" class="form-panel">
        <p class="form-panel-intro">Laporan dikaitkan dengan akun BPK PENABUR Anda. Isi informasi sejelas mungkin.</p>
        <div class="form-grid">
          <label class="field" for="report-name"><span>Nama barang</span><input id="report-name" name="name" type="text" minlength="2" maxlength="120" required placeholder="Contoh: tempat pensil biru"></label>
          <label class="field" for="report-category"><span>Kategori</span><select id="report-category" name="category" required>${renderCategoryOptions("", false)}</select></label>
          <label class="field field-full" for="report-description"><span>Deskripsi</span><textarea id="report-description" name="description" minlength="5" maxlength="2000" required placeholder="Jelaskan bentuk, warna, merek, atau kondisi barang."></textarea></label>
          <label class="field field-full" for="report-distinctive"><span>Ciri khusus</span><textarea id="report-distinctive" name="distinctive_features" maxlength="1500" placeholder="Ciri yang dapat membantu petugas mengenali barang."></textarea></label>
          <label class="field" for="report-location"><span>${isLost ? "Lokasi terakhir terlihat" : "Lokasi ditemukan"}</span><input id="report-location" name="location" type="text" maxlength="180" required placeholder="Contoh: Perpustakaan, lantai 2"></label>
          <label class="field" for="report-date"><span>${isLost ? "Tanggal / waktu terakhir terlihat" : "Tanggal / waktu ditemukan"}</span><input id="report-date" name="occurred_at" type="datetime-local" required></label>
          <label class="field field-full" for="report-image"><span>Foto barang <span class="field-hint">(opsional)</span></span><input id="report-image" name="image" type="file" accept="image/jpeg,image/png,image/webp"><span class="field-hint">JPG, PNG, atau WebP · maksimum 5 MB.</span></label>
          <label class="field field-full" for="report-additional"><span>Informasi tambahan <span class="field-hint">(opsional)</span></span><textarea id="report-additional" name="additional_info" maxlength="1500" placeholder="Informasi lain yang relevan untuk petugas."></textarea></label>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">${isLost ? "Kirim laporan kehilangan" : "Kirim laporan barang ditemukan"}</button>
          <button class="button button-secondary" type="button" data-action="cancel-report">Batal</button>
        </div>
      </form>
    </section>`;
}

async function loadMyReports() {
  const userId = state.user.id;
  const [foundResult, lostResult, claimResult] = await Promise.all([
    state.client.from("found_items").select("id, name, category, status, created_at, found_at").eq("reported_by", userId).order("created_at", { ascending: false }),
    state.client.from("lost_reports").select("id, name, category, status, created_at, lost_at").eq("reported_by", userId).order("created_at", { ascending: false }),
    state.client.from("claims").select("id, found_item_id, status, created_at").eq("claimant_id", userId).order("created_at", { ascending: false })
  ]);
  if (foundResult.error) throw foundResult.error;
  if (lostResult.error) throw lostResult.error;
  if (claimResult.error) throw claimResult.error;

  const claims = claimResult.data || [];
  const ids = [...new Set(claims.map((claim) => claim.found_item_id).filter(Boolean))];
  let claimItems = {};
  if (ids.length) {
    const { data, error } = await state.client.from("found_items").select("id, name, category").in("id", ids);
    if (!error) claimItems = Object.fromEntries((data || []).map((item) => [item.id, item]));
  }
  state.myReports = { found: foundResult.data || [], lost: lostResult.data || [], claims, claimItems };
}

function renderMyReports() {
  const { found, lost, claims, claimItems } = state.myReports;
  elements.appContent.innerHTML = `
    <section aria-labelledby="my-reports-title">
      <div class="page-heading"><div><p class="section-kicker">Akun Anda</p><h1 id="my-reports-title">Laporan Saya</h1><p>Hanya laporan dan claim yang dikirim dari akun Anda yang ditampilkan di halaman ini.</p></div></div>
      ${renderReportGroup("Laporan kehilangan", lost, "lost_at")}
      ${renderReportGroup("Laporan barang ditemukan", found, "found_at")}
      ${renderClaimGroup(claims, claimItems)}
    </section>`;
}

function renderReportGroup(title, rows, dateKey) {
  const body = rows.length ? `<div class="report-list">${rows.map((row) => `
    <article class="report-line"><div><h3>${escapeHtml(row.name || "Laporan tanpa nama")}</h3><p>${escapeHtml(row.category || "Tanpa kategori")}</p></div><span class="report-date">Dibuat ${escapeHtml(formatDate(row.created_at || row[dateKey]))}</span>${statusBadge(row.status)}</article>`).join("")}</div>` : `<div class="report-list"><div class="report-empty">Belum ada laporan.</div></div>`;
  return `<section class="report-section"><h2>${escapeHtml(title)} <span>${rows.length} laporan</span></h2>${body}</section>`;
}

function renderClaimGroup(rows, claimItems) {
  const body = rows.length ? `<div class="report-list">${rows.map((row) => {
    const item = claimItems[row.found_item_id];
    return `<article class="report-line"><div><h3>${escapeHtml(item ? item.name : "Barang ditemukan")}</h3><p>${escapeHtml(item ? item.category : "Claim kepemilikan")}</p></div><span class="report-date">Diajukan ${escapeHtml(formatDate(row.created_at))}</span>${statusBadge(row.status)}</article>`;
  }).join("")}</div>` : `<div class="report-list"><div class="report-empty">Belum ada pengajuan claim.</div></div>`;
  return `<section class="report-section"><h2>Pengajuan claim <span>${rows.length} pengajuan</span></h2>${body}</section>`;
}

function normalizePanelRole(role) {
  const value = String(role || "").toLowerCase();
  return PANEL_ROLE_LABELS[value] ? value : "user";
}

function applyPanelIdentity() {
  const role = normalizePanelRole(state.panelRole);
  const label = PANEL_ROLE_LABELS[role] || "";
  elements.accountBadge.hidden = !label;
  elements.accountBadge.textContent = label;
  elements.accountBadge.className = `role-badge role-${role}`;
  elements.panelLink.hidden = role === "user";
  elements.panelLink.href = PANEL_URL;
}

async function loadAnnouncements() {
  try {
    const { data, error } = await state.client
      .from("announcements")
      .select("id, title, body, level, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(ANNOUNCEMENT_LIMIT);
    if (error) throw error;
    state.announcements = data || [];
  } catch (error) {
    state.announcements = [];
    console.warn("Pengumuman tidak dapat dimuat:", error);
  }
}

function renderAnnouncementList() {
  const rows = state.announcements;
  if (!rows.length) return "";
  return `<div class="announcement-list">${rows.map((row) => `
    <article class="announcement is-${escapeAttribute(row.level || "info")}">
      <div class="announcement-head">
        <h2>${escapeHtml(row.title || "Pengumuman")}</h2>
        <span class="announcement-date">${escapeHtml(formatDate(row.published_at))}</span>
      </div>
      ${row.body ? `<p>${escapeHtml(row.body)}</p>` : ""}
    </article>`).join("")}</div>`;
}

async function loadAdminData() {
  const [foundResult, lostResult, claimResult] = await Promise.all([
    state.client.from("found_items").select("*").order("created_at", { ascending: false }),
    state.client.from("lost_reports").select("*").order("created_at", { ascending: false }),
    state.client.from("claims").select("*").order("created_at", { ascending: false })
  ]);
  if (foundResult.error) throw foundResult.error;
  if (lostResult.error) throw lostResult.error;
  if (claimResult.error) throw claimResult.error;

  const found = foundResult.data || [];
  const lost = lostResult.data || [];
  const claims = claimResult.data || [];
  const relatedUserIds = [...new Set([
    ...found.map((row) => row.reported_by),
    ...lost.map((row) => row.reported_by),
    ...claims.map((row) => row.claimant_id)
  ].filter(Boolean))];
  let profilesById = {};
  if (relatedUserIds.length) {
    const { data, error } = await state.client.from("profiles").select("id, full_name, email").in("id", relatedUserIds);
    if (!error) profilesById = Object.fromEntries((data || []).map((profile) => [profile.id, profile]));
  }
  const [foundWithImages, lostWithImages] = await Promise.all([
    attachSignedImages(found, "found-items"),
    attachSignedImages(lost, "lost-reports")
  ]);
  state.adminData = {
    found: foundWithImages,
    lost: lostWithImages,
    claims,
    itemsById: Object.fromEntries(found.map((item) => [item.id, item])),
    profilesById
  };
}

function renderAdminPage() {
  if (!state.profile || state.panelRole === "user") {
    elements.appContent.innerHTML = errorMarkup("Akses admin tidak tersedia.", "Halaman ini hanya dapat dibuka oleh petugas yang ditetapkan sebagai admin.");
    return;
  }
  const tabs = [
    ["found", "Barang ditemukan"],
    ["lost", "Laporan kehilangan"],
    ["claims", "Pengajuan claim"]
  ];
  let content = "";
  if (state.adminTab === "found") content = renderAdminFound();
  else if (state.adminTab === "lost") content = renderAdminLost();
  else content = renderAdminClaims();

  elements.appContent.innerHTML = `
    <section aria-labelledby="admin-page-title">
      <div class="page-heading"><div><p class="section-kicker">Pengelolaan layanan</p><h1 id="admin-page-title">Administrasi</h1><p>Tinjau laporan, verifikasi barang, dan proses pengajuan claim.</p></div></div>
      <div class="admin-tabs" role="tablist" aria-label="Data administrasi">
        ${tabs.map(([key, label]) => `<button class="admin-tab ${state.adminTab === key ? "is-active" : ""}" type="button" role="tab" aria-selected="${state.adminTab === key}" data-action="admin-tab" data-tab="${key}">${label}</button>`).join("")}
      </div>
      ${content}
    </section>`;
}

function renderAdminFound() {
  const rows = state.adminData.found;
  if (!rows.length) return renderEmptyState("Belum ada laporan barang ditemukan", "Laporan baru akan muncul setelah dikirim oleh pengguna.");
  return `<div class="admin-list">${rows.map((row) => {
    const reporter = state.adminData.profilesById[row.reported_by];
    const actions = row.status === "pending"
      ? `<button class="button button-primary button-small" type="button" data-action="found-status" data-id="${escapeAttribute(row.id)}" data-status="available">Setujui &amp; tampilkan</button><button class="button button-danger button-small" type="button" data-action="found-status" data-id="${escapeAttribute(row.id)}" data-status="rejected">Tolak</button>`
      : row.status === "available"
        ? `<button class="button button-secondary button-small" type="button" data-action="edit-found" data-id="${escapeAttribute(row.id)}">Edit</button><button class="button button-secondary button-small" type="button" data-action="found-status" data-id="${escapeAttribute(row.id)}" data-status="archived">Arsipkan</button>`
        : row.status === "claimed"
          ? `<button class="button button-secondary button-small" type="button" data-action="edit-found" data-id="${escapeAttribute(row.id)}">Edit</button><button class="button button-secondary button-small" type="button" data-action="found-status" data-id="${escapeAttribute(row.id)}" data-status="archived">Arsipkan</button>`
          : row.status === "archived"
            ? `<button class="button button-secondary button-small" type="button" data-action="edit-found" data-id="${escapeAttribute(row.id)}">Edit</button>`
            : "";
    return `<article class="admin-row">
      <div class="admin-row-main">
        <div class="admin-row-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Barang tanpa nama")}</h3></div>
        <p class="admin-row-meta">${escapeHtml(row.category || "Tanpa kategori")} · ${escapeHtml(row.location_found || "Lokasi belum dicatat")} · ditemukan ${escapeHtml(formatDate(row.found_at || row.created_at))}</p>
        <p class="admin-row-meta">Pelapor: ${escapeHtml(reporter ? (reporter.full_name || reporter.email) : "Akun tidak tersedia")} · diterima ${escapeHtml(formatDate(row.created_at))}</p>
        ${row.imageUrl ? `<div class="admin-image">${renderImage(row.imageUrl, `Foto ${row.name}`, "")}</div>` : ""}
        ${row.description ? `<p class="admin-row-description">${escapeHtml(row.description)}</p>` : ""}
        ${row.distinctive_features ? `<p class="admin-row-description"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
      </div>
      ${actions ? `<div class="admin-row-actions">${actions}</div>` : ""}
    </article>`;
  }).join("")}</div>`;
}

function renderAdminLost() {
  const rows = state.adminData.lost;
  if (!rows.length) return renderEmptyState("Belum ada laporan kehilangan", "Laporan kehilangan dari pengguna akan muncul di sini.");
  return `<div class="admin-list">${rows.map((row) => {
    const reporter = state.adminData.profilesById[row.reported_by];
    let actions = "";
    if (row.status === "pending") actions = `<button class="button button-primary button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="under_review">Mulai tinjau</button><button class="button button-danger button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="rejected">Tolak</button>`;
    else if (row.status === "under_review") actions = `<button class="button button-secondary button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="matched">Tandai cocok</button><button class="button button-secondary button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="resolved">Selesaikan</button><button class="button button-danger button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="rejected">Tolak</button>`;
    else if (row.status === "matched") actions = `<button class="button button-secondary button-small" type="button" data-action="lost-status" data-id="${escapeAttribute(row.id)}" data-status="resolved">Tandai selesai</button>`;
    return `<article class="admin-row">
      <div class="admin-row-main">
        <div class="admin-row-title">${statusBadge(row.status)}<h3>${escapeHtml(row.name || "Laporan tanpa nama")}</h3></div>
        <p class="admin-row-meta">${escapeHtml(row.category || "Tanpa kategori")} · terakhir terlihat ${escapeHtml(row.last_seen_location || "Lokasi belum dicatat")} · ${escapeHtml(formatDate(row.lost_at))}</p>
        <p class="admin-row-meta">Pelapor: ${escapeHtml(reporter ? (reporter.full_name || reporter.email) : "Akun tidak tersedia")} · diterima ${escapeHtml(formatDate(row.created_at))}</p>
        ${row.imageUrl ? `<div class="admin-image">${renderImage(row.imageUrl, `Foto ${row.name}`, "")}</div>` : ""}
        ${row.description ? `<p class="admin-row-description">${escapeHtml(row.description)}</p>` : ""}
        ${row.distinctive_features ? `<p class="admin-row-description"><strong>Ciri khusus:</strong> ${escapeHtml(row.distinctive_features)}</p>` : ""}
        ${row.additional_info ? `<p class="admin-row-description"><strong>Informasi tambahan:</strong> ${escapeHtml(row.additional_info)}</p>` : ""}
      </div>
      ${actions ? `<div class="admin-row-actions">${actions}</div>` : ""}
    </article>`;
  }).join("")}</div>`;
}

function renderAdminClaims() {
  const rows = state.adminData.claims;
  if (!rows.length) return renderEmptyState("Belum ada pengajuan claim", "Pengajuan kepemilikan akan muncul di sini.");
  return `<div class="admin-list">${rows.map((row) => {
    const item = state.adminData.itemsById[row.found_item_id];
    const claimant = state.adminData.profilesById[row.claimant_id];
    let actions = "";
    if (row.status === "pending") actions = `<button class="button button-primary button-small" type="button" data-action="claim-status" data-id="${escapeAttribute(row.id)}" data-status="approved">Setujui claim</button><button class="button button-danger button-small" type="button" data-action="claim-status" data-id="${escapeAttribute(row.id)}" data-status="rejected">Tolak</button>`;
    else if (row.status === "approved") actions = `<button class="button button-secondary button-small" type="button" data-action="claim-status" data-id="${escapeAttribute(row.id)}" data-status="completed">Tandai diserahkan</button>`;
    return `<article class="admin-row">
      <div class="admin-row-main">
        <div class="admin-row-title">${statusBadge(row.status)}<h3>${escapeHtml(item ? item.name : "Barang tidak tersedia")}</h3></div>
        <p class="admin-row-meta">Pemohon: ${escapeHtml(claimant ? (claimant.full_name || claimant.email) : "Akun tidak tersedia")} · diajukan ${escapeHtml(formatDate(row.created_at))}</p>
        ${row.proof_description ? `<p class="admin-proof">${escapeHtml(row.proof_description)}</p>` : ""}
      </div>
      ${actions ? `<div class="admin-row-actions">${actions}</div>` : ""}
    </article>`;
  }).join("")}</div>`;
}

async function handleReportSubmit(form, type) {
  if (!state.user || !state.client) return;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Mengirim…";
  setAppAlert("");
  let uploadedPath = null;
  const data = new FormData(form);
  const imageFile = data.get("image");
  try {
    const photo = imageFile && imageFile.size > 0 ? imageFile : null;
    if (photo) uploadedPath = await uploadImage(photo, type === "lost" ? "lost-reports" : "found-items");
    const occurredAt = data.get("occurred_at");
    const payload = {
      name: String(data.get("name") || "").trim(),
      category: String(data.get("category") || "").trim(),
      description: String(data.get("description") || "").trim(),
      distinctive_features: String(data.get("distinctive_features") || "").trim() || null,
      additional_info: String(data.get("additional_info") || "").trim() || null,
      image_path: uploadedPath,
      status: "pending",
      reported_by: state.user.id
    };
    if (type === "lost") {
      payload.last_seen_location = String(data.get("location") || "").trim();
      payload.lost_at = new Date(occurredAt).toISOString();
    } else {
      payload.location_found = String(data.get("location") || "").trim();
      payload.found_at = new Date(occurredAt).toISOString();
    }

    const table = type === "lost" ? "lost_reports" : "found_items";
    const { error } = await state.client.from(table).insert(payload);
    if (error) throw error;
    state.reportSuccess = type;
    await navigateTo(type === "lost" ? "reportLost" : "reportFound");
    setAppAlert("Laporan berhasil dikirim.", "success");
  } catch (error) {
    console.error("Could not submit report:", error);
    if (uploadedPath) {
      const bucket = type === "lost" ? "lost-reports" : "found-items";
      await state.client.storage.from(bucket).remove([uploadedPath]).catch(() => {});
    }
    setAppAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function handleClaimSubmit(form) {
  if (!state.selectedItem || !state.user) return;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Mengirim…";
  setAppAlert("");
  try {
    const formData = new FormData(form);
    const { error } = await state.client.from("claims").insert({
      found_item_id: state.selectedItem.id,
      claimant_id: state.user.id,
      proof_description: String(formData.get("proof_description") || "").trim(),
      status: "pending"
    });
    if (error) throw error;
    state.claimExpanded = false;
    await loadClaimStatus(state.selectedItem.id);
    renderItemDetail();
    setAppAlert("Pengajuan claim berhasil dikirim. Petugas akan meninjau bukti kepemilikan Anda.", "success");
  } catch (error) {
    console.error("Could not submit claim:", error);
    if (error && error.code === "23505") setAppAlert("Anda sudah pernah mengajukan claim untuk barang ini.", "info");
    else setAppAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function uploadImage(file, bucket) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) throw new Error("Gunakan file JPG, PNG, atau WebP.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran foto maksimum 5 MB.");
  const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
  const randomId = window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const path = `${state.user.id}/${Date.now()}-${randomId}.${extension}`;
  const { error } = await state.client.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false
  });
  if (error) throw error;
  return path;
}

async function changeAdminStatus(table, id, status) {
  const successMessages = {
    available: "Barang disetujui dan ditampilkan.",
    rejected: "Laporan ditolak.",
    archived: "Barang diarsipkan.",
    under_review: "Laporan ditandai dalam peninjauan.",
    matched: "Laporan ditandai cocok.",
    resolved: "Laporan ditandai selesai."
  };
  try {
    const { error } = await state.client.from(table).update({ status }).eq("id", id);
    if (error) throw error;
    await loadAdminData();
    renderAdminPage();
    setAppAlert(successMessages[status] || "Status diperbarui.", "success");
  } catch (error) {
    console.error("Could not update admin record:", error);
    setAppAlert(friendlyError(error), "error");
  }
}

async function reviewClaim(id, status) {
  try {
    const { error } = await state.client.rpc("admin_review_claim", {
      p_claim_id: id,
      p_status: status
    });
    if (error) throw error;
    await loadAdminData();
    renderAdminPage();
    const messages = { approved: "Claim disetujui dan barang ditandai sudah diklaim.", rejected: "Claim ditolak.", completed: "Barang ditandai sudah diserahkan." };
    setAppAlert(messages[status] || "Claim diperbarui.", "success");
  } catch (error) {
    console.error("Could not process claim:", error);
    setAppAlert(friendlyError(error), "error");
  }
}

function openEditModal(id) {
  const item = state.adminData.found.find((row) => row.id === id);
  if (!item) return;
  elements.dialogRoot.innerHTML = `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="edit-dialog-title">
        <div class="modal-header"><div><p class="section-kicker">Kelola barang</p><h2 id="edit-dialog-title">Edit barang ditemukan</h2></div><button class="modal-close" type="button" aria-label="Tutup" data-action="close-modal">×</button></div>
        <div class="modal-content">
          <form id="edit-found-form" data-id="${escapeAttribute(item.id)}" data-old-path="${escapeAttribute(item.image_path || "")}">
            <div class="form-grid">
              <label class="field" for="edit-name"><span>Nama barang</span><input id="edit-name" name="name" type="text" required minlength="2" maxlength="120" value="${escapeAttribute(item.name || "")}"></label>
              <label class="field" for="edit-category"><span>Kategori</span><select id="edit-category" name="category" required>${renderCategoryOptions(item.category, false)}</select></label>
              <label class="field field-full" for="edit-description"><span>Deskripsi</span><textarea id="edit-description" name="description" required minlength="5" maxlength="2000">${escapeHtml(item.description || "")}</textarea></label>
              <label class="field field-full" for="edit-features"><span>Ciri khusus</span><textarea id="edit-features" name="distinctive_features" maxlength="1500">${escapeHtml(item.distinctive_features || "")}</textarea></label>
              <label class="field" for="edit-location"><span>Lokasi ditemukan</span><input id="edit-location" name="location_found" type="text" maxlength="180" required value="${escapeAttribute(item.location_found || "")}"></label>
              <label class="field" for="edit-date"><span>Tanggal / waktu ditemukan</span><input id="edit-date" name="found_at" type="datetime-local" required value="${escapeAttribute(toLocalInput(item.found_at))}"></label>
              <label class="field field-full" for="edit-additional"><span>Informasi tambahan</span><textarea id="edit-additional" name="additional_info" maxlength="1500">${escapeHtml(item.additional_info || "")}</textarea></label>
              <label class="field field-full" for="edit-image"><span>Ganti foto <span class="field-hint">(opsional)</span></span><input id="edit-image" name="image" type="file" accept="image/jpeg,image/png,image/webp"><span class="field-hint">JPG, PNG, atau WebP · maksimum 5 MB.</span></label>
            </div>
            <div class="form-actions"><button class="button button-primary" type="submit">Simpan perubahan</button><button class="button button-secondary" type="button" data-action="close-modal">Batal</button></div>
          </form>
        </div>
      </section>
    </div>`;
  const firstInput = document.getElementById("edit-name");
  if (firstInput) firstInput.focus();
}

async function handleEditSubmit(form) {
  const id = form.dataset.id;
  const oldPath = form.dataset.oldPath || null;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  const data = new FormData(form);
  const imageFile = data.get("image");
  const photo = imageFile && imageFile.size > 0 ? imageFile : null;
  let newPath = null;
  button.disabled = true;
  button.textContent = "Menyimpan…";
  try {
    if (photo) newPath = await uploadImage(photo, "found-items");
    const payload = {
      name: String(data.get("name") || "").trim(),
      category: String(data.get("category") || "").trim(),
      description: String(data.get("description") || "").trim(),
      distinctive_features: String(data.get("distinctive_features") || "").trim() || null,
      location_found: String(data.get("location_found") || "").trim(),
      found_at: new Date(data.get("found_at")).toISOString(),
      additional_info: String(data.get("additional_info") || "").trim() || null
    };
    if (newPath) payload.image_path = newPath;
    const { error } = await state.client.from("found_items").update(payload).eq("id", id);
    if (error) throw error;
    if (newPath && oldPath) await state.client.storage.from("found-items").remove([oldPath]).catch(() => {});
    elements.dialogRoot.innerHTML = "";
    await loadAdminData();
    renderAdminPage();
    setAppAlert("Perubahan barang berhasil disimpan.", "success");
  } catch (error) {
    console.error("Could not edit found item:", error);
    if (newPath) await state.client.storage.from("found-items").remove([newPath]).catch(() => {});
    setAppAlert(friendlyError(error), "error");
    button.disabled = false;
    button.textContent = originalText;
  }
}

function handleMainClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    event.preventDefault();
    navigateTo(routeButton.dataset.route);
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, id, status, tab } = actionButton.dataset;
  if (action === "open-item") {
    const item = state.foundItems.find((row) => row.id === id);
    if (!item) return;
    state.selectedItem = item;
    state.claimExpanded = false;
    state.claimStatus = null;
    navigateTo("itemDetail");
  } else if (action === "back-to-list") {
    navigateTo("foundItems");
  } else if (action === "start-claim") {
    state.claimExpanded = true;
    renderItemDetail();
    document.getElementById("claim-proof")?.focus();
  } else if (action === "cancel-claim") {
    state.claimExpanded = false;
    renderItemDetail();
  } else if (action === "new-report") {
    state.reportSuccess = null;
    navigateTo(state.view === "reportLost" ? "reportLost" : "reportFound");
  } else if (action === "cancel-report") {
    navigateTo("foundItems");
  } else if (action === "admin-tab") {
    state.adminTab = tab;
    renderAdminPage();
  } else if (action === "found-status") {
    changeAdminStatus("found_items", id, status);
  } else if (action === "lost-status") {
    changeAdminStatus("lost_reports", id, status);
  } else if (action === "claim-status") {
    reviewClaim(id, status);
  } else if (action === "edit-found") {
    openEditModal(id);
  }
}

function handleDialogClick(event) {
  const closeButton = event.target.closest("button[data-action='close-modal']");
  const clickedBackdrop = event.target.classList && event.target.classList.contains("modal-backdrop");
  if (closeButton || clickedBackdrop) elements.dialogRoot.innerHTML = "";
}

function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id === "report-lost-form") {
    event.preventDefault();
    handleReportSubmit(form, "lost");
  } else if (form.id === "report-found-form") {
    event.preventDefault();
    handleReportSubmit(form, "found");
  } else if (form.id === "claim-form") {
    event.preventDefault();
    handleClaimSubmit(form);
  } else if (form.id === "edit-found-form") {
    event.preventDefault();
    handleEditSubmit(form);
  }
}

function handleMainInput(event) {
  if (event.target.id === "found-search") {
    state.filters.search = event.target.value;
    renderFoundList();
  }
}

function handleMainChange(event) {
  if (event.target.id === "found-category") state.filters.category = event.target.value;
  else if (event.target.id === "found-status") state.filters.status = event.target.value;
  else if (event.target.id === "found-sort") state.filters.sort = event.target.value;
  else return;
  renderFoundList();
}

function toggleMobileMenu() {
  const open = elements.nav.classList.toggle("is-open");
  elements.mobileMenu.setAttribute("aria-expanded", String(open));
  elements.mobileMenu.querySelector(".visually-hidden").textContent = open ? "Tutup navigasi" : "Buka navigasi";
}

function renderCategoryOptions(selectedValue, includeAll) {
  const first = includeAll
    ? `<option value="all" ${selectedValue === "all" ? "selected" : ""}>Semua kategori</option>`
    : `<option value="" disabled ${!selectedValue ? "selected" : ""}>Pilih kategori</option>`;
  return first + CATEGORY_OPTIONS.map((category) => `<option value="${escapeAttribute(category)}" ${selectedValue === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("");
}

function statusBadge(status) {
  const safeStatus = Object.prototype.hasOwnProperty.call(STATUS_LABELS, status) ? status : "pending";
  return `<span class="status-badge status-${safeStatus}">${escapeHtml(STATUS_LABELS[safeStatus])}</span>`;
}

function renderImage(url, alt, className) {
  if (!url || !isSafeImageUrl(url)) return "";
  const classAttribute = className ? ` class="${escapeAttribute(className)}"` : "";
  return `<img${classAttribute} src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" loading="lazy">`;
}

function isSafeImageUrl(value) {
  try {
    const parsed = new URL(value, window.location.href);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch (_) {
    return false;
  }
}

function renderEmptyState(title, description) {
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p></div>`;
}
function loadingMarkup(text) { return `<div class="loading-state" role="status">${escapeHtml(text)}</div>`; }
function errorMarkup(title, description) { return renderEmptyState(title, description); }

function formatDate(value) {
  if (!value) return "Tanggal belum dicatat";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Tanggal belum dicatat";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta"
  }).format(date);
}

function toLocalInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).format(date);
  return parts.replace(" ", "T");
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}
function escapeAttribute(value) { return escapeHtml(value); }

function friendlyError(error) {
  console.error(error);
  if (error instanceof Error && !error.code && error.message) return error.message;
  const code = error && error.code ? String(error.code) : "";
  const message = String(error && error.message ? error.message : "");
  if (code === "23505") return "Data dengan informasi tersebut sudah tercatat.";
  if (code === "42501" || message.toLowerCase().includes("row-level security")) return "Akses ditolak oleh kebijakan keamanan. Pastikan akun dan RLS policy sudah dikonfigurasi dengan benar.";
  if (message.toLowerCase().includes("failed to fetch")) return "Tidak dapat terhubung ke Supabase. Periksa jaringan dan konfigurasi project.";
  if (message) return message;
  return "Terjadi kesalahan. Silakan coba lagi atau hubungi petugas sekolah.";
}

function setCookieNoticeOpen(isOpen) {
  elements.cookieNoticePanel.hidden = !isOpen;
  elements.cookieNoticeButton.setAttribute("aria-expanded", String(isOpen));
}

elements.loginForm.addEventListener("submit", handleLogin);
elements.forgotPassword.addEventListener("click", handleForgotPassword);
elements.googleLogin.addEventListener("click", handleGoogleLogin);
elements.recoveryForm.addEventListener("submit", handleRecoverySubmit);
elements.recoveryBack.addEventListener("click", returnFromRecovery);
elements.cookieNoticeButton.addEventListener("click", () => setCookieNoticeOpen(elements.cookieNoticePanel.hidden));
elements.cookieNoticeClose.addEventListener("click", () => setCookieNoticeOpen(false));
elements.logoutButton.addEventListener("click", handleLogout);
elements.nav.addEventListener("click", handleMainClick);
document.querySelector(".app-header").addEventListener("click", handleMainClick);
elements.appContent.addEventListener("click", handleMainClick);
elements.appContent.addEventListener("submit", handleSubmit);
elements.appContent.addEventListener("input", handleMainInput);
elements.appContent.addEventListener("change", handleMainChange);
elements.dialogRoot.addEventListener("click", handleDialogClick);
elements.dialogRoot.addEventListener("submit", handleSubmit);
elements.mobileMenu.addEventListener("click", toggleMobileMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && elements.dialogRoot.firstElementChild) elements.dialogRoot.innerHTML = "";
});

initialize();

document.getElementById("language-select").addEventListener("change", (event) => {
  currentLanguage = event.target.value === "en" ? "en" : "id";
  try { localStorage.setItem("language", currentLanguage); } catch (error) { currentLanguage = event.target.value === "en" ? "en" : "id"; }
  applyLanguage();
});
applyLanguage();
