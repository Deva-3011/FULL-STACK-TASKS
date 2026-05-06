# Product REST API

## Description

This is a simple Spring Boot application that provides a REST API for managing products. It includes validation and global exception handling.

## Validation Rules

- name: Not blank
- price: Positive number
- quantity: Positive integer

## Exception Handling

- Validation errors: Returns 400 with field errors
- Resource not found: Returns 404 with message
- Generic exceptions: Returns 500 with message

## API Endpoints

- GET /api/products: Get all products
- GET /api/products/{id}: Get product by id
- POST /api/products: Create a new product
- PUT /api/products/{id}: Update a product
- DELETE /api/products/{id}: Delete a product

## Steps to Run

1. Ensure Java 17 and Maven are installed.
2. Run `mvn spring-boot:run` in the project root.
3. The application will start on port 8080.
4. Access H2 console at http://localhost:8080/h2-console