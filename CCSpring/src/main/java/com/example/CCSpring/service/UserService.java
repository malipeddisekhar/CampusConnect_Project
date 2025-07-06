package com.example.CCSpring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.Student;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.StudentRepository;
import com.example.CCSpring.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    // ✅ Registration logic
    @Transactional
    public String registerUser(User u) {
        User existing = userRepository.findByEmail(u.getEmail());

        if (existing != null) {
            return "Email already exists";
        }

        if (u.getRole() == null) {
            u.setRole(Role.STUDENT); // default role
        }

        User savedUser = userRepository.save(u);

        // If user is a student, create Student profile row with default (mostly null) fields
        if (savedUser.getRole() == Role.STUDENT) {
            Student student = new Student();
            student.setUser(savedUser);
            // All extra fields remain null by default
            studentRepository.save(student);
        }

        return "Registration Successful";
    }

    // Optional: used if you want to call login from here later
    public String loginUser(String email, String password) {
        User u = userRepository.findByEmail(email);
        if (u != null && u.getPassword().equals(password)) {
            return "Successfully Login";
        }
        return "Invalid Credentials";
    }
}