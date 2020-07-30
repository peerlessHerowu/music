package com.example.controller;

import com.example.entity.PlayList;
import com.example.entity.SongList;
import com.example.service.IPlayListService;
import com.example.service.ISongListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/***
 * 点击歌单推荐列表后返回的界面，同时渲染歌单详情界面
 */
@Controller
public class PlayListMoreController {

    @Autowired
    ISongListService songListService;
    @Autowired
    IPlayListService playListService;

    /***
     * 在推荐页面点击某一歌单后，跳转到歌单详情页面
     * @return
     */
    @RequestMapping("/playList")
    public String playlist(){
        return  "forward:/front/playlist.html";
    }

    /***
     * 在推荐页面点击某一歌单后跳转到歌单详情页面，获得该歌单包含的歌曲
     * @param listId
     * @return
     */
    @RequestMapping("/moreSong")
    @ResponseBody
    public SongList moreSong(String  listId){
        System.out.println(listId);
        SongList songList = songListService.findById(listId);
        System.out.println(songList);
        return  songList;
    }
    /***
     * 跳转到管理员的歌单更多页面
     * @return
     */
    @RequestMapping("/playListMore")
    public String playListMore(){
        return  "forward:/front/admin/adminPlayListMore.html";
    }

    /***
     * 点击菜单栏的歌单，跳转到用户的歌单更多页面
     * @param
     * @return
     */
    @RequestMapping("/allPlayListSong")
    public String allPlayListSong(){
        return  "forward:/front/allPlayListSong.html";
    }



    /***
     * 获得所有一个歌单的所有歌曲（比推荐的获得的更多）
     * @param listId
     * @return
     */
    @RequestMapping("/moreSongs")
    @ResponseBody
    public PlayList moreSongs(String listId){
        System.out.println(listId);
        PlayList playList = playListService.findListByListId(listId);

        System.out.println(playList);
        return  playList;
    }
}
