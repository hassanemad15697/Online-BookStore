package com.spring.BooksStrore.dao;

import com.spring.BooksStrore.entity.City;
import com.spring.BooksStrore.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200/")
public interface CityRepository extends JpaRepository<City,Integer> {
    List<City> findByStateId(@Param("state_id") int state_id);
}
