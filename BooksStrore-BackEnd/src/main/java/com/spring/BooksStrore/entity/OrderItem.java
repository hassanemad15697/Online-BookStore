package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "id")
    private Long id;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "quantity")
    private int 	quantity;

    @Column(name = "price")
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id",referencedColumnName = "id")
    private Books books;

}
