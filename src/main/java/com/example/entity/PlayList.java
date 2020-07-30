package com.example.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/***
 * 所有歌单的JavaBean
 */
@Data
public class PlayList implements Serializable {
    private Long id;
    private  String playNum;
    private  String sortName;
    private  String listId;
    private  String imgSrc;
    private  String  title;
    private  String createName;
    private  String createTime;
    private  String songId;
    private  String  songTitle;
    private Date created;
    private Date updated;

}
