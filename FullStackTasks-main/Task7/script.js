document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const feedbackInput = document.getElementById('feedback');
    const submitBtn = document.getElementById('submitBtn');

    function validateName() {
        const name = nameInput.value.trim();
        const error = document.getElementById('nameError');
        if (name === '' || !/^[a-zA-Z\s]+$/.test(name)) {
            error.textContent = 'Name must be letters only and not empty.';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const error = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error.textContent = 'Please enter a valid email.';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    function validateFeedback() {
        const feedback = feedbackInput.value.trim();
        const error = document.getElementById('feedbackError');
        if (feedback === '') {
            error.textContent = 'Feedback cannot be empty.';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }

    nameInput.addEventListener('keyup', validateName);
    emailInput.addEventListener('keyup', validateEmail);
    feedbackInput.addEventListener('keyup', validateFeedback);

    submitBtn.addEventListener('dblclick', function() {
        if (validateName() && validateEmail() && validateFeedback()) {
            alert('Thank you for your feedback!');
        } else {
            alert('Please correct the errors before submitting.');
        }
    });
});