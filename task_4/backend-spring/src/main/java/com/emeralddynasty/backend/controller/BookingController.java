package com.emeralddynasty.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import com.emeralddynasty.backend.entity.Booking;
// import com.emeralddynasty.backend.security.JwtUtil;
import com.emeralddynasty.backend.service.BookingService;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;


  @PostMapping("/book-seat")

public Booking bookSeat(
        @RequestBody Booking booking,
        HttpServletRequest request
) {

    return bookingService
            .saveBooking(booking, request);
}

    @GetMapping("/test")
    public String test() {

        return "Booking Controller Working";

    }

}
