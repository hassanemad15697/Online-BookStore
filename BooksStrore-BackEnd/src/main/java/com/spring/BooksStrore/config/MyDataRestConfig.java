package com.spring.BooksStrore.config;

import com.spring.BooksStrore.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        //those methods will disabled, and it will make the API in ReadOnly mode
        HttpMethod[] unsupportedActions = {HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.POST};

        //this block of code will disable those HTTP Methods for books API
        blockMethodsForEntity(Books.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for BookCategory API
        blockMethodsForEntity(BookCategory.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for BookLanguages API
        blockMethodsForEntity(BookLanguages.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for City API
        blockMethodsForEntity(City.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for Country API
        blockMethodsForEntity(Country.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for State API
        blockMethodsForEntity(State.class,unsupportedActions,config);
        //this block of code will disable those HTTP Methods for Publisher API
        blockMethodsForEntity(Publisher.class,unsupportedActions,config);

        // method to expose the entity ids
        exposeIds(config);
    }

    private void blockMethodsForEntity(Class theClass,HttpMethod[] unsupportedActions ,RepositoryRestConfiguration config){
        config.getExposureConfiguration().forDomainType(theClass).
                withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)).
                withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        for (EntityType temp :
                entities) {
            entityClasses.add(temp.getJavaType());
        }

        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
