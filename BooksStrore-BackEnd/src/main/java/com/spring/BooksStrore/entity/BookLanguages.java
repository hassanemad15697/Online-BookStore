package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "book_language")
@Getter
@Setter
public class BookLanguages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "language_id")
    private int id;

    @Column(name = "language_code")
    private String language_code;

    @Column(name = "language_name")
    private String language_name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "language")
    private Set<Books> books;
}
