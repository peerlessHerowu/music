package com.example.service;

import com.example.entity.Result;
import com.example.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface IUserService {
    public Result regist(User user);
    public Result login(User user);

    public Long getUserIdByName(String userName);
}
