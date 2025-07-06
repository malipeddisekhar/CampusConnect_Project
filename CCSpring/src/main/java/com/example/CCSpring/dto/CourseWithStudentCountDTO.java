package com.example.CCSpring.dto;

public class CourseWithStudentCountDTO {
    private Long id;
    private String name;
    private String branch;
    private String teacherName;
    private int studentCount;

    public CourseWithStudentCountDTO(Long id, String name, String branch, String teacherName, int studentCount) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.teacherName = teacherName;
        this.studentCount = studentCount;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBranch() {
        return branch;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public int getStudentCount() {
        return studentCount;
    }
}
