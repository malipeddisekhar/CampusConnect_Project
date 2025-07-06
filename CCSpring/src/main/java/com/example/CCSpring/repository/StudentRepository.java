package com.example.CCSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUserId(Long userId);
}