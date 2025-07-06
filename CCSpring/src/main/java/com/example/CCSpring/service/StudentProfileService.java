package com.example.CCSpring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.Student;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.StudentRepository;
import com.example.CCSpring.repository.UserRepository;

@Service
public class StudentProfileService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    // Fetch student profile by userId, auto-create if missing
    public Student getProfile(Long userId) {
        Student profile = studentRepository.findByUserId(userId);
        if (profile == null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null && user.getRole() == Role.STUDENT) {
                profile = new Student();
                profile.setUser(user);
                profile = studentRepository.save(profile);
            }
        }
        return profile;
    }

    // Update student profile
    public Student updateProfile(Long userId, Student updates) {
        Student existing = getProfile(userId); // will auto-create if missing
        if (existing == null) return null;

        existing.setHeadline(updates.getHeadline());
        existing.setAbout(updates.getAbout());
        existing.setGender(updates.getGender());
        existing.setPhone(updates.getPhone());
        existing.setProfilePhotoUrl(updates.getProfilePhotoUrl());
        existing.setGithub(updates.getGithub());
        existing.setLinkedin(updates.getLinkedin());
        existing.setFacebook(updates.getFacebook());
        existing.setTwitter(updates.getTwitter());
        existing.setBlog(updates.getBlog());
        existing.setOtherLink(updates.getOtherLink());

        return studentRepository.save(existing);
    }
}