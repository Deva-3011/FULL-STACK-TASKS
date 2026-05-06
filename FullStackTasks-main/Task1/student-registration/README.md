# Student Registration System

A complete, production-ready student registration system built with **Node.js**, **Express**, **MySQL**, and **Vanilla JavaScript**.

## 📋 Features

- ✅ **Student Registration Form** with validation
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Real-time Form Validation** - Client-side and server-side
- ✅ **Dynamic Student Table** - Display all registered students
- ✅ **Duplicate Email Prevention** - Unique email constraint
- ✅ **CRUD Operations** - Create, Read, Update, Delete students
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **RESTful API** - Clean and organized endpoints
- ✅ **CORS Enabled** - Frontend and backend communication
- ✅ **Database Connection Pooling** - Efficient MySQL operations

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MySQL with connection pooling
- **Tools**: npm, dotenv, CORS

## 📁 Project Structure

```
student-registration/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Responsive styling
│   └── script.js           # Frontend logic and validation
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── db.js               # Database connection and queries
│   └── package.json        # Dependencies
├── database/
│   └── schema.sql          # MySQL database schema
├── README.md               # This file
└── .gitignore              # Git ignore file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v5.7 or higher) - [Download](https://www.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/student-registration.git
cd student-registration
```

#### 2. Set Up the Database

1. Open MySQL command line or MySQL Workbench
2. Run the schema file to create the database and table:

```bash
mysql -u root -p < database/schema.sql
```

Or copy and paste the contents of `database/schema.sql` into MySQL directly.

3. **Optional**: Uncomment the sample data in `schema.sql` to add test data

#### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 4. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_registration

# CORS Configuration
CORS_ORIGIN=*
```

**Note**: Replace `your_password` with your MySQL root password (or leave empty if no password is set)

#### 5. Start the Backend Server

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Student Registration System - Server  ║
║                                        ║
║  Server running at:                    ║
║  http://localhost:3000                 ║
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
```

#### 6. Open the Frontend

Simply open the `frontend/index.html` file in your web browser:

```bash
# Windows
start frontend/index.html

# macOS
open frontend/index.html

# Linux
xdg-open frontend/index.html
```

Or navigate to `file:///path/to/student-registration/frontend/index.html` in your browser.

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

#### 2. Register Student
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@example.com",
  "dob": "2005-03-15",
  "department": "Computer Science",
  "phone": "9876543210"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "dob": "2005-03-15",
    "department": "Computer Science",
    "phone": "9876543210"
  }
}
```

**Error Response (400/409/500):**
```json
{
  "success": false,
  "message": "Email already registered",
  "errors": ["Email already registered"]
}
```

**Validation Rules:**
- Name: Minimum 3 characters
- Email: Valid email format, must be unique
- DOB: Student must be 18-100 years old
- Department: Must be one of the predefined departments
- Phone: 10-15 digits

---

#### 3. Get All Students
```http
GET /api/students
```

**Response (200):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@example.com",
      "dob": "2005-03-15",
      "department": "Computer Science",
      "phone": "9876543210"
    },
    {
      "id": 2,
      "name": "Sarah Johnson",
      "email": "sarah@example.com",
      "dob": "2004-07-22",
      "department": "Engineering",
      "phone": "9876543211"
    }
  ]
}
```

---

#### 4. Get Single Student
```http
GET /api/students/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "dob": "2005-03-15",
    "department": "Computer Science",
    "phone": "9876543210"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

#### 5. Update Student
```http
PUT /api/students/:id
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "dob": "2005-03-15",
  "department": "Computer Science",
  "phone": "9876543210"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": { /* Updated student data */ }
}
```

---

#### 6. Delete Student
```http
DELETE /api/students/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## 🎯 Form Validation

### Frontend Validation (Real-time)
- **Name**: Minimum 3 characters
- **Email**: Valid email format
- **Date of Birth**: Student must be 18-100 years old
- **Department**: Must select a department
- **Phone**: 10-15 digits

### Backend Validation
All fields are validated on the server for security purposes.

## 🗂 Database Schema

### Students Table
```sql
CREATE TABLE students (
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
);
```

## 🎨 Frontend Features

### Responsive Design
- Desktop (1200px and above)
- Tablet (768px - 1199px)
- Mobile (below 768px)

### UI Components
- Card-based layout
- Gradient header
- Form with inline validation
- Dynamic student table with hover effects
- Loading spinner
- Success/Error message alerts
- XSS protection with HTML escaping

## 🔒 Security Features

- ✅ SQL Injection Prevention (Prepared Statements)
- ✅ CORS Configuration
- ✅ Email Uniqueness Constraint
- ✅ XSS Protection (HTML Escaping)
- ✅ Input Validation (Frontend & Backend)
- ✅ Error Handling (No sensitive data exposure)
- ✅ Environment Variables for sensitive config

## 📝 Code Quality

- **Modular Code**: Separated concerns (frontend, backend, database)
- **Comments**: Well-documented functions and sections
- **Async/Await**: Modern JavaScript patterns
- **Error Handling**: Comprehensive try-catch blocks
- **Validation**: Multi-layer validation (HTML, JS, Server)
- **Database Pooling**: Efficient connection management

## 🧪 Testing the Application

### Using Browser
1. Open `frontend/index.html` in your browser
2. Fill out the registration form with valid data
3. Click "Register Student"
4. Check the success message and the updated student table

### Using cURL
```bash
# Register a student
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "dob": "2005-03-15",
    "department": "Computer Science",
    "phone": "9876543210"
  }'

# Get all students
curl http://localhost:3000/api/students

# Get a specific student
curl http://localhost:3000/api/students/1

# Update a student
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "dob": "2005-03-15",
    "department": "Engineering",
    "phone": "9876543210"
  }'

# Delete a student
curl -X DELETE http://localhost:3000/api/students/1
```

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution**: Run `npm install` in the `backend/` directory

### Issue: "Error: connect ECONNREFUSED"
**Solution**: Make sure MySQL server is running and credentials in `.env` are correct

### Issue: "CORS error in browser"
**Solution**: Update `CORS_ORIGIN` in `.env` or ensure backend is running on `localhost:3000`

### Issue: "Email already registered"
**Solution**: This is expected behavior. Try with a different email address.

### Issue: Database connection fails
**Solution**: 
1. Verify MySQL is running
2. Check username and password in `.env`
3. Ensure `student_registration` database exists (run schema.sql)

## 📦 Deployment

### Deploying to Heroku
1. Create a Heroku account and install Heroku CLI
2. Add a Procfile in the backend directory:
   ```
   web: node server.js
   ```
3. Set environment variables:
   ```bash
   heroku config:set DB_HOST=your_mysql_host
   heroku config:set DB_USER=your_db_user
   heroku config:set DB_PASSWORD=your_db_password
   ```

### Deploying Frontend
- Deploy static files to GitHub Pages, Netlify, or Vercel
- Update API_BASE_URL in `script.js` to your production server URL

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@example.com or open an issue on GitHub.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Created with ❤️ by Your Name**

Last Updated: 2024
