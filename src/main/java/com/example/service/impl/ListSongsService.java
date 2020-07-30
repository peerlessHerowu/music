package com.example.service.impl;

import com.example.dao.ListSongsDao;
import com.example.entity.ListSongs;
import com.example.service.IListSongsService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListSongsService implements IListSongsService {

    @Autowired
    ListSongsDao listSongsDao;
    @Override
    public List<ListSongs> findListSongsByListId(String listId,int page,int limit) {
        return listSongsDao.findListSongsByListId(listId,new RowBounds(page,limit));
    }

    @Override
    public Integer countByListId(String listId) {
        return listSongsDao.countByListId(listId);
    }
}
