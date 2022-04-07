package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.sql.Delete;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "book_category")
@Setter
@Getter
public class BookCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int id;

    @Column(name = "category_name")
    private String category_name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
    private Set<Books> books;
}
