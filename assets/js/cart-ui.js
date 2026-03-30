(function(){
  const CART_KEY = 'cart';
  const LEGACY_CART_KEYS = ['snrCart'];
  const money = (value) => `$${Number(value || 0).toFixed(2)}`;
  const safeCart = () => {
    try {
      const primary = JSON.parse(localStorage.getItem(CART_KEY) || 'null');
      if (Array.isArray(primary) && primary.length) return primary;
      for (const key of LEGACY_CART_KEYS) {
        const legacy = JSON.parse(localStorage.getItem(key) || 'null');
        if (Array.isArray(legacy) && legacy.length) {
          localStorage.setItem(CART_KEY, JSON.stringify(legacy));
          return legacy;
        }
      }
      return Array.isArray(primary) ? primary : [];
    } catch {
      return [];
    }
  };
  const saveCart = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    LEGACY_CART_KEYS.forEach((key) => localStorage.removeItem(key));
    window.SNR_SYNC_CART_BADGES?.();
  };
  const summarize = (item) => {
    const meta = [item.size, item.stock, item.sides, item.lamination, item.finishing, item.turnaround].filter(Boolean);
    return meta.slice(0, 6).map((value) => `<span>${value}</span>`).join('');
  };
  const unitPrice = (item) => Number(item.price || 0);
  const lineTotal = (item) => unitPrice(item) * (Number(item.qty) || 1);

  function renderCart(){
    const list = document.getElementById('cartList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const countEl = document.getElementById('cartCount');
    if (!list) return;
    const cart = safeCart();
    countEl && (countEl.textContent = String(cart.reduce((s,i)=>s+(Number(i.qty)||1),0)));
    if (!cart.length) {
      list.innerHTML = '<div class="empty-state-lg"><h3>Your cart is empty.</h3><p class="small">Browse products, configure your specs, and add items to build your order.</p><div class="btn-row" style="justify-content:center;margin-top:1rem"><a class="btn btn-primary" href="products.html">Browse products</a><a class="btn btn-secondary" href="quote-request.html">Request a custom quote</a></div></div>';
      subtotalEl && (subtotalEl.textContent = money(0));
      totalEl && (totalEl.textContent = money(0));
      return;
    }
    list.innerHTML = cart.map((item, index) => `
      <article class="order-item">
        <div>
          <h4>${item.name || 'Print Item'}</h4>
          <div class="small">Unit price: ${money(unitPrice(item))}</div>
          <div class="order-meta">${summarize(item)}</div>
          ${item.packaging ? `<div class="small" style="margin-top:10px">Packing: ${item.packaging}</div>` : ''}
          ${item.notes ? `<div class="small" style="margin-top:6px">Notes: ${item.notes}</div>` : ''}
        </div>
        <div style="display:grid;justify-items:end;gap:10px">
          <div class="qty-stepper">
            <button type="button" data-cart-minus="${index}" aria-label="Decrease quantity">−</button>
            <span>${Number(item.qty)||1}</span>
            <button type="button" data-cart-plus="${index}" aria-label="Increase quantity">+</button>
          </div>
          <strong>${money(lineTotal(item))}</strong>
          <button class="btn btn-secondary" type="button" data-cart-remove="${index}">Remove</button>
        </div>
      </article>`).join('');
    const subtotal = cart.reduce((sum, item) => sum + lineTotal(item), 0);
    subtotalEl && (subtotalEl.textContent = money(subtotal));
    totalEl && (totalEl.textContent = money(subtotal));

    list.querySelectorAll('[data-cart-minus]').forEach((btn)=>btn.addEventListener('click',()=>changeQty(Number(btn.dataset.cartMinus),-1)));
    list.querySelectorAll('[data-cart-plus]').forEach((btn)=>btn.addEventListener('click',()=>changeQty(Number(btn.dataset.cartPlus),1)));
    list.querySelectorAll('[data-cart-remove]').forEach((btn)=>btn.addEventListener('click',()=>removeItem(Number(btn.dataset.cartRemove))));
  }

  function changeQty(index, delta){
    const cart = safeCart();
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, (Number(cart[index].qty) || 1) + delta);
    saveCart(cart);
    renderCart();
  }
  function removeItem(index){
    const cart = safeCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function initCheckout(){
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    const orderSummary = document.getElementById('checkoutOrderSummary');
    const totalEl = document.getElementById('checkoutTotal');
    const cart = safeCart();
    const subtotal = cart.reduce((sum, item) => sum + lineTotal(item), 0);
    totalEl.textContent = money(subtotal);
    orderSummary.innerHTML = cart.length
      ? cart.map(item => `<div class="summary-line"><span>${item.name} × ${Number(item.qty)||1}</span><strong>${money(lineTotal(item))}</strong></div>`).join('')
      : '<div class="form-note">No products are in the cart yet. You can still submit a custom order request from this page.</div>';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = [...form.querySelectorAll('[required]')];
      let valid = true;
      required.forEach((field) => {
        field.classList.remove('input-invalid');
        if (!String(field.value || '').trim()) { field.classList.add('input-invalid'); valid = false; }
      });

      const email = form.querySelector('#email');
      const postal = form.querySelector('#postalCode');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('input-invalid');
        valid = false;
      }
      if (postal && postal.value && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postal.value.trim())) {
        postal.classList.add('input-invalid');
        valid = false;
      }

      const msg = document.getElementById('checkoutMessage');
      if (!valid) {
        msg.hidden = false;
        msg.className = 'form-error';
        msg.textContent = 'Please complete every required field and correct any highlighted information before placing your order request.';
        return;
      }
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.orderDate = new Date().toISOString();
      payload.orderReference = `SNR-${Date.now().toString().slice(-8)}`;
      localStorage.setItem('snr_checkout_draft', JSON.stringify({ savedAt:new Date().toISOString(), payload, cart }));
      localStorage.removeItem(CART_KEY);
      LEGACY_CART_KEYS.forEach((key) => localStorage.removeItem(key));
      window.SNR_SYNC_CART_BADGES?.();
      msg.hidden = false;
      msg.className = 'form-success';
      msg.textContent = `Order request submitted successfully. Reference ${payload.orderReference}.`;
      orderSummary.innerHTML = '<div class="form-success">Thank you. Your order request has been recorded.</div>';
      totalEl.textContent = money(0);
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => { renderCart(); initCheckout(); });
})();
