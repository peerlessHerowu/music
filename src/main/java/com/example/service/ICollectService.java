package com.example.service;

import com.example.entity.Collect;
import com.example.entity.MyList;
import com.example.entity.Song;
import com.example.entity.UserPlayMusic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ICollectService {
    public void saveCollectSong(Collect collect);
    public List<Collect> findSameSong(Collect collect);

    public List<Song> findCollectedSong(MyList myList , int page ,int limit);
    public Integer countCollectedSong(MyList myList);

    public void deleteCollectSongBySongId(String songId);
    public void updateIdBySongId();

    public List<UserPlayMusic> findCollectSongBySongId(String songId);
    public Integer increaseNum(Collect collect);




}
