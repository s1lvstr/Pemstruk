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
                    <a class="btn-detail" href="html/collection.html?product=${encodeURIComponent(product.name)}">View Details</a>
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

// Run on load (index page only)
document.addEventListener('DOMContentLoaded', renderSignatureSuits);