package com.example.dao;

import com.example.entity.Song;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongDao {
    public List<Song> findByKey(String songName, RowBounds rowBounds);
    public Integer countByKey(String songName);
    public List<Song> findBySingerKey(String singerName, RowBounds rowBounds);
    public Integer countBySingerKey(String singerName);
    public List<Song> findByRecordKey(String recordName, RowBounds rowBounds);
    public Integer countByRecordKey(String recordName);

    public List<Song> findBysongId(@Param("songIds") List<String> songId, RowBounds rowBounds);

}
