package com.emeralddynasty.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emeralddynasty.backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByEmail(String email);

    List<Booking> findByDateAndTimeSlotAndSeatingType(

            String date,
            String timeSlot,
            String seatingType);
}
