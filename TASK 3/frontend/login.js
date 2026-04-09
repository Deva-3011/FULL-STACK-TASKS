const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const statusMessage = document.getElementById('statusMessage');
const loginButton = document.getElementById('loginButton');

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.add('input-error');
}

function clearFieldError(input, errorElement) {
  errorElement.textContent = '';
  input.classList.remove('input-error');
}

function clearStatusMessage() {
  statusMessage.textContent = '';
  statusMessage.className = 'status-message';
}

function validateForm() {
  let isValid = true;
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  clearFieldError(emailInput, emailError);
  clearFieldError(passwordInput, passwordError);
  clearStatusMessage();

  if (!emailValue) {
    showFieldError(emailInput, emailError, 'Email is required');
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    showFieldError(emailInput, emailError, 'Enter a valid email address');
    isValid = false;
  }

  if (!passwordValue) {
    showFieldError(passwordInput, passwordError, 'Password is required');
    isValid = false;
  }

  return isValid;
}

emailInput.addEventListener('input', () => {
  if (emailError.textContent) {
    validateForm();
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordError.textContent) {
    validateForm();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = 'Logging in...';

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      statusMessage.textContent = data.message || 'Login successful';
      statusMessage.className = 'status-message success';
      form.reset();
      return;
    }

    statusMessage.textContent = data.message || 'Invalid email or password';
    statusMessage.className = 'status-message error';
  } catch (error) {
    statusMessage.textContent = 'Unable to connect to the server';
    statusMessage.className = 'status-message error';
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = 'Login';
  }
});
