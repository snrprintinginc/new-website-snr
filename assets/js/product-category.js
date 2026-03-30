
const productData = window.SNR_PRODUCT_DATA || {};
const orderedKeys = window.SNR_PRODUCT_ORDER || Object.keys(productData);
const qs = new URLSearchParams(window.location.search);
const selectedKey = qs.get('product') && productData[qs.get('product')] ? qs.get('product') : 'business-cards';
const product = productData[selectedKey];

const title = document.getElementById('categoryTitle');
const badge = document.getElementById('categoryBadge');
const lead = document.getElementById('categoryLead');
const desc = document.getElementById('categoryDescription');
const image = document.getElementById('categoryImage');
const starting = document.getElementById('categoryStarting');
const turnaround = document.getElementById('categoryTurnaround');
const bestFor = document.getElementById('categoryBestFor');
const customize = document.getElementById('categoryCustomize');
const quote = document.getElementById('categoryQuote');
const useCases = document.getElementById('categoryUseCases');
const specs = document.getElementById('categorySpecs');
const notes = document.getElementById('categoryNotes');
const related = document.getElementById('relatedProducts');

const currency = (value) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);

function pickBestFor(product) {
  const mapping = {
    "Marketing": "Retail promos, sales teams, and campaigns",
    "Corporate": "Presentations, handouts, and office systems",
    "Stationery": "Branded office use and correspondence",
    "Signage": "Events, storefronts, and in-person visibility",
    "Specialty": "Premium finishing, labels, and custom applications"
  };
  const top = Object.keys(mapping).find((key) => product.category.includes(key));
  return mapping[top || "Marketing"];
}

function startingLabel(product) {
  return product.basePrice > 0 ? `${currency(product.basePrice)} CAD` : 'Custom quote';
}

function renderCategory() {
  document.title = `${product.title} | SNR Printing Inc.`;
  title.textContent = product.title;
  badge.textContent = product.category;
  lead.textContent = product.lead;
  desc.textContent = product.description;
  image.src = product.image;
  image.alt = product.title;
  starting.textContent = startingLabel(product);
  turnaround.textContent = product.lead;
  bestFor.textContent = pickBestFor(product);
  customize.href = `product-configurator.html?product=${selectedKey}`;
  quote.href = product.quoteLink;
  useCases.innerHTML = product.useCases.map((item) => `<li>${item}</li>`).join('');
  specs.innerHTML = product.popularSpecs.map((item) => `<li>${item}</li>`).join('');
  notes.textContent = `${product.title} can move through the storefront builder for normal sizes, standard stocks, routine finishing, and clean artwork. Shift to the quote path if you need unusual substrates, heavy custom finishing, variable versions, fulfillment, or trade packaging.`;
}

function renderRelated() {
  const currentIndex = orderedKeys.indexOf(selectedKey);
  const picks = orderedKeys.filter((key) => key !== selectedKey).slice(Math.max(0, currentIndex - 1), Math.max(0, currentIndex - 1) + 3);
  related.innerHTML = picks.map((key) => {
    const item = productData[key];
    return `<article class="product-card product-card-rich reveal is-visible">
      <img src="${item.image}" alt="${item.title}">
      <div class="product-meta"><span class="product-tag">${item.category}</span></div>
      <h3>${item.title}</h3>
      <p class="product-summary">${item.description}</p>
      <div class="product-bottom">
        <div class="product-price">Starting at <span>${item.basePrice > 0 ? currency(item.basePrice) : 'Custom quote'}</span></div>
        <div class="btn-row">
          <a class="btn btn-secondary" href="product-category.html?product=${key}">View details</a>
          <a class="btn btn-primary" href="product-configurator.html?product=${key}">Customize</a>
        </div>
      </div>
    </article>`;
  }).join('');
}

if (product) {
  renderCategory();
  renderRelated();
}
