package com.example.service.impl;

import com.example.dao.AdminDao;
import com.example.dao.UserDao;
import com.example.entity.Admin;
import com.example.entity.Result;
import com.example.entity.User;
import com.example.service.IAdminService;
import com.example.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class AdminService implements IAdminService {

    /***
     * 管理员注册的判断
     */
    @Autowired
    AdminDao adminDao;
    @Override
    public Result regist(Admin admin) {

        Result result = new Result();
        result.setSuccess(false);
        if(adminDao.findByName(admin.getAdminname())!=null){
            result.setMsg("管理员名字已存在");
            result.setCode(0);
        }else{
            adminDao.regist(admin);
            result.setMsg("注册成功！");
            result.setSuccess(true);
            result.setCode(200);

        }
        return result;

    }

    /***
     * 管理员登录的判断
     * @param admin
     * @return
     */
    @Override
    public Result login(Admin admin) {

        Result result = new Result();
        result.setSuccess(false);
        if(adminDao.login(admin)==null){
            result.setMsg("管理员名或密码错误！");
            result.setCode(0);

        }else{
            result.setMsg("登录成功");
            result.setSuccess(true);
            result.setCode(200);

        }
        return result;
    }


}
