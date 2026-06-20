package com.emeralddynasty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/check-availability")
    public boolean checkAvailability(
            @RequestBody Booking booking) {

        return bookingService
                .isAvailable(booking);
    }

    @PostMapping("/book-seat")
    public ResponseEntity<?> bookSeat(
            @RequestBody Booking booking,
            HttpServletRequest request) {

        try {

            Booking saved = bookingService.saveBooking(booking, request);

            return ResponseEntity.ok(saved);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Token expired");
        }
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<?> getMyBookings(
            HttpServletRequest request) {

        try {

            List<Booking> bookings = bookingService.getMyBookings(request);

            return ResponseEntity.ok(bookings);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Token expired");
        }
    }

    @DeleteMapping("/cancel/{id}")

    public void cancelBooking(
            @PathVariable @NonNull Long id) {

        bookingService.cancelBooking(id);
    }
}
