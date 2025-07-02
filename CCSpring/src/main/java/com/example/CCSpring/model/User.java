package com.example.CCSpring.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user") // using 'user' as table name; change if needed
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Enum: ADMIN, TEACHER, STUDENT

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<CourseStudent> enrollments;

    // No-argument constructor (required by JPA)
    public User() {
    }

    // Getters and Setters

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // public List<Course> getCourses() {
    // return courses;
    // }
    public List<CourseStudent> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<CourseStudent> enrollments) {
        this.enrollments = enrollments;
    }

}
