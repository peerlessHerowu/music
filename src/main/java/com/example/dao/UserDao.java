package com.example.dao;

import com.example.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao {

    /***
     * 查找用户名，验证注册时要用
     * @param username
     * @return
     */
    @Select(value = "select u.username,u.password from user u where u.username=#{username}")
    @Results
            ({@Result(property = "username",column = "username"),
                    @Result(property = "password",column = "password")})
    User findByName(@Param("username") String username);

    /***
     * 查找用户，验证登录时要用
     * @param user
     * @return
     */
    @Select("select u.id from user u where u.username=#{username} and u.password=#{password}")
    Long login(User user);

    /***
     * 插入用户信息，注册时用
     * @param user
     */
    @Insert("insert into user values(#{id},#{username},#{password})")
    //加入该注解可以保存对象后，查看对象插入id
    //@Options(useGeneratedKeys = true,keyProperty = "id",keyColumn = "id")
    void regist(User user);

    public Long getUserIdByName(String userName);

}
