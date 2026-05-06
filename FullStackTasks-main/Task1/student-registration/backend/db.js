// ===================================
// DATABASE CONNECTION MODULE
// ===================================

const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_registration',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

/**
 * Get a connection from the pool
 */
async function getConnection() {
    return await pool.getConnection();
}

/**
 * Execute a query
 */
async function executeQuery(sql, values = []) {
    const connection = await getConnection();
    
    try {
        const [results] = await connection.execute(sql, values);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        connection.release();
    }
}

/**
 * Get all students
 */
async function getAllStudents() {
    const sql = 'SELECT id, name, email, dob, department, phone FROM students ORDER BY id DESC';
    return await executeQuery(sql);
}

/**
 * Get student by ID
 */
async function getStudentById(id) {
    const sql = 'SELECT * FROM students WHERE id = ?';
    const results = await executeQuery(sql, [id]);
    return results[0] || null;
}

/**
 * Get student by email
 */
async function getStudentByEmail(email) {
    const sql = 'SELECT * FROM students WHERE email = ?';
    const results = await executeQuery(sql, [email]);
    return results[0] || null;
}

/**
 * Create a new student
 */
async function createStudent(studentData) {
    const { name, email, dob, department, phone } = studentData;
    
    // Check if email already exists
    const existingStudent = await getStudentByEmail(email);
    if (existingStudent) {
        throw new Error('Email already registered');
    }
    
    const sql = `
        INSERT INTO students (name, email, dob, department, phone)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await executeQuery(sql, [name, email, dob, department, phone]);
    
    return {
        id: result.insertId,
        name,
        email,
        dob,
        department,
        phone
    };
}

/**
 * Update a student
 */
async function updateStudent(id, studentData) {
    const { name, email, dob, department, phone } = studentData;
    
    // Check if email exists for another student
    if (email) {
        const existingStudent = await getStudentByEmail(email);
        if (existingStudent && existingStudent.id !== id) {
            throw new Error('Email already in use');
        }
    }
    
    const sql = `
        UPDATE students 
        SET name = ?, email = ?, dob = ?, department = ?, phone = ?
        WHERE id = ?
    `;
    
    const result = await executeQuery(sql, [name, email, dob, department, phone, id]);
    
    if (result.affectedRows === 0) {
        throw new Error('Student not found');
    }
    
    return await getStudentById(id);
}

/**
 * Delete a student
 */
async function deleteStudent(id) {
    const sql = 'DELETE FROM students WHERE id = ?';
    const result = await executeQuery(sql, [id]);
    
    if (result.affectedRows === 0) {
        throw new Error('Student not found');
    }
    
    return { message: 'Student deleted successfully' };
}

/**
 * Close the connection pool
 */
async function closePool() {
    await pool.end();
}

// Export functions
module.exports = {
    getConnection,
    executeQuery,
    getAllStudents,
    getStudentById,
    getStudentByEmail,
    createStudent,
    updateStudent,
    deleteStudent,
    closePool
};
