package com.example.controller;

import com.example.entity.Singer;
import com.example.service.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/***
 * 歌手列表进去后显示歌手详情
 */
@Controller
public class SingerMoreController {

    @Autowired
    ISingerService singerService;

    /***
     * 在推荐页面点击某一歌手后，跳转到歌歌手详情页面
     * @return
     */
    @RequestMapping("/singer")
    public String singer(){
        return "forward:/front/singerMore.html";
    }

    /***
     * 在推荐页面点击某一歌手后，跳转到歌手详情页面，获得热门歌曲
     * @param singerId
     * @return
     */
    @RequestMapping("/singerMore")
    @ResponseBody
    public Singer singerMore(String  singerId){
        System.out.println(singerId);
        Singer singer = singerService.findById(singerId);
        System.out.println(singer);
        return  singer;
    }
}
