package com.example.service.impl;

import com.example.dao.SongListDao;
import com.example.entity.SongList;
import com.example.service.ISongListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongListService implements ISongListService {

    @Autowired
    SongListDao songListDao;
    @Override
    public List<String> findAll() {
        System.out.println("#####");
        return songListDao.findAll();
    }

    @Override
    public List<SongList> findBySomeId(Long id1, Long id2) {
        List<SongList> songList = songListDao.findBySomeId(id1, id2);
        return songList;
    }

    @Override
    @Cacheable(value = "huayuCache",keyGenerator = "keyGenerator")
    public SongList findById(String listId) {
        System.out.println("listid无");
        return songListDao.findById(listId);
    }
}
