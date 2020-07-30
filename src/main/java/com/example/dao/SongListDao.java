package com.example.dao;

import com.example.entity.SongList;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongListDao {
    public List<String> findAll();
    public List<SongList> findBySomeId( Long id1, Long id2);
    public SongList findById( String listId);
}
