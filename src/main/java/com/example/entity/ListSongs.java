package com.example.entity;

import lombok.Data;

import javax.print.attribute.standard.DateTimeAtCompleted;
import java.util.Date;

/***
 * 推荐歌单的JavaBean
 */
@Data
public class ListSongs {
    private Long id;
    private String listId;
    private String songId;
    private String songTitle;
    private String mp3Url;
    private String singerId;
    private String singerName;
    private String recordId;
    private String recordName;


}
