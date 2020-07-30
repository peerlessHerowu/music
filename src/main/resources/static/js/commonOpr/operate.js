
// var playSong
// var setClassByLock
//切换到多少首歌曲后
//每页总歌曲数量
// var countSong

//每页的歌曲列表
// let songList = []

let isLock = false

//我的歌单列表
let myList = []

let rowObj = {
    songList:[],
    gObj:{},
    d : 0
}
let listenTableEvent = function(table,tableId) {
    table.on(tableId, function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        rowObj.gObj =obj

        console.log(obj)
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(layEvent === 'play'){
            console.log(rowObj.gObj)
            rowObj.d = 0
            setClassByLock();
            var d=new Date();
            var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            playSong(data.songId,data.songTitle,datetime);
            $("#play_music").attr("class","layui-colla-content layui-show");
            $("#music_word").attr("class","layui-colla-content layui-show");
        }  else if(layEvent === 'download'){ //编辑
            window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songName;
        } else if(layEvent === 'add'){ //编辑
            layer.alert("添加")
        } else if(layEvent === 'collect'){
            layui.use(['laytpl','laypage','form','layer'], function(){

                var $ = layui.jquery;

                var MyListSelectionTpl;
                // 获得模板
                $.get('/asset/MyListSelectionTpl.html',function (html) {
                    MyListSelectionTpl=html;
                    Util.get("/userMusic/getMyList",{},function (data) {
                        // console.log("article_count",data)
                        myList = data
                        var laytpl=layui.laytpl;
                        // 渲染模板
                        laytpl(MyListSelectionTpl).render(data, function(html){
                            //弹出框
                            layer.open({
                                type: 1
                                ,title: '选择歌单'
                                ,closeBtn: 1
                                ,area: ['500px','500px']
                                ,shade: 0.5
                                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                                ,btnAlign: 'c'
                                ,moveType: 1 //拖拽模式，0或者1
                                ,content: html //注意，如果str是object，那么需要字符拼接。
                                ,success: function(layero){
                                    var item = layero.find('.my_list_item')
                                    console.log(item)
                                    console.log(item[0])
                                    for (let i = 0; i < item.length; i++) {
                                       item[i].addEventListener('mouseover',function (){myItemOver(this)})
                                    }
                                    for (let i = 0; i < item.length; i++) {
                                       item[i].addEventListener('click',function (){selectList(this)})
                                    }

                                }
                            });
                            //在加载完歌的页面后再次渲染以获得折叠面板的功能性操作
                            layui.use('element', function(){
                                var element = layui.element;
                                element.init();
                            });
                        });
                    });
                });

            });
        }
        else if(layEvent === 'share'){
            layer.alert('Hi，头部工具栏扩展的右侧图标。');
        }
        else if(layEvent === 'delete'){
            layer.confirm('真的删除行么', function(index){
               deleteRecentPlaySong(index,obj,data.songId)
            });
        }

    });

}

//删除播放列表
function deleteRecentPlaySong(index,obj,id) {
    $.ajax({
        url: "/userMusic/deleteRecentPlay",
        type: "POST",
        data: {songId:id},
        success: function (msg) {
            if (msg == 200) {
                //删除这一行
                obj.del();
                //关闭弹框
                layer.close(index);
                layer.msg("删除成功", {icon: 6});
            } else {
                layer.msg("删除失败", {icon: 5});
            }
        }
    });
}

/***
 *
 * @param id
 * @param name
 * @param time
 */
//控制播放音乐
let playSong = function (id,name,time) {
    //alert(id)
    layui.use(['laytpl','laypage', 'form', 'layer'], function (laytpl) {
        var $ = layui.jquery;


        var playSongTpl;
        //控制显示歌的控制块
        var data = {"srcId": "http://music.163.com/song/media/outer/url?id="+id+".mp3","name":name};
        console.log('----',data)
        $.get('/asset/playSongTpl.html',function (html) {
            playSongTpl = html;
            laytpl(playSongTpl).render(data, function (html) {
                $('#play_music').html(html);
                setClassByLock()
                // 添加监听事件
                $('.audio_wrap')[0].addEventListener("mouseover",mouseOver)
                $('.audio_wrap')[0].addEventListener("mouseout",mouseOut)
                $('.lock_icon')[0].addEventListener("click",toggleLock)
                $('.audio_wrap').find('audio')[0].addEventListener("ended",isEnd)
            });

        })

        $.ajax({
            type: "get",//请求方式
            url: "http://music.163.com/api/song/media?id="+id,//地址，就是json文件的请求路径
            dataType: "JSONP",//数据类型可以为 text xml json  script  jsonp
            success: function(data) {//返回的参数就是 action里面所有的有get和set方法的参数
                console.log(data)
                laytpl(songWordTpl.innerHTML).render(data, function(html){
                    if(data["lyric"]==null){
                        data.lyric="暂时没有歌词哦！"
                    }
                    $("#music_word").html(html);
                });
            }
        });

        //保存最近播放
        $.ajax({
            type:"post",
            data:{songId:id,playTime:time},
            url:"/userMusic/saveRecentPlay",
            success:function(data) {
                console.log("保存")
            }
        });
    });
}
let setClassByLock = function () {
    if(window.isLock){
        $('.lock_icon').removeClass("icon-jiesuo")
        $('.lock_icon').addClass("icon-jiesuo1")
    }else{
        $('.lock_icon').removeClass("icon-jiesuo1")
        $('.lock_icon').addClass("icon-jiesuo")
    }
    $('.audio_wrap').removeClass("FadeOutAudio")
    $('.audio_wrap').removeClass("FadeInAudio")
}

