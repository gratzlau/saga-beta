package org.saga.restdemo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;





@SpringBootApplication
@ServletComponentScan
@ComponentScan(basePackages = "org.saga")
@EnableTransactionManagement
@MapperScan("org.saga.**.mapper")
public class RestFulApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(RestFulApplication.class, args);
		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
			System.out.println("shutdown");
		}));
	}
}

