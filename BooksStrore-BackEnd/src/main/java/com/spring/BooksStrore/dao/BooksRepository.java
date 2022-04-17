package com.spring.BooksStrore.dao;

import com.spring.BooksStrore.entity.Books;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(collectionResourceRel = "books",path = "books")
public interface BooksRepository extends JpaRepository<Books,Long> {

    Page<Books> findByCategoryId(@RequestParam("id") int id, Pageable pageable);

    Page<Books> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Books> findByOrderByPublicationDateDesc( Pageable pageable);
    Page<Books> findByOrderByDiscountDesc( Pageable pageable);
}
