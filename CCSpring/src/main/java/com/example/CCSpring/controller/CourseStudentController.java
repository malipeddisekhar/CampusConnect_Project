package com.example.CCSpring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.service.CourseStudentService;

@RestController
@RequestMapping("/api/enrollments")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CourseStudentController {

    @Autowired
    private CourseStudentService courseStudentService;

    @PutMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestParam Long courseId, @RequestParam Long studentId) {
        boolean success = courseStudentService.enrollStudentToCourse(courseId, studentId);
        return success ? ResponseEntity.ok("Student enrolled successfully")
                : ResponseEntity.badRequest().body("Enrollment failed (maybe already enrolled or invalid)");
    }
}
