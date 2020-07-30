package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TabBarController {
    @RequestMapping({"/","/index"})
    public String toIndex(){
        return "/front/index.html";
    }


    @RequestMapping({"/allPlayList"})
    public String toPlayList(){
        return "/front/allPlayList.html";
    }

    @RequestMapping({"/myMusic"})
    public String toProfile(){
        return "/front/allPlayList.html";
    }
}
