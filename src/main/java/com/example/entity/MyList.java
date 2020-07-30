package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



/**
 * 我的歌单
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyList {
    private Long id;
    private String listName;
    private Integer songNum;
    private String created;
    private Long uid;


}
