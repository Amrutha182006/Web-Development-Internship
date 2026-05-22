package com.emeralddynasty.backend.controller;

import com.emeralddynasty.backend.dto.LoginRequest;
import com.emeralddynasty.backend.security.JwtUtil;
// import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

@CrossOrigin(origins = "http://127.0.0.1:5500")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

      
                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        String token =
                JwtUtil.generateToken(request.getEmail());

        return ResponseEntity.ok(
                java.util.Map.of("token", token)
        );
    }
}
