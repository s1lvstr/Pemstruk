// Cart page logic — depends on window.formatCurrency and window.showToast
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    const cartEmptyEl = document.getElementById('cartEmpty');
    const subtotalEl = document.getElementById('subtotalVal');
    const shippingEl = document.getElementById('shippingVal');
    const taxEl = document.getElementById('taxVal');
    const totalEl = document.getElementById('totalVal');
    const itemCountEl = document.getElementById('itemCount');
    const checkoutBtn = document.querySelector('.btn-checkout');

    const formatCurrency = window.formatCurrency || ((n)=> 'Rp'+n);
    const showToast = window.showToast || ((m)=> console.log(m));

    function loadCart() {
        try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch(e){ localStorage.removeItem('cart'); return []; }
    }

    let cart = loadCart();

    function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }

    function updateSummary() {
        const subtotal = cart.reduce((s, it) => s + (Number(it.price)||0)*it.qty, 0);
        const shipping = subtotal > 0 ? 15000 : 0;
        const tax = Math.round(subtotal * 0.05);
        const total = subtotal + shipping + tax;
        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
        if (taxEl) taxEl.textContent = formatCurrency(tax);
        if (totalEl) totalEl.textContent = formatCurrency(total);
        const totalItems = cart.reduce((s, it) => s + it.qty, 0);
        if (itemCountEl) itemCountEl.textContent = totalItems;
        if (cart.length === 0 || totalItems === 0) { if (cartEmptyEl) cartEmptyEl.style.display = 'block'; } else { if (cartEmptyEl) cartEmptyEl.style.display = 'none'; }
        if (checkoutBtn) checkoutBtn.disabled = totalItems === 0;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.dataset.id = String(item.id);
            row.dataset.price = String(item.price);
            row.innerHTML = `
                <div class="item-product">
                    <div class="item-img"><img src="${item.img || '../assets/hero.avif'}" alt="${item.name || ''}"></div>
                    <div class="item-details">
                        <h3>${item.name || ''}</h3>
                        <p class="item-meta"></p>
                        <button class="item-remove" data-id="${item.id}"><i class="fas fa-trash-can"></i> Remove</button>
                    </div>
                </div>
                <div class="item-price">${formatCurrency(Number(item.price) || 0)}</div>
                <div class="item-qty">
                    <button class="qty-btn minus" data-id="${item.id}">−</button>
                    <span class="qty-value" id="qty-${item.id}">${item.qty}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="item-total" id="total-${item.id}">${formatCurrency((Number(item.price) || 0) * item.qty)}</div>
            `;
            cartItemsContainer.appendChild(row);
        });
        updateSummary();
        saveCart();
    }

    cartItemsContainer.addEventListener('click', (e) => {
        const plusBtn = e.target.closest('.qty-btn.plus');
        const minusBtn = e.target.closest('.qty-btn.minus');
        const removeBtn = e.target.closest('.item-remove');
        if (plusBtn) {
            const id = String(plusBtn.dataset.id);
            const item = cart.find(i => String(i.id) === id);
            if (item) { item.qty += 1; renderCartItems(); showToast('Jumlah diperbarui'); }
            return;
        }
        if (minusBtn) {
            const id = String(minusBtn.dataset.id);
            const item = cart.find(i => String(i.id) === id);
            if (item) {
                item.qty = Math.max(0, item.qty - 1);
                if (item.qty === 0) { cart = cart.filter(i => String(i.id) !== id); }
                renderCartItems(); showToast('Jumlah diperbarui');
            }
            return;
        }
        if (removeBtn) {
            const id = String(removeBtn.dataset.id);
            cart = cart.filter(i => String(i.id) !== id);
            renderCartItems(); showToast('Barang dihapus dari keranjang');
            return;
        }
    });

    // listen to external updates (collection page)
    document.addEventListener('cart:updated', (ev)=>{
        try{
            const newCart = ev.detail?.cart || loadCart();
            cart = newCart.map(i=>({ id: String(i.id), price: Number(i.price)||0, qty: Number(i.qty)||1, name: i.name, img: i.img }));
            renderCartItems();
        }catch(e){ console.error(e); }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', ()=>{
            const totalItems = cart.reduce((s,i)=>s+i.qty,0);
            if (totalItems===0) { showToast('Keranjang kosong'); return; }
            if (!confirm('Lanjutkan ke pembayaran?')) return;
            checkoutBtn.disabled = true; checkoutBtn.textContent='Processing...';
            setTimeout(()=>{
                showToast('Pembayaran berhasil. Terima kasih!');
                localStorage.removeItem('cart'); cart = []; cartItemsContainer.innerHTML = ''; renderCartItems(); checkoutBtn.textContent='PROCEED TO CHECKOUT'; checkoutBtn.disabled = true;
            },1200);
        });
    }

    renderCartItems();
});
