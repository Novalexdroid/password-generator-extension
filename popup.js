// Function to generate the password based on selected options
function generatePassword() {
    let dictionary = "";

    // Add characters to dictionary based on checkboxes
    if (document.getElementById("lowercaseCb").checked) {
        dictionary += "abcdefghijklmnopqrstuvwxyz";
    }
    if (document.getElementById("uppercaseCb").checked) {
        dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("digitsCb").checked) {
        dictionary += "0123456789";
    }
    if (document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }

    // Get password length from the range input
    const length = document.querySelector('input[type="range"]').value;

    // Ensure the dictionary is not empty and length is valid
    if (length < 1 || dictionary.length === 0) {
        return "";
    }

    // Generate the password
    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }

    return password;
}

// Function to update the displayed password
function updatePasswordDisplay() {
    const password = generatePassword();
    document.querySelector('input[type="text"]').value = password;
}

// Function to copy password to clipboard
function copyToClipboard() {
    const pass = document.querySelector('input[type="text"]').value;
    navigator.clipboard.writeText(pass).then(() => {
        document.querySelector("div.password button").innerHTML = "copied!";
        setTimeout(() => {
            document.querySelector("div.password button").innerHTML = "copy";
        }, 1000);
    });
}

// Function to detect password fields on the page and auto-fill them
function detectPasswordFields() {
    // Find all password input fields on the page
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        // Skip fields that already have a generated password
        if (!field.dataset.generated) {
            // Generate and set a new password
            const newPassword = generatePassword();
            field.value = newPassword;

            // Mark the field as generated to avoid resetting
            field.dataset.generated = "true";

            // Add a button to regenerate the password
            const showButton = document.createElement("button");
            showButton.textContent = "Generate New Password";
            showButton.style.marginLeft = "10px";
            showButton.onclick = () => {
                const updatedPassword = generatePassword();
                field.value = updatedPassword;
            };

            // Append the button next to the password input field
            if (!field.nextElementSibling || field.nextElementSibling.tagName !== "BUTTON") {
                field.parentNode.insertBefore(showButton, field.nextSibling);
            }
        }
    });
}

// Event listeners to trigger password generation and updates
[...document.querySelectorAll('input[type="checkbox"], button.generate')].forEach(elem => {
    elem.addEventListener("click", updatePasswordDisplay);
});

// Update displayed password when range slider is adjusted
document.querySelector('input[type="range"]').addEventListener("input", (e) => {
    document.querySelector("div.range span").innerHTML = e.target.value;
    updatePasswordDisplay();
});

// Copy the password to the clipboard when the button is clicked
document.querySelector("div.password button").addEventListener("click", copyToClipboard);

// Detect and auto-fill password fields on page load
document.addEventListener("DOMContentLoaded", detectPasswordFields);
