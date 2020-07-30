
//点击查看更多按钮后跳转到这个界面立即执行此函数
$(document).ready(function () {
        layui.use(['laytpl','laypage','form','layer'], function(){

            var $ = layui.jquery;
            var laytpl=layui.laytpl;

            var moreSongTpl;
            $.get('/asset/moreSongTpl.html',function (html) {
                moreSongTpl=html;
                Util.ajax("/moreSongs",{listId:listId},function(data){
                    var laytpl=layui.laytpl;
                    show_table();

                    laytpl(moreSongTpl).render(data, function(html){
                        $(".more_songs").html(html);
                        //在加载完歌的页面后再次渲染以获得折叠面板的功能性操作
                        layui.use('element', function(){
                            var element = layui.element;
                            element.init();
                        });
                    });

                })

            });
            //某一个歌单对应的listId
            var listId = Util.getQueryString("id");


        });
    //显示歌曲列表
    function show_table() {
        layui.use('table', function(){
            console.log("开始渲染啦")
            var table = layui.table;
            var id = Util.getQueryString('id');
            // var param = {id:id}
            var tablet = table.render({
                elem: '#thisSortTable'
                ,where:{id:id}
                ,url:'/allListSongs'
                ,page: true //开启分页
                , method: 'post'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,cols: [[
                    {type:'checkbox', width:'5%'}
                    ,{type:'numbers', width: '5%'}
                    //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                    ,{field:'songTitle', width:'45%', title: '歌曲标题'}
                    ,{field:'sortName', width:'30%', title: '类别'}
                    // ,{field:'recordName', title: '专辑', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                    // ,{field:'时长', width:'20%', title: '时长'},
                    ,{field:'right', width:'15%', title: '操作',toolbar:'#operateToolBar',align:'center'}
                ]]
                ,limit: 10
                ,limits: [5, 10,15, 20, 25, 30]
                ,text:{
                    none:'没有歌曲了~'
                }
            });

            table.on('tool(thisSortTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                var data = obj.data; //获得当前行数据
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                if(layEvent === 'play'){
                    console.log(data.id)
                    playSong(data.songId);
                } else if(layEvent === 'add'){ //编辑
                    layer.alert("添加")
                } else if(layEvent === 'share'){
                    layer.alert('Hi，头部工具栏扩展的右侧图标。');
                }
            });
        });

    }


    //控制播放音乐
    function playSong(id) {
        //alert(id)
        layui.use(['laytpl','laypage', 'form', 'layer'], function (laytpl) {
            var $ = layui.jquery;
            //控制显示歌的控制块
            var data = {"srcId": "http://music.163.com/song/media/outer/url?id="+id+".mp3"};
            console.log(data.srcId)
            laytpl(playSongTpl.innerHTML).render(data, function (html) {
                $('#play_music').html(html);
            });
            $.ajax({
                type: "get",//请求方式
                url: "http://music.163.com/api/song/media?id="+id,//地址，就是json文件的请求路径
                dataType: "JSONP",//数据类型可以为 text xml json  script  jsonp
                success: function(data){//返回的参数就是 action里面所有的有get和set方法的参数
                    console.log(data)
                    laytpl(songWordTpl.innerHTML).render(data, function(html){
                        if(data["lyric"]==null){
                            data.lyric="暂时没有歌词哦！"
                        }
                        $("#music_word").html(html);
                    });
                }
            });
        });

    }

})



function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]);
    return null;
}