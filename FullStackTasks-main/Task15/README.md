# Service Registry and Discovery with Netflix Eureka

This project demonstrates a complete setup for Service Registry and Discovery using Netflix Eureka in a Spring Boot microservices architecture.

## Services

- **Eureka Server**: Acts as the service registry.
- **User Service**: A microservice that registers with Eureka and communicates with the Order Service.
- **Order Service**: A microservice that registers with Eureka.

## Prerequisites

- Java 17
- Maven

## Running the Services

1. Start the Eureka Server:
   ```
   cd eureka-server
   mvn spring-boot:run
   ```
   The Eureka Server will be available at http://localhost:8761

2. Start the Order Service:
   ```
   cd order-service
   mvn spring-boot:run
   ```
   The Order Service will register with Eureka and run on port 8082.

3. Start the User Service:
   ```
   cd user-service
   mvn spring-boot:run
   ```
   The User Service will register with Eureka and run on port 8081.

## Testing

- Access Eureka Dashboard: http://localhost:8761
- Get user: http://localhost:8081/users/1
- Get user orders: http://localhost:8081/users/1/orders (this calls the Order Service internally)

## Technologies Used

- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- Netflix Eureka

## Credits

- Spring Boot: https://spring.io/projects/spring-boot
- Spring Cloud Netflix: https://spring.io/projects/spring-cloud-netflix
- Netflix Eureka: https://github.com/Netflix/eureka