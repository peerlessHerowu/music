package com.example.service;

import com.example.entity.Song;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISongService {
    public List<Song> findByKey(String songName,int page,int limit);
    public Integer countByKey(String songName);
    public List<Song> findBySingerKey(String singerName,int page,int limit);
    public Integer countBySingerKey(String singerName);

    public List<Song> findByRecordKey(String recordName,int page,int limit);
    public Integer countByRecordKey(String recordName);

    public List<Song> findBysongId(List<String> songIds,int page,int limit);


}
