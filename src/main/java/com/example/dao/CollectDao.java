package com.example.dao;

import com.example.entity.Collect;
import com.example.entity.MyList;
import com.example.entity.Song;
import com.example.entity.UserPlayMusic;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

/***
 * 收藏歌曲、歌单、歌手、专辑
 */
@Repository
public interface CollectDao {
    public void saveCollectSong(Collect collect);
    public List<Collect> findSameSong(Collect collect);

    public List<Song> findCollectedSong(MyList myList, RowBounds rowBounds);
    public Integer countCollectedSong(MyList myList);

    public void deleteCollectSongBySongId(String songId);
    public void updateIdBySongId();

    public List<UserPlayMusic> findCollectSongBySongId(String songId);
    public Integer increaseNum(Collect collect);

}
