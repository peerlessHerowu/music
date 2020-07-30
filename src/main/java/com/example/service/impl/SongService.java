package com.example.service.impl;

import com.example.dao.SongDao;
import com.example.entity.Song;
import com.example.service.ISongService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService implements ISongService {

    @Autowired
    SongDao songDao;
    @Override
    public List<Song> findByKey(String songName,int page,int limit) {
        return songDao.findByKey(songName,new RowBounds(page,limit));
    }

    @Override
    public Integer countByKey(String songName) {
        return songDao.countByKey(songName);
    }

    @Override
    public List<Song> findBySingerKey(String singerName,int page,int limit) {
        return songDao.findBySingerKey(singerName,new RowBounds(page,limit));
    }

    @Override
    public Integer countBySingerKey(String singerName) {
        return songDao.countBySingerKey(singerName);
    }

    @Override
    public List<Song> findByRecordKey(String recordName, int page, int limit) {
        return songDao.findByRecordKey(recordName,new RowBounds(page,limit));
    }

    @Override
    public Integer countByRecordKey(String recordName) {
        return songDao.countByRecordKey(recordName);
    }

    @Override
    public List<Song> findBysongId(List<String> songIds, int page, int limit) {
        return songDao.findBysongId(songIds,new RowBounds(page,limit));
    }
}
