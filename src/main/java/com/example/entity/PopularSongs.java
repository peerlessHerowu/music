package com.example.entity;

import lombok.Data;

/***
 * 推荐歌手的JavaBean
 */
@Data
public class PopularSongs {
    private  Long id;
    private String singerId;
    private String singerName;
    private String songId;
    private String songTitle;
    private String  recordId;
    private String recordName;

}
