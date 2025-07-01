package com.example.CCSpring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // ✅ Create a new course
    public String createCourse(String name, String branch, Long teacherId) {
        Course course = new Course();
        course.setName(name);
        course.setBranch(branch);

        if (teacherId != null) {
            Optional<User> optionalTeacher = userRepo.findById(teacherId);
            if (optionalTeacher.isPresent() && optionalTeacher.get().getRole() == Role.TEACHER) {
                course.setTeacher(optionalTeacher.get());
            } else {
                return "Invalid teacher ID or not a teacher";
            }
        }

        courseRepo.save(course);
        return "Course created successfully";
    }

    // ✅ Get all courses
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    // ✅ Get course by ID
    public Course getCourseById(Long id) {
        return courseRepo.findById(id).orElse(null);
    }

    // ✅ Assign/Update teacher for a course
    public String assignTeacherToCourse(Long courseId, Long teacherId) {
        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        Optional<User> optionalTeacher = userRepo.findById(teacherId);

        if (optionalCourse.isEmpty() || optionalTeacher.isEmpty()) {
            return "Course or teacher not found";
        }

        Course course = optionalCourse.get();
        User teacher = optionalTeacher.get();

        if (teacher.getRole() != Role.TEACHER) {
            return "User is not a teacher";
        }

        course.setTeacher(teacher);
        courseRepo.save(course);
        return "Teacher assigned to course successfully";
    }

    // You can add more methods later like: enrollStudents(), removeCourse(), etc.
}
