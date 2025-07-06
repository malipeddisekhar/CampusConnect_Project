package com.example.CCSpring.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CCSpring.model.Student;
import com.example.CCSpring.repository.StudentRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/student")
public class StudentImageController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProfilePhoto(@RequestParam("file") MultipartFile file, HttpSession session) {
        Long userId = (Long) session.getAttribute("LoggedInUser");
        if (userId == null) return ResponseEntity.status(401).body("Not logged in");

        Student student = studentRepository.findByUserId(userId);
        if (student == null) return ResponseEntity.status(404).body("Profile not found");

        try {
            String uploadsDir = "uploads/";
            File dir = new File(uploadsDir);
            if (!dir.exists()) dir.mkdirs();

            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
            String newName = "profile_" + userId + "_" + UUID.randomUUID() + ext;
            String path = uploadsDir + newName;
            Files.write(Paths.get(path), file.getBytes());

            student.setProfilePhotoUrl("/" + path);
            studentRepository.save(student);

            return ResponseEntity.ok().body("{\"url\": \"" + "/" + path + "\"}");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
}