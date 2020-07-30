package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


/***
 * 我收藏的歌单
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyCollectList {
    private Long id;
    private String title;
    private String listId;
    private String playNum;
    private String sortName;
    private String imgSrc;
    private String createTime;
    private String createName;
    private Date collectTime;
    private Long uid;

}
