package com.example.service.impl;

import com.example.dao.SingerDao;
import com.example.entity.Singer;
import com.example.service.ISingerService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/***
 * 获得指定条件的歌手
 */
@Service
public class SingerService implements ISingerService {

    @Autowired
    SingerDao singerDao;

    /***
     * 获得id在一定范围的歌手
     * @param id1
     * @param id2
     * @return
     */
    @Override
    public List<Singer> findBySomeId(Long id1, Long id2) {
        return singerDao.findBySomeId(id1,id2);
    }

    /***
     * 根据singerId获得指定歌手
     * @param singerId
     * @return
     */
    @Override
    public Singer findById(String singerId) {
        return singerDao.findById(singerId);
    }

    /***
     * 查询
     * @return
     */
    @Override
    public List<Singer> findAll() {
        return singerDao.findAll();
    }

    @Override
    public Integer countAll() {
        return singerDao.countAll();
    }

    @Override
    public List<Singer> findAlls(int page, int limit) {
        return singerDao.findAlls(new RowBounds(page,limit));
    }
}
