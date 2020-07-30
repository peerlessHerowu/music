package com.example.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class SongList  implements Serializable {

    private Long id;

    private String sortName;

    private String playNum;
    private String listId;
    private String imgSrc;

    private String title;

    private String createName;

    private String createTime;

    private String songId;

    private String songTitle;

    public Date created;

    public Date updated;

    public SongList(){}
}
