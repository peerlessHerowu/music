package com.example.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/***
 * 收藏的javabean
 */
@Data
public class Collect {
    private Long id;
    private String songId;
    private String  singerId;
    private String recordId;
    private String listId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date collectTime;

    private Long lid;
    private Long uid;

}
