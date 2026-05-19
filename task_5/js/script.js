function showFeedback(message, type = "error") {
  const feedbackEl = document.getElementById("form-feedback");
  feedbackEl.textContent = message;
  feedbackEl.className = "";
  if (type === "error") {
    feedbackEl.classList.add("feedback-error");
  } else {
    feedbackEl.classList.add("feedback-success");
  }
}

function clearFeedback() {
  const feedbackEl = document.getElementById("form-feedback");
  feedbackEl.textContent = "";
  feedbackEl.className = "";
}

function validateForm(event) {
  event.preventDefault();
  clearFeedback();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name.length < 2) {
    showFeedback("Name must be at least 2 characters.", "error");
    nameInput.focus();
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showFeedback("Please enter a valid email address.", "error");
    emailInput.focus();
    return false;
  }

  if (message.length < 10) {
    showFeedback("Message must be at least 10 characters long.", "error");
    messageInput.focus();
    return false;
  }

  showFeedback("Message sent successfully!", "success");
  setTimeout(() => {
    event.target.submit();
  }, 500);
  return true;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const enabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", enabled ? "on" : "off");

  const toggleBtn = document.getElementById("dark-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = enabled ? "☀️" : "🌙";
  }
}

function loadDarkModePreference() {
  const saved = localStorage.getItem("darkMode");
  const enabled = saved === "on";
  if (enabled) document.body.classList.add("dark-mode");

  const toggleBtn = document.getElementById("dark-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = enabled ? "☀️" : "🌙";
  }
}

function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  const now = new Date();
  const hours = now.getHours();

  const timeString = now.toLocaleTimeString();
  greetingEl.textContent = `Current time: ${timeString}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", validateForm);
  }

  const darkToggleBtn = document.getElementById("dark-toggle");
  if (darkToggleBtn) {
    darkToggleBtn.addEventListener("click", toggleDarkMode);
  }

  loadDarkModePreference();
  updateGreeting();
  setInterval(updateGreeting, 1000);
});
