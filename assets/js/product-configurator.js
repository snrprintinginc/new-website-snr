
const productData = window.SNR_PRODUCT_DATA || {};
const money = (value) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);
const qs = new URLSearchParams(window.location.search);
const selectedKey = qs.get('product') && productData[qs.get('product')] ? qs.get('product') : 'business-cards';
const product = productData[selectedKey];

const ids = {
  title: document.getElementById('configProductTitle'),
  category: document.getElementById('configProductCategory'),
  lead: document.getElementById('configProductLead'),
  description: document.getElementById('configProductDescription'),
  image: document.getElementById('configProductImage'),
  useCases: document.getElementById('configUseCases'),
  popularSpecs: document.getElementById('configPopularSpecs'),
  summaryTitle: document.getElementById('summaryTitle'),
  summaryBase: document.getElementById('summaryBase'),
  summaryOptions: document.getElementById('summaryOptions'),
  summarySubtotal: document.getElementById('summarySubtotal'),
  summaryTax: document.getElementById('summaryTax'),
  summaryTotal: document.getElementById('summaryTotal'),
  summaryTurnaround: document.getElementById('summaryTurnaround'),
  summaryDelivery: document.getElementById('summaryDelivery'),
  summarySnapshot: document.getElementById('summarySnapshot'),
  quoteLink: document.getElementById('requestQuoteLink'),
  feedback: document.getElementById('cartFeedback'),
  addToCartBtn: document.getElementById('addToCartBtn')
};

function populateSelect(id, items) {
  const select = document.getElementById(id);
  select.innerHTML = Object.keys(items).map((label, idx) => `<option value="${label}" ${idx === 0 ? 'selected' : ''}>${label}</option>`).join('');
}

function renderProductMeta() {
  ids.title.textContent = product.title;
  ids.category.textContent = product.category;
  ids.lead.textContent = product.lead;
  ids.description.textContent = product.description;
  ids.image.src = product.image;
  ids.image.alt = product.title;
  ids.useCases.innerHTML = product.useCases.map((item) => `<li>${item}</li>`).join('');
  ids.popularSpecs.innerHTML = product.popularSpecs.map((item) => `<li>${item}</li>`).join('');
  ids.summaryTitle.textContent = product.title;
  ids.quoteLink.href = product.quoteLink;

  populateSelect('sizeOption', product.sizes);
  populateSelect('stockOption', product.stocks);
  populateSelect('quantityOption', product.quantity);
  populateSelect('finishOption', product.finishes);
  populateSelect('foldOption', product.folds);
}

function currentSelections() {
  return {
    size: document.getElementById('sizeOption').value,
    stock: document.getElementById('stockOption').value,
    quantity: document.getElementById('quantityOption').value,
    sides: document.getElementById('sidesOption').value,
    color: document.getElementById('colorOption').value,
    finish: document.getElementById('finishOption').value,
    fold: document.getElementById('foldOption').value,
    corners: document.getElementById('cornersOption').value,
    lamination: document.getElementById('laminationOption').value,
    speed: document.getElementById('speedOption').value,
    delivery: document.getElementById('deliveryOption').value,
    designHelp: document.getElementById('designHelpOption').value,
    proof: document.getElementById('proofOption').value,
    notes: document.getElementById('designNotes').value.trim()
  };
}

function updateSummary() {
  const selections = currentSelections();
  const qtyMultiplier = product.quantity[selections.quantity] || 1;
  const base = product.basePrice * qtyMultiplier;
  let options = 0;
  options += product.sizes[selections.size] || 0;
  options += product.stocks[selections.stock] || 0;
  options += product.finishes[selections.finish] || 0;
  options += product.folds[selections.fold] || 0;
  options += selections.sides === '2' ? 18 : 0;
  options += selections.color === 'bw' ? -12 : 0;
  options += selections.corners === 'rounded' ? 12 : 0;
  options += selections.lamination === 'matte' ? 24 : selections.lamination === 'soft-touch' ? 42 : 0;
  options += selections.delivery === 'local-delivery' ? 24 : selections.delivery === 'shipping' ? 18 : 0;
  options += selections.designHelp === 'minor' ? 35 : selections.designHelp === 'full' ? 95 : 0;
  options += selections.proof === 'press' ? 30 : selections.proof === 'none' ? -5 : 0;

  const speed = product.turnarounds[selections.speed];
  const subtotal = (base + options) * speed.mult;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  ids.summaryBase.textContent = money(base);
  ids.summaryOptions.textContent = money((base + options) * speed.mult - base);
  ids.summarySubtotal.textContent = money(subtotal);
  ids.summaryTax.textContent = money(tax);
  ids.summaryTotal.textContent = money(total);
  ids.summaryTurnaround.textContent = speed.days;
  ids.summaryDelivery.textContent = document.getElementById('deliveryOption').selectedOptions[0].textContent;
  ids.summarySnapshot.innerHTML = [
    `${product.title}`,
    `Size: ${selections.size}`,
    `Stock: ${selections.stock}`,
    `Quantity: ${selections.quantity}`,
    `Sides: ${document.getElementById('sidesOption').selectedOptions[0].textContent}`,
    `Finish: ${selections.finish}`,
    `Turnaround: ${document.getElementById('speedOption').selectedOptions[0].textContent}`,
    `Proof: ${document.getElementById('proofOption').selectedOptions[0].textContent}`
  ].map((item) => `<li>${item}</li>`).join('');

  ids.addToCartBtn.dataset.cartPayload = JSON.stringify({
    product: product.title,
    size: selections.size,
    stock: selections.stock,
    quantity: selections.quantity,
    speed: document.getElementById('speedOption').selectedOptions[0].textContent,
    delivery: document.getElementById('deliveryOption').selectedOptions[0].textContent,
    total: money(total),
    notes: selections.notes
  });
}

function bindEvents() {
  document.querySelectorAll('[data-config-field], #designNotes').forEach((el) => {
    el.addEventListener('change', updateSummary);
    el.addEventListener('input', updateSummary);
  });

  ids.addToCartBtn.addEventListener('click', () => {
    const payload = JSON.parse(ids.addToCartBtn.dataset.cartPayload || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      productId: selectedKey,
      name: payload.product,
      price: Number(String(payload.total || '').replace(/[^0-9.]/g, '')) || product.basePrice,
      qty: Number(payload.quantity) || 1,
      size: payload.size,
      stock: payload.stock,
      sides: document.getElementById('sidesOption').selectedOptions[0].textContent,
      lamination: document.getElementById('laminationOption').selectedOptions[0].textContent,
      finishing: document.getElementById('finishOption').selectedOptions[0].textContent,
      turnaround: payload.speed,
      notes: payload.notes || ''
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    ids.feedback.innerHTML = `${payload.product} added to cart. <a href="cart-summary.html">Review cart</a>`;
    window.SNR_SYNC_CART_BADGES?.();
  });
}

if (product) {
  renderProductMeta();
  bindEvents();
  updateSummary();
}
