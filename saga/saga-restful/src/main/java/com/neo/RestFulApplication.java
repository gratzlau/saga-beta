package com.neo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;





@SpringBootApplication
public class RestFulApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(RestFulApplication.class, args);
		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
			System.out.println("shutdown");
		}));
	}
}

