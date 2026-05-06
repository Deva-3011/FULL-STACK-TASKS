package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EmployeeController {

    @RequestMapping("/employee")
    public String getEmployee(Model model) {
        Employee emp = new Employee(1, "John Doe", "Developer");
        model.addAttribute("employee", emp);
        return "employee";
    }
}
