package com.example.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/users/{id}")
    public String getUser(@PathVariable String id) {
        return "User " + id;
    }

    @GetMapping("/users/{id}/orders")
    public String getUserOrders(@PathVariable String id) {
        String orderServiceUrl = "http://order-service/orders?userId=" + id;
        return restTemplate.getForObject(orderServiceUrl, String.class);
    }

}
