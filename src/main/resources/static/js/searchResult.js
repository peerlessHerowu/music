$(document).ready(function(){
     // var key=$("#keySearch")

    //默认显示的查询的歌曲结果，命名以songKey，keySearch为默认，其他三个加上相应的标识命名
    var key = Util.getQueryString("keySearch");
     console.log(key);
     $("#searchKey").val(key)
    //alert("daole")
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var tablet = table.render({
            elem: '#song_table'
            ,where:{keySearch:key}
            ,url:'/search/songSearch'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'songTitle', width:'27%', title: '歌曲标题'}
                ,{field:'singerName', width:'18%', title: '歌手'}
                ,{field:'recordName', title: '专辑', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:150, title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'暂时没有该歌曲哦'
            }
        });

        table.on('tool(songTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            console.log(obj);
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                
                //$("tr[data-index$='0'] .layui-icon-play").attr("class","layui-icon layui-icon-pause")
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                // console.log(datetime)
                playSong(data.songId,datetime,data.songTitle,"#play_music","#music_word");
                $("#play_music").attr("class","layui-colla-content layui-show");
                $("#music_word").attr("class","layui-colla-content layui-show");
            } else if(layEvent === 'download'){
                // window.loca                    window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songName;tion.href = "http://music.163.com/song/media/outer/url?id="+data.songId+".mp3";
                //window.location.href = "/download?fileName=a.mp3&filePath=a.mp3";
            } else if(layEvent === 'add'){
                layer.alert("添加")
            } else if(layEvent === 'collect'){
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                collectSong(data.songId,datetime);
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });
    });

});

//控制播放音乐
function playSong(id,time,name,id1,id2) {
    //alert(id)
    layui.use(['laytpl','laypage', 'form', 'layer'], function (laytpl) {
        var $ = layui.jquery;

        //控制显示歌的控制块
        var data = {"srcId": "http://music.163.com/song/media/outer/url?id="+id+".mp3","name":name};
        console.log(data.srcId)
        laytpl(playSongTpl.innerHTML).render(data, function (html) {
            $(id1).html(html);
        });

        $.ajax({
            type: "get",//请求方式
            url: "http://music.163.com/api/song/media?id="+id,//地址，就是json文件的请求路径
            dataType: "JSONP",//数据类型可以为 text xml json  script  jsonp
            success: function(data){//返回的参数就是 action里面所有的有get和set方法的参数
                console.log(data);
                laytpl(songWordTpl.innerHTML).render(data, function(html){
                    if(data["lyric"]==null){
                        data.lyric="暂时没有歌词哦！"
                    }
                    else{
                        console.log(data["lyric"])
                        //data["lyric"].replace(/\[([^\[\]]*)\]/g,'</br>')
                        data["lyric"].replace(/'\n'/g,'<br>')
                    }
                    $(id2).html(html);
                });
                $.ajax({
                    type:"post",
                    data:{songId:id,playTime:time},
                    url:"/userMusic/saveRecentPlay",
                    success:function(data) {
                        console.log("保存")
                    }
                });
            }
        });
    });

}

//收藏歌曲
function collectSong(id,time) {
    layer.confirm('确认收藏该歌曲吗', function(index){
        $.ajax({
            url: "/userMusic/collectSong",
            type: "POST",
            data: {songId:id,collectTime:time},
            success: function (msg) {
                if (msg == 200) {
                    layer.msg("收藏成功~", {icon: 6});
                   // $(".layui-icon-rate").attr("class","layui-icon layui-icon-rate-solid")
                } else {
                    layer.msg("您已经收藏啦", {icon: 6});
                }
            }
        });
    });
}

