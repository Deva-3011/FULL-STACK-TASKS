package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/department/{dept}")
    public List
    &lt ;
    Student
    &gt ;

    getStudentsByDepartment(@PathVariable String dept) {
        return studentService.getStudentsByDepartment(dept);
    }

    @GetMapping("/age/{age}")
    public List
    &lt ;
    Student
    &gt ;

    getStudentsByAgeGreaterThan(@PathVariable int age) {
        return studentService.getStudentsByAgeGreaterThan(age);
    }

    @GetMapping
    public Page
    &lt ;
    Student
    &gt ;

    getAllStudents(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return studentService.getAllStudents(pageable);
    }
}
