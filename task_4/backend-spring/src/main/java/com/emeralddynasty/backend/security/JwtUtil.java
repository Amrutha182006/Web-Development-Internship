package com.emeralddynasty.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

@Component
public class JwtUtil {

        private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(
                        "thisisaverysecuresecretkeythisisaverysecuresecretkey"
                                        .getBytes());

        public static String generateToken(String email) {

                return Jwts.builder()
                                .setSubject(email)
                                .setIssuedAt(new Date())
                                .setExpiration(
                                                new Date(
                                                                System.currentTimeMillis()
                                                                                + 86400000 ))
                                .signWith(SECRET_KEY)
                                .compact();
        }

        public String extractEmail(String token) {

                try {

                        return Jwts
                                        .parserBuilder()
                                        .setSigningKey(SECRET_KEY)
                                        .build()
                                        .parseClaimsJws(token)
                                        .getBody()
                                        .getSubject();

                } catch (ExpiredJwtException e) {

                        System.out.println("Token expired");

                        return null;

                } catch (JwtException e) {

                        System.out.println("Invalid token");

                        return null;
                }
        }
}