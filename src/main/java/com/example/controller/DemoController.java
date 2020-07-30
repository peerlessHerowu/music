package com.example.controller;


import com.example.entity.Address;
import com.example.entity.Users;
import com.example.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by wisely on 2015/5/25. 
 */

@Controller
public class DemoController {

    @Autowired
    DemoService demoService;

    @RequestMapping("/test")
    @ResponseBody
    public String putCache(){
        demoService.findUser(1l,"wang","yunfei");
        demoService.findAddress(1l,"anhui","hefei");
        System.out.println("若下面没出现“无缓存的时候调用”字样且能打印出数据表示测试成功");
        return "ok";
    }
    @RequestMapping("/test2")
    @ResponseBody
    public String testCache(){
        Users Users = demoService.findUser(1l,"wang","yunfei");
        Address address =demoService.findAddress(1l,"anhui","hefei");
        System.out.println("我这里没执行查询");
        System.out.println("Users:"+"/"+Users.getFirstName()+"/"+Users.getLastName());
        System.out.println("address:"+"/"+address.getProvince()+"/"+address.getCity());
        return "ok";
    }
}  