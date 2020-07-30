package com.example.service;

import com.example.entity.SongWord;
import org.springframework.stereotype.Service;

@Service
public interface ISongWordService {
    public SongWord  findWordBySongId(String songId);

}
