# Product Management API

## Description
This is a RESTful API for managing products built with Spring Boot. It provides CRUD operations for products including create, read, update, and delete functionalities.

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven

## API Endpoints

### Get All Products
- **GET** `/products`
- **Response**: List of products in JSON format

### Get Product by ID
- **GET** `/products/{id}`
- **Response**: Product object in JSON format or 404 if not found

### Create Product
- **POST** `/products`
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "price": 10.99,
    "quantity": 100
  }
  ```
- **Response**: Created product object in JSON format

### Update Product
- **PUT** `/products/{id}`
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "price": 15.99,
    "quantity": 150
  }
  ```
- **Response**: Updated product object in JSON format or 404 if not found

### Delete Product
- **DELETE** `/products/{id}`
- **Response**: 204 No Content

## Steps to Run
1. Ensure you have Java 17 and Maven installed.
2. Clone or download the project.
3. Navigate to the project directory.
4. Run `mvn spring-boot:run` to start the application.
5. The application will start on `http://localhost:8080`.

## How to Test Using Postman
1. Open Postman.
2. Set the base URL to `http://localhost:8080`.
3. Use the endpoints listed above.
4. For POST and PUT requests, set the Content-Type header to `application/json`.
5. Example:
   - GET: `http://localhost:8080/products`
   - POST: `http://localhost:8080/products` with JSON body
   - PUT: `http://localhost:8080/products/1` with JSON body
   - DELETE: `http://localhost:8080/products/1`