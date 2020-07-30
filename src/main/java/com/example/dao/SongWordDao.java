package com.example.dao;

import com.example.entity.SongWord;
import org.springframework.stereotype.Repository;

@Repository
public interface SongWordDao {
    public SongWord  findWordBySongId(String songId);
}
