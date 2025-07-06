package com.example.CCSpring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CCSpring.dto.CourseWithStudentCountDTO;
import com.example.CCSpring.dto.StudentInfoDTO;
import com.example.CCSpring.model.Course;
import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;
import com.example.CCSpring.repository.CourseRepository;
import com.example.CCSpring.repository.UserRepository;
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    public Course createCourse(String name, String branch) {
        Course course = new Course();
        course.setName(name);
        course.setBranch(branch);
        return courseRepo.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public boolean assignTeacher(Long courseId, Long teacherId) {
        Course course = courseRepo.findById(courseId).orElse(null);
        User teacher = userRepo.findById(teacherId).orElse(null);

        if (course == null || teacher == null || teacher.getRole() != Role.TEACHER)
            return false;

        course.setTeacher(teacher);
        courseRepo.save(course);
        return true;
    }

    public boolean deleteCourse(Long id) {
        Course course = courseRepo.findById(id).orElse(null);
        if (course == null)
            return false;

        courseRepo.delete(course);
        return true;
    }

    public Course getCourseByTeacherId(Long teacherId) {
        return courseRepo.findByTeacherId(teacherId);
    }

    public List<CourseWithStudentCountDTO> getAllCourseSummaries() {
        List<Course> courses = courseRepo.findAll();

        return courses.stream().map(course -> {
            int studentCount = (course.getEnrollments() != null) ? course.getEnrollments().size() : 0;
            String teacherName = (course.getTeacher() != null) ? course.getTeacher().getName() : "Not yet appointed";

            return new CourseWithStudentCountDTO(
                    course.getId(),
                    course.getName(),
                    course.getBranch(),
                    teacherName,
                    studentCount);
        }).toList();
    }
    // Add this in CourseService.java

    public List<StudentInfoDTO> getEnrolledStudentsForCourse(Long courseId) {
        Course course = courseRepo.findById(courseId).orElse(null);
        if (course == null)
            return List.of();

        return course.getEnrollments().stream()
                .map(cs -> new StudentInfoDTO(
                        cs.getStudent().getId(),
                        cs.getStudent().getName(),
                        cs.getStudent().getEmail()))
                .collect(Collectors.toList());
    }

}
