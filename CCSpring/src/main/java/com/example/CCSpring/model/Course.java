package com.example.CCSpring.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String branch;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

    // @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    // @JsonManagedReference
    // private List<CourseStudent> enrollments = new ArrayList<>();
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // prevents recursion issues for now
    private List<CourseStudent> enrollments = new ArrayList<>();

    public Course() {
    }

    // Getters and Setters

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

    public List<CourseStudent> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<CourseStudent> enrollments) {
        this.enrollments = enrollments;
    }
}
