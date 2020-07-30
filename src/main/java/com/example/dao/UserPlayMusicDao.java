package com.example.dao;

import com.example.entity.*;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface UserPlayMusicDao {
    public void saveRecentPlayMusicBySongId(UserPlayMusic userPlayMusic);
    public List<UserPlayMusic> findPlayedBySongId(UserPlayMusic userPlayMusic);
    public List<UserPlayMusic> findOnePlayedBySongId(String songId);
    public void deleteSameBySongId(String songId);
    public void updateIdBySongId();

    public List<Song> findPlayedMusic(Long uid ,RowBounds rowBounds);
    public Integer countPlayedMusic(Long uid);


    //创建我的歌单
    public Integer createNewList(MyList myList);
    //获得我的歌单
    public Integer countMyList();
    public List<MyList> getAllList(Long uid,RowBounds rowBounds);
    public List<MyList> getAllList(Long uid);

    //收藏的歌单
    public List<MyCollectList> findCollectListById(MyCollectList myCollectList);
    public void saveCollectedList(MyCollectList myCollectList);
    public List<MyCollectList> getCollectListById(Long uid,RowBounds rowBounds);
    public Integer countCollectList(Long uid);


}
