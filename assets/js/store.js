(() => {
  const PRODUCTS = [
    { id:'business-cards', name:'Business Cards', category:'Marketing', price:39.99, image:'assets/images/cover-photo.png', description:'Premium business cards for day-to-day selling, networking, introductions, and leave-behinds.', useCases:['Sales reps','Corporate staff','Trade counters'], specs:['3.5 x 2','14pt / 16pt / 18pt','Matte, gloss, soft touch'], badges:['Fast turnaround','Popular'], formDefaults:{size:'3.5 x 2', stock:'16pt silk cover', sides:'4/4', finish:'Matte / gloss / soft touch', turnaround:'2-4 business days'} },
    { id:'flyers', name:'Flyers', category:'Marketing', price:59.99, image:'assets/images/flyer-main-b.png', description:'Versatile flyers for promotions, menus, handouts, mail drops, and events.', useCases:['Promotions','Events','Retail handouts'], specs:['8.5 x 11','100lb text / 14pt cover','AQ or UV options'], badges:['Best seller'], formDefaults:{size:'8.5 x 11', stock:'100lb gloss text', sides:'4/4', finish:'Trim only or AQ', turnaround:'2-5 business days'} },
    { id:'postcards', name:'Postcards', category:'Marketing', price:49.99, image:'assets/images/flyer-main-c.png', description:'Postcards built for direct mail, campaign drops, neighbourhood marketing, and branded leave-behinds.', useCases:['Direct mail','Neighbourhood campaigns','Promo inserts'], specs:['4 x 6 / 5 x 7 / 6 x 9','14pt cover','Coated or uncoated'], badges:['Mailer ready'], formDefaults:{size:'5 x 7', stock:'14pt coated cover', sides:'4/4', finish:'AQ optional', turnaround:'2-5 business days'} },
    { id:'brochures', name:'Brochures', category:'Marketing', price:89.99, image:'assets/images/flyer-main-a.png', description:'Folded brochures for presentations, service overviews, product sales sheets, and promotional literature.', useCases:['Company overviews','Service menus','Product guides'], specs:['8.5 x 11 / 11 x 17','Bi-fold / tri-fold / z-fold','100lb text'], badges:['Folded pieces'], formDefaults:{size:'8.5 x 11 flat', stock:'100lb silk text', sides:'4/4', finish:'Tri-fold / bi-fold / z-fold', turnaround:'3-5 business days'} },
    { id:'booklets', name:'Booklets', category:'Corporate', price:149.99, image:'assets/images/snr-premium-promo.png', description:'Saddle-stitched booklets for catalogues, manuals, event programs, and premium presentation pieces.', useCases:['Programs','Catalogues','Guides'], specs:['8 pages +','Self cover or heavier cover','Saddle stitch'], badges:['Multipage'], formDefaults:{size:'8.5 x 11', stock:'100lb text + cover option', sides:'4/4', finish:'Saddle stitch', turnaround:'4-7 business days'} },
    { id:'presentation-folders', name:'Presentation Folders', category:'Corporate', price:149.99, image:'assets/images/gallery-premium-grid.png', description:'Presentation folders with pockets, card slits, inserts, and premium finishing for polished sales meetings.', useCases:['Proposals','Welcome kits','Corporate handouts'], specs:['9 x 12','1 or 2 pockets','Matte lamination optional'], badges:['Premium'], formDefaults:{size:'9 x 12', stock:'14pt / 16pt cover', sides:'4/0 or 4/4', finish:'Die-cut, glue, optional lamination', turnaround:'5-8 business days'} },
    { id:'ncr-forms', name:'Forms, Pads & NCR', category:'Corporate', price:99.99, image:'assets/images/notepad.png', description:'Operational forms, pads, and carbonless sets for invoices, work orders, and internal paperwork.', useCases:['Invoices','Work orders','Delivery slips'], specs:['2-part / 3-part','Numbering','Pads or loose sets'], badges:['Operations'], formDefaults:{size:'8.5 x 11', stock:'2-part NCR', sides:'1/0 or 1/1', finish:'Numbering / padding / wraparound', turnaround:'3-6 business days'} },
    { id:'letterhead', name:'Letterhead', category:'Corporate', price:69.99, image:'assets/images/snr-brand-form.png', description:'Printed stationery for official correspondence, proposals, onboarding packs, and office systems.', useCases:['Corporate stationery','Proposals','Brand kits'], specs:['8.5 x 11','70lb offset / premium text','Laser-safe options'], badges:['Stationery'], formDefaults:{size:'8.5 x 11', stock:'70lb premium offset', sides:'4/0', finish:'Trim only', turnaround:'2-4 business days'} },
    { id:'envelopes', name:'Envelopes', category:'Corporate', price:79.99, image:'assets/images/snr-brand-form.png', description:'Custom envelopes that match brand systems, direct mail pieces, and corporate identity.', useCases:['Mailing','Corporate stationery','Direct mail'], specs:['#10 / 9 x 12 / custom','Window or regular','Black or CMYK'], badges:['Mailing'], formDefaults:{size:'#10', stock:'Wove envelope stock', sides:'4/0', finish:'Seal / convert as applicable', turnaround:'4-7 business days'} },
    { id:'labels', name:'Labels & Stickers', category:'Packaging', price:34.99, image:'assets/images/tent-card.png', description:'Product labels, bottle labels, promotional stickers, and short-run packaging identification pieces.', useCases:['Packaging','Promo stickers','Bottle labels'], specs:['Sheet / roll / kiss-cut','Paper or vinyl','Matte / gloss'], badges:['Packaging'], formDefaults:{size:'Custom', stock:'Paper label or vinyl', sides:'4/0', finish:'Sheeted / roll / kiss-cut', turnaround:'3-6 business days'} },
    { id:'roll-labels', name:'Roll Labels', category:'Packaging', price:59.99, image:'assets/images/tent-card.png', description:'Roll labels for production environments, jars, bottles, food packaging, and retail products.', useCases:['Jars','Bottles','Production runs'], specs:['Roll format','Permanent adhesive','Custom cores'], badges:['Production'], formDefaults:{size:'Custom', stock:'Roll label stock', sides:'4/0', finish:'Roll format', turnaround:'4-7 business days'} },
    { id:'box-packaging', name:'Retail Packaging & Kits', category:'Packaging', price:249.99, image:'assets/images/gallery-premium-grid.png', description:'Custom cartons, product kits, inserts, and retail-ready pack-outs for polished presentation.', useCases:['Retail cartons','Sample kits','Presentation packs'], specs:['Custom dielines','Inserts available','Assembly support'], badges:['Custom structure'], formDefaults:{size:'Custom dieline', stock:'SBS / CCNB / board', sides:'4/0 or 4/4', finish:'Die-cut, glue, kit assembly', turnaround:'Quote-based'} },
    { id:'banners', name:'Banners & Posters', category:'Signage', price:69.99, image:'assets/images/snr-premium-promo.png', description:'Impact signage for retail, events, interiors, launches, and promotional campaigns.', useCases:['Retail signs','Events','Posters'], specs:['Indoor / outdoor','Hem & grommet options','Multiple substrates'], badges:['Large format'], formDefaults:{size:'24 x 36', stock:'Banner vinyl / poster stock', sides:'4/0', finish:'Hem / grommets optional', turnaround:'2-5 business days'} },
    { id:'window-graphics', name:'Window Graphics & Decals', category:'Signage', price:89.99, image:'assets/images/home-old.png', description:'Window vinyl, decals, and display graphics for storefronts, walls, campaigns, and branded spaces.', useCases:['Storefronts','Interior branding','Campaigns'], specs:['Opaque / perforated / clear','Install-ready panels','Custom cut'], badges:['Vinyl'], formDefaults:{size:'Custom', stock:'Vinyl / perf / clear film', sides:'4/0', finish:'Contour cut / paneling', turnaround:'3-6 business days'} },
    { id:'coroplast-signs', name:'Coroplast Signs', category:'Signage', price:39.99, image:'assets/images/homepage-concept-render.png', description:'Lightweight outdoor signs for lawns, development sites, directional campaigns, and temporary messaging.', useCases:['Lawn signs','Site signs','Directional'], specs:['4mm / 6mm','Single or double sided','Wire stakes optional'], badges:['Outdoor'], formDefaults:{size:'18 x 24', stock:'4mm coroplast', sides:'4/4', finish:'Trim / stake optional', turnaround:'2-4 business days'} },
    { id:'foam-board-signs', name:'Foam Board Signs', category:'Signage', price:44.99, image:'assets/images/homepage-template-reference.png', description:'Rigid indoor display signs for presentations, easels, lobbies, and retail support.', useCases:['Presentations','Lobby signs','Displays'], specs:['3/16 foam board','Indoor use','Mounting optional'], badges:['Display'], formDefaults:{size:'24 x 36', stock:'Foam board', sides:'4/0', finish:'Mounting', turnaround:'2-4 business days'} },
    { id:'door-hangers', name:'Door Hangers', category:'Marketing', price:74.99, image:'assets/images/door-hanger.png', description:'Door hangers designed for local service campaigns, political outreach, and neighbourhood promotions.', useCases:['Home services','Local campaigns','Drops'], specs:['Standard die-cut','14pt cover','Hole slot'], badges:['Route marketing'], formDefaults:{size:'4.25 x 11', stock:'14pt coated cover', sides:'4/4', finish:'Die-cut and trim', turnaround:'3-5 business days'} },
    { id:'rack-cards', name:'Rack Cards', category:'Marketing', price:64.99, image:'assets/images/cover-photo.png', description:'Slim sales pieces for hospitality, clinics, tourism, reception desks, and brochure racks.', useCases:['Reception areas','Tourism','Promo literature'], specs:['4 x 9','14pt cover','AQ optional'], badges:['Hospitality'], formDefaults:{size:'4 x 9', stock:'14pt cover', sides:'4/4', finish:'AQ optional', turnaround:'2-4 business days'} },
    { id:'notepads', name:'Notepads', category:'Corporate', price:54.99, image:'assets/images/notepad.png', description:'Branded memo pads and writing pads for internal operations, giveaways, events, and training kits.', useCases:['Internal use','Gifts','Training'], specs:['25 / 50 / 100 sheets','Chipboard backer','Wrap-around cover optional'], badges:['Pads'], formDefaults:{size:'5.5 x 8.5', stock:'60lb offset text', sides:'4/0', finish:'Padding', turnaround:'3-5 business days'} },
    { id:'catalogues', name:'Catalogues', category:'Corporate', price:189.99, image:'assets/images/snr-cmyk-brand-art.png', description:'Multi-page catalogue pieces for product lines, seasonal drops, distributor kits, and sales programs.', useCases:['Product lines','Seasonal books','Distributors'], specs:['Multipage','Saddle stitch / perfect bind','Coated text'], badges:['Sales collateral'], formDefaults:{size:'8.5 x 11', stock:'Coated text with heavier cover', sides:'4/4', finish:'Saddle stitch / perfect bind', turnaround:'Quote-based'} },
    { id:'tent-cards', name:'Tent Cards', category:'Corporate', price:49.99, image:'assets/images/tent-card.png', description:'Counter cards and table displays for restaurants, lobbies, checkouts, and event tables.', useCases:['Restaurants','Counters','Events'], specs:['5 x 7 / 4 x 6','Score and fold','Short-run friendly'], badges:['Counter display'], formDefaults:{size:'5 x 7', stock:'14pt cover', sides:'4/4', finish:'Score and fold', turnaround:'2-4 business days'} },
    { id:'sell-sheets', name:'Sell Sheets', category:'Corporate', price:69.99, image:'assets/images/flyer-main-a.png', description:'One-page product and service sheets for leave-behinds, onboarding kits, and field sales.', useCases:['Sales leave-behinds','Training','Onboarding'], specs:['8.5 x 11','Premium text or cover','Coated / uncoated'], badges:['Sales tool'], formDefaults:{size:'8.5 x 11', stock:'100lb silk text', sides:'4/4', finish:'Trim only', turnaround:'2-4 business days'} },
    { id:'table-throws', name:'Table Throws', category:'Signage', price:179.99, image:'assets/images/snr-uniform-shirt.png', description:'Trade show table throws for recruiting, expos, customer events, and on-site selling.', useCases:['Trade shows','Hiring booths','Pop-up events'], specs:['6ft / 8ft','Full color','Fitted or draped'], badges:['Exhibits'], formDefaults:{size:'6ft table throw', stock:'Fabric', sides:'4/0', finish:'Sewn / hemmed', turnaround:'Quote-based'} },
    { id:'invitations', name:'Invitations', category:'Marketing', price:79.99, image:'assets/images/flyer-main-c.png', description:'High-end event invitations and launch pieces with room for upgraded papers and finishing.', useCases:['Launches','Private events','Premium mailers'], specs:['5 x 7 / custom','Premium stocks','Foil / soft touch optional'], badges:['Premium event'], formDefaults:{size:'5 x 7', stock:'16pt uncoated or specialty stock', sides:'4/4', finish:'Optional foil / soft touch', turnaround:'Quote-based'} },
    { id:'decals', name:'Decals', category:'Signage', price:44.99, image:'assets/images/home-old.png', description:'Vinyl decals for walls, equipment, windows, fleet graphics, and general branded applications.', useCases:['Equipment','Walls','Windows'], specs:['Contour cut','Permanent or removable','Indoor / outdoor'], badges:['Cut vinyl'], formDefaults:{size:'Custom', stock:'Vinyl', sides:'4/0', finish:'Contour cut', turnaround:'3-6 business days'} }
  ];

  const CATEGORIES = ['All Products','Marketing','Corporate','Packaging','Signage'];
  const CATEGORY_BLURBS = {
    'Marketing':'Business cards, flyers, postcards, brochures, and other pieces built to sell.',
    'Corporate':'Operational print, stationery, folders, forms, booklets, and internal support pieces.',
    'Packaging':'Labels, cartons, inserts, and retail-ready pack-outs.',
    'Signage':'Banners, posters, coroplast, decals, and large-format display items.'
  };

  const QUANTITY_OPTIONS = [100, 250, 500, 750, 1000, 1500, 2000, 2500, 5000];

  const money = (n) => `$${Number(n || 0).toFixed(2)}`;
  const slugUrl = (id) => `online-store_product.html?product=${encodeURIComponent(id)}`;
  const quoteUrl = (name) => `quote-request.html?product=${encodeURIComponent(name)}`;
  const cartKey = 'snr_store_cart';

  const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const option = (value, selectedValue) => `<option value="${escapeHtml(value)}" ${String(value)===String(selectedValue)?'selected':''}>${escapeHtml(value)}</option>`;
  const uniq = (items) => [...new Set((items || []).filter(Boolean).map(String).map(v => v.trim()).filter(Boolean))];

  function splitSpecs(value){
    return String(value || '')
      .split(/\s*\/\s*|\s*,\s*|\s*\+\s*|\s+or\s+/i)
      .map(v => v.trim())
      .filter(Boolean);
  }

  function mergedOptions(...groups){
    return uniq(groups.flatMap(group => Array.isArray(group) ? group : splitSpecs(group)));
  }

  function getConfig(product){
    const lowerName = product.name.toLowerCase();
    const lowerCategory = product.category.toLowerCase();
    const isCard = lowerName.includes('card');
    const isBrochure = lowerName.includes('brochure');
    const isBooklet = lowerName.includes('booklet') || lowerName.includes('catalogue') || lowerName.includes('magazine');
    const isFolder = lowerName.includes('folder');
    const isLabel = lowerName.includes('label') || lowerName.includes('sticker');
    const isNcr = lowerName.includes('ncr') || lowerName.includes('form') || lowerName.includes('pad');
    const isEnvelope = lowerName.includes('envelope');
    const isSignage = lowerCategory === 'signage';
    const isPackaging = lowerCategory === 'packaging' || lowerName.includes('packaging') || lowerName.includes('box');

    const sizes = mergedOptions(
      product.formDefaults.size,
      product.specs[0],
      isCard ? ['3.5 x 2', '2 x 2', '2 x 3.5', '3.5 x 8.5 folded'] : [],
      isBrochure ? ['8.5 x 11', '8.5 x 14', '11 x 17'] : [],
      isBooklet ? ['5.5 x 8.5', '8.5 x 11', '6 x 9'] : [],
      isFolder ? ['9 x 12', '6 x 9', 'Custom dieline'] : [],
      isLabel ? ['2 x 3', '3 x 4', '4 x 5', 'Custom'] : [],
      isEnvelope ? ['#10', '6 x 9', '9 x 12'] : [],
      isSignage ? ['12 x 18', '18 x 24', '24 x 36', 'Custom'] : [],
      isPackaging ? ['Custom', 'Custom dieline', 'Short-run prototype'] : []
    );

    const stocks = mergedOptions(
      product.formDefaults.stock,
      product.specs[1],
      isCard ? ['14pt coated cover', '16pt silk cover', '18pt premium cover'] : [],
      isBrochure ? ['100lb gloss text', '100lb silk text', '14pt cover'] : [],
      isBooklet ? ['80lb gloss text', '100lb silk text', '100lb text + 12pt cover'] : [],
      isFolder ? ['14pt cover', '16pt cover', '18pt cover'] : [],
      isLabel ? ['Semi-gloss label stock', 'BOPP / waterproof label', 'Vinyl label stock'] : [],
      isNcr ? ['2-part NCR', '3-part NCR', '4-part NCR'] : [],
      isEnvelope ? ['Wove envelope stock', 'Linen envelope stock'] : [],
      isSignage ? ['Banner vinyl', 'Poster paper', 'Coroplast', 'Foam board', 'Adhesive vinyl'] : [],
      isPackaging ? ['SBS board', 'CCNB board', 'Label stock', 'Insert card stock'] : []
    );

    const sides = mergedOptions(
      product.formDefaults.sides,
      isNcr ? ['1/0', '1/1', '2/0 black', 'Black + PMS'] : [],
      isSignage ? ['4/0', '4/4'] : [],
      ['4/0', '4/1', '4/4']
    );

    const lamination = mergedOptions(
      isNcr || isEnvelope ? ['No lamination'] : [],
      isSignage ? ['No lamination', 'Gloss lamination', 'Matte lamination'] : [],
      ['No lamination', 'Gloss lamination', 'Matte lamination', 'Soft-touch lamination']
    );

    const finishing = mergedOptions(
      product.formDefaults.finish,
      product.specs[2],
      isBrochure ? ['Trim only', 'Bi-fold', 'Tri-fold', 'Z-fold'] : [],
      isBooklet ? ['Saddle stitch', 'Perfect bind', 'Coil bind'] : [],
      isFolder ? ['Die-cut', 'Glue pockets', 'Business card slits'] : [],
      isLabel ? ['Kiss cut', 'Die cut', 'Sheeted', 'Roll format'] : [],
      isNcr ? ['Padding', 'Numbering', 'Wrap-around cover'] : [],
      isSignage ? ['Trim to size', 'Hem & grommets', 'Contour cut', 'Mounting'] : [],
      isPackaging ? ['Die-cut', 'Glue', 'Insert packing', 'Kit assembly'] : [],
      isCard ? ['Trim only', 'Rounded corners', 'Spot UV', 'Foil'] : []
    );

    const turnaround = mergedOptions(
      product.formDefaults.turnaround,
      ['Same / next day rush', '2-4 business days', '5-7 business days']
    );

    return {
      quantities: QUANTITY_OPTIONS,
      sizes,
      stocks,
      sides,
      lamination,
      finishing,
      turnaround,
      defaultQty: 100
    };
  }

  function getCart(){ try { return JSON.parse(localStorage.getItem(cartKey)) || []; } catch { return []; } }
  function saveCart(items){ localStorage.setItem(cartKey, JSON.stringify(items)); updateCartCount(); }
  function cartCount(){ return getCart().reduce((sum,item)=>sum+(Number(item.qty)||0),0); }
  function updateCartCount(){ document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent = cartCount()); }
  function findProduct(id){ return PRODUCTS.find(p=>p.id===id) || PRODUCTS[0]; }

  function addToCart(payload){
    const cart = getCart();
    const uid = [payload.productId,payload.qty,payload.size,payload.stock,payload.sides,payload.lamination,payload.finishing,payload.turnaround].join('|');
    const existing = cart.find(item=>item.uid===uid);
    if(existing){ existing.qty += Number(payload.qty)||0; }
    else { cart.push({...payload, uid}); }
    saveCart(cart);
  }

  function initStorePage(){
    const storeGrid = document.getElementById('storeGrid');
    if(!storeGrid) return;
    const categoryChips = document.getElementById('categoryChips');
    const categoryPanels = document.getElementById('storeCategoryPanels');
    const searchInput = document.getElementById('storeSearch');
    const resultText = document.getElementById('storeResultText');
    const emptyState = document.getElementById('storeEmpty');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    let activeCategory = 'All Products';
    let term = '';

    if(categoryPanels){
      categoryPanels.innerHTML = Object.entries(CATEGORY_BLURBS).map(([name,copy])=>`<article class="store-category-card"><div><strong>${name}</strong><p>${copy}</p></div><a class="btn btn-secondary" href="#storeProducts" data-jump-category="${name}">Shop ${name}</a></article>`).join('');
      categoryPanels.querySelectorAll('[data-jump-category]').forEach(btn=>btn.addEventListener('click',()=>{ activeCategory = btn.dataset.jumpCategory; buildChips(); render(); }));
    }

    function buildChips(){
      categoryChips.innerHTML = CATEGORIES.map(category=>`<button type="button" class="store-chip ${category===activeCategory?'active':''}" data-category="${category}">${category}</button>`).join('');
      categoryChips.querySelectorAll('.store-chip').forEach(chip=>chip.addEventListener('click',()=>{ activeCategory = chip.dataset.category; buildChips(); render(); }));
    }

    function filtered(){
      const q = term.trim().toLowerCase();
      return PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
        const haystack = [product.name, product.category, product.description, ...(product.useCases||[]), ...(product.specs||[])].join(' ').toLowerCase();
        return matchesCategory && (!q || haystack.includes(q));
      });
    }

    function render(){
      const items = filtered();
      resultText.textContent = `${items.length} product${items.length===1?'':'s'} found`;
      if(!items.length){ storeGrid.innerHTML=''; emptyState.hidden=false; return; }
      emptyState.hidden=true;
      storeGrid.innerHTML = items.map(product => `
        <article class="store-card">
          <div class="store-card-media">
            <span class="store-card-badge">${product.category}</span>
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="store-card-body">
            <h3 class="store-card-title">${product.name}</h3>
            <p class="store-card-copy">${product.description}</p>
            <div class="store-card-specs">${product.specs.slice(0,3).map(spec=>`<span class="store-spec-pill">${spec}</span>`).join('')}</div>
            <div class="store-card-footer">
              <div class="store-price"><span class="store-price-label">Starting at</span><span class="store-price-value">${money(product.price)}</span></div>
              <div class="store-card-actions">
                <a class="btn btn-secondary" href="${slugUrl(product.id)}">View details</a>
                <button class="btn btn-primary" type="button" data-quick-add="${product.id}">Add to cart</button>
              </div>
            </div>
          </div>
        </article>`).join('');

      storeGrid.querySelectorAll('[data-quick-add]').forEach(btn => btn.addEventListener('click', () => {
        const product = findProduct(btn.dataset.quickAdd);
        const config = getConfig(product);
        addToCart({
          productId:product.id,
          name:product.name,
          price:product.price,
          qty:config.defaultQty,
          size:config.sizes[0] || product.formDefaults.size,
          stock:config.stocks[0] || product.formDefaults.stock,
          sides:config.sides[0] || product.formDefaults.sides,
          lamination:config.lamination[0] || 'No lamination',
          finishing:config.finishing[0] || product.formDefaults.finish,
          turnaround:config.turnaround[0] || product.formDefaults.turnaround
        });
        btn.textContent = 'Added';
        setTimeout(()=> btn.textContent = 'Add to cart', 900);
      }));
    }

    searchInput?.addEventListener('input', e => { term = e.target.value || ''; render(); });
    clearFiltersBtn?.addEventListener('click', () => { activeCategory='All Products'; term=''; if(searchInput) searchInput.value=''; buildChips(); render(); });
    buildChips(); render();
  }

  function initProductPage(){
    const root = document.getElementById('productDetailRoot');
    if(!root) return;
    const params = new URLSearchParams(window.location.search);
    const product = findProduct(params.get('product'));
    const config = getConfig(product);
    const bread = document.getElementById('productBreadcrumb');
    if(bread) bread.textContent = product.name;

    root.innerHTML = `
      <article class="product-panel">
        <div class="product-panel-media"><img src="${product.image}" alt="${product.name}"></div>
        <div class="product-meta-strip">${product.badges.map(b=>`<span class="product-tag">${b}</span>`).join('')}<span class="product-tag">${product.category}</span></div>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="product-price-box"><div><span class="store-price-label">Starting price</span><div class="store-price-value">${money(product.price)}</div></div><a class="btn btn-secondary" href="${quoteUrl(product.name)}">Custom quote</a></div>
        <div class="grid-2">
          <div><h3>Common use cases</h3><ul class="product-list">${product.useCases.map(item=>`<li>${item}</li>`).join('')}</ul></div>
          <div><h3>Popular specs</h3><ul class="product-list">${product.specs.map(item=>`<li>${item}</li>`).join('')}</ul></div>
        </div>
        <div class="product-helper"><strong>Practical note:</strong> web pricing works best for standard items. Anything complex should still route to a quote so finishing, freight, warehouse allocation, and production realities are not missed.</div>
      </article>
      <article class="product-form-panel">
        <h2>Configure this item</h2>
        <p>Built with the option structure buyers expect: standard quantity breaks, print specs, lamination choices, finishing, turnaround, artwork, and notes.</p>
        <form id="productConfigForm">
          <div class="form-grid">
            <div><label for="cfgQty">Quantity</label><select id="cfgQty" name="qty">${config.quantities.map(q => option(q, config.defaultQty)).join('')}</select></div>
            <div><label for="cfgSize">Size</label><select id="cfgSize" name="size">${config.sizes.map(v => option(v, product.formDefaults.size)).join('')}</select></div>
            <div><label for="cfgStock">Stock</label><select id="cfgStock" name="stock">${config.stocks.map(v => option(v, product.formDefaults.stock)).join('')}</select></div>
            <div><label for="cfgSides">Print sides / colours</label><select id="cfgSides" name="sides">${config.sides.map(v => option(v, product.formDefaults.sides)).join('')}</select></div>
            <div><label for="cfgLamination">Lamination</label><select id="cfgLamination" name="lamination">${config.lamination.map(v => option(v, 'No lamination')).join('')}</select></div>
            <div><label for="cfgFinishing">Finishing / bindery</label><select id="cfgFinishing" name="finishing">${config.finishing.map(v => option(v, product.formDefaults.finish)).join('')}</select></div>
            <div><label for="cfgTurnaround">Turnaround</label><select id="cfgTurnaround" name="turnaround">${config.turnaround.map(v => option(v, product.formDefaults.turnaround)).join('')}</select></div>
            <div><label for="cfgPackaging">Packing</label><input id="cfgPackaging" name="packaging" type="text" placeholder="Bulk carton, shrink pack, sets, branch split, skid, etc."></div>
            <div class="full"><label for="cfgArtwork">Artwork upload placeholder</label><input id="cfgArtwork" name="artwork" type="text" placeholder="Replace later with upload field, drag-and-drop zone, portal picker, or file link"></div>
            <div class="full"><label for="cfgNotes">Order notes</label><textarea id="cfgNotes" name="notes" placeholder="Special instructions, delivery notes, versioning, numbering, perforation, scoring, folding direction, packaging, or file notes"></textarea></div>
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" type="submit">Add configured item to cart</button>
            <a class="btn btn-secondary" href="cart.html">Review cart</a>
            <a class="btn btn-ghost" href="${quoteUrl(product.name)}">Need custom pricing</a>
          </div>
        </form>
      </article>`;

    document.getElementById('productConfigForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      addToCart({ productId:product.id, name:product.name, price:product.price, qty:Number(fd.get('qty')||config.defaultQty), size:String(fd.get('size')||''), stock:String(fd.get('stock')||''), sides:String(fd.get('sides')||''), lamination:String(fd.get('lamination')||'No lamination'), finishing:String(fd.get('finishing')||''), turnaround:String(fd.get('turnaround')||''), packaging:String(fd.get('packaging')||''), notes:String(fd.get('notes')||'') });
      const button = e.currentTarget.querySelector('button[type="submit"]');
      if(button){ button.textContent='Added to cart'; setTimeout(()=>button.textContent='Add configured item to cart', 1000); }
    });
  }

  function initCartPage(){
    const root = document.getElementById('cartItems');
    if(!root) return;
    const empty = document.getElementById('cartEmpty');
    const subtotalEl = document.getElementById('cartSubtotal');
    const estimatedEl = document.getElementById('cartEstimated');
    const itemsCountEl = document.getElementById('cartItemsCount');
    const clearBtn = document.getElementById('clearCartBtn');

    function render(){
      const cart = getCart();
      const subtotal = cart.reduce((sum,item)=>sum+Number(item.price||0),0);
      itemsCountEl.textContent = cart.reduce((sum,item)=>sum+Number(item.qty||0),0);
      subtotalEl.textContent = money(subtotal);
      estimatedEl.textContent = money(subtotal);
      if(!cart.length){ root.innerHTML=''; empty.hidden=false; return; }
      empty.hidden=true;
      root.innerHTML = cart.map((item, index) => `
        <article class="cart-item">
          <div class="cart-item-head"><div><h3>${item.name}</h3><p class="small">Starting price anchor ${money(item.price)} for selected setup</p></div><strong>${money(item.price)}</strong></div>
          <div class="cart-item-meta">
            <span class="product-tag">Qty ${item.qty}</span>
            <span class="product-tag">${escapeHtml(item.size)}</span>
            <span class="product-tag">${escapeHtml(item.stock)}</span>
            <span class="product-tag">${escapeHtml(item.sides)}</span>
            <span class="product-tag">${escapeHtml(item.lamination || 'No lamination')}</span>
            <span class="product-tag">${escapeHtml(item.finishing || '')}</span>
            <span class="product-tag">${escapeHtml(item.turnaround)}</span>
          </div>
          ${item.packaging ? `<p class="small" style="margin:10px 0 0">Packing: ${escapeHtml(item.packaging)}</p>` : ''}
          ${item.notes ? `<p class="small" style="margin:8px 0 0">Notes: ${escapeHtml(item.notes)}</p>` : ''}
          <div class="cart-item-row">
            <label>Quantity break <select class="cart-qty-input" data-qty-index="${index}">${QUANTITY_OPTIONS.map(q => option(q, item.qty)).join('')}</select></label>
            <div class="cart-item-actions">
              <a class="btn btn-secondary" href="${slugUrl(item.productId)}">Edit product</a>
              <button class="btn btn-ghost" type="button" data-remove-index="${index}">Remove</button>
            </div>
          </div>
        </article>`).join('');
      root.querySelectorAll('[data-qty-index]').forEach(input=>input.addEventListener('change',()=>{
        const cart = getCart();
        const idx = Number(input.dataset.qtyIndex);
        cart[idx].qty = Number(input.value)||100;
        saveCart(cart); render();
      }));
      root.querySelectorAll('[data-remove-index]').forEach(btn=>btn.addEventListener('click',()=>{
        const cart = getCart(); cart.splice(Number(btn.dataset.removeIndex),1); saveCart(cart); render();
      }));
    }
    clearBtn?.addEventListener('click',()=>{ saveCart([]); render(); });
    render();
  }

  updateCartCount();
  initStorePage();
  initProductPage();
  initCartPage();
})();
