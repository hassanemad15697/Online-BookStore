package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "publisher")
@Setter
@Getter
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisher_id")
    private int id;

    @Column(name = "publisher_name")
    private String publisher_name;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "publisher")
    private Set<Books> books;
}
