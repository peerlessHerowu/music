package com.example.dao;

import com.example.entity.PlayList;
import com.example.entity.Song;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/***
 *对歌单的搜索、显示全部歌单
 */
@Repository
public interface PlayListDao {
    public List<PlayList> findByListKey(Map params);
    public Integer countByListKey(String listName);

    public List<PlayList> findBySortName(String sortName, RowBounds rowBounds);
    public Integer countBySortName(String sortName);

    public PlayList findListByListId(String listId);

    public List<PlayList> findSongsByListId(String listId, RowBounds rowBounds);
    public Integer countByListId(String listId);

}
