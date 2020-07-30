package com.example.controller;

import com.example.entity.Carousel;
import com.example.entity.Singer;
import com.example.entity.SongList;
import com.example.service.IPopularSongsService;
import com.example.service.ISingerService;
import com.example.service.ISongListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/***
 * 首页中获得歌单推荐、歌手推荐、mv推荐、专辑推荐
 */
@Controller
@RequestMapping("/recommend")
public class RecommendListController {

    @Autowired
    ISongListService songListService;
    @Autowired
    ISingerService singerService;
    @Autowired
    IPopularSongsService popularSongsService;


    /**
     * 获得随机歌单16个
     */
    @RequestMapping("/recommendList")
    @ResponseBody
    public List<SongList> recommendList() {
        List<SongList> list = new LinkedList<>();
        List<String> all = songListService.findAll();
        Integer id = new Random().nextInt(all.size() - 21) + 1;
        long j = id.longValue();
        System.out.println(j);
        List<SongList> recommendList = songListService.findBySomeId(j, j + 15);
        for (SongList songList : recommendList) {
            list.add(songList);
        }
        return list;
    }

    /***
     * 获得静态歌单16个
     * @return
     */
    @RequestMapping("/recommendStaticList")
    @ResponseBody
    public List<SongList> recommendStaticList() {
        List<SongList> list = new LinkedList<>();
        List<SongList> recommendList = songListService.findBySomeId(1l, 16000l);

        for (int i = 0; i < 16; i++) {
            list.add(recommendList.get(i));
        }

        return list;
    }


    /**
     * 获得歌手16个
     */

    @RequestMapping("/recommendStaticSinger")
    @ResponseBody
    public List<Singer> recommendStaticSinger() {
        List<Singer> list = new LinkedList<>();

        List<Singer> recommendSinger = singerService.findBySomeId(100l, 115l);

//        处理一下名字和图片大小
        for (Singer singer : recommendSinger) {
            String imgSrc = singer.getImgSrc();
            String title = singer.getTitle();
            String title2 = title.split("/")[0];
            singer.setTitle(title2);
            String s = imgSrc.replaceAll("640y300", "140y140");
            singer.setImgSrc(s);
        }

        for (Singer singer : recommendSinger) {
            list.add(singer);
        }
        return list;
    }

    /***
     * 获得随机歌手16个
     * @return
     */
    @RequestMapping("/recommendSinger")
    @ResponseBody
    public  List<Singer> recommendSinger() {
        List<Singer> list = new LinkedList<>();

        List<Singer> all = singerService.findAll();
        Integer id = new Random().nextInt(all.size() - 21) + 1;
        long j = id.longValue();
        List<Singer> recommendSinger = singerService.findBySomeId(j, j + 15);

        //        处理一下名字和图片大小
        for (Singer singer : recommendSinger) {
            String imgSrc = singer.getImgSrc();
            String title = singer.getTitle();
            String title2 = title.split("/")[0];
            singer.setTitle(title2);
            String s = imgSrc.replaceAll("640y300", "140y140");
            singer.setImgSrc(s);
        }
        for (int i = 0; i < 16; i++) {
            list.add(recommendSinger.get(i));
        }
        return list;
    }


    @RequestMapping("/getCarousel")
    @ResponseBody
    public List<Carousel> getCarousel() {
        List<Carousel> carouselList = popularSongsService.getCarousel();
        return carouselList;
    }


}
