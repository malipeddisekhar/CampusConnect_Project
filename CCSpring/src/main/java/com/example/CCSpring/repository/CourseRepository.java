package com.example.CCSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.User;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTeacher(User teacher);
    List<Course> findByTeacherIsNull();
    Course findByTeacherId(Long teacherId);
}
