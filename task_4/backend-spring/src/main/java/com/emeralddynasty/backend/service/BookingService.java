package com.emeralddynasty.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.emeralddynasty.backend.entity.Booking;
import com.emeralddynasty.backend.enums.BookingStatus;
import com.emeralddynasty.backend.repository.BookingRepository;
import com.emeralddynasty.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public boolean isAvailable(
            Booking booking) {

        List<Booking> bookings = bookingRepository
                .findByDateAndTimeSlotAndSeatingType(

                        booking.getDate(),
                        booking.getTimeSlot(),
                        booking.getSeatingType());

        return bookings.size() < 5;
    }

    public Booking saveBooking(Booking booking, HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        String token = authHeader.substring(7);

        String email = jwtUtil.extractEmail(token);

        booking.setEmail(email);

        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);

    }

    public List<Booking> getMyBookings(
        HttpServletRequest request) {

    String authHeader =
            request.getHeader(
                    "Authorization");

    String token =
            authHeader.substring(7);

    String email =
            jwtUtil.extractEmail(token);

    List<Booking> bookings =
            bookingRepository
                    .findByEmailOrderByDateDesc(email);

    LocalDate today =
            LocalDate.now();

    for (Booking booking : bookings) {

        LocalDate bookingDate =
                LocalDate.parse(
                        booking.getDate()
                );

        if (booking.getStatus()
                    == BookingStatus.CONFIRMED
            &&
            bookingDate.isBefore(
                    today)) {

            booking.setStatus(
                    BookingStatus.COMPLETED
            );

            bookingRepository.save(
                    booking
            );
        }       
    }

    return bookings;
}

    public void cancelBooking(
            @NonNull Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);

        bookingRepository.save(
                booking);
    }

}