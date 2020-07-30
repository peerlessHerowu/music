package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carousel {
    private Long id;
    private String slideShowUrl;
    public Date created;
    public Date updated;

}

