package com.example.service.impl;

import com.example.dao.UserDao;
import com.example.entity.Result;
import com.example.entity.User;
import com.example.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class UserService implements IUserService {

    /***
     * 用户注册的判断
     */
    @Autowired
    UserDao userDao;
    @Override
    public Result regist(User user) {

        Result result = new Result();
        result.setSuccess(false);
        if(userDao.findByName(user.getUsername())!=null){
            result.setMsg("用户名已存在");
            result.setCode(0);
        }else{
            userDao.regist(user);
            result.setMsg("注册成功！");
            result.setSuccess(true);
            result.setCode(200);

        }
        return result;

    }

    /***
     * 用户登录的判断
     * @param user
     * @return
     */
    @Override
    public Result login(User user) {

        Result result = new Result();
        result.setSuccess(false);
        if(userDao.login(user)==null){
            result.setMsg("用户名或密码错误！");
            result.setCode(0);

        }else{
            result.setMsg("登录成功");
            result.setSuccess(true);
            result.setCode(200);

        }
        return result;
    }

    @Override
    public Long getUserIdByName(String userName) {
        return userDao.getUserIdByName(userName);
    }
}
