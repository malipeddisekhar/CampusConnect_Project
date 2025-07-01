package com.example.CCSpring.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CCSpring.model.Notification;
import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.NotificationRepository;
import com.example.CCSpring.repository.UserRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private UserRepository userRepo;

    // public String createNotification(Notification notification, Long adminId) {
    //     User admin = userRepo.findById(adminId).orElse(null);
    public String createNotification(Notification notification, Long senderId) {
        User sender = userRepo.findById(senderId).orElse(null);
        // if (admin == null || admin.getRole() != Role.ADMIN) {
        //     return "Invalid admin ID or not authorized";
        // }

        if (sender == null || !(sender.getRole() == Role.ADMIN || sender.getRole() == Role.TEACHER)) {
            return "Invalid sender ID or not authorized";
        }
        // notification.setAdmin(admin);
        // notification.setCreatedAt(LocalDateTime.now());
        notification.setSender(sender);
        notification.setCreatedAt(LocalDateTime.now());
        try {
            notificationRepo.save(notification);
            return "Notification sent successfully";
        } catch (Exception e) {
            return "Failed to save notification: " + e.getMessage();
        }
    }

    public List<Notification> getNotificationsForRole(String role) {
        return notificationRepo.findByTargetAudienceInOrderByCreatedAtDesc(
                List.of("ALL", role.toUpperCase())
        );
    }
}
