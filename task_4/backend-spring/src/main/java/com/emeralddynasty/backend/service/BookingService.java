package com.emeralddynasty.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.repository.BookingRepository;
import com.emeralddynasty.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Booking saveBooking(Booking booking, HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        String token = authHeader.substring(7);

        String email = jwtUtil.extractEmail(token);

        booking.setEmail(email);

        return bookingRepository.save(booking);

    }

}