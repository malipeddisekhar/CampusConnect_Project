package com.example.CCSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.User;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // Optional: find all courses by branch
    List<Course> findByBranch(String branch);

    // Optional: find all courses assigned to a specific teacher
    List<Course> findByTeacher(User teacher);

    // Optional: find courses with no teacher assigned
    List<Course> findByTeacherIsNull();
}
