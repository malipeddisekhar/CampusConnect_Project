package com.example.CCSpring.controller;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.CourseRepository;
import com.example.CCSpring.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ Admin creates a new course
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Course course, HttpSession session) {
        Object userId = session.getAttribute("LoggedInUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        User admin = userRepo.findById(Long.valueOf(userId.toString())).orElse(null);
        if (admin == null || !admin.getRole().toString().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.status(403).body("Only admin can create courses");
        }

        try {
            courseRepo.save(course);
            return ResponseEntity.ok("Course created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create course: " + e.getMessage());
        }
    }

    // ✅ Admin assigns a teacher to a course
    @PutMapping("/assign-teacher")
    public ResponseEntity<?> assignTeacher(
            @RequestParam Long courseId,
            @RequestParam Long teacherId,
            HttpSession session
    ) {
        Object userId = session.getAttribute("LoggedInUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        User admin = userRepo.findById(Long.valueOf(userId.toString())).orElse(null);
        if (admin == null || !admin.getRole().toString().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.status(403).body("Only admin can assign teachers");
        }

        Course course = courseRepo.findById(courseId).orElse(null);
        User teacher = userRepo.findById(teacherId).orElse(null);

        if (course == null || teacher == null || !teacher.getRole().toString().equalsIgnoreCase("TEACHER")) {
            return ResponseEntity.badRequest().body("Invalid course or teacher ID");
        }

        course.setTeacher(teacher);
        courseRepo.save(course);

        return ResponseEntity.ok("Teacher assigned to course successfully");
    }

    // ✅ Admin gets all courses
    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    // ✅ (Optional) Courses with no teacher assigned
    @GetMapping("/unassigned")
    public List<Course> getUnassignedCourses() {
        return courseRepo.findByTeacherIsNull();
    }

    // ✅ Teacher-specific: view assigned courses (used later)
    @GetMapping("/by-teacher")
    public List<Course> getCoursesByTeacher(@RequestParam Long teacherId) {
        User teacher = userRepo.findById(teacherId).orElse(null);
        if (teacher == null) return List.of();
        return courseRepo.findByTeacher(teacher);
    }
}
