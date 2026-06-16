package com.emeralddynasty.backend.controller;
import com.razorpay.Order;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emeralddynasty.backend.dto.PaymentRequest;
import com.emeralddynasty.backend.service.PaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public String createOrder(
            @RequestBody PaymentRequest request)
            throws RazorpayException {

        Order order = paymentService
                .createOrder(request);

        return order.toString();
    } 

}