package com.emeralddynasty.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.emeralddynasty.entity.Booking;
import com.emeralddynasty.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book-seat")
    public Booking bookSeat(@RequestBody Booking booking) {

        return bookingService.saveBooking(booking);

    }

}