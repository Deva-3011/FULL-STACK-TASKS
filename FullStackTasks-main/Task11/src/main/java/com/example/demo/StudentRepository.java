package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



      public interface StudentRepository extends JpaRepository

    
     &lt;Student, Long&gt; {
    List&lt;Student&gt; findByDepartment(String department);

    List&lt;Student&gt; findByAgeGreaterThan(int age);
}
