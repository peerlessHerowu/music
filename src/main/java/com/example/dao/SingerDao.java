package com.example.dao;

import com.example.entity.Singer;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SingerDao {
    public List<Singer> findBySomeId(Long id1, Long id2);
    public Singer findById(String singerId);
    public List<Singer> findAll();

    public Integer countAll();
    public List<Singer> findAlls(RowBounds rowBounds);

}
