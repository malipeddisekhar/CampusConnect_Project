package com.example.CCSpring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired; // ✅ Use your own Role enum
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.UserRepository;
import com.example.CCSpring.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<?> doRegister(@RequestBody User u) {
        String result = userService.registerUser(u);

        if (result.equals("Registration Successful")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> doLogin(@RequestBody User u, HttpSession session) {
        User existingUser = userRepository.findByEmail(u.getEmail());

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Email not found"));
        }

        if (!existingUser.getPassword().equals(u.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid password"));
        }

        // session.setAttribute("user", existingUser); // Store in session
        session.setAttribute("LoggedInUser", existingUser.getId()); // ✅ this is Long
        System.out.println("Session user ID stored: " + session.getAttribute("LoggedInUser"));

        Map<String, String> res = new HashMap<>();
        res.put("message", "Login Success");
        res.put("role", existingUser.getRole().toString().toLowerCase()); // e.g. "student"
        res.put("email", existingUser.getEmail());
        res.put("name", existingUser.getName());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/teachers")
    public List<User> getAllTeachers() {
        return userRepository.findByRole(Role.TEACHER);
    }
    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userRepository.findByRole(Role.STUDENT);
    }

}
