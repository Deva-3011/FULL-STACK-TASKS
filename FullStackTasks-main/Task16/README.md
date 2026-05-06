# API Gateway with Spring Cloud Gateway

This project demonstrates an API Gateway using Spring Cloud Gateway integrated with Eureka Service Registry for dynamic routing and load balancing.

## Features
- Dynamic routing to microservices registered in Eureka
- Load balancing across multiple instances using Spring Cloud LoadBalancer
- Sample routes for User Service and Order Service

## Prerequisites
- Java 17
- Maven
- Eureka Server running on http://localhost:8761/eureka/
- At least two microservices (USER-SERVICE and ORDER-SERVICE) registered in Eureka

## Running the Application
1. Start Eureka Server
2. Start multiple instances of your microservices
3. Run the API Gateway: `mvn spring-boot:run`

## Credits
- Spring Boot
- Spring Cloud Gateway
- Netflix Eureka