$(document).ready(function(){

    let path = window.location.pathname;
    var lis = $(".nav li");

    if(path == '/front/myAbout.html' || path=='/front/notLogin.html'){
        preChange(lis,2)
    }else if(path =='/front/allPlayList.html'){
        preChange(lis,1)
    }else if(path == '/') {
        preChange(lis,0)

    }
    $.ajax({
        url:"/user/getUserName",
        success:function (data) {
            //已经登录
            console.log(data)
            if(data!="")
            {
                $("#lr").text("退出登录");
                $("#lr").attr("href","javascript:exitLogin()");
                $("#userName").text(data);

                //可以显示我的音乐界面
                $("#my_music").attr("href","/front/myAbout.html");

                $(".dropdown-menu").html("<li>您已登录啦~~</li><li><a href='/front/myAbout.html'>我的音乐 </a></li>");

            }

        }
    })

})

//退出登录
function exitLogin() {
    $("#lr").text("去登录");
    $("#userName").text("未登录");
    $("#lr").attr("href","/front/login.html");
    $(".dropdown-menu").html("<li>请先登录哦</li>");
    $("#my_music").attr("href","/front/notLogin.html");
    $.get({
        url:"/user/removeUserName",
        success:function (data) {


            window.location.href = "/index"

        }
    })
}

// js实现导航菜单点击切换选中时高亮状态
function change_tbg(obj) {
    var lis = $(".nav li");
    for(var i = 0; i<lis.length; i++){
        lis[i].classList.remove("active");
    }
    $(obj).addClass('active');

}

function preChange(lis,j) {
    for(var i = 0; i<lis.length; i++){
        $(lis[i]).removeClass("active");
    }
    $(lis[j]).addClass('active');
}

function toOther(obj,url){
    $.get(url,{},function () {
        // change_tbg(obj)
    })
}