package com.example.service;

import com.example.entity.SongList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISongListService {
    public List<String > findAll();
    public List<SongList> findBySomeId(Long id1,Long id2);
    public SongList findById( String  listId);


}
