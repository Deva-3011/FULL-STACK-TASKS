# Spring Boot Demo Project

## Project Overview

This is a simple Spring Boot application that provides a REST API with a hello endpoint.

## Tools Used

- Java 17
- Spring Boot 3.2.0
- Maven
- GitHub Actions for CI/CD

## Steps to Run Project

1. Clone the repository.
2. Navigate to the project directory.
3. Run `mvn spring-boot:run` to start the application.
4. Access `http://localhost:8080/hello` to get "Hello, World!".

## CI/CD Workflow Explanation

The CI/CD pipeline is implemented using GitHub Actions. It automates the process of checking out code, building the project, running tests, and deploying.

## Pipeline Stages

1. **Checkout**: Checks out the code from the repository.
2. **Build**: Compiles the Java code using Maven.
3. **Test**: Runs the unit tests.
4. **Deploy**: Simulates deployment with an echo command.

## How to Trigger Pipeline

The pipeline is triggered on push or pull request to the main branch.

![CI/CD](https://github.com/yourusername/yourrepo/workflows/CI/CD%20Pipeline/badge.svg)