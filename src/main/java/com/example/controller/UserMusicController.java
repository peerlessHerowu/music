package com.example.controller;

import com.example.dao.UserPlayMusicDao;
import com.example.entity.*;
import com.example.entity.model.LayuiTable;
import com.example.service.ICollectService;
import com.example.service.ISongService;
import com.example.service.IUserPlayMusicService;
import com.example.service.IUserService;
import com.example.service.impl.CollectService;
import com.example.service.impl.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/userMusic")
public class UserMusicController {

    @Autowired
    IUserPlayMusicService userPlayMusicService;

    @Autowired
    ICollectService collectService;
    @Autowired
    ISongService songService;

    @Autowired
    IUserService userService;

    /***
     * 保存用户最近播放数据
     * @param userPlayMusic
     */
    @RequestMapping("/saveRecentPlay")
    @ResponseBody
    public Integer saveRecentPlay(UserPlayMusic userPlayMusic,HttpServletRequest request){
        //获得用户id
        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
                break;
            }
        }
        Long uid = userService.getUserIdByName(userName);
        userPlayMusic.setUid(uid);
        System.out.println(userPlayMusic);

        if(userPlayMusicService.findPlayedBySongId(userPlayMusic).size()>0){
           userPlayMusicService.deleteSameBySongId(userPlayMusic.getSongId());
           //更新id使其仍然自增
            userPlayMusicService.updateIdBySongId();
            userPlayMusicService.saveRecentPlayMusicBySongId(userPlayMusic);
        }
        else{
            userPlayMusicService.saveRecentPlayMusicBySongId(userPlayMusic);
        }
        System.out.println(userPlayMusic+"baocun");
        return 200;
    }

    /***
     * 向用户显示最近播放
     * @param request
     * @return
     */
    @RequestMapping("/getRecentPlay")
    @ResponseBody
    public LayuiTable<Song> getRecentPlay(HttpServletRequest request) throws ParseException {

        //获得用户id
        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
                break;
            }
        }
        Long uid = userService.getUserIdByName(userName);
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = userPlayMusicService.countPlayedMusic(uid);
        long count1 = count.longValue();
        System.out.println(count1);
        List<Song> songs= userPlayMusicService.findPlayedMusic(uid,(page - 1) * limit, limit);

        System.out.println(songs.size());
        return  new LayuiTable<>(count,songs);
    }

    /***
     * 删除最近播放
     * @param songId
     * @return
     */
    @RequestMapping("/deleteRecentPlay")
    @ResponseBody
    public Integer deleteRecentPlay(String songId){
        Result result = new Result();
        userPlayMusicService.deleteSameBySongId(songId);
        userPlayMusicService.updateIdBySongId();
        if(userPlayMusicService.findOnePlayedBySongId(songId).size()==0){
            result.setCode(200);
            return result.getCode();
        }
        return -1;
    }

    /*-----------------------------------------------------*/

    /**
     * 收藏歌单
     * @param myCollectList
     * @param request
     * @return
     */
    @RequestMapping("/collectList")
    @ResponseBody
    public R collectList(MyCollectList myCollectList,HttpServletRequest request) throws ParseException {
        //获得用户id
        Long uid = getUserId(request);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date collectTime = sdf.parse(sdf.format(new Date()));
        myCollectList.setUid(uid);
        myCollectList.setCollectTime(collectTime);
        if(uid == null){
            return  R.error("500","请先登录");
        }
        if(userPlayMusicService.findCollectListById(myCollectList).size()> 0){
            return  R.error("500","该歌单已收藏");
        }
        userPlayMusicService.saveCollectedList(myCollectList);
        return  R.error("500","收藏成功");

    }

    /**
     * 显示收藏的歌单
     * @param request
     * @return
     */
    @RequestMapping("/getMyCollectList")
    @ResponseBody
    public LayuiTable<MyCollectList> getMyCollectList(HttpServletRequest request){
        Long uid = getUserId(request);
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = userPlayMusicService.countCollectList(uid);
        long count1 = count.longValue();
        List<MyCollectList> collectList = userPlayMusicService.getCollectListById(uid, (page - 1) * limit, limit);
        return new LayuiTable<>(count,collectList);
//
    }



    /**
     * 新建歌单
     * @param myList
     * @return
     */
    @RequestMapping("/createNewList")
    @ResponseBody
    public Integer createNewList(MyList myList, HttpServletRequest request){
        //获得用户id
        Long uid = getUserId(request);

        myList.setUid(uid);

        System.out.println("--------"+uid);
        userPlayMusicService.createNewList(myList);

        return 0;
    }

    /**
     * 获得我创建的所有歌单
     * @return
     */
    @RequestMapping("/getAllList")
    @ResponseBody
    public LayuiTable<MyList> getAllList(HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));
        Integer count = userPlayMusicService.countMyList();
        long count1 = count.longValue();
        //获得用户id
        Long uid = getUserId(request);
        System.out.println("---"+uid);
        List<MyList> myListList = userPlayMusicService.getAllList(uid, (page - 1) * limit, limit);
        return new LayuiTable<>(count1,myListList);
    }

    @RequestMapping("/getMyList")
    @ResponseBody
    public List<MyList> getMyList(HttpServletRequest request){
        //获得用户id
        Long uid = getUserId(request);
        List<MyList> myListList = userPlayMusicService.getAllList(uid);
        return myListList;
    }


    /**
     * 获得我的歌单的对应歌曲g
     */
    @RequestMapping("/getMusicOfMyList")
    @ResponseBody

    public LayuiTable<Song> getMusicOfMyList(MyList myList,HttpServletRequest request){
        int page = Integer.parseInt(request.getParameter("page"));
        int limit = Integer.parseInt(request.getParameter("limit"));

        System.out.println(myList);

        //获得该歌单下所有歌曲数目
        Integer count = collectService.countCollectedSong(myList);
        long count1 = count.longValue();
        System.out.println(count1);

        //根据uid lid获得歌曲列表
        List<Song> songs = collectService.findCollectedSong(myList,(page - 1) * limit, limit);
        System.out.println("collsong---"+songs);
        return  new LayuiTable<>(count1,songs);
    }

    /***
     * 收藏歌曲
     * @return
     */
    @RequestMapping("/collectSong")
    @ResponseBody
    public R collectSong(Collect collect){
        List<Collect> sameSong = collectService.findSameSong(collect);
        if(sameSong.size()==0){
            //保存收藏的歌曲
            collectService.saveCollectSong(collect);
            //增加该歌单中歌曲的数目
            collectService.increaseNum(collect);
            return  R.ok("200","成功");
        }

        else
            return  R.error("400",sameSong.get(0).getLid());

    }



    /***
     * 删除歌手收藏
     * @param songId
     * @return
     */
    @RequestMapping("/deleteCollectSong")
    @ResponseBody
    public Integer deleteCollectSong(String songId){
        Result result = new Result();
        collectService.deleteCollectSongBySongId(songId);
        collectService.updateIdBySongId();
        if(collectService.findCollectSongBySongId(songId).size()==0){
            result.setCode(200);
            return result.getCode();
        }
        return -1;
    }

    private Long getUserId(HttpServletRequest request){
        //获得用户id
        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
                break;
            }
        }
        return userService.getUserIdByName(userName);
    }

}
