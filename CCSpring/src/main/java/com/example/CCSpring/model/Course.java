package com.example.CCSpring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Course {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// Course name (e.g., "DBMS", "OOP")
@Column(nullable = false)
private String name;

// Associated branch (e.g., "CSE", "IT", etc.)
@Column(nullable = false)
private String branch;

// Assigned teacher (optional, can be null = "Not yet appointed")
@ManyToOne
@JoinColumn(name = "teacher_id")
private User teacher;

// No-arg constructor required by JPA
public Course() {}

// Getters and setters
public Long getId() {
    return id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getBranch() {
    return branch;
}

public void setBranch(String branch) {
    this.branch = branch;
}

public User getTeacher() {
    return teacher;
}

public void setTeacher(User teacher) {
    this.teacher = teacher;
}
}