// src/main/java/com/example/CCSpring/dto/StudentInfoDTO.java
package com.example.CCSpring.dto;

public class StudentInfoDTO {
    private Long id;
    private String name;
    private String email;

    public StudentInfoDTO(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
