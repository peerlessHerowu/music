package com.example.controller;

import com.example.entity.PlayList;
import com.example.entity.PopularSongs;
import com.example.entity.Song;
import com.example.entity.model.LayuiTable;
import com.example.service.IPlayListService;
import com.example.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Controller
@RequestMapping("/search")
public class searchController {


    @Autowired
    ISongService songService;

    @Autowired
    IPlayListService playListService;

    /***
     * 默认查询单曲结果，因此点击搜索按钮后会执行此控制器方法，跳转至/front/search/searchResult.html界面
     * @return
     */
    @RequestMapping("/searchAll")
    public String searchSong(){
        return "forward:/front/search/searchResult.html";
    }

    /***
     * 根据歌曲查询，显示查询结果
     * @param keySearch
     * @param request
     * @return
     */
    @RequestMapping("/songSearch")
    @ResponseBody
    public LayuiTable<Song> songSearch(String keySearch, HttpServletRequest request){

        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = songService.countByKey("%"+keySearch+"%");
        long count1 = count.longValue();
        System.out.println(count1);
        List<Song> songs = songService.findByKey("%"+keySearch+"%",(page-1)*limit,limit);
        System.out.println("Songs---"+songs);
        return  new LayuiTable<>(count,songs);

    }

    /***
     * 根据歌手查询显示查询结果
     * @param singerKeySearch
     * @param request
     * @return
     */
    @RequestMapping("/singerSearch")
    @ResponseBody
    public LayuiTable<Song> singerSearch(String singerKeySearch, HttpServletRequest request){

        System.out.println(singerKeySearch);
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = songService.countBySingerKey("%"+singerKeySearch+"%");
        long count1 = count.longValue();
        System.out.println(count1);
        List<Song> songs = songService.findBySingerKey("%"+singerKeySearch+"%",(page-1)*limit,limit);
        System.out.println("Songs---"+songs);
        return  new LayuiTable<>(count,songs);

    }

    /***
     * 根据专辑名称查询获得查询结果
     * @param recordKeySearch
     * @param request
     * @return
     */
    @RequestMapping("/recordSearch")
    @ResponseBody
    public LayuiTable<Song> recordSearch(String recordKeySearch, HttpServletRequest request){

        System.out.println(recordKeySearch);
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = songService.countByRecordKey("%"+recordKeySearch+"%");
        long count1 = count.longValue();
        System.out.println(count1);
        List<Song> songs = songService.findByRecordKey("%"+recordKeySearch+"%",(page-1)*limit,limit);
        System.out.println("Songs---"+songs);
        return  new LayuiTable<>(count,songs);

    }
    /***
     * 根据歌单名称查询获得查询结果
     * @param playListKeySearch
     * @param request
     * @return
     */
    @RequestMapping("/playListSearch")
    @ResponseBody
    public LayuiTable<PlayList> playListSearch(String playListKeySearch, HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));

        System.out.println(page + "---" + limit);
        Map<String,Object> params = new HashMap<String,Object>();
        //当sql的条件有模糊匹配时，参数需前后带上%
        params.put("title", "%"+playListKeySearch+"%");
        params.put("start", (page-1)*limit);
        params.put("end", limit);

        System.out.println(params);
        Integer count = playListService.countByListKey("%"+playListKeySearch+"%");
        long count1 = count.longValue();
        System.out.println(count1);
        List<PlayList> songs = playListService.findByListKey(params);
        System.out.println("Songs---"+songs);
        return  new LayuiTable<>(count,songs);

    }



}