//点击切换查询单曲
function songSearchResult() {
    //默认显示的查询的歌曲结果，命名以songKey，keySearch为默认，其他三个加上相应的标识命名
    var key = Util.getQueryString("keySearch");
    console.log(key);
    $("#searchKey").val(key)
    //alert("daole")
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var tablet = table.render({
            elem: '#song_table'
            ,where:{keySearch:key}
            ,url:'/search/songSearch'
            ,page: true //开启分页
            , method: 'post'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'songTitle', width:'20%', title: '歌曲标题'}
                ,{field:'singerName', width:'25%', title: '歌手'}
                ,{field:'recordName', title: '专辑', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'15%', title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            // ,initSort: {
            //     field: 'id' //排序字段，对应 cols 设定的各字段名
            //     ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            // }
            ,text:{
                none:'暂时没有该歌曲哦'
            }
        });

        table.on('tool(songTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                console.log(data)
                console.log(data.id)
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                playSong(data.songId,datetime,data.songTitle,"#play_music","#music_word");
                $("#play_music").attr("class","layui-colla-content layui-show");
                $("#music_word").attr("class","layui-colla-content layui-show");
            } else if(layEvent === 'download'){ //删除
                window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songTitle;

            } else if(layEvent === 'add'){ //编辑
                layer.alert("添加")
            } else if(layEvent === 'collect'){
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                collectSong(data.songId,datetime);
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });

    });

}
//查询的歌手结果
function singerSearchResult() {

    var key = Util.getQueryString("keySearch");
    console.log(key);
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var tablet = table.render({
            elem: '#singer_table'
            ,where:{singerKeySearch:key}
            ,url:'/search/singerSearch'
            ,page: true //开启分页
            , method: 'post'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'singerName', width:'25%', title: '歌手'}
                ,{field:'songTitle', width:'20%', title: '歌曲标题'}
                ,{field:'recordName', title: '专辑', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'15%', title: '操作',toolbar:'#operateSingerToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            // ,initSort: {
            //     field: 'id' //排序字段，对应 cols 设定的各字段名
            //     ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            // }
            ,text:{
                none:'暂时没有该歌手哦'
            }
        });
        table.on('tool(singerTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                console.log(data)
                console.log(data.id)
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                playSong(data.songId,datetime,data.songTitle,"#play_music2","#music_word2");
                $("#play_music").attr("class","layui-colla-content2 layui-show2");
                $("#music_word").attr("class","layui-colla-content2 layui-show2");
            } else if(layEvent === 'download'){ //删除
                window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songTitle;
            } else if(layEvent === 'add'){ //编辑
                layer.alert("添加")
            } else if(layEvent === 'collect'){
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                collectSong(data.songId,datetime);
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });

    });


}
//查询专辑的结果
function recordSearchResult() {
    var key = Util.getQueryString("keySearch");
    console.log(key);
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var tablet = table.render({
            elem: '#record_table'
            ,where:{recordKeySearch:key}
            ,url:'/search/recordSearch'
            ,page: true //开启分页
            , method: 'post'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'recordName', title: '专辑', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'singerName', width:'25%', title: '歌手'}
                ,{field:'songTitle', width:'20%', title: '歌曲标题'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'15%', title: '操作',toolbar:'#operateRecordToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            // ,initSort: {
            //     field: 'id' //排序字段，对应 cols 设定的各字段名
            //     ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            // }
            ,text:{
                none:'暂时没有该专辑哦'
            }
        });
        table.on('tool(recordTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                console.log(data)
                console.log(data.id)
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                playSong(data.songId,datetime,data.songTitle,"#play_music3","#music_word3");
                $("#play_music").attr("class","layui-colla-content3 layui-show3");
                $("#music_word").attr("class","layui-colla-content3 layui-show3");
            } else if(layEvent === 'download'){ //删除
                window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songTitle;
            } else if(layEvent === 'add'){ //编辑
                layer.alert("添加")
            } else if(layEvent === 'collect'){
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                collectSong(data.songId,datetime);
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });

    });
}

//查询歌单的结果
function listSearchResult() {
    var key = Util.getQueryString("keySearch");
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var id = 0
        var tablet = table.render({
            elem: '#list_table'
            ,where:{
                playListKeySearch:key,

            }
            ,url:'/search/playListSearch'
            ,page: true //开启分页
            , method: 'post'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'title', title: '歌单', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'createName', width:'10%', title: '创建者'}
                ,{field:'sortName', width:'10%', title: '标签'}
                ,{field:'songTitle', width:'20%', title: '歌曲标题'}
                ,{field:'playNum', width:'10%', title: '播放次数'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'15%', title: '操作',toolbar:'#operateListToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            // ,initSort: {
            //     field: 'id' //排序字段，对应 cols 设定的各字段名
            //     ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            // }
            ,text:{
                none:'没有更多歌单了哦'
            }

        });
        table.on('tool(listTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                console.log(data)
                console.log(data.id)
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                playSong(data.songId,datetime,data.songTitle,"#play_music4","#music_word4");
                $("#play_music").attr("class","layui-colla-content4 layui-show4");
                $("#music_word").attr("class","layui-colla-content4 layui-show4");
            } else if(layEvent === 'download'){ //删除
                window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songTitle;
            } else if(layEvent === 'add'){ //编辑
                layer.alert("添加")
            } else if(layEvent === 'collect'){
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                collectSong(data.songId,datetime);
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });

    });
}
function listSearchResult2() {
    dataLists(1, 10)

}
//页面第一次请求 默认 1页  10条
function dataLists(pageNum, numPerPage) {
    var key = Util.getQueryString("keySearch");

    $.post('/search/playListSearch', {
        playListKeySearch:key,
        page: pageNum, // 页码数
        limit: numPerPage // 每页条数
    }, function (data) {
        console.log(data)
        // let datalist = JSON.parse(data)
        dataList(data)  // 数据传到 table组件
        page(data)      // 数据传到 分页组件
    })
}

function page(data) {
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        laypage.render({
            elem: 'page', //注意，这里的 page 是 ID，不用加 # 号
            count: data.count, //数据总数，从服务端得到
            limit: data.limit,  // 每页条数
            limits: [5, 10,15, 20, 25, 30],
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function (obj, first) {
                console.log(data.data[data.limit].id)
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    //do something
                    numpage(data.data[0].id,obj.curr, obj.limit)  // 分页点击传参
                }
            }
        });
    })


}
// 点击分页后发送请求
function numpage(id,pageNum, numPerPage) {
    var key = Util.getQueryString("keySearch");

    $.post('/search/playListSearch', {
        id:id,
        playListKeySearch:key,
        page: pageNum,
        limit: numPerPage
    }, function (data) {
        // let datalist = JSON.parse(data)
        dataList(data)  // 传到table组件
    })
}

// 表格渲染
function dataList(data) {

    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var table = layui.table;
        table.render({
            elem: '#list_table'
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'title', title: '歌单', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'createName', width:'10%', title: '创建者'}
                ,{field:'sortName', width:'10%', title: '标签'}
                ,{field:'songTitle', width:'20%', title: '歌曲标题'}
                ,{field:'playNum', width:'10%', title: '播放次数'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'15%', title: '操作',toolbar:'#operateListToolBar',align:'center'}
            ]],
            page: true ,//开启分页
            data: data.data, // 数据
            limit: data.limit, // 显示的条数
            //page: true, // 开启分页
        });
    });


}

