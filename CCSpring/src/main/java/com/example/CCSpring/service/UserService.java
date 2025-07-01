package com.example.CCSpring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Registration logic
    public String registerUser(User u) {
        User existing = userRepository.findByEmail(u.getEmail());

        if (existing != null) {
            return "Email already exists";
        }

        if (u.getRole() == null) {
            u.setRole(Role.STUDENT); // default role
        }

        userRepository.save(u);
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
