package com.spring.BooksStrore.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        //those methods will disabled, and it will make the API in ReadOnly mode
        HttpMethod[] httpMethods = {HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};
        

    }
}
