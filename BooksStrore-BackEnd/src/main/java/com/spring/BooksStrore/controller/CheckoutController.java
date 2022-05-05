package com.spring.BooksStrore.controller;

import com.spring.BooksStrore.dto.Purchase;
import com.spring.BooksStrore.dto.PurchaseResponse;
import com.spring.BooksStrore.entity.OrderItem;
import com.spring.BooksStrore.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

   private CheckoutService checkoutService;
    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }


    @PostMapping("/purchase")
    public PurchaseResponse purchase(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeAnOrder(purchase);
        return purchaseResponse;
    }
}
