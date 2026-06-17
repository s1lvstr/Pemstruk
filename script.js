const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".btn-detail").forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent = button.dataset.name;
        modalDesc.textContent = button.dataset.desc;

        modal.style.display = "flex";
    });

});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const submitBtn = document.querySelector(".btn-submit");

submitBtn.addEventListener("click", function(e) {

    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    let isValid = true;

    // Reset error
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    document
        .querySelectorAll(".input-error")
        .forEach(input => input.classList.remove("input-error"));

    // Nama
    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your name";
        name.classList.add("input-error");
        isValid = false;
    }

    // Email
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

    // Pesan
    if (message.value.trim() === "") {
        messageError.textContent = "Please enter your message";
        message.classList.add("input-error");
        isValid = false;
    }

});