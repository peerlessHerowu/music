package com.example.service.impl;

import com.example.dao.SongWordDao;
import com.example.entity.SongWord;
import com.example.service.ISongWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongWordService implements ISongWordService {


    @Autowired
    SongWordDao songWordDao;
    @Override
    public SongWord findWordBySongId(String songId) {
        return songWordDao.findWordBySongId(songId);
    }
}
