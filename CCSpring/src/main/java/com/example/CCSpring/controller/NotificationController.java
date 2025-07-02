package com.example.CCSpring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CCSpring.model.Notification;
import com.example.CCSpring.service.NotificationService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/notifications")
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

// ✅ Admin sends notification
    // @PostMapping("/send")
    // public ResponseEntity<String> sendNotification(@RequestBody Notification notification, HttpSession session) {
    //     Object userId = session.getAttribute("LoggedInUser");
    //     if (userId == null) {
    //         return ResponseEntity.status(401).body("Unauthorized: Admin not logged in");
    //     }
    //     Long adminId = Long.valueOf(userId.toString());
    //     if (notification.getTitle() == null || notification.getMessage() == null || notification.getTargetAudience() == null) {
    //         return ResponseEntity.badRequest().body("Missing required fields");
    //     }
    //     String result = notificationService.createNotification(notification, adminId);
    //     if (!result.equals("Notification sent successfully")) {
    //         return ResponseEntity.status(400).body(result);
    //     }
    //     return ResponseEntity.ok(result);
    // }
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody Notification notification, HttpSession session) {
        Object userId = session.getAttribute("LoggedInUser");
        System.out.println("Session User ID: " + userId); // ✅ Log session ID

        System.out.println("Notification: " + notification);

        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized: Admin not logged in");
        }

        Long adminId = Long.valueOf(userId.toString());

        if (notification.getTitle() == null || notification.getMessage() == null || notification.getTargetAudience() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        String result = notificationService.createNotification(notification, adminId);
        System.out.println("Service Response: " + result);

        if (!result.equals("Notification sent successfully")) {
            return ResponseEntity.status(400).body(result);
        }

        return ResponseEntity.ok(result);
    }

// ✅ Teachers and Students get relevant notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam String role) {
        List<Notification> list = notificationService.getNotificationsForRole(role.toUpperCase());
        return ResponseEntity.ok(list);
    }
}
