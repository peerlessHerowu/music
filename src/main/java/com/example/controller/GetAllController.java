package com.example.controller;

import com.example.entity.ListSongs;
import com.example.entity.PlayList;
import com.example.entity.Singer;
import com.example.entity.model.LayuiTable;
import com.example.service.IListSongsService;
import com.example.service.IPlayListService;
import com.example.service.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

    /***
     * 获得同种类的所有歌单、所有歌手
     */
    @Controller
    @RequestMapping("/getAll")
    public class GetAllController {

        @Autowired
        IPlayListService playListService;

        @Autowired
        ISingerService singerService;
        @RequestMapping("/getAllSortList")
        @ResponseBody
        public LayuiTable<PlayList> getAllSortList(String sortName, HttpServletRequest request){
            int page = Integer.parseInt(request.getParameter("page"));
            int limit = Integer.parseInt(request.getParameter("limit"));
            Integer count = playListService.countBySortName(sortName);
            long count1 = count.longValue();
            System.out.println(count1);
            List<PlayList> playLists = playListService.findBySortName(sortName,(page-1)*limit,limit);
            System.out.println("playLists---"+playLists);
            return  new LayuiTable<>(count1,playLists);
        }

        @RequestMapping("/getAllSinger")
        @ResponseBody
        public LayuiTable<Singer> getAllSinger(String sortName, HttpServletRequest request){
            int page = Integer.parseInt(request.getParameter("page"));
            int limit = Integer.parseInt(request.getParameter("limit"));
            Integer count = singerService.countAll();
            long count1 = count.longValue();
            System.out.println(count1);
            List<Singer> Singers = singerService.findAlls((page-1)*limit,limit);
            for (Singer singer : Singers) {
                String imgSrc = singer.getImgSrc();
                String title = singer.getTitle();
                String title2 = title.split("/")[0];
                singer.setTitle(title2);
                String s = imgSrc.replaceAll("640y300", "55y55");
                singer.setImgSrc(s);
            }
            System.out.println("playLists---"+Singers);
            return  new LayuiTable<>(count1,Singers);
        }
    }
