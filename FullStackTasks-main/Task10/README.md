# Student CRUD Application

## Description

A simple Spring Boot application that provides CRUD operations for managing students. It uses JPA for data persistence and H2 as the in-memory database.

## Technologies Used

- Java 17
- Spring Boot 3.1.0
- Spring Data JPA
- H2 Database
- Maven

## API Endpoints

- GET /students - Get all students
- POST /students - Create a new student
- PUT /students/{id} - Update a student by ID
- DELETE /students/{id} - Delete a student by ID

## Steps to Run the Project

1. Ensure you have Java 17 and Maven installed.
2. Clone or download the project.
3. Navigate to the project directory.
4. Run `mvn spring-boot:run` to start the application.
5. The application will run on http://localhost:8080.
6. H2 console is available at http://localhost:8080/h2-console.

## Sample Request/Response

### Create Student (POST /students)

Request Body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science"
}
```

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science"
}
```

### Get All Students (GET /students)

Response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science"
  }
]
```