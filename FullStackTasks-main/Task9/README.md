# Spring MVC Employee Application

This is a basic Spring MVC application using annotation-based configuration.

## Project Structure

- `src/main/java/com/example/Employee.java` - Employee model class with id, name, role.
- `src/main/java/com/example/EmployeeController.java` - Controller with /employee mapping.
- `src/main/java/com/example/WebConfig.java` - Configuration class with @EnableWebMvc, @ComponentScan, and view resolver.
- `src/main/java/com/example/WebAppInitializer.java` - Initializes the DispatcherServlet without XML.
- `src/main/webapp/WEB-INF/views/employee.jsp` - JSP view to display employee details.
- `pom.xml` - Maven configuration with Spring MVC dependencies.

## How to Run

1. Ensure Maven and a servlet container (e.g., Tomcat) are installed.
2. Build the project: `mvn clean package`
3. Deploy the generated `Task9-1.0-SNAPSHOT.war` to Tomcat (e.g., webapps folder).
4. Start Tomcat.
5. Access the application at `http://localhost:8080/Task9-1.0-SNAPSHOT/employee`

Note: The context path depends on the war file name.

## Requirements Met

- Annotation-based configuration only, no XML.
- Employee model, controller, config, JSP view.
- Controller sends employee data to view via Model.