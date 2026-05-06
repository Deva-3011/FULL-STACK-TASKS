# Simple Login System

A full-stack login system built with HTML, CSS, JavaScript (frontend) and Node.js, Express, MySQL (backend).

## Project Structure

```
├── frontend/
│   ├── login.html      # Login form HTML
│   ├── login.css       # Styling with bluish theme
│   └── login.js        # Form validation & API communication
├── backend/
│   ├── server.js       # Express server with MySQL integration
│   └── package.json    # Backend dependencies
├── package.json        # Root package.json
└── README.md           # This file
```

---

## Features

### Frontend
- ✓ Clean, modern UI with bluish theme
- ✓ Email and password input fields
- ✓ Real-time form validation
- ✓ Email format validation
- ✓ Dynamic error messages below inputs
- ✓ Submit button with loading feedback
- ✓ Success/error message display
- ✓ Responsive design
- ✓ Uses fetch() API with async/await

### Backend
- ✓ Express.js REST API
- ✓ MySQL database integration
- ✓ Automatic database & table creation
- ✓ POST /login endpoint
- ✓ CORS enabled for frontend communication
- ✓ JSON response format
- ✓ Connection pooling for better performance

---

## Prerequisites

Before running the project, ensure you have:

1. **Node.js** (v14 or higher)
2. **MySQL Server** running locally
3. **npm** (comes with Node.js)

### Installation Steps

#### 1. Install MySQL (if not already installed)
- **Windows**: Download from https://dev.mysql.com/downloads/mysql/
- **Mac**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

Start MySQL:
```bash
mysql.server start
```

#### 2. Create MySQL User (Optional but recommended)
```bash
mysql -u root

mysql> CREATE USER 'root'@'localhost' IDENTIFIED BY 'your_password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

#### 3. Update Backend Connection (if needed)
In `backend/server.js`, update the MySQL credentials if necessary:
```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // Change if you set a password
    database: 'login_system',
    ...
});
```

#### 4. Install Backend Dependencies
```bash
cd backend
npm install
```

---

## Setup Test Data

### Option 1: Using MySQL Command Line

```bash
mysql -u root login_system
```

Then insert test data:
```sql
INSERT INTO students (email, password) VALUES ('student@example.com', 'password123');
INSERT INTO students (email, password) VALUES ('john@example.com', 'john123');
INSERT INTO students (email, password) VALUES ('jane@example.com', 'jane456');
```

### Option 2: Programmatically
After starting the server, you can add a route to insert test data or use a database GUI tool like phpMyAdmin or MySQL Workbench.

---

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
✓ Server running on http://localhost:3000
✓ Database initialized successfully
```

### Open Frontend

1. Navigate to the `frontend` folder
2. Open `login.html` in your web browser
   - Or use Live Server extension in VS Code
   - Or run a simple HTTP server: `python -m http.server 8000`

**Access the login page**: Open your browser and go to:
- `file:///path/to/frontend/login.html` (direct file)
- `http://localhost:8000/frontend/login.html` (with HTTP server)

---

## Testing Login

### Test Credentials
After inserting test data above, you can use:

- **Email**: student@example.com
- **Password**: password123

OR

- **Email**: john@example.com
- **Password**: john123

---

## API Endpoint

### POST /login

**Request:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "student@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Validation Rules

### Email
- ✓ Cannot be empty
- ✓ Must contain @ symbol
- ✓ Must contain domain (e.g., example.com)

### Password
- ✓ Cannot be empty
- ✓ No length restrictions (for demo purposes)

---

## File Details

### frontend/login.html
- HTML5 form structure
- Input fields with IDs for JavaScript targeting
- Error message containers
- Success message display area

### frontend/login.css
- Flexbox layout for centering
- Light blue background (#f1f5ff)
- Blue button (#2563eb)
- Rounded input fields
- Responsive design
- Hover and focus states

### frontend/login.js
- Email regex validation
- Real-time error clearing
- Form validation before submission
- Fetch API with async/await
- Dynamic error message display
- Success message handling

### backend/server.js
- Express.js setup
- CORS enabled
- MySQL connection pool
- Automatic database initialization
- Login endpoint implementation
- Error handling

---

## Database Schema

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Troubleshooting

### "Connection refused" error
- Ensure MySQL server is running
- Check MySQL credentials in `backend/server.js`

### CORS error in browser
- Backend has CORS enabled (already configured)
- Ensure you're making requests to `http://localhost:3000`

### Database not created
- Run the server once to auto-create the database
- Check MySQL user has CREATE privileges

### Port 3000 already in use
- Change PORT in `backend/server.js` to another port (e.g., 3001)
- Update frontend `login.js` fetch URL accordingly

---

## Development Tips

### Using Nodemon for Auto-reload
```bash
cd backend
npm install --save-dev nodemon
npm run dev
```

### Testing with cURL
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

### Using Postman
1. Create new POST request
2. URL: `http://localhost:3000/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

---

## Future Enhancements

- [ ] Add password hashing (bcrypt)
- [ ] Add JWT authentication tokens
- [ ] Add registration endpoint
- [ ] Add "Remember me" functionality
- [ ] Add password reset feature
- [ ] Add user session management
- [ ] Add input sanitization
- [ ] Add rate limiting
- [ ] Add email verification
- [ ] Add 2FA (Two-Factor Authentication)

---

## License

ISC

---

## Support

For issues or questions, please check:
1. MySQL is running
2. Backend dependencies are installed (`npm install`)
3. Backend server is running on port 3000
4. Frontend is accessing the correct API endpoint
