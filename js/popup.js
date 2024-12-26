document.addEventListener("DOMContentLoaded", function () {
  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    document.getElementById("themeCheckbox").checked = savedTheme === "dark-theme";
  }

  // Theme toggle with checkbox
  document.getElementById("themeCheckbox").addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "");
    }
  });

  // Password length update
  const lengthSlider = document.getElementById("length");
  const lengthValue = document.getElementById("lengthValue");
  lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = lengthSlider.value;
  });

  // Randomize password functionality
  document.getElementById("randomizeBtn").addEventListener("click", function () {
    generatePassword(); // Regenerate the password with the current settings
  });

  // Function to generate password
function generatePassword() {
    const length = lengthSlider.value;
    let dictionary = "";

    if (document.getElementById("lowercase").checked) dictionary += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("uppercase").checked) dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("digits").checked) dictionary += "0123456789";
    if (document.getElementById("specials").checked) dictionary += "!@#$%^&*()_+-={}[];:,.<>?";

    if (dictionary.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += generateRandomCharacter(dictionary);
    }

    document.getElementById("password").value = password;
  }

  // Secure random character generation using the crypto API
  function generateRandomCharacter(dictionary) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomIndex = array[0] % dictionary.length;
    return dictionary[randomIndex];
  }

  // Copy password to clipboard when clicked
  document.getElementById("password").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
passwordField.select();  // Select the text in the input field
    document.execCommand("copy"); // Copy the selected text to clipboard
    alert("Password copied to clipboard!");
  });

  // Generate a password on load
  generatePassword();
});