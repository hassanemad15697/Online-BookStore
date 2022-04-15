package com.spring.BooksStrore.entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "books")
@Getter
@Setter
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private BookCategory category;

    @ManyToOne
    @JoinColumn(name = "language_id",nullable = false)
    private BookLanguages language;

    @ManyToOne
    @JoinColumn(name = "publisher_id",nullable = false)
    private Publisher publisher;

    @Column(name = "title")
    private String title;

    @Column(name = "isbn13")
    private String isbn13;


    @Column(name = "num_pages")
    private int num_pages;

    @Column(name = "publication_date")
    private Date publication_date;


    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String image_url;
}
