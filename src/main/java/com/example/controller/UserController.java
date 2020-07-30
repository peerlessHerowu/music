package com.example.controller;

import com.example.entity.Result;
import com.example.entity.User;
import com.example.service.IUserService;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

//@RestController
@Controller
public class UserController {

    @Autowired
    IUserService userService;


    /***
     * t跳转到登陆界面
     * @return
     */
    @RequestMapping("/user/login")
    public String login(){
        return "/front/login.html";
    }

    /***
     * 跳转到注册界面
     * @return
     */
    @RequestMapping("/user/regist")
    public String regist(){
        return "/front/regist.html";
    }

    /***
     * 登录判断
     * @param user
     * @param session
     * @return
     */
    @RequestMapping("/user/afterLogin")
    @ResponseBody
    public Result afterLogin(User user, HttpSession session){
        Result result = userService.login(user);
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        //实例化一个Cookie
        Cookie cookie1 = new Cookie("account",user.getUsername());
        //设置Cookie的生命期限60分钟
        cookie1.setMaxAge(60*60);
//        可在同一应用服务器内共享
        cookie1.setPath("/");
        //添加Cookie到客户端
        response.addCookie(cookie1);
        if(result.getCode()==200){

            session.setAttribute(user.getUsername(),user);
            //设置session存活时间
            session.setMaxInactiveInterval(30*60);
        }
        System.out.println("----"+session.getAttribute(user.getUsername()));

        return result;

    }

    /***
     * 获得session中的用户信息
     * @param session
     * @return
     */
    @RequestMapping("/user/getUserName")
    @ResponseBody
    public String getUserName( HttpSession session){
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            System.out.println(cookies[i].getName());
            System.out.println(cookies[i].getValue());
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
                break;
            }
        }
        return userName;
    }

    /***、
     * 删除session中的用户信息
     * @param session
     * @return
     */
    @RequestMapping("/user/removeUserName")
    public String removeUserName(HttpSession session){
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();

        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            System.out.println("account".equals(cookies[i].getName()));
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
//                cookies[i].setPath(cookies[i].getPath());
//                cookies[i].setMaxAge(0);
//                response.addCookie(cookies[i]);
                break;
            }
        }

//        清除用户cookie
        Cookie cookie1 = new Cookie("account",null);
        cookie1.setPath("/");

        response.addCookie(cookie1);
//        清该用户的session
        session.removeAttribute(userName);
        System.out.println("----"+session.getAttribute(userName));

        return "forward:/front/index.html";
    }

    /***
     * 注册的判断
     * @param user
     * @param map
     * @return
     */
    @RequestMapping("/user/afterRegist")
    @ResponseBody
    public Result regist(User user,Map map){
        Result result = userService.regist(user);
        return  result;

    }
}