/**
 * 选择弹出框的一项时该项高亮
 */
function selectList(obj) {
    var lis = $(".my_list li");
    var index
    for(var i = 0; i<lis.length; i++){
        //记录点击的项的索引
        if(lis[i] == obj){
            index = i
        }
        $(lis[i]).removeClass('active');
    }
    $(obj).addClass("active")
    console.log(obj)
    //获得当前时间
    var d=new Date();
    var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    collectSong(myList[index],datetime);

}

/***
 * 鼠标移入高亮
 * @param obj
 */
function myItemOver (obj) {
    console.log(obj)
    var lis = $(".my_list li");
    for(var i = 0; i<lis.length; i++){
        $(lis[i]).removeClass('over');
    }
    $(obj).addClass("over")

}

/**
 /**
 *
 * @param obj layui-table的行数据对象
 * @param number 要查找的行距离当前行距离，以当前行为准向上一行为-,向下为+
 * @param filedName 要查找的filed
 * @returns {string} 查找filed的值
 */
let getRowData = function (obj, number, filedName) {
    var se = obj.tr.selector;
    console.log(obj )
    var os = se.substring(se.indexOf('"') + 1, se.lastIndexOf('"'));
    var nse = se.replace(os, parseInt(os) + number);
    var res = "";
    $(nse + " td:not(.layui-table-col-special)").each(function () {
        console.log($(this).attr("data-field") )
        if ($(this).attr("data-field") == filedName) {
            res = $(this).children(":first").html()
        }
    });
    return res;
}

/***
 * 播放列表
 */
//播放结束后到下一首
let isEnd = function (){
    rowObj.d+=1
    console.log(rowObj.d,"播放完成")
    if(rowObj.gObj != undefined){

        let songId = getRowData(rowObj.gObj,rowObj.d,"songId")
        console.log(songId)
        if(songId == ''){
            layer.msg("本页已经没有歌曲啦~", {icon: 6});
            return
        }

        //切换到下一首时改变行样式
        switchClick()
        var d=new Date();
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        let songTitle = getRowData(rowObj.gObj,rowObj.d,"songTitle")
        playSong(songId,songTitle,datetime);
    }else {
        //列表歌曲播放完
        if(rowObj.d == rowObj.songList.length){
            layer.msg("本页已经没有歌曲啦~", {icon: 6});
            return
        }
        var d=new Date();
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

        playSong(rowObj.songList[rowObj.d].songId,rowObj.songList[rowObj.d].songTitle,
            datetime);

    }
}

//切换到下一首时改变行样式
let switchClick = function () {
    //有下一首
    var se = rowObj.gObj.tr.selector;
    var os = se.substring(se.indexOf('"') +1, se.lastIndexOf('"'));
    var nse = parseInt(os) + rowObj.d;
    console.log(os,nse)
    $('.layui-table').find('tbody').find('tr').each(function () {
        //移除高亮类
        if($(this)['context'].sectionRowIndex === nse - 1) {
            $(this).removeClass('layui-table-click')
        }
        //添加高亮类
        if($(this)['context'].sectionRowIndex === nse){
            $(this).addClass('layui-table-click')
            return
        }
    })


}

//鼠标移入
function mouseOver () {
    if(isLock) return;
    $('.audio_wrap').removeClass("FadeInAudio")
    $('.audio_wrap').addClass("FadeOutAudio")
}
// 鼠标移出
let mouseOut = function () {
    if(window.isLock) return;
    $('.audio_wrap').removeClass("FadeOutAudio")
    $('.audio_wrap').addClass("FadeInAudio")
}


let toggleLock = function () {
    window.isLock = !window.isLock
    setClassByLock()

}

//收藏歌曲
let collectSong = function (myListItem,time) {
    layer.confirm('确认收藏该歌曲吗', function(index){
        $.ajax({
            url: "/userMusic/collectSong",
            type: "POST",
            data: {
                songId: rowObj.gObj.data.songId,
                singerId: rowObj.gObj.data.singerId,
                recordId: rowObj.gObj.data.recordId,
                collectTime: time,
                lid: myListItem.id,
                uid: myListItem.uid
            },
            success: function (msg) {
                console.log(msg)
                if (msg.code == 200) {
                    layer.msg("收藏成功~", {icon: 6});
                    // $(".layui-icon-rate").attr("class","layui-icon layui-icon-rate-solid")
                } else {
                    layer.msg("本歌单已存在该歌曲", {icon: 6});
                }
            }
        });
    });
}

export{
    listenTableEvent,
    playSong,
    setClassByLock,
    selectList,
    myItemOver,
    getRowData,
    switchClick,
    mouseOut,
    mouseOver,
    toggleLock,
    collectSong,
    isEnd,
    rowObj
    // songList
}


