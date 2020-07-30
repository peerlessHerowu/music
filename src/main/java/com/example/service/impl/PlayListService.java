package com.example.service.impl;

import com.example.dao.PlayListDao;
import com.example.entity.PlayList;
import com.example.service.IPlayListService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlayListService implements IPlayListService {

    @Autowired
    PlayListDao listDao;
    @Override
    public List<PlayList> findByListKey(Map params) {
        return listDao.findByListKey(params);
    }

    @Override
    public Integer countByListKey(String listName) {
        return listDao.countByListKey(listName);
    }

    @Override
    @Cacheable(value = "huayuCache",keyGenerator = "keyGenerator")
    public List<PlayList> findBySortName(String sortName, int page, int limit) {
        System.out.println("无缓存1");

        return listDao.findBySortName(sortName,new RowBounds(page,limit));
    }

    @Override
    @Cacheable(value = "huayuCache",keyGenerator = "keyGenerator")
    public Integer countBySortName(String sortName) {
        System.out.println("无缓存2");
        return listDao.countBySortName(sortName);

    }

    @Override
    public PlayList findListByListId(String listId) {
        return listDao.findListByListId(listId);
    }

    @Override
    public List<PlayList> findSongsByListId(String listId, int page, int limit) {
        return listDao.findSongsByListId(listId,new RowBounds(page,limit));
    }

    @Override
    public Integer countByListId(String listId) {
        return listDao.countByListId(listId);
    }
}
