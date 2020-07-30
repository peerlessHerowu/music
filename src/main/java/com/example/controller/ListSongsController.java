package com.example.controller;

import com.example.entity.ListSongs;
import com.example.entity.PlayList;
import com.example.entity.PopularSongs;
import com.example.entity.model.LayuiTable;
import com.example.service.IListSongsService;
import com.example.service.IPlayListService;
import com.example.service.IPopularSongsService;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/***
 * 推荐列表进去后显示的歌曲
 */
@Controller
public class ListSongsController {


    @Autowired
    IListSongsService listSongsService;
    @Autowired
    IPlayListService playListService;
    @RequestMapping("/ListSongs")
    @ResponseBody
    public LayuiTable<ListSongs> ListSong(String id, HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = listSongsService.countByListId(id);
        long count1 = count.longValue();
        System.out.println(count1);
        List<ListSongs> listSongs = listSongsService.findListSongsByListId(id,(page-1)*limit,limit);
        System.out.println("listSongs---"+listSongs);
        return  new LayuiTable<>(count1,listSongs);
    }



    @RequestMapping("/allListSongs")
    @ResponseBody
    public LayuiTable<PlayList> allListSongs(String id, HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = playListService.countByListId(id);
        long count1 = count.longValue();
        System.out.println(count1);
        List<PlayList> playLists = playListService.findSongsByListId(id,(page-1)*limit,limit);
        System.out.println("listSong---"+playLists);
        return  new LayuiTable<>(count1,playLists);
    }
}
