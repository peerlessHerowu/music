package com.example.service.impl;

import com.example.dao.PopularSongsDao;
import com.example.entity.Carousel;
import com.example.entity.PopularSongs;
import com.example.service.IPopularSongsService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PopularSongsService implements IPopularSongsService {

    @Autowired
    PopularSongsDao popularSongsDao;
    @Override
    public List<PopularSongs> findPopularSongsBySingerId(String singerId,int page,int limit) {
        return popularSongsDao.findPopularSongsBySingerId(singerId,new RowBounds(page,limit));
    }

    @Override
    public Integer countBySingerId(String singerId) {
        return popularSongsDao.countBySingerId(singerId);
    }

    @Override
    public List<Carousel> getCarousel() {
        return popularSongsDao.getCarousel();
    }
}
