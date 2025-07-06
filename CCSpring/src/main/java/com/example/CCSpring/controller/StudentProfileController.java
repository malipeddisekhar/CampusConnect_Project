package com.example.CCSpring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.model.Student;
import com.example.CCSpring.service.StudentProfileService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/student/profile")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    // Get student profile (for logged-in user)
    @GetMapping
    public ResponseEntity<?> getProfile(HttpSession session) {
        Long userId = (Long) session.getAttribute("LoggedInUser");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        Student profile = studentProfileService.getProfile(userId);
        if (profile == null) return ResponseEntity.status(404).body("Profile not found");

        return ResponseEntity.ok(profile);
    }

    // Update student profile (for logged-in user)
    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody Student updates, HttpSession session) {
        Long userId = (Long) session.getAttribute("LoggedInUser");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        Student updated = studentProfileService.updateProfile(userId, updates);
        if (updated == null) return ResponseEntity.status(404).body("Profile not found");

        return ResponseEntity.ok(updated);
    }
}