package com.example.CCSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // List<Notification> findByTargetAudienceInOrderByCreatedAtDesc(List<String> audiences);
    List<Notification> findByTargetAudienceInOrderByCreatedAtDesc(List<String> audience);

}
