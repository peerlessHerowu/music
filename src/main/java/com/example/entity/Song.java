package com.example.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class Song {
    private Long id;
    private String singerId;
    private String songId;
    private String singerName;
    private String comment_Thread_Un;
    private String mp3Url;
    private String songTitle;
    private String recordId;
    private String recordName;
    private Date created;
    private Date updated;

}
