package com.spring.BooksStrore.service;

import com.spring.BooksStrore.dao.CustomerRepository;
import com.spring.BooksStrore.dto.Purchase;
import com.spring.BooksStrore.dto.PurchaseResponse;
import com.spring.BooksStrore.entity.Customer;
import com.spring.BooksStrore.entity.OrderItem;
import com.spring.BooksStrore.entity.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;


@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeAnOrder(Purchase purchase) {
        //retrieve the order info from dto
        Orders order = purchase.getOrder();
        //generate tracking number
        String orderTRackingNumber = generateOrderTrackingNumber();
        order.setOrder_tracking_number(orderTRackingNumber);
        //populate order with orderItem
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        //populate order with billing and shipping address
        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());
        //populate order with customer
        Customer customer = purchase.getCustomer();
        customer.add(order);
        //save to the database
        customerRepository.save(customer);
        //return response
        return new PurchaseResponse(orderTRackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
