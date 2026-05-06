package com.example;

import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeService {
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee emp) {
        employees.add(emp);
    }

    public void displayEmployees() {
        for (Employee e : employees) {
            System.out.println("ID: " + e.getId() + ", Name: " + e.getName() + ", Role: " + e.getRole());
        }
    }
}