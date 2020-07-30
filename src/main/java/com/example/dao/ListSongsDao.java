package com.example.dao;

import com.example.entity.ListSongs;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListSongsDao {
    public List<ListSongs> findListSongsByListId(String listId, RowBounds rowBounds);
    public Integer countByListId(String listId);
}
