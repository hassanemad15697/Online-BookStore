package com.spring.BooksStrore.dao;


import com.spring.BooksStrore.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
public interface OrderRepository extends JpaRepository<Orders,Long> {
}
