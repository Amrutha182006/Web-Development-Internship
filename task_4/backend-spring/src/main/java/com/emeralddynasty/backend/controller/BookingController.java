package com.emeralddynasty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book-seat")

    public Booking bookSeat(
            @RequestBody Booking booking,
            HttpServletRequest request) {

        return bookingService
                .saveBooking(booking, request);
    }

    @GetMapping("/my-bookings")

    public List<Booking> getMyBookings(
            HttpServletRequest request) {

        return bookingService
                .getMyBookings(request);
    }

    @DeleteMapping("/cancel/{id}")

    public void cancelBooking(
            @PathVariable Long id) {

        bookingService.cancelBooking(id);
    }
}
