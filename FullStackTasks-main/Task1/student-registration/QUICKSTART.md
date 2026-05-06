# Quick Start Guide

## 🚀 5-Minute Setup

Follow these steps to get the Student Registration System running in just 5 minutes!

### Step 1: Set Up the Database (1 minute)

Open MySQL and run:
```sql
CREATE DATABASE IF NOT EXISTS student_registration;

USE student_registration;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    department VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Or** copy the contents of `database/schema.sql` into MySQL directly.

### Step 2: Install Backend Dependencies (2 minutes)

```bash
cd backend
npm install
```

### Step 3: Configure Environment (30 seconds)

Create a `.env` file in the `backend/` folder with your MySQL credentials:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_registration
CORS_ORIGIN=*
```

**Note**: Update `DB_PASSWORD` if your MySQL root user has a password.

### Step 4: Start the Backend Server (30 seconds)

```bash
npm start
```

You should see the server running message with the API documentation.

### Step 5: Open the Frontend (30 seconds)

Simply open `frontend/index.html` in your web browser.

That's it! You're ready to use the Student Registration System! 🎉

---

## 🧪 Test It Out

1. **Fill the form** with test data:
   - Name: John Smith
   - Email: john@example.com
   - DOB: 2005-03-15
   - Department: Computer Science
   - Phone: 9876543210

2. **Click Register Student** button

3. **Check for success message** and verify the student appears in the table below

---

## 📱 Key Features to Explore

✅ **Real-time Form Validation** - Try leaving fields empty or entering invalid data
✅ **Duplicate Email Prevention** - Try registering with the same email twice
✅ **Responsive Design** - Resize your browser to see mobile layout
✅ **Live Table Updates** - Table updates automatically after registration
✅ **Error Handling** - Check console for detailed error messages

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'express'" | Run `npm install` in backend folder |
| "ECONNREFUSED" error | Make sure MySQL server is running |
| "CORS error" | Verify backend is running on localhost:3000 |
| Table won't load | Check browser console for API errors |
| Database won't connect | Check DB credentials in .env file |

---

## 📚 Full Documentation

For complete documentation, API endpoints, and deployment instructions, see **README.md**

---

**Happy Coding! 🚀**
