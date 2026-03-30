
const portalConfig = window.SNR_PORTAL_CONFIG || {
  mode: 'demo',
  supabaseUrl: '',
  supabaseAnonKey: ''
};

const storeKey = 'snr_portal_user';
const usersKey = 'snr_portal_users';
const quotesKey = 'snr_portal_quotes';
const uploadKey = 'snr_portal_uploads';

const getUsers = () => JSON.parse(localStorage.getItem(usersKey) || '[]');
const setUsers = (users) => localStorage.setItem(usersKey, JSON.stringify(users));
const getCurrentUser = () => JSON.parse(localStorage.getItem(storeKey) || 'null');
const setCurrentUser = (user) => localStorage.setItem(storeKey, JSON.stringify(user));
const clearCurrentUser = () => localStorage.removeItem(storeKey);
const byId = (id) => document.getElementById(id);
const escapeHtml = (value = '') =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const msg = (id, text, ok = true) => {
  const el = byId(id);
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? '#d7c279' : '#ff9b9b';
};

function seedDemoData() {
  if (!localStorage.getItem(quotesKey)) {
    localStorage.setItem(quotesKey, JSON.stringify([
      { product: 'Presentation Folders', quantity: '1000', size: '9 x 12', stock: '14pt + AQ', details: '2 pockets, business card slits, ship to Mississauga', updated: '2026-03-20', status: 'Pricing in progress' },
      { product: 'Booklets', quantity: '500', size: '8.5 x 11', stock: '80lb text / 100lb cover', details: '24 pages plus cover, saddle-stitched', updated: '2026-03-18', status: 'Awaiting files' }
    ]));
  }
  if (!localStorage.getItem(uploadKey)) {
    localStorage.setItem(uploadKey, JSON.stringify([
      { name: 'folder-artwork-v3.pdf', type: 'PDF', uploaded: '2026-03-20' },
      { name: 'booklet-proof-notes.txt', type: 'TXT', uploaded: '2026-03-18' }
    ]));
  }
}
seedDemoData();

function requireAuth() {
  const protectedPages = ['portal-dashboard.html', 'portal-quotes.html', 'portal-orders.html', 'portal-upload.html', 'portal-proofs.html', 'portal-invoices.html', 'account-settings.html'];
  const file = location.pathname.split('/').pop();
  if (protectedPages.includes(file) && !getCurrentUser()) {
    location.href = 'login.html';
  }
}
requireAuth();

document.querySelectorAll('[data-auth-badge]').forEach((el) => {
  el.textContent = portalConfig.mode === 'live' ? 'Live mode configured' : 'Demo mode';
});

const currentUser = getCurrentUser();
document.querySelectorAll('[data-user-name]').forEach((el) => {
  el.textContent = currentUser?.name || 'Client';
});

const loginForm = byId('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = byId('loginEmail').value.trim().toLowerCase();
    const password = byId('loginPassword').value;
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return msg('loginMessage', 'Login failed. In demo mode, create an account first.', false);
    setCurrentUser(found);
    msg('loginMessage', 'Login successful. Redirecting…');
    setTimeout(() => location.href = 'portal-dashboard.html', 500);
  });
}

const registerForm = byId('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = byId('regPassword').value;
    const confirm = byId('regConfirm').value;
    if (password !== confirm) return msg('registerMessage', 'Passwords do not match.', false);
    if (password.length < 8) return msg('registerMessage', 'Password must be at least 8 characters.', false);

    const user = {
      name: `${byId('regFirstName').value.trim()} ${byId('regLastName').value.trim()}`.trim(),
      company: byId('regCompany').value.trim(),
      email: byId('regEmail').value.trim().toLowerCase(),
      phone: byId('regPhone').value.trim(),
      password,
      address: ''
    };

    const users = getUsers();
    if (users.find((u) => u.email === user.email)) {
      return msg('registerMessage', 'That email already exists in demo mode.', false);
    }
    users.push(user);
    setUsers(users);
    setCurrentUser(user);
    msg('registerMessage', 'Account created. Redirecting to dashboard…');
    setTimeout(() => location.href = 'portal-dashboard.html', 650);
  });
}

const resetForm = byId('resetForm');
if (resetForm) {
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg('resetMessage', 'Reset flow triggered. Connect Supabase Auth to send real reset emails.');
  });
}

document.querySelectorAll('[data-logout]').forEach((btn) => {
  btn.addEventListener('click', () => {
    clearCurrentUser();
    location.href = 'login.html';
  });
});

const current = getCurrentUser();
if (current) {
  const map = {
    settingsName: current.name || '',
    settingsCompany: current.company || '',
    settingsEmail: current.email || '',
    settingsPhone: current.phone || '',
    settingsAddress: current.address || ''
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = byId(id);
    if (el) el.value = value;
  });
}

