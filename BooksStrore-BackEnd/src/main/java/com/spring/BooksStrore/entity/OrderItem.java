package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity")
    private int 	quantity;


    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;


    @OneToOne
    @JoinColumn(name = "book_id",referencedColumnName = "id")
    private Books books = new Books();


}
