package com.spring.BooksStrore.dto;

import com.spring.BooksStrore.entity.*;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Orders order;
    private Set<OrderItem> orderItems;
}
