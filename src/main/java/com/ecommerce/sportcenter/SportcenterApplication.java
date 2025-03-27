package com.ecommerce.sportcenter;

import com.ecommerce.sportcenter.entity.Product;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

@SpringBootApplication
//@EntityScan("com.ecommerce.sportcenter.entity")
//@EnableJpaRepositories("com.ecommerce.sportcenter.repository")
public class SportcenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportcenterApplication.class, args);
	}


}


