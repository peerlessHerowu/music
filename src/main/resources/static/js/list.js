import {
    listenTableEvent,
    playSong,
    rowObj
} from "./commonOpr/operate.js"
// var gObj
// var playSong
// var setClassByLock
//切换到多少首歌曲后
// var d = 0
//每页总歌曲数量
var countSong

//每页的歌曲列表
// let songList =[]

// let isLock = false

//我的歌单列表
// let myList = []
var listObj  = {}
$(document).ready(function(){

    layui.use(['laytpl','laypage','form','layer'], function(){

        var $ = layui.jquery;

        var moreSongTpl;
        $.get('/asset/moreSongTpl.html',function (html) {
            moreSongTpl=html;

            var id = Util.getQueryString('id');
            var param = {listId:id}

            Util.ajax("/moreSong",param,function (data) {
                // console.log("article_count",data)
                listObj = data
                console.log(data)
                var laytpl=layui.laytpl;
                show_table();

                laytpl(moreSongTpl).render(data, function(html){
                    $(".more_song").html(html);
                    //在加载完歌的页面后再次渲染以获得折叠面板的功能性操作
                    layui.use('element', function(){
                        var element = layui.element;
                        element.init();
                    });
                });
            });
        });

    });

    //显示歌曲列表
    function show_table() {
        layui.use('table', function(){
            var $ = layui.jquery;

            var table = layui.table;
            var id =  Util.getQueryString('id');
            // var param = {id:id}
            var tablet = table.render({
                elem: '#thisSortTable'
                ,toolbar: '#operToolbar'
                ,id: 'idTest'
                ,where:{id:id}
                ,url:'/ListSongs'
                ,page: true //开启分页
                , method: 'post'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,cols: [[
                    { type:'checkbox', width:'5%'}
                    ,{type:'numbers',title: 'ID', width: '5%'}
                    ,{field:'songId'}
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
                    none:'没有歌曲啦！！！'
                }
                ,done: function (data) {
                    rowObj.songList = data.data
                    countSong = data.data.length
                    $("[data-field='songId']").css('display','none');
                    table.on('toolbar(thisSortTable)', function(obj){
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
                                break
                            case 'collectList':
                                collectList()
                        };
                    })

                }

            });
            listenTableEvent(table,'tool(thisSortTable)')

        });

    }

});

function collectList() {
    $.get('/userMusic/collectList',listObj,function (data) {
        console.log(data)
            layer.msg(data.data, {icon: 6});
    })
}
