package com.example.service;

import com.example.entity.Admin;
import com.example.entity.Result;
import org.springframework.stereotype.Service;

@Service
public interface IAdminService {
    public Result regist(Admin admin);
    public Result login(Admin admin);

}
