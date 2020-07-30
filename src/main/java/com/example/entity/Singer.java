package com.example.entity;

import lombok.Data;

@Data
public class Singer {

    private Long id;
    private String singerId;
    private String title;
    private String intro;
    private String imgSrc;
}
