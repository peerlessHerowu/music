package com.example.service;

import com.example.entity.PlayList;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;

/***
 *对歌单的搜索、显示全部歌单
 * 根据listId查询歌曲
 */
@Service
public interface IPlayListService {
    public List<PlayList> findByListKey(Map params);
    public Integer countByListKey(String listName);

    public List<PlayList> findBySortName(String sortName, int page, int limit);
    public Integer countBySortName(String sortName);

    public PlayList findListByListId(String listId);


    public List<PlayList> findSongsByListId(String listId, int page, int limit);
    public Integer countByListId(String listId);




}
