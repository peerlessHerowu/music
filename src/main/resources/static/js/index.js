$(document).ready(function(){

    layui.use(['laytpl','laypage','form','layer','carousel'], function(){

        var $ = layui.jquery

        var laytpl=layui.laytpl;
        var carouselTpl;
        $.get('/asset/carouselTpl.html',function (html) {
            carouselTpl=html;
            // 获得轮播图
            $.get("/recommend/getCarousel",{},function (data) {
                console.log(data);
                laytpl(carouselTpl).render(data, function(html){
                    $(".carouse_wrap").html(html);
                });
                var carousel = layui.carousel
                //图片轮播
                carousel.render({
                    elem: '#carousel'
                    ,width: '100%'
                    ,height: '440px'
                    ,interval: 5000
                });

            });
        });
    });


    defaultLis1t()
});


//固定歌单
function defaultLis1t() {
    displayRecommend('/asset/songListTpl.html',
        "/recommend/recommendStaticList",'.rec_content')
    $('#change_some').on('click',function(){
        displayRecommend('/asset/songListTpl.html',
            "/recommend/recommendList",'.rec_content')
    });
}
// 固定歌手
function defaultSinger() {
    displayRecommend('/asset/singerTpl.html',
        "/recommend/recommendStaticSinger",'.rec_content')
    $('#change_some').on('click',function(){
        displayRecommend('/asset/singerTpl.html',
            "/recommend/recommendSinger",'.rec_content')
    });
}
//随机歌单、歌手、专辑(封装)
function displayRecommend(tplUrl ,url,selector) {
    layui.use(['laytpl','laypage','form','layer'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var tpl
        $.get(tplUrl,function (html) {
            tpl = html;
            Util.ajax(url,{},function (data) {
                laytpl(tpl).render(data, function(html){
                    $(selector).html(html);
                });
            });
        });
    });
}



// js实现导航菜单点击切换选中时高亮状态
function change_bg(obj) {
    var lis = $(".recommend li");
    for(var i = 0; i<lis.length; i++){
        lis[i].className="";
    }
    obj.className = "active";
}


