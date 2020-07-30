package com.example.service;

import com.example.entity.Carousel;
import com.example.entity.PopularSongs;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IPopularSongsService {

    public List<PopularSongs> findPopularSongsBySingerId(String singerId,int page,int limit);

    public Integer countBySingerId(String singerId);

    public List<Carousel> getCarousel();

}
