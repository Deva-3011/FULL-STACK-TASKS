# Simple Login System

A simple login system built with HTML, CSS, JavaScript, Node.js, Express, and MySQL.

## Features

- Login form with email and password fields
- JavaScript validation with inline error messages
- Fetch-based POST request to the backend
- MySQL-based credential check
- Clean, centered blue-themed UI

## Project Structure

```text
frontend/
  login.html
  login.css
  login.js

backend/
  server.js
  schema.sql

package.json
```

## Requirements

- Node.js
- npm
- MySQL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create the database and table:

- Open `backend/schema.sql` in MySQL Workbench or your MySQL client
- Run the script

3. Start the server:

```bash
npm start
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Database

The backend looks for a `users` table first, then `students`.

### Table columns

- `id` INT, PRIMARY KEY
- `email` VARCHAR
- `password` VARCHAR

### Sample login

The schema file adds this sample user:

- Email: `test@example.com`
- Password: `123456`

## API

### POST /login

Request body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful"
}
```

Failure response:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Notes

- Passwords are stored in plain text for simplicity.
- The backend serves the frontend files directly from the Express server.
- If you want to use a different database name or credentials, set these environment variables:
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `PORT`
