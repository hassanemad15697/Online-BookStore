package com.spring.BooksStrore.service;

import com.spring.BooksStrore.dto.Purchase;
import com.spring.BooksStrore.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeAnOrder(Purchase purchase);


}
