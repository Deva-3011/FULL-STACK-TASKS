package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List
    &lt ;
    Student
    &gt ;

    getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }

    public List
    &lt ;
    Student
    &gt ;

    getStudentsByAgeGreaterThan(int age) {
        return studentRepository.findByAgeGreaterThan(age);
    }

    public Page
    &lt ;
    Student
    &gt ;

    getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }
}
