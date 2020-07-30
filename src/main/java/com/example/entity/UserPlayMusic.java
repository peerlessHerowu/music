package com.example.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class UserPlayMusic {
    private Long id;
    private String songId;
    private String playTime;
    private Long uid;

}
