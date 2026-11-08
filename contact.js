// Contact form validation
// The form is checked when the user clicks "Send Message".

const form = document.getElementById("contactForm");

// Show an error message under a field
function showError(id, text) {
    document.getElementById(id).textContent = text;
}

// Clear all the old error messages
function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("phoneError", "");
    showError("messageError", "");
    document.getElementById("successMessage").textContent = "";
}

// Check if the email looks correct, for example name@example.com
function isEmailValid(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Check if the phone number has digits only
function isPhoneValid(phone) {
    const pattern = /^[0-9]+$/;
    return pattern.test(phone);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();   // stop the page from reloading
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let allGood = true;

    // 1. No field should be empty
    if (name === "") {
        showError("nameError", "Please enter your name.");
        allGood = false;
    }

    if (email === "") {
        showError("emailError", "Please enter your email address.");
        allGood = false;
    } else if (!isEmailValid(email)) {
        // 2. The email format must be valid
        showError("emailError", "Please enter a valid email, like name@example.com.");
        allGood = false;
    }

    if (phone === "") {
        showError("phoneError", "Please enter your phone number.");
        allGood = false;
    } else if (!isPhoneValid(phone)) {
        // 3. The phone number must contain digits only
        showError("phoneError", "The phone number must contain digits only.");
        allGood = false;
    }

    if (message === "") {
        showError("messageError", "Please write a message.");
        allGood = false;
    }

    // If everything is correct, show a success message and clear the form
    if (allGood) {
        document.getElementById("successMessage").textContent =
            "Thank you, " + name + "! Your details are valid and your message is ready.";
        form.reset();
    }
});
