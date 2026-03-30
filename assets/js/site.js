
(function(){
  const body = document.body;
  const topbar = document.querySelector('.topbar');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const CART_KEY = 'cart';

  const safeJson = (value, fallback) => { try { return JSON.parse(value); } catch { return fallback; } };
  const getCart = () => safeJson(localStorage.getItem(CART_KEY), []);
  const cartQty = () => getCart().reduce((sum, item) => sum + (Number(item.qty) || 1), 0);

  function syncCartBadges(){
    const qty = cartQty();
    document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = qty; el.hidden = qty <= 0; });
  }

  function enhanceCartButtons(){
    document.querySelectorAll('.cart-btn').forEach((btn) => {
      if (!btn.querySelector('[data-cart-count]')) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.setAttribute('data-cart-count', '');
        btn.appendChild(badge);
      }
    });
    syncCartBadges();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        nav.classList.remove('open');
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (topbar) {
    window.addEventListener('scroll', () => topbar.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  const mailtoBtn = document.querySelector('[data-mailto]');
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const g = (id) => document.getElementById(id)?.value?.trim() || '';
      const subject = encodeURIComponent(`Quote Request - ${g('product') || 'Print Job'}`);
      const bodyLines = [
        `Name: ${g('name')}`,
        `Company: ${g('company')}`,
        `Email: ${g('email')}`,
        `Phone: ${g('phone')}`,
        `Product: ${g('product')}`,
        `Quantity: ${g('quantity')}`,
        `Size / Format: ${g('size')}`,
        `Stock: ${g('stock')}`,
        `Turnaround: ${g('turnaround')}`,
        '', 'Specs / Notes:', g('details')
      ];
      window.location.href = `mailto:info@snrprinting.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });

  const productSearch = document.querySelector('[data-product-search]');
  const categoryButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('[data-category]');
  function applyProductFilters() {
    if (!productCards.length) return;
    const search = (productSearch?.value || '').trim().toLowerCase();
    const activeCategory = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
    let visibleCount = 0;
    productCards.forEach((card) => {
      const haystack = `${card.dataset.category} ${card.dataset.keywords} ${card.textContent}`.toLowerCase();
      const categoryMatch = activeCategory === 'all' || card.dataset.category.includes(activeCategory);
      const searchMatch = !search || haystack.includes(search);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });
    const count = document.querySelector('[data-results-count]');
    if (count) count.textContent = `${visibleCount} product${visibleCount === 1 ? '' : 's'} shown`;
  }
  categoryButtons.forEach((button) => button.addEventListener('click', () => {
    categoryButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    applyProductFilters();
  }));
  if (productSearch) {
    productSearch.addEventListener('input', applyProductFilters);
    applyProductFilters();
  }

  function injectUtilityBar(){
    if (!topbar || document.querySelector('.utility-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'utility-bar';
    bar.innerHTML = '<div class="container"><div class="utility-copy"><span>Commercial offset, digital and finishing</span><span>Mississauga / GTA service</span><span>Fast quote response for serious jobs</span></div><a href="quote-request.html">Need pricing?</a></div>';
    topbar.before(bar);
  }

  function injectQuickDock(){
    if (document.querySelector('.quick-dock')) return;
    const dock = document.createElement('div');
    dock.className = 'quick-dock';
    dock.innerHTML = '<a class="primary" href="quote-request.html" aria-label="Request a quote">Quote</a><a href="tel:9056243310" aria-label="Call SNR Printing">Call</a>';
    document.body.appendChild(dock);
  }

  function enhanceForms(){
    document.querySelectorAll('form').forEach((form) => {
      if (form.dataset.enhanced === 'true') return;
      form.dataset.enhanced = 'true';
      const message = document.createElement('div');
      message.hidden = true;
      form.appendChild(message);
      form.addEventListener('submit', (e) => {
        const fields = [...form.querySelectorAll('input, select, textarea')].filter((el) => !el.disabled && el.type !== 'hidden' && el.type !== 'submit' && el.type !== 'button');
        let valid = true;
        fields.forEach((field) => {
          field.classList.remove('input-invalid');
          if (field.hasAttribute('required') && !String(field.value || '').trim()) {
            field.classList.add('input-invalid');
            valid = false;
          }
        });
        if (!valid) {
          e.preventDefault();
          message.hidden = false;
          message.className = 'form-error';
          message.textContent = 'A few required fields are still blank. Fill those in and try again.';
          return;
        }
        if (!form.getAttribute('action')) {
          e.preventDefault();
          const payload = Object.fromEntries(new FormData(form).entries());
          const key = form.id ? `snr_form_${form.id}` : `snr_form_${location.pathname.replace(/\W+/g, '_')}`;
          localStorage.setItem(key, JSON.stringify({ savedAt: new Date().toISOString(), payload }));
          message.hidden = false;
          message.className = 'form-success';
          message.textContent = 'Thank you. Your information has been captured successfully.';
        }
      });
    });
  }

  function injectFooterBottom(){
    document.querySelectorAll('footer').forEach((footer) => {
      if (footer.querySelector('.footer-bottom')) return;
      const wrap = document.createElement('div');
      wrap.className = 'container footer-bottom';
      wrap.innerHTML = `<span class="small">© <span data-year>${new Date().getFullYear()}</span> SNR Printing Inc. All rights reserved.</span><span class="small">Built for serious print buyers, not template noise.</span>`;
      footer.appendChild(wrap);
    });
  }

  enhanceCartButtons();
  injectUtilityBar();
  injectQuickDock();
  enhanceForms();
  injectFooterBottom();
  window.addEventListener('storage', syncCartBadges);
  window.SNR_SYNC_CART_BADGES = syncCartBadges;
})();
