package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@MapperScan("com.example.dao")
@ServletComponentScan
@EnableTransactionManagement(proxyTargetClass = true)
public class MyMusicApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyMusicApplication.class, args);
    }

}
