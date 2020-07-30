package com.example.dao;

import com.example.entity.Admin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AdminDao {

    /***
     * 查找用户名，验证注册时要用
     * @param adminname
     * @return
     */
    @Select(value = "select u.adminname,u.password from admin u where u.adminname=#{adminname}")
    @Results
            ({@Result(property = "adminname",column = "adminname"),
                    @Result(property = "password",column = "password")})
    Admin findByName(@Param("adminname") String adminname);

    /***
     * 查找用户，验证登录时要用
     * @param admin
     * @return
     */
    @Select("select u.id from admin u where u.adminname=#{adminname} and u.password=#{password}")
    Long login(Admin admin);

    /***
     * 插入用户信息，注册时用
     * @param admin
     */
    @Insert("insert into admin values(#{id},#{adminname},#{password})")
    //加入该注解可以保存对象后，查看对象插入id
    //@Options(useGeneratedKeys = true,keyProperty = "id",keyColumn = "id")
    void regist(Admin admin);
}
