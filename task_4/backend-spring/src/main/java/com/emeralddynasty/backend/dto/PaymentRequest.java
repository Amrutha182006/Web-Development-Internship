package com.emeralddynasty.backend.dto;

public class PaymentRequest {

    private String seatingType;

    private int guests;

    public String getSeatingType() {
        return seatingType;
    }

    public void setSeatingType(String seatingType) {
        this.seatingType = seatingType;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }
}
