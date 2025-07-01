package com.example.CCSpring.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(length = 1000)
    private String message;

    private String targetAudience; // "STUDENT", "TEACHER", "ALL"

    private LocalDateTime createdAt;

    // @ManyToOne
    // @JoinColumn(name = "admin_id")
    // private User admin;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    public Notification() {
        this.createdAt = LocalDateTime.now(); // default time
    }

    // Getters & Setters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTargetAudience() {
        return this.targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // public User getAdmin() {
    //     return this.admin;
    // }
    // public void setAdmin(User admin) {
    //     this.admin = admin;
    // }
    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

}
