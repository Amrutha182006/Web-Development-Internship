package com.emeralddynasty.backend.service;

import com.emeralddynasty.backend.dto.PaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public Order createOrder(
            PaymentRequest request)
            throws RazorpayException {

        int pricePerPerson = getPricePerPerson(
                request.getSeatingType());

        int totalAmount = pricePerPerson *
                request.getGuests();

        int amountInPaise = totalAmount * 100;

        RazorpayClient client = new RazorpayClient(
                keyId,
                keySecret);

        JSONObject orderRequest = new JSONObject();

        orderRequest.put(
                "amount",
                amountInPaise);

        orderRequest.put(
                "currency",
                "INR");

        orderRequest.put(
                "receipt",
                "receipt_" +
                        System.currentTimeMillis());

        return client.orders
                .create(orderRequest);
    }

    private int getPricePerPerson(String seatingType) {

        return switch (seatingType.toLowerCase()) {

            case "indoor" -> 300;

            case "outdoor" -> 450;

            case "vip" -> 800;

            case "vip_outdoor" -> 1200;

            default ->
                throw new IllegalArgumentException(
                        "Invalid seating type");
        };
    }

}
