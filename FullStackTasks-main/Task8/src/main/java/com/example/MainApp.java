package com.example;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;

public class MainApp {
    public static void main(String[] args) {
        BeanFactory factory = new XmlBeanFactory(new ClassPathResource("applicationContext.xml"));
        EmployeeService service = factory.getBean(EmployeeService.class);

        // Add sample employees
        service.addEmployee(new Employee(1, "John Doe", "Manager"));
        service.addEmployee(new Employee(2, "Jane Smith", "Developer"));

        service.displayEmployees();
    }
}