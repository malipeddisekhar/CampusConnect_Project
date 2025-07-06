package com.example.CCSpring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.service.CourseStudentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/student")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StudentCourseController {
    @Autowired
    private CourseStudentService courseStudentService;

    // @GetMapping("/student/my-courses")
    // public ResponseEntity<?> getMyCourses(HttpSession session) {
    // Long userId = (Long) session.getAttribute("LoggedInUser");
    // if (userId == null) {
    // return ResponseEntity.status(401).body("Not logged in");
    // }

    // List<Course> courses = courseStudentService.getCoursesByStudentId(userId);
    // return ResponseEntity.ok(courses);
    // }
    @GetMapping("/my-courses")
    public ResponseEntity<?> getMyCourses(HttpSession session) {
        Long userId = (Long) session.getAttribute("LoggedInUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        try {
            List<Course> courses = courseStudentService.getCoursesByStudentId(userId);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            e.printStackTrace(); // 🔍 print to console/logs
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

}