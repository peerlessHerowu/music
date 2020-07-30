package com.example.service;

import com.example.entity.Address;
import com.example.entity.User;
import com.example.entity.Users;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Created by wisely on 2015/5/25.
 */
@Service
public class DemoService {
    @Cacheable(value = "usercache",keyGenerator = "keyGenerator")
    public Users findUser(Long id,String firstName,String lastName){
        System.out.println("无缓存的时候调用这里");
        return new Users(id,firstName,lastName);
    }
    @Cacheable(value = "addresscache",keyGenerator = "keyGenerator")
    public Address findAddress(Long id, String province, String city){
        System.out.println("无缓存的时候调用这里");
        return new Address(id,province,city);
    }
}
