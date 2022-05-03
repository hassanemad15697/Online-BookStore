package com.spring.BooksStrore.dto;

import com.spring.BooksStrore.entity.Address;
import com.spring.BooksStrore.entity.Customer;
import com.spring.BooksStrore.entity.OrderItem;
import com.spring.BooksStrore.entity.Orders;
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
