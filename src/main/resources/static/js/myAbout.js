
import {
    listenTableEvent,
    playSong,
    rowObj
} from "./commonOpr/operate.js"
$(document).ready(function () {
    getMusic('/userMusic/getRecentPlay',{})
    createList()
    $('#getRecentMusic')[0].addEventListener('click',getRecentMusic)
    $('#getList')[0].addEventListener('click',getList)
    $('#getMyList')[0].addEventListener('click',getMyList)

});
function getRecentMusic() {
    getMusic('/userMusic/getRecentPlay',{})
}
//获得最近播放歌曲并显示
function getMusic(url,data) {
    layui.use(['laytpl','laypage','form','layer','table'], function(){
        var table = layui.table;

        console.log(data)
        var tablet = table.render({
            elem: '#havedPlaytable'
            ,toolbar: '#operToolbar'
            ,url:url
            ,page: true //开启分页
            , method: 'post'
            ,where:data
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                ,{field:'songId'}

                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'songTitle', width:'22%', title: '歌曲标题'}
                ,{field:'singerName', width:'18%', title: '歌手'}
                ,{field:'recordName', title: '专辑', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:150, title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'最近还没听过歌？快去听听吧'
            }
            ,done: function (data) {
                console.log(data)
                rowObj.songList = data.data
                $("[data-field='songId']").css('display','none');
                table.on('toolbar(havedPlaytable)', function(obj){
                    switch(obj.event){
                        case 'playSelected':
                            console.log(data.data)
                            rowObj.d = 0
                            rowObj.gObj = undefined
                            var d=new Date();
                            var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                            playSong(rowObj.songList[ rowObj.d].songId,
                                rowObj.songList[ rowObj.d].songTitle,
                                datetime);
                            $("#play_music").attr("class","layui-colla-content layui-show");
                            $("#music_word").attr("class","layui-colla-content layui-show");
                            break;
                    };
                })

            }
        });

        listenTableEvent(table,'tool(havedPlaytable)')
    });

}

function  getList(){
    layui.use(['laytpl','laypage','form','layer','table'], function(){
        var table = layui.table;

        var tablet = table.render({
            elem: '#havedPlaytable'
            ,url:'/userMusic/getMyCollectList'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                ,{field:'listId'}
                ,{field:'title', width:'20%', title: '歌单标题'}
                ,{field:'sortName', width:'10%', title: '标签'}
                ,{field:'playNum', title: '播放量', width: '10%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'createTime', width:'30%', title: '创建时间'},
                ,{field:'right', width:'20%', title: '操作',toolbar:'#songsOfList',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'没有更多了~~'
            }
            ,done: function (data) {
                console.log(data)
                rowObj.songList = data.data
                $("[data-field='listId']").css('display','none');
                table.on('tool(havedPlaytable)', function(obj){
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

                    console.log(data)
                    if(layEvent === 'more'){
                        window.location.href="/allPlayListSong?id="+data.listId
                    }else if(layEvent === 'add'){
                        layer.alert("该功能敬请期待~~")
                    }
                })

            }
        });

    });

}

//新建歌单
function createList() {

    layui.use(['laytpl','laypage','form','layer','table'], function() {
        var $ = layui.jquery, layer = layui.layer;
        var active  = {
            createList: function(){
                console.log('lll')
                //示范一个公告层
                layer.open({
                    type: 1
                    ,title: '新增歌单'
                    ,closeBtn: false
                    ,area: ['500px','200px']
                    ,shade: 0.5
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定', '取消']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content:' <input type="text" id="listName" name="title"\n' +
                        '               lay-verify="title" autocomplete="off" \n' +
                        '               placeholder="请输入歌单" class="layui-input"\n' +
                        '                style="width: 400px; margin: 25px auto"\n' +
                        '        >'
                    ,success: function(layero){
                        var btn = layero.find('.layui-layer-btn');
                        // btn.find('.layui-layer-btn0').attr({
                        //     onclick: 'insertList()'
                        // });
                        btn.find('.layui-layer-btn0')[0].addEventListener('click',insertList)
                    }
                });
            }
        }
        $('#createList .createList').on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    })

}
//发送请求创建歌单
function insertList() {
    var  listName= $("#listName").val();
    var d=new Date();
    var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    //存入数据库
    $.ajax({
        url: "/userMusic/createNewList",
        type: "POST",
        data: {listName:listName,created:datetime},
        success: function (msg) {
                getMyList()

        }
    });
}

//获得歌手收藏列表
function lookSong() {
     // $(".layui-icon-rate").attr("class","")
    layui.use(['laytpl','laypage','form','layer','table'], function(){

        var $ = layui.jquery;
        var laytpl=layui.laytpl;
        var table = layui.table;

        var tablet = table.render({
            elem: '#havedPlaytable'
            ,url:'/userMusic/getCollectSong'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'songName', width:'27%', title: '歌曲标题'}
                ,{field:'singerName', width:'18%', title: '歌手'}
                ,{field:'recordName', title: '专辑', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:150, title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'您最近暂时没有收藏歌曲哦，快去看看吧~'
            }
        });

        table.on('tool(havedPlaytable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'play'){
                console.log(data)
                console.log(data.id)
                var d=new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                playSong(data.songId,datetime,data.songName,"#play_music","#music_word");
            } else if(layEvent === 'download'){
                // window.location.href = "http://music.163.com/song/media/outer/url?id="+data.songId+".mp3";
                //window.location.href = "/download?fileName=a.mp3&filePath=a.mp3";
                window.location.href = "/todownload?url="+"http://music.163.com/song/media/outer/url?id="+data.songId+".mp3"+"&name="+data.songName;
            } else if(layEvent === 'add'){
                layer.alert("添加")
            } else if(layEvent === 'collect'){
            }
            else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            } else if(layEvent === 'delete'){
                layer.confirm('真的删除么', function(index){
                    $.ajax({
                        url: "/userMusic/deleteCollectSong",
                        type: "POST",
                        data: {songId:data.songId},
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
                    });;
                });
            }
        });
    });
}

// 获得我的歌单列表
function getMyList() {
    layui.use(['laytpl','laypage','form','layer','table'], function(){
        var table = layui.table;

        var tablet = table.render({
            elem: '#havedPlaytable'
            ,url:'/userMusic/getAllList'
            ,page: true //开启分页
            , method: 'get'
            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                { type:'checkbox', width:'5%'}
                ,{type:'numbers',title: 'ID', width: '5%'}
                ,{field:'listName', width:'25%', title: '歌单标题'}
                ,{field:'songNum', width:'20%', title: '总歌曲'}
                ,{field:'created', title: '创建时间', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'right', width:'20%', title: '操作',toolbar:'#delete',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'暂无歌单'
            }
        });

        //监听行单击事件（双击事件为：rowDouble）
        //选择一个歌单点击后刷新表格
        table.on('row(havedPlaytable)', function(obj){
            var data = obj.data;
            getMusic('/userMusic/getMusicOfMyList',{id:data.id,uid:data.uid})

            console.log(data)
            //标注选中样式
            obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        });


    });

}