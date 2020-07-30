package com.example.service;

import com.example.entity.MyCollectList;
import com.example.entity.MyList;
import com.example.entity.Song;
import com.example.entity.UserPlayMusic;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public interface IUserPlayMusicService {
    public void saveRecentPlayMusicBySongId(UserPlayMusic userPlayMusic);
    public List<UserPlayMusic> findPlayedBySongId(UserPlayMusic userPlayMusic);
    public List<UserPlayMusic> findOnePlayedBySongId(String songId);

    public void deleteSameBySongId(String songId);
    public void updateIdBySongId();



    public List<Song> findPlayedMusic(Long uid,int page , int limit);
    public Integer countPlayedMusic(Long uid);

    //创建我的歌单
    public Integer createNewList(MyList myList);
    //获得我的歌单
    public Integer countMyList();

    public List<MyList> getAllList(Long uid,int page,int limit);
    public List<MyList> getAllList(Long uid);

    //查看是否已经收藏该歌单，没有则收藏
    public List<MyCollectList> findCollectListById(MyCollectList myCollectList);
    public void saveCollectedList(MyCollectList myCollectList);
    public List<MyCollectList> getCollectListById(Long uid,int page,int limit);
    public Integer countCollectList(Long uid);


}
