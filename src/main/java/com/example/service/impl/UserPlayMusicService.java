package com.example.service.impl;

import com.example.dao.UserPlayMusicDao;
import com.example.entity.MyCollectList;
import com.example.entity.MyList;
import com.example.entity.Song;
import com.example.entity.UserPlayMusic;
import com.example.service.IUserPlayMusicService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserPlayMusicService implements IUserPlayMusicService {

    @Autowired
    UserPlayMusicDao userPlayMusicDao;
    @Override
    public void saveRecentPlayMusicBySongId(UserPlayMusic userPlayMusic) {
        userPlayMusicDao.saveRecentPlayMusicBySongId(userPlayMusic);
    }

    @Override
    public List<UserPlayMusic> findPlayedBySongId(UserPlayMusic userPlayMusic) {
        return userPlayMusicDao.findPlayedBySongId(userPlayMusic);
    }

    @Override
    public List<UserPlayMusic> findOnePlayedBySongId(String songId) {
        return userPlayMusicDao.findOnePlayedBySongId(songId);
    }

    @Override
    public void deleteSameBySongId(String songId) {
        userPlayMusicDao.deleteSameBySongId(songId);
    }

    @Override
    public void updateIdBySongId() {
        userPlayMusicDao.updateIdBySongId();
    }

    @Override
    public List<Song> findPlayedMusic(Long uid, int page ,int limit) {
        return userPlayMusicDao.findPlayedMusic(uid,new RowBounds(page,limit));
    }

    @Override
    public Integer countPlayedMusic(Long uid) {
        return userPlayMusicDao.countPlayedMusic(uid);
    }

    @Override
    public Integer createNewList(MyList myList) {
        return userPlayMusicDao.createNewList(myList);
    }

    @Override
    public Integer countMyList() {
        return userPlayMusicDao.countMyList();
    }

    @Override
    public List<MyList> getAllList(Long uid, int page,int limit) {
        return userPlayMusicDao.getAllList(uid,new RowBounds(page,limit));
    }

    @Override
    public List<MyList> getAllList(Long uid) {
        return userPlayMusicDao.getAllList(uid);
    }

    @Override
    public List<MyCollectList> findCollectListById(MyCollectList myCollectList) {
        return userPlayMusicDao.findCollectListById(myCollectList);
    }

    @Override
    public void saveCollectedList(MyCollectList myCollectList) {
        userPlayMusicDao.saveCollectedList(myCollectList);
    }

    @Override
    public List<MyCollectList> getCollectListById(Long uid,int page,int limit) {
        return userPlayMusicDao.getCollectListById(uid,new RowBounds(page,limit));
    }

    @Override
    public Integer countCollectList(Long uid) {
        return userPlayMusicDao.countCollectList(uid);
    }


}
