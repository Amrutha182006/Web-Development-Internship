package com.emeralddynasty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.enums.BookingStatus;
import com.emeralddynasty.backend.repository.BookingRepository;

@RestController
@RequestMapping("/admin")

@CrossOrigin(origins = "http://127.0.0.1:5500")

public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    @PutMapping("/complete/{id}")
    public void completeBooking(
            @PathVariable Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow();

        booking.setStatus(
                BookingStatus.COMPLETED);

        bookingRepository.save(
                booking);
    }
}