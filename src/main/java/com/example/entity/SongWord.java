package com.example.entity;

import lombok.Data;

@Data
public class SongWord {

    private Long id;
    private String songId;
    private String lyric;
    private String tlyric;
}
