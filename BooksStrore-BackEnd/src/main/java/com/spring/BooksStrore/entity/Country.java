package com.spring.BooksStrore.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "shortname")
    private String shortname;

    @Column(name = "name")
    private String name;

    @Column(name = "phonecode")
    private int phonecode;

    @OneToMany(mappedBy = "country")
    List<State> states;
}
