// Get DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const generalError = document.getElementById('generalError');
const successMessage = document.getElementById('successMessage');

// Email validation regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Clear error message when user starts typing
emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailError.classList.remove('show');
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
    passwordError.classList.remove('show');
});

// Validate email format
function validateEmail(email) {
    return emailPattern.test(email);
}

// Validate form inputs
function validateForm() {
    let isValid = true;

    // Clear previous error messages
    emailError.textContent = '';
    emailError.classList.remove('show');
    passwordError.textContent = '';
    passwordError.classList.remove('show');

    // Validate email
    const email = emailInput.value.trim();
    if (email === '') {
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    }

    // Validate password
    const password = passwordInput.value;
    if (password === '') {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        isValid = false;
    }

    return isValid;
}

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous messages
    generalError.textContent = '';
    generalError.classList.remove('show', 'general');
    successMessage.textContent = '';
    successMessage.classList.remove('show');

    // Validate form
    if (!validateForm()) {
        return;
    }

    try {
        // Prepare data
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Send POST request to backend
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        // Parse response
        const data = await response.json();

        // Handle success response
        if (response.ok && data.success) {
            successMessage.textContent = '✓ Login successful! Redirecting...';
            successMessage.classList.add('show');
            
            // Clear form
            loginForm.reset();
            
            // Redirect after 2 seconds (optional)
            setTimeout(() => {
                console.log('User logged in:', email);
                // window.location.href = '/dashboard'; // Uncomment to redirect
            }, 2000);
        } else {
            // Handle error response
            generalError.textContent = data.message || 'Invalid email or password';
            generalError.classList.add('show', 'general');
        }
    } catch (error) {
        console.error('Error:', error);
        generalError.textContent = 'Connection error. Please try again.';
        generalError.classList.add('show', 'general');
    }
}