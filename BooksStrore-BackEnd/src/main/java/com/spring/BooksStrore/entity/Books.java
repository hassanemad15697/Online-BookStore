package com.spring.BooksStrore.entity;


import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table
@Data
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long book_id;
    @Column(name = "title")
    private String title;
    @Column(name = "isbn13")
    private String isbn13;
    @Column(name = "language_id")
    private int language_id;
    @Column(name = "num_pages")
    private int num_pages;
    @Column(name = "publication_date")
    private Date publication_date;
    @Column(name = "publisher_id")
    private int publisher_id;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "discount")
    private Double discount;
    @Column(name = "description")
    private String description;
    @Column(name = "image_url")
    private String image_url;
}
