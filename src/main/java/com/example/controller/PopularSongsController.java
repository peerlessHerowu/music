package com.example.controller;

import com.example.entity.PopularSongs;
import com.example.entity.model.LayuiTable;
import com.example.service.IPopularSongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/***
 * 显示某一歌手的热门歌曲
 */
@Controller
public class PopularSongsController {


    @Autowired
    IPopularSongsService popularSongsService;
    @RequestMapping("/popularSongs")
    @ResponseBody
    public LayuiTable<PopularSongs> song(String singerId, HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = popularSongsService.countBySingerId(singerId);
        long count1 = count.longValue();
        System.out.println(count1);
        List<PopularSongs> popularSongs = popularSongsService.findPopularSongsBySingerId(singerId,(page-1)*limit,limit);
        System.out.println("popularSongs---"+popularSongs);
        return  new LayuiTable<>(count,popularSongs);
    }
}
