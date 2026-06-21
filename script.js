const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ======================================
// product modal (index.html)
// ======================================

const modal = document.getElementById("productModal");
 
if (modal) {
 
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");
 
    document.querySelectorAll(".btn-detail").forEach(button => {
 
        button.addEventListener("click", () => {
 
            modalTitle.textContent = button.dataset.name;
            modalDesc.textContent = button.dataset.desc;
 
            if (modalPrice) modalPrice.textContent = button.dataset.price || "";
            if (modalImg) {
                modalImg.src = button.dataset.img || "";
                modalImg.alt = button.dataset.name || "";
            }
 
            modal.style.display = "flex";
        });
 
    });
 
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
 
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
 
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
 
}

// ======================================
// contact form (index.html)
// ======================================

const submitBtn = document.querySelector(".btn-submit");

if (submitBtn) {

    submitBtn.addEventListener("click", function(e) {

        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        let isValid = true;

        // reset error
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        document
            .querySelectorAll(".input-error")
            .forEach(input => input.classList.remove("input-error"));

        // nama
        if (name.value.trim() === "") {
            nameError.textContent = "Please enter your name";
            name.classList.add("input-error");
            isValid = false;
        }

        // gmail
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {
            emailError.textContent = "Please enter your email";
            email.classList.add("input-error");
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            emailError.textContent = "Invalid email format";
            email.classList.add("input-error");
            isValid = false;
        }

        // note
        if (message.value.trim() === "") {
            messageError.textContent = "Please enter your message";
            message.classList.add("input-error");
            isValid = false;
        }

        if (!isValid) return;

    });

}

// ======================================
// collection (collection.html)
// ======================================

document.addEventListener('DOMContentLoaded', () => {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.shop-card');
    const resultCount = document.getElementById('resultCount');
    const sortSelect = document.getElementById('sortSelect');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const productGrid = document.getElementById('productGrid');
    const emptyState = document.getElementById('emptyState');

    // guard: stop klo di luar collection.html
    if (!productGrid || !loadMoreBtn || !sortSelect || !resultCount) return;

    let currentFilter = 'all';
    let visibleLimit = 12;
    const loadStep = 6;

    function getPrice(card){
        const priceText = card.querySelector('.card-price').lastChild.textContent;
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }

    function applyView(){

        const matching = Array.from(cards).filter(card =>
            currentFilter === 'all' || card.dataset.category === currentFilter
        );

        // reset all cards hidden first
        cards.forEach(card => card.classList.add('is-hidden'));

        // show only up to visibleLimit among matching
        matching.slice(0, visibleLimit).forEach(card => {
            card.classList.remove('is-hidden');
        });

        resultCount.textContent = matching.length + ' Products';

        // empty state
        if (emptyState) {
            if (matching.length === 0) {
                emptyState.classList.add('show');
            } else {
                emptyState.classList.remove('show');
            }
        }

        // load more button state
        if (visibleLimit >= matching.length) {
            loadMoreBtn.textContent = 'No More Products';
            loadMoreBtn.classList.add('is-done');
        } else {
            loadMoreBtn.textContent = 'Load More';
            loadMoreBtn.classList.remove('is-done');
        }
    }

    // filter click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;
            visibleLimit = 12;
            applyView();
        });
    });

    // load more click
    loadMoreBtn.addEventListener('click', () => {
        visibleLimit += loadStep;
        applyView();
    });

    // sort
    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        const cardArray = Array.from(cards);

        if (value === 'low-high') {
            cardArray.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (value === 'high-low') {
            cardArray.sort((a, b) => getPrice(b) - getPrice(a));
        } else {
            cardArray.sort((a, b) => {
                return [...productGrid.children].indexOf(a) - [...productGrid.children].indexOf(b);
            });
        }

        cardArray.forEach(card => productGrid.appendChild(card));
        applyView();
    });

    applyView();

});