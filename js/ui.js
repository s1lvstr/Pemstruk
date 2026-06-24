// ui navbar dll
(function(){
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
})();

// Product modal
(function(){
    const productGrid = document.querySelector('.product-grid');
    const detailSection = document.getElementById('detailSection');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailPrice = document.getElementById('detailPrice');
    const detailImage = document.getElementById('detailImage');
    const detailOverlay = document.getElementById('detailOverlay');

    if (!detailSection) return;

    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.shop-card') || button.closest('.suit-card');
            if (!card) return;

            detailTitle.textContent = card.dataset.name || card.querySelector('h3')?.textContent || '';
            detailDesc.textContent = card.dataset.desc || '';
            detailPrice.textContent = card.dataset.price || '';
            detailImage.src = card.dataset.img || card.querySelector('img')?.src || '';

            if (productGrid) {
                const cards = [...document.querySelectorAll('.shop-card')];
                const columns = getComputedStyle(productGrid).gridTemplateColumns.split(' ').length;
                const index = cards.indexOf(card);
                const rowEndIndex = Math.min(Math.ceil((index + 1) / columns) * columns, cards.length) - 1;
                if (cards[rowEndIndex]) cards[rowEndIndex].after(detailSection);
            }

            detailSection.classList.add('active');
            if (detailOverlay) detailOverlay.classList.add('active');
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    const closeDetailBtn = document.querySelector('.close-detail');
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', () => {
            detailSection.classList.remove('active');
            if (detailOverlay) detailOverlay.classList.remove('active');
        });
    }

    if (detailOverlay) {
        detailOverlay.addEventListener('click', () => {
            detailSection.classList.remove('active');
            detailOverlay.classList.remove('active');
        });
    }
})();

// Contact form 
(function(){
    const submitBtn = document.querySelector('.btn-submit');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let isValid = true;
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));

        if (name && name.value.trim() === '') { if (nameError) nameError.textContent = 'Please enter your name'; name.classList.add('input-error'); isValid = false; }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && email.value.trim() === '') { if (emailError) emailError.textContent = 'Please enter your email'; email.classList.add('input-error'); isValid = false; }
        else if (email && !emailPattern.test(email.value)) { if (emailError) emailError.textContent = 'Invalid email format'; email.classList.add('input-error'); isValid = false; }
        if (message && message.value.trim() === '') { if (messageError) messageError.textContent = 'Please enter your message'; message.classList.add('input-error'); isValid = false; }

        if (!isValid) return;
        if (typeof showToast === 'function') showToast('Message sent');
    });
})();
