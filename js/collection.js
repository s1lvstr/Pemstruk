document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const sortSelect = document.getElementById('sortSelect');
    const resultCount = document.getElementById('resultCount');
    const emptyState = document.getElementById('emptyState');
    const filterTabs = document.getElementById('filterTabs');

    const PRODUCTS = window.PRODUCTS || [];
    if (!productGrid) return;

    function renderProducts(list) {
        productGrid.innerHTML = '';
        list.forEach(p => {
            const div = document.createElement('div');
            div.className = 'shop-card';
            div.dataset.id = p.id;
            div.dataset.category = (p.category || '').toLowerCase();
            div.dataset.name = p.name || '';
            div.dataset.price = p.price || '';
            div.dataset.desc = p.description || '';
            div.dataset.img = p.image || '';

            div.innerHTML = `
                <div class="shop-card-img">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="card-actions">
                        <button class="quick-add btn-detail">View Details</button>
                    </div>
                </div>
                <div class="shop-card-info">
                    <h3>${p.name}</h3>
                    <p class="card-category">${p.category}</p>
                    <p class="card-price">${p.price}</p>
                </div>
            `;

            productGrid.appendChild(div);
        });
    }

    renderProducts(PRODUCTS);

    function getCards(){ return Array.from(productGrid.querySelectorAll('.shop-card')); }

        function closeAllExpands() {
            const exs = productGrid.querySelectorAll('.card-expand');
            exs.forEach(e => e.remove());
        }

        function addToCart(product){
            try{
                const raw = localStorage.getItem('CART') || '[]';
                const cart = JSON.parse(raw);
                const existing = cart.find(i=>String(i.id)===String(product.id));
                if(existing){ existing.qty = (existing.qty||1) + 1; }
                else { cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 }); }
                localStorage.setItem('CART', JSON.stringify(cart));
                document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
                return true;
            }catch(e){ console.error('cart error', e); return false; }
        }

        function toggleExpand(card) {
            const name = card.dataset.name || '';
         
            const existing = productGrid.querySelector('.card-expand[data-for="' + name + '"]');
            if (existing) {
                existing.remove();
                return;
            }

            const ex = document.createElement('div');
            ex.className = 'card-expand open';
            ex.dataset.for = name;
            const desc = card.dataset.desc || '';
            const price = card.dataset.price || '';
            const img = card.dataset.img || '';
            const id = card.dataset.id || '';

            ex.innerHTML = `
                <div class="expand-inner">
                    <div class="expand-media"><img src="${img}" alt="${name}"></div>
                    <div class="expand-body">
                        <h3 class="expand-title">${name}</h3>
                        <p class="expand-desc">${desc}</p>
                        <p class="expand-price">${price}</p>
                        <div class="expand-actions">
                            <button class="btn-add">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;

            const cards = getCards();
            const columns = getComputedStyle(productGrid).gridTemplateColumns.split(' ').length;
            const index = cards.indexOf(card);
            const rowEndIndex = Math.min(Math.ceil((index + 1) / columns) * columns, cards.length) - 1;

            closeAllExpands();
            if (cards[rowEndIndex]) cards[rowEndIndex].after(ex);
            else productGrid.appendChild(ex);

            // attach add to cart handler
            const addBtn = ex.querySelector('.btn-add');
            if(addBtn){
                addBtn.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    addBtn.disabled = true;
                    const ok = addToCart({ id, name, price, img });
                    if(ok){ addBtn.textContent = 'Added'; setTimeout(()=>{ addBtn.disabled=false; addBtn.textContent='Add to Cart'; },1200); }
                    else { addBtn.textContent = 'Error'; setTimeout(()=>{ addBtn.disabled=false; addBtn.textContent='Add to Cart'; },1200); }
                });
            }
        }

        function attachDetailHandlers() {
            getCards().forEach(card => {
                const btn = card.querySelector('.btn-detail');
                if (!btn) return;

                const newBtn = btn.cloneNode(true);
                btn.replaceWith(newBtn);
                newBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleExpand(card);
                });
            });
        }

    let currentFilter='all'; let visibleLimit=12; const loadStep=6;

    function applyView(){

        closeAllExpands();
        const cards = getCards();
        let matching = cards.filter(card=>{ if(currentFilter==='all') return true; return (card.dataset.category && card.dataset.category.toLowerCase().includes(currentFilter.toLowerCase())); });
        cards.forEach(c=>c.classList.add('is-hidden'));
        matching.slice(0,visibleLimit).forEach(c=>c.classList.remove('is-hidden'));
        if(resultCount) resultCount.textContent = matching.length + ' Products';
        if(emptyState){ if(matching.length===0) emptyState.classList.add('show'); else emptyState.classList.remove('show'); }
        if(loadMoreBtn){ if(visibleLimit>=matching.length){ loadMoreBtn.textContent='No More Products'; loadMoreBtn.classList.add('is-done'); } else { loadMoreBtn.textContent='Load More'; loadMoreBtn.classList.remove('is-done'); } }
    }

    applyView();
    attachDetailHandlers();

    (function openFromQuery(){
        try{
            const params = new URLSearchParams(window.location.search);
            const q = params.get('product');
            if(!q) return;
            const qLower = q.trim().toLowerCase();
            const cards = getCards();
            let target = null;
        
            target = cards.find(c=> (c.dataset.id && c.dataset.id === q) );
            if(!target) target = cards.find(c=> (c.dataset.name && c.dataset.name.toLowerCase()===qLower));
            if(!target) target = cards.find(c=> (c.dataset.name && c.dataset.name.toLowerCase().includes(qLower)));
            if(target){
  
                if(target.classList.contains('is-hidden')){
                    target.classList.remove('is-hidden');
                }

                target.scrollIntoView({behavior:'smooth', block:'center'});
   
                setTimeout(()=>{ toggleExpand(target); }, 250);
            }
        }catch(e){/* ignore */}
    })();

    if(filterTabs){ filterTabs.addEventListener('click', e=>{ const btn = e.target.closest('.filter-btn'); if(!btn) return; Array.from(filterTabs.querySelectorAll('.filter-btn')).forEach(b=>b.classList.remove('active')); btn.classList.add('active'); currentFilter = btn.dataset.filter || 'all'; visibleLimit=12; applyView(); }); }

    if(loadMoreBtn) loadMoreBtn.addEventListener('click', ()=>{ visibleLimit += loadStep; applyView(); });

    if(sortSelect) sortSelect.addEventListener('change', ()=>{ const v = sortSelect.value; const arr = getCards().slice(); if(v==='low-high') arr.sort((a,b)=> parseFloat((a.querySelector('.card-price')?.textContent||'').replace(/[^0-9.]/g,'')) - parseFloat((b.querySelector('.card-price')?.textContent||'').replace(/[^0-9.]/g,''))); else if(v==='high-low') arr.sort((a,b)=> parseFloat((b.querySelector('.card-price')?.textContent||'').replace(/[^0-9.]/g,'')) - parseFloat((a.querySelector('.card-price')?.textContent||'').replace(/[^0-9.]/g,''))); else arr.sort((a,b)=> [...productGrid.children].indexOf(a) - [...productGrid.children].indexOf(b)); arr.forEach(c=>productGrid.appendChild(c)); attachDetailHandlers(); applyView(); });

    const searchInput = document.getElementById('searchInput'); if(searchInput){ let t; searchInput.addEventListener('input', ()=>{ clearTimeout(t); t = setTimeout(()=>{ const q = searchInput.value.trim().toLowerCase(); getCards().forEach(c=>{ const name = (c.dataset.name||'').toLowerCase(); if(!q || name.includes(q)) c.classList.remove('is-hidden'); else c.classList.add('is-hidden'); }); const visible = getCards().filter(c=>!c.classList.contains('is-hidden')); if(resultCount) resultCount.textContent = visible.length + ' Products'; },200); }); }

});
