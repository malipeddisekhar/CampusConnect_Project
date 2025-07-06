// package com.example.CCSpring.repository;

// import java.util.List;
// import org.springframework.data.jpa.repository.JpaRepository;
// import com.example.CCSpring.model.CourseStudent;

// public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
// CourseStudent findByCourseIdAndStudentId(Long courseId, Long studentId);
// List<CourseStudent> findByCourse_Id(Long courseId);
// List<CourseStudent> findByStudent_Id(Long studentId);
// }
package com.example.CCSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.CourseStudent;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    CourseStudent findByCourseIdAndStudentId(Long courseId, Long studentId);

    List<CourseStudent> findByCourse_Id(Long courseId);

    List<CourseStudent> findByStudent_Id(Long studentId);
}