package com.example.CCSpring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.User;
import com.example.CCSpring.service.CourseService;
import com.example.CCSpring.service.CourseStudentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/courses")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private CourseStudentService courseStudentService;

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Map<String, String> data) {
        String name = data.get("name");
        String branch = data.get("branch");

        Course created = courseService.createCourse(name, branch);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/assign-teacher")
    public ResponseEntity<?> assignTeacher(@RequestParam Long courseId, @RequestParam Long teacherId) {
        boolean success = courseService.assignTeacher(courseId, teacherId);
        return success ? ResponseEntity.ok("Teacher assigned")
                : ResponseEntity.badRequest().body("Failed to assign teacher");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        return deleted ? ResponseEntity.ok("Course deleted")
                : ResponseEntity.badRequest().body("Failed to delete course");
    }

    @GetMapping("/my-course")
    public ResponseEntity<?> getMyCourse(HttpSession session) {
        Long userId = (Long) session.getAttribute("LoggedInUser");
        if (userId == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        List<Course> courses = courseStudentService.getCoursesByStudentId(userId);
        if (!courses.isEmpty()) {
            return ResponseEntity.ok(courses.get(0));
        }

        Course teacherCourse = courseService.getCourseByTeacherId(userId);
        return ResponseEntity.ok(teacherCourse);
    }

    @GetMapping("/enrolled-students")
    public ResponseEntity<List<User>> getEnrolledStudents(@RequestParam Long courseId) {
        List<User> students = courseStudentService.getStudentsByCourse(courseId);
        return ResponseEntity.ok(students);
    }

    @PutMapping("/enroll-student")
    public ResponseEntity<?> enrollStudent(@RequestParam Long courseId, @RequestParam Long studentId) {
        boolean enrolled = courseStudentService.enrollStudentToCourse(courseId, studentId);
        if (enrolled) {
            return ResponseEntity.ok("Student enrolled");
        } else {
            return ResponseEntity.badRequest().body("Enrollment failed (already enrolled or invalid)");
        }
    }

}
