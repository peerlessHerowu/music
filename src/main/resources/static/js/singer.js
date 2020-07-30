import {
    listenTableEvent,
    playSong,
    rowObj
} from "./commonOpr/operate.js"
$(document).ready(function () {
    layui.use(['laytpl', 'laypage', 'form', 'layer'], function (laytpl) {
        var $ = layui.jquery
        var singerMoreTpl;
        $.get('/asset/singerMoreTpl.html', function (html) {
            singerMoreTpl = html;
            // 歌手相关
            var id = Util.getQueryString('id');
            var param = {singerId: id};

            Util.ajax("/singerMore", param, function (data) {
                // console.log("article_count",data);
                console.log(data);
                showTable()
                laytpl(singerMoreTpl).render(data, function (html) {
                    $(".singer_more").html(html);
                    //在加载完歌的页面后再次渲染以获得折叠面板的功能性操作
                    layui.use('element', function () {
                        var element = layui.element;
                        element.init();

                    });
                });
                laytpl(singerIntro.innerHTML).render(data, function (html) {
                    $(".singer_intro").html(html);
                });
            });

        });

        function showTable() {
            layui.use('table', function () {
                var table = layui.table;

                var id = Util.getQueryString('id');
                //var param = {singerId:id}
                table.render({
                    elem: '#song_table'
                    ,toolbar: '#operToolbar'
                    , where: {singerId: id}
                    , url: '/popularSongs'
                    , page: true //开启分页
                    , method: 'post'
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type:'checkbox', width:'5%'}
                        ,{type:'numbers',title: 'ID', width: '5%'}
                        , {field: 'songId'}
                        , {field: 'songTitle', width: '35%', title: '歌曲标题'}
                        , {field: 'recordName', title: '专辑', width: '35%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                        , {field: 'right', width: '20%', title: '操作', toolbar: '#operate', align: 'center'}
                    ]]
                    , limit: 10
                    , limits: [5, 15, 10, 20, 25, 30]
                    // , initSort: {
                    //     field: 'id' //排序字段，对应 cols 设定的各字段名
                    //     , type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
                    // }
                    , text: {
                        none: '没有歌曲啦！！！'
                    }
                    ,done: function (data) {
                        rowObj.songList = data.data
                        // countSong = data.data.length
                        $("[data-field='songId']").css('display','none');
                        table.on('toolbar(songTable)', function(obj){
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
                            };
                        })

                    }

                });
                listenTableEvent(table,'tool(songTable)')
            });

        }
    });
});
