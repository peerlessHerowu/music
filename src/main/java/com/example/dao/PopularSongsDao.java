package com.example.dao;

import com.example.entity.Carousel;
import com.example.entity.PopularSongs;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PopularSongsDao {

    public List<PopularSongs> findPopularSongsBySingerId(String singerId, RowBounds rowBounds);
    public Integer countBySingerId(String singerId);

    public List<Carousel> getCarousel();

}
