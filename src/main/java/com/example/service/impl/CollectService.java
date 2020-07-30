package com.example.service.impl;

import com.example.dao.CollectDao;
import com.example.entity.Collect;
import com.example.entity.MyList;
import com.example.entity.Song;
import com.example.entity.UserPlayMusic;
import com.example.service.ICollectService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectService implements ICollectService {

    @Autowired
    CollectDao collectDao;
    @Override
    public void saveCollectSong(Collect collect) {
        collectDao.saveCollectSong(collect);
    }

    @Override
    public List<Collect> findSameSong(Collect collect) {
        return collectDao.findSameSong(collect);
    }

    @Override
    public List<Song> findCollectedSong(MyList myList ,int page , int limit) {
        return collectDao.findCollectedSong(myList, new RowBounds(page,limit));
    }

    @Override
    public Integer countCollectedSong(MyList myList) {
        return collectDao.countCollectedSong(myList);
    }

    @Override
    public void deleteCollectSongBySongId(String songId) {
        collectDao.deleteCollectSongBySongId(songId);
    }

    @Override
    public void updateIdBySongId() {
        collectDao.updateIdBySongId();
    }

    @Override
    public List<UserPlayMusic> findCollectSongBySongId(String songId) {
        return collectDao.findCollectSongBySongId(songId);
    }

    @Override
    public Integer increaseNum(Collect collect) {
        return collectDao.increaseNum(collect);
    }
}
