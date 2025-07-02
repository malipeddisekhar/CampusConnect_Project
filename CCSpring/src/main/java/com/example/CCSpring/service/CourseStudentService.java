package com.example.CCSpring.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.CourseStudent;
import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.CourseRepository;
import com.example.CCSpring.repository.CourseStudentRepository;
import com.example.CCSpring.repository.UserRepository;

@Service
public class CourseStudentService {

    @Autowired
    private CourseStudentRepository courseStudentRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    public boolean enrollStudentToCourse(Long courseId, Long studentId) {
        Course course = courseRepo.findById(courseId).orElse(null);
        User student = userRepo.findById(studentId).orElse(null);

        if (course == null || student == null || student.getRole() != Role.STUDENT) return false;

        CourseStudent existing = courseStudentRepo.findByCourseIdAndStudentId(courseId, studentId);
        if (existing != null) return false;

        CourseStudent enrollment = new CourseStudent();
        enrollment.setCourse(course);
        enrollment.setStudent(student);
        enrollment.setEnrolledDate(LocalDate.now());

        courseStudentRepo.save(enrollment);
        return true;
    }

    public List<Course> getCoursesByStudentId(Long studentId) {
        List<CourseStudent> enrollments = courseStudentRepo.findByStudent_Id(studentId);
        return enrollments.stream().map(CourseStudent::getCourse).collect(Collectors.toList());
    }

    public List<User> getStudentsByCourse(Long courseId) {
        List<CourseStudent> enrollments = courseStudentRepo.findByCourse_Id(courseId);
        return enrollments.stream().map(CourseStudent::getStudent).collect(Collectors.toList());
    }
}
