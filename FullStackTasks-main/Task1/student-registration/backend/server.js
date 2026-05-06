// ===================================
// EXPRESS SERVER
// ===================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// MIDDLEWARE
// ===================================

// Enable CORS for frontend communication
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ===================================
// MIDDLEWARE - REQUEST LOGGING
// ===================================

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ===================================
// VALIDATION MIDDLEWARE
// ===================================

/**
 * Validate student registration data
 */
function validateStudentData(req, res, next) {
    const { name, email, dob, department, phone } = req.body;
    const errors = [];

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        errors.push('Name must be at least 3 characters long');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Valid email is required');
    }

    // Validate DOB
    if (!dob) {
        errors.push('Date of birth is required');
    } else {
        const date = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        if (age < 18 || age > 100) {
            errors.push('Student must be between 18 and 100 years old');
        }
    }

    // Validate department
    const validDepartments = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Arts', 'Science'];
    if (!department || !validDepartments.includes(department)) {
        errors.push('Valid department is required');
    }

    // Validate phone
    const phoneRegex = /^\d{10,15}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, ''))) {
        errors.push('Phone number must be 10-15 digits');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
}

// ===================================
// API ROUTES
// ===================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * POST /api/register - Register a new student
 */
app.post('/api/register', validateStudentData, async (req, res) => {
    try {
        const { name, email, dob, department, phone } = req.body;

        // Create student
        const student = await db.createStudent({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            dob,
            department,
            phone: phone.trim()
        });

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            data: student
        });

    } catch (error) {
        console.error('Registration error:', error.message);

        // Handle duplicate email error
        if (error.message.includes('Email already registered')) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error registering student',
            error: error.message
        });
    }
});

/**
 * GET /api/students - Fetch all students
 */
app.get('/api/students', async (req, res) => {
    try {
        const students = await db.getAllStudents();

        res.status(200).json({
            success: true,
            message: 'Students retrieved successfully',
            data: students,
            count: students.length
        });

    } catch (error) {
        console.error('Fetch error:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
});

/**
 * GET /api/students/:id - Fetch a single student by ID
 */
app.get('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid student ID'
            });
        }

        const student = await db.getStudentById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student retrieved successfully',
            data: student
        });

    } catch (error) {
        console.error('Fetch error:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error fetching student',
            error: error.message
        });
    }
});

/**
 * PUT /api/students/:id - Update a student
 */
app.put('/api/students/:id', validateStudentData, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, dob, department, phone } = req.body;

        // Validate ID
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid student ID'
            });
        }

        // Update student
        const student = await db.updateStudent(id, {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            dob,
            department,
            phone: phone.trim()
        });

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });

    } catch (error) {
        console.error('Update error:', error.message);

        if (error.message === 'Student not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('Email already in use')) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating student',
            error: error.message
        });
    }
});

/**
 * DELETE /api/students/:id - Delete a student
 */
app.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid student ID'
            });
        }

        const result = await db.deleteStudent(id);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Delete error:', error.message);

        if (error.message === 'Student not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting student',
            error: error.message
        });
    }
});

// ===================================
// 404 ERROR HANDLER
// ===================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// ===================================
// ERROR HANDLING MIDDLEWARE
// ===================================

app.use((err, req, res, next) => {
    console.error('Server error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ===================================
// SERVER STARTUP
// ===================================

const server = app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  Student Registration System - Server  ║
    ║                                        ║
    ║  Server running at:                    ║
    ║  http://localhost:${PORT}                    ║
    ║                                        ║
    ║  API Documentation:                    ║
    ║  GET    /api/health     - Health check ║
    ║  POST   /api/register   - Register     ║
    ║  GET    /api/students   - List all     ║
    ║  GET    /api/students/:id - Get one    ║
    ║  PUT    /api/students/:id - Update     ║
    ║  DELETE /api/students/:id - Delete     ║
    ║                                        ║
    ╚════════════════════════════════════════╝
    `);
});

// ===================================
// GRACEFUL SHUTDOWN
// ===================================

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(async () => {
        console.log('Server closed');
        await db.closePool();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(async () => {
        console.log('Server closed');
        await db.closePool();
        process.exit(0);
    });
});

module.exports = app;
