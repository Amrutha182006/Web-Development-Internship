package com.emeralddynasty.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book-seat")
    public Booking bookSeat(@RequestBody Booking booking) {

        return bookingService.saveBooking(booking);

    }

    @GetMapping("/test")
    public String test() {

        return "Booking Controller Working";

    }

}
