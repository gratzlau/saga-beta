package com.neo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.builder.SpringApplicationBuilder;
//import org.springframework.boot.web.support.SpringBootServletInitializer;


@SpringBootApplication
//public class JpaThymeleafApplication extends SpringBootServletInitializer {
public class JpaThymeleafApplication {
    /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(JpaThymeleafApplication.class);
    }*/

    public static void main(String[] args) throws Exception {
        SpringApplication.run(JpaThymeleafApplication.class, args);
    }
}
