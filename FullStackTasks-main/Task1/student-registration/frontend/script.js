// ===================================
// API BASE URL
// ===================================
const API_BASE_URL = 'http://localhost:3000/api';

// ===================================
// DOM ELEMENTS
// ===================================
const form = document.getElementById('registrationForm');
const messageContainer = document.getElementById('messageContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const tableContainer = document.getElementById('tableContainer');
const noStudentsMessage = document.getElementById('noStudentsMessage');
const studentsTableBody = document.getElementById('studentsTableBody');

// Form input fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const dobInput = document.getElementById('dob');
const departmentInput = document.getElementById('department');
const phoneInput = document.getElementById('phone');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const dobError = document.getElementById('dobError');
const departmentError = document.getElementById('departmentError');
const phoneError = document.getElementById('phoneError');

// ===================================
// FORM VALIDATION RULES
// ===================================

const validationRules = {
    name: {
        validate: (value) => value.trim().length >= 3,
        message: 'Name must be at least 3 characters long'
    },
    email: {
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: 'Please enter a valid email address'
    },
    dob: {
        validate: (value) => {
            if (!value) return false;
            const date = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            return age >= 18 && age <= 100;
        },
        message: 'Student must be between 18 and 100 years old'
    },
    department: {
        validate: (value) => value !== '',
        message: 'Please select a department'
    },
    phone: {
        validate: (value) => {
            const phoneRegex = /^\d{10,15}$/;
            return phoneRegex.test(value.replace(/\D/g, ''));
        },
        message: 'Phone number must be 10-15 digits'
    }
};

// ===================================
// VALIDATION FUNCTIONS
// ===================================

/**
 * Validate a single field
 */
function validateField(fieldName, value) {
    const rule = validationRules[fieldName];
    if (!rule) return true;
    return rule.validate(value);
}

/**
 * Display error message for a field
 */
function showFieldError(fieldName, errorElement) {
    const rule = validationRules[fieldName];
    const inputElement = document.getElementById(fieldName);
    
    if (!rule) return;
    
    errorElement.textContent = rule.message;
    inputElement.classList.add('error');
}

/**
 * Clear error message for a field
 */
function clearFieldError(fieldName, errorElement) {
    const inputElement = document.getElementById(fieldName);
    errorElement.textContent = '';
    inputElement.classList.remove('error');
}

/**
 * Validate entire form
 */
function validateForm() {
    let isValid = true;

    // Validate each field
    if (!validateField('name', nameInput.value)) {
        showFieldError('name', nameError);
        isValid = false;
    } else {
        clearFieldError('name', nameError);
    }

    if (!validateField('email', emailInput.value)) {
        showFieldError('email', emailError);
        isValid = false;
    } else {
        clearFieldError('email', emailError);
    }

    if (!validateField('dob', dobInput.value)) {
        showFieldError('dob', dobError);
        isValid = false;
    } else {
        clearFieldError('dob', dobError);
    }

    if (!validateField('department', departmentInput.value)) {
        showFieldError('department', departmentError);
        isValid = false;
    } else {
        clearFieldError('department', departmentError);
    }

    if (!validateField('phone', phoneInput.value)) {
        showFieldError('phone', phoneError);
        isValid = false;
    } else {
        clearFieldError('phone', phoneError);
    }

    return isValid;
}

// ===================================
// REAL-TIME VALIDATION
// ===================================

// Validate name field in real-time
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim()) {
        validateField('name', nameInput.value)
            ? clearFieldError('name', nameError)
            : showFieldError('name', nameError);
    }
});

// Validate email field in real-time
emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim()) {
        validateField('email', emailInput.value)
            ? clearFieldError('email', emailError)
            : showFieldError('email', emailError);
    }
});

// Validate DOB field in real-time
dobInput.addEventListener('change', () => {
    if (dobInput.value) {
        validateField('dob', dobInput.value)
            ? clearFieldError('dob', dobError)
            : showFieldError('dob', dobError);
    }
});

// Validate department field in real-time
departmentInput.addEventListener('change', () => {
    if (departmentInput.value) {
        clearFieldError('department', departmentError);
    }
});

// Validate phone field in real-time
phoneInput.addEventListener('blur', () => {
    if (phoneInput.value.trim()) {
        validateField('phone', phoneInput.value)
            ? clearFieldError('phone', phoneError)
            : showFieldError('phone', phoneError);
    }
});

// ===================================
// MESSAGE DISPLAY FUNCTIONS
// ===================================

/**
 * Display success message
 */
function showSuccessMessage(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message-container success';
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        messageContainer.className = 'message-container';
        messageContainer.textContent = '';
    }, 4000);
}

/**
 * Display error message
 */
function showErrorMessage(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message-container error';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageContainer.className = 'message-container';
        messageContainer.textContent = '';
    }, 5000);
}

// ===================================
// API FUNCTIONS
// ===================================

/**
 * Register a new student via API
 */
async function registerStudent(studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Fetch all students from API
 */
async function fetchAllStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch students');
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ===================================
// TABLE FUNCTIONS
// ===================================

/**
 * Display loading state
 */
function showLoadingState() {
    loadingSpinner.style.display = 'block';
    tableContainer.style.display = 'none';
    noStudentsMessage.style.display = 'none';
}

/**
 * Render students table
 */
function renderStudentsTable(students) {
    if (!students || students.length === 0) {
        loadingSpinner.style.display = 'none';
        tableContainer.style.display = 'none';
        noStudentsMessage.style.display = 'block';
        return;
    }

    // Clear existing rows
    studentsTableBody.innerHTML = '';

    // Add student rows
    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${escapeHtml(student.department)}</td>
            <td>${escapeHtml(student.phone)}</td>
        `;
        studentsTableBody.appendChild(row);
    });

    loadingSpinner.style.display = 'none';
    tableContainer.style.display = 'block';
    noStudentsMessage.style.display = 'none';
}

/**
 * Load and display all students
 */
async function loadStudents() {
    showLoadingState();
    
    const result = await fetchAllStudents();
    
    if (result.success) {
        renderStudentsTable(result.data);
    } else {
        console.error('Error loading students:', result.error);
        loadingSpinner.style.display = 'none';
        noStudentsMessage.style.display = 'block';
        noStudentsMessage.innerHTML = `<p>Error loading students: ${result.error}</p>`;
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Format date to DD/MM/YYYY
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Reset form to initial state
 */
function resetFormState() {
    form.reset();
    clearFieldError('name', nameError);
    clearFieldError('email', emailError);
    clearFieldError('dob', dobError);
    clearFieldError('department', departmentError);
    clearFieldError('phone', phoneError);
}

// ===================================
// FORM SUBMISSION
// ===================================

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        showErrorMessage('Please fix the errors in the form');
        return;
    }

    // Disable submit button
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Registering...';

    // Prepare student data
    const studentData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        dob: dobInput.value,
        department: departmentInput.value,
        phone: phoneInput.value.trim()
    };

    // Submit form
    const result = await registerStudent(studentData);

    if (result.success) {
        showSuccessMessage('✓ Student registered successfully!');
        resetFormState();
        
        // Reload students list
        await loadStudents();
    } else {
        showErrorMessage(`✗ Registration failed: ${result.error}`);
    }

    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Register Student';
});

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application
 */
function init() {
    console.log('Student Registration System initialized');
    loadStudents();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
