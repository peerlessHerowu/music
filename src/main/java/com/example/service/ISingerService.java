package com.example.service;

import com.example.entity.Singer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISingerService {
    public List<Singer> findBySomeId(Long id1, Long id2);
    public Singer findById(String singerId);

    public List<Singer> findAll();

    public Integer countAll();
    public List<Singer> findAlls(int page,int limit);
}
