# Product Service Microservice

## Project Overview
This is a Spring Boot microservice for managing products. It provides RESTful endpoints for CRUD operations on products, including creating, reading, updating, and deleting products. The service uses JPA for data persistence with an H2 in-memory database for testing and development.

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Web
- H2 Database
- JUnit 5
- Mockito
- Maven

## How to Run the Project
1. Ensure you have Java 17 and Maven installed.
2. Clone or download the project.
3. Navigate to the project root directory.
4. Run `mvn spring-boot:run` to start the application.
5. The application will start on port 8080 by default.

## How to Run Tests
1. To run all tests, use `mvn test`.
2. Tests are divided into:
   - Service layer tests: Test business logic with mocked dependencies.
   - Controller layer tests: Test REST endpoints using MockMvc.
   - Repository layer tests: Test CRUD operations with H2 in-memory database.

## API Endpoints
- GET /products: Retrieve all products
- GET /products/{id}: Retrieve a product by ID
- POST /products: Create a new product (JSON body: {"name": "string", "price": double})
- DELETE /products/{id}: Delete a product by ID

## Testing Approach Explanation
- **Service Layer**: Uses Mockito to mock the repository layer, focusing on testing business logic independently. Includes success and failure scenarios.
- **Controller Layer**: Uses MockMvc to simulate HTTP requests and validate responses, status codes, and JSON content without starting a full server.
- **Repository Layer**: Uses @DataJpaTest with H2 in-memory database to test data access operations in isolation.