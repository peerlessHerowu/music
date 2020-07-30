package com.example.config;
import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 *
 * @Package: com.*.*.interceptor
 * @ClassName: AdminInterceptor
 * @Description:拦截器
 * @author: zk
 * @date: 2019年9月19日 下午2:20:57
 */
@Component
public class AdminInterceptor implements  HandlerInterceptor {

    @Autowired
    IUserService userService;

    /**
     * 在请求处理之前进行调用（Controller方法调用之前）
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        System.out.println("执行了TestInterceptor的preHandle方法");

        Long userId = getUserId(request);
        System.out.println(userId);
        if(userId == null){
            response.sendRedirect(request.getContextPath()+"/front/notLogin.html");
            return false;
        }
        return true;
//        try {
//            //统一拦截（查询当前session是否存在user）(这里user会在每次登陆成功后，写入session)
//            User user=(User)request.getSession().getAttribute("USER");
//            if(user!=null){
//                return true;
//            }
//            response.sendRedirect(request.getContextPath()+"你的登陆页地址");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return false;//如果设置为false时，被请求时，拦截器执行到此处将不会继续操作
        //如果设置为true时，请求将会继续执行后面的操作
    }
    private Long getUserId(HttpServletRequest request){
        //获得用户id
        Cookie[] cookies = request.getCookies();
        String userName = null;
        for(int i=0;i<cookies.length;i++) {
            if("account".equals(cookies[i].getName())){
                userName = cookies[i].getValue();
                break;
            }
        }
        return userService.getUserIdByName(userName);
    }

    /**
     * 请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
//         System.out.println("执行了TestInterceptor的postHandle方法");
    }

    /**
     * 在整个请求结束之后被调用，也就是在DispatcherServlet 渲染了对应的视图之后执行（主要是用于进行资源清理工作）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
//        System.out.println("执行了TestInterceptor的afterCompletion方法");
    }

}