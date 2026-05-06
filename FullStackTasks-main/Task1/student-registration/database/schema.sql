-- ===================================
-- STUDENT REGISTRATION DATABASE SCHEMA
-- ===================================

-- Create database
CREATE DATABASE IF NOT EXISTS student_registration;

-- Use the database
USE student_registration;

-- ===================================
-- STUDENTS TABLE
-- ===================================

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    department VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better query performance
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- SAMPLE DATA (Optional)
-- ===================================

-- Uncomment below to insert sample data
/*
INSERT INTO students (name, email, dob, department, phone) VALUES
('John Smith', 'john.smith@example.com', '2005-03-15', 'Computer Science', '9876543210'),
('Sarah Johnson', 'sarah.johnson@example.com', '2004-07-22', 'Engineering', '9876543211'),
('Michael Brown', 'michael.brown@example.com', '2006-01-10', 'Business Administration', '9876543212'),
('Emily Davis', 'emily.davis@example.com', '2005-11-05', 'Medicine', '9876543213'),
('David Wilson', 'david.wilson@example.com', '2004-05-18', 'Arts', '9876543214');
*/
