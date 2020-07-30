package com.example.controller;

import com.example.entity.Admin;
import com.example.entity.Result;
import com.example.entity.User;
import com.example.service.IAdminService;
import com.example.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    IAdminService adminService;
    @RequestMapping("/login")
    public String login(){

            return "redirect:/front/admin/login.html";
    }
    /***
     * 跳转到注册界面
     * @return
     */
    @RequestMapping("/regist")
    public String regist(){
        return "/front/admin/regist.html";
    }

    /***
     * 登录判断
     * @param admin
     * @param session
     * @return
     */
    @RequestMapping("/afterLogin")
    @ResponseBody
    public Result afterLogin(Admin admin, HttpSession session){
        Result result =adminService.login(admin);
        if(result.getCode()==200){
            session.setAttribute("admin",admin);
            session.setMaxInactiveInterval(30*24*60*60);
        }
        return result;

    }

    @RequestMapping("/afterRegist")
    @ResponseBody
    public Result regist(Admin admin, Map map){
        Result result = adminService.regist(admin);
        return  result;

    }
}
