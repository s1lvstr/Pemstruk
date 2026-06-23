const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// product detail
const productGrid = document.querySelector(".product-grid");

const detailSection = document.getElementById("detailSection");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailPrice = document.getElementById("detailPrice");
const detailImage = document.getElementById("detailImage");
const detailOverlay = document.getElementById("detailOverlay");

const signatureSuitsGrid = document.getElementById("signatureSuitsGrid");

function renderSignatureSuits() {
    if (!signatureSuitsGrid || !window.PRODUCTS) return;

    const suits = window.PRODUCTS.filter(product =>
        String(product.category || "").toLowerCase().includes("signature")
    );

    signatureSuitsGrid.innerHTML = suits.slice(0, 4).map(product => `
        <div class="suit-card" data-name="${product.name}" data-desc="${product.description}" data-price="${product.price}" data-img="${product.image}">
            <div class="suit-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="suit-overlay">
                    <a class="btn-detail" href="collection.html?product=${encodeURIComponent(product.name)}">View Details</a>
                </div>
            </div>
            <div class="suit-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="suit-price">${product.price}</span>
            </div>
        </div>
    `).join("");
}

renderSignatureSuits();

document.addEventListener("click", event => {
    const button = event.target.closest(".btn-detail");
    if (!button) return;
    if (button.tagName === "A") return; // let collection redirect happen naturally

    event.preventDefault();

    const card = button.closest(".shop-card, .suit-card");
    if (!card) return;

    detailTitle.textContent = card.dataset.name || "";
    detailDesc.textContent = card.dataset.desc || "";
    detailPrice.textContent = card.dataset.price || "";
    detailImage.src = card.dataset.img || "";

    if (productGrid) {
        const cards = [...document.querySelectorAll(".shop-card")];
        const columns = getComputedStyle(productGrid)
            .gridTemplateColumns
            .split(" ")
            .length;

        const index = cards.indexOf(card);

        const rowEndIndex =
            Math.min(
                Math.ceil((index + 1) / columns) * columns,
                cards.length
            ) - 1;

        if (cards[rowEndIndex]) {
            cards[rowEndIndex].after(detailSection);
        } else {
            card.after(detailSection);
        }
    } else {
        card.after(detailSection);
    }

    detailSection.classList.add("active");
    detailOverlay.classList.add("active");

    detailSection.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

const closeDetailBtn = document.querySelector(".close-detail");

if (closeDetailBtn) {
    closeDetailBtn.addEventListener("click", () => {
        detailSection.classList.remove("active");
        detailOverlay.classList.remove("active");
    });
}

if (detailOverlay) {
    detailOverlay.addEventListener("click", () => {
        detailSection.classList.remove("active");
        detailOverlay.classList.remove("active");
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