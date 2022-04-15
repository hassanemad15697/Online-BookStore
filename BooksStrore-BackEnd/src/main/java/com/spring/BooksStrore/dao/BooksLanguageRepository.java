package com.spring.BooksStrore.dao;

import com.spring.BooksStrore.entity.BookCategory;
import com.spring.BooksStrore.entity.BookLanguages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(collectionResourceRel = "bookslanguage",path = "bookslanguage")
public interface BooksLanguageRepository extends JpaRepository<BookLanguages,Integer> {
}