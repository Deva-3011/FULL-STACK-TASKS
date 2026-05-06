# Microservices System

## Description
This is a simple microservices-based system consisting of two independent services: User Service and Order Service.

## Services

### User Service
- Manages users with id, name, and email.
- Endpoints:
  - GET /users: Retrieve all users
  - POST /users: Create a new user

### Order Service
- Manages orders with id, productName, and userId.
- Endpoints:
  - GET /orders: Retrieve all orders
  - POST /orders: Create a new order

## How to Run
1. Ensure Java and Maven are installed.
2. For User Service: Navigate to User-Service directory, run `mvn spring-boot:run` or use IDE to run UserServiceApplication.java. Runs on port 8081.
3. For Order Service: Navigate to Order-Service directory, run `mvn spring-boot:run` or use IDE to run OrderServiceApplication.java. Runs on port 8082.

Note: Each service uses H2 in-memory database, so data is not persisted across restarts.