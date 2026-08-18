package com.taskmanagement.controller;

import com.taskmanagement.entity.User;
import com.taskmanagement.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setRole("USER");

        User savedUser = userRepository.save(user);

        // Don't return password
        savedUser.setPassword(null);

        return ResponseEntity.ok(savedUser);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        return userRepository.findByEmail(user.getEmail())

                .map(existingUser -> {

                    if (passwordEncoder.matches(
                            user.getPassword(),
                            existingUser.getPassword())) {

                        // Don't return password
                        existingUser.setPassword(null);

                        return ResponseEntity.ok(existingUser);
                    }

                    return ResponseEntity.badRequest()
                            .body("Invalid email or password");
                })

                .orElse(
                        ResponseEntity.badRequest()
                                .body("Invalid email or password")
                );
    }
}