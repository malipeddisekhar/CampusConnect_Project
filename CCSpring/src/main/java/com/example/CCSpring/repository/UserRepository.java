package com.example.CCSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CCSpring.model.Role;
import com.example.CCSpring.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByRole(Role teacher);
}