const settingsForm = byId('settingsForm');
if (settingsForm) {
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const previousEmail = getCurrentUser()?.email || '';
    const user = {
      ...(getCurrentUser() || {}),
      name: byId('settingsName').value.trim(),
      company: byId('settingsCompany').value.trim(),
      email: byId('settingsEmail').value.trim().toLowerCase(),
      phone: byId('settingsPhone').value.trim(),
      address: byId('settingsAddress').value.trim()
    };
    setCurrentUser(user);
    const users = getUsers().map((u) => (u.email === previousEmail ? { ...u, ...user } : u));
    setUsers(users);
    document.querySelectorAll('[data-user-name]').forEach((el) => { el.textContent = user.name || 'Client'; });
    msg('settingsMessage', 'Settings saved in demo mode.');
  });
}

const portalQuoteForm = byId('portalQuoteForm');
if (portalQuoteForm) {
  portalQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const quotes = JSON.parse(localStorage.getItem(quotesKey) || '[]');
    quotes.unshift({
      product: byId('pqProduct').value.trim(),
      quantity: byId('pqQuantity').value.trim(),
      size: byId('pqSize').value.trim(),
      stock: byId('pqStock').value.trim(),
      details: byId('pqDetails').value.trim(),
      updated: new Date().toISOString().slice(0, 10),
      status: 'Received'
    });
    localStorage.setItem(quotesKey, JSON.stringify(quotes));
    msg('portalQuoteMessage', 'Quote request saved in demo mode.');
    portalQuoteForm.reset();
    renderQuoteRows();
    renderDashboardStats();
  });
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderQuoteRows() {
  const tbody = byId('quoteRows');
  if (!tbody) return;
  const quotes = JSON.parse(localStorage.getItem(quotesKey) || '[]');
  if (!quotes.length) {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state">No quotes yet. Submit one using the form above.</div></td></tr>`;
    return;
  }
  tbody.innerHTML = quotes.slice(0, 8).map((q) => `
    <tr>
      <td><strong>${escapeHtml(q.product || 'Custom print job')}</strong><div class="small">${escapeHtml(q.size || 'Size TBD')} · ${escapeHtml(q.quantity || 'Qty TBD')}</div></td>
      <td>${escapeHtml(q.stock || 'Stock TBD')}</td>
      <td><span class="status-chip warn">${escapeHtml(q.status || 'Received')}</span></td>
      <td>${formatDate(q.updated)}</td>
    </tr>
  `).join('');
}

const uploadForm = byId('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const files = [...(byId('uploadFiles').files || [])];
    if (!files.length) return msg('uploadMessage', 'No files selected.', false);
    const uploads = JSON.parse(localStorage.getItem(uploadKey) || '[]');
    files.forEach((file) => {
      uploads.unshift({
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploaded: new Date().toISOString().slice(0, 10)
      });
    });
    localStorage.setItem(uploadKey, JSON.stringify(uploads));
    msg('uploadMessage', `Saved ${files.length} file reference${files.length === 1 ? '' : 's'} in demo mode.`);
    uploadForm.reset();
    renderUploads();
  });
}

function renderUploads() {
  const list = byId('uploadRows');
  if (!list) return;
  const uploads = JSON.parse(localStorage.getItem(uploadKey) || '[]');
  if (!uploads.length) {
    list.innerHTML = `<tr><td colspan="3"><div class="empty-state">No file uploads recorded yet.</div></td></tr>`;
    return;
  }
  list.innerHTML = uploads.slice(0, 8).map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.type)}</td>
      <td>${formatDate(item.uploaded)}</td>
    </tr>
  `).join('');
}

function renderDashboardStats() {
  const quotes = JSON.parse(localStorage.getItem(quotesKey) || '[]');
  const stats = {
    quotesPending: quotes.length,
    openOrders: 3,
    proofApprovals: 1
  };
  Object.entries(stats).forEach(([id, value]) => {
    const el = byId(id);
    if (el) el.textContent = String(value);
  });
}

const approveProofBtn = byId('approveProofBtn');
if (approveProofBtn) approveProofBtn.addEventListener('click', () => msg('proofMessage', 'Proof approved in demo mode. Live mode should store timestamp, approver, and revision ID.'));
const rejectProofBtn = byId('rejectProofBtn');
if (rejectProofBtn) rejectProofBtn.addEventListener('click', () => msg('proofMessage', 'Change request recorded in demo mode. Live mode should save comments and notify staff.', false));

renderQuoteRows();
renderUploads();
renderDashboardStats();
