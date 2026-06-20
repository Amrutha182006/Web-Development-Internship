package com.emeralddynasty.backend.controller;
import com.emeralddynasty.backend.entity.Role;
import com.emeralddynasty.backend.dto.LoginRequest;
import com.emeralddynasty.backend.security.JwtUtil;
// import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import com.emeralddynasty.backend.dto.SignupRequest;
import com.emeralddynasty.backend.entity.User;
import com.emeralddynasty.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/auth")

@CrossOrigin(origins = "http://127.0.0.1:5500")

public class AuthController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @PostMapping("/signup")

        public ResponseEntity<?> signup(
                        @RequestBody SignupRequest request) {

                // CHECK EMAIL EXISTS
                if (userRepository.findByEmail(
                                request.getEmail()).isPresent()) {

                        return ResponseEntity
                                        .badRequest()
                                        .body("Email already exists");
                }

                User user = new User();

                user.setName(request.getName());

                user.setEmail(request.getEmail());

                // HASH PASSWORD
                user.setPassword(
                                passwordEncoder.encode(
                                                request.getPassword()));

                user.setRole(Role.USER);                                

                userRepository.save(user);

                return ResponseEntity.ok(
                                "Signup Successful");
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(
                        @RequestBody LoginRequest request) {

                authenticationManager.authenticate(

                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                String token = JwtUtil.generateToken(request.getEmail());

                return ResponseEntity.ok(
                                java.util.Map.of("token", token));
        }
}
