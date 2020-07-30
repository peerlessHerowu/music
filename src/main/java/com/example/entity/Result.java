package com.example.entity;

import lombok.Data;

/***
 * 返回前台的结果封装成这个JavaBean
 * @param <T>
 */
@Data
public class Result<T> {
    //返回信息
    private int code;
    private String msg;
    //数据是否正常请求
    private boolean success;
    //具体返回的数据
    private T detail;

}
