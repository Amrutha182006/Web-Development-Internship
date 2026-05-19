package com.emeralddynasty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.emeralddynasty.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}