# Student Registration System

A full-stack Student Registration System built with:
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js with Express
- Database: MySQL

## Project Structure

```text
student-registration/
|-- frontend/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|-- backend/
|   |-- server.js
|   |-- db.js
|   `-- package.json
|-- database/
|   `-- schema.sql
|-- README.md
`-- .gitignore
```

## Features

- Student registration form with fields: Name, Email, DOB, Department, Phone
- Responsive card-style interface
- Client-side validation using HTML and JavaScript
- Backend API integration with `fetch()`
- Success and error message handling
- Dynamic students table rendering
- Duplicate email prevention via unique DB constraint and API handling

## Prerequisites

- Node.js (v18+ recommended)
- MySQL Server

## Setup Instructions

1. Clone the repository and move into the project folder.
2. Create the database and table:
   - Open MySQL client.
   - Run SQL from `database/schema.sql`.
3. Configure backend environment variables (optional):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_registration
PORT=5000
```

If no `.env` file is provided, default values from `backend/db.js` are used.

4. Start backend server:

```bash
cd backend
npm install
node server.js
```

5. Open frontend:
   - Open `frontend/index.html` in your browser.

## API Endpoints

### POST `/register`
Registers a new student.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "dob": "2001-05-10",
  "department": "Computer Science",
  "phone": "9876543210"
}
```

Success response: `201 Created`

```json
{
  "message": "Student registered successfully.",
  "studentId": 1
}
```

Duplicate email response: `409 Conflict`

```json
{
  "message": "Email already exists."
}
```

### GET `/students`
Fetches all students.

Success response: `200 OK`

```json
{
  "students": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "dob": "2001-05-10T00:00:00.000Z",
      "department": "Computer Science",
      "phone": "9876543210"
    }
  ]
}
```

## Notes

- Ensure MySQL is running before starting the backend.
- CORS is enabled for frontend-backend communication.
