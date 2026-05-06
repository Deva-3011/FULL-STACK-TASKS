# Student Management System

## Description
A simple Spring Boot application for managing students using Spring Data JPA.

## Tech Stack
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven

## API Endpoints
- GET /students/department/{dept} - Get students by department
- GET /students/age/{age} - Get students by age greater than
- GET /students?page=0&amp;size=5&amp;sort=name - Get all students with pagination and sorting

## Steps to Run
1. Clone the repository
2. Run `mvn spring-boot:run`
3. Access the application at http://localhost:8080

## Pagination and Sorting
The /students endpoint supports pagination with page and size parameters, and sorting with sort parameter.

Example: /students?page=1&amp;size=10&amp;sort=age,desc