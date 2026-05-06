const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Change this to your MySQL password if needed
    database: 'login_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database and table
async function initializeDatabase() {
    const connection = await pool.getConnection();
    try {
        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS login_system`);
        
        // Switch to the database
        await connection.query(`USE login_system`);
        
        // Create students table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS students (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✓ Database initialized successfully');
    } catch (error) {
        console.error('✗ Database initialization error:', error.message);
    } finally {
        connection.release();
    }
}

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        const connection = await pool.getConnection();
        
        // Query database for matching user
        const [rows] = await connection.query(
            'SELECT * FROM students WHERE email = ? AND password = ?',
            [email, password]
        );

        connection.release();

        // Check if user found
        if (rows.length > 0) {
            return res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: rows[0].id,
                    email: rows[0].email
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, async () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Ensure MySQL is running and accessible\n`);
    
    // Initialize database
    await initializeDatabase();
});