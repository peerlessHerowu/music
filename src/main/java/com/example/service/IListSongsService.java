package com.example.service;

import com.example.entity.ListSongs;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IListSongsService {
    public List<ListSongs> findListSongsByListId(String listId,int page,int limit);
    public Integer countByListId(String listId);


}
