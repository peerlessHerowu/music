$(document).ready(function () {

    layui.use(['laytpl','laypage','form','layer','table'], function() {

        var $ = layui.jquery;
        var laytpl = layui.laytpl;
        var table = layui.table;
        var tablet = table.render({
            elem: '#thisSortTable'
            ,where:{sortName:'华语'}
            ,url:'/getAll/getAllSortList'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'listId', title: 'listId'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'title', title: '歌单', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'createName', width:'10%', title: '创建者'}
                ,{field:'createTime', width:'13%', title: '创建时间'}
                ,{field:'sortName', width:'10%', title: '标签'}
                ,{field:'playNum', width:'10%', title: '播放次数'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'22%', title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'暂无歌单哦'
            }
            ,done:function(res,curr,count){
                // 隐藏列
                $(".layui-table-box").find("[data-field='listId']").css("display","none");
            }

        });

        table.on('tool(thisSortTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'more'){
                window.location.href="/playListMore?id="+data.listId
            }else if(layEvent === 'add'){
                layer.alert("添加")
            } else if(layEvent === 'share'){
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        });
    });

})

//查询某类歌单
function searchTishSort(elem) {
    var text = $(elem).children().first().text();
    console.log(text)

    layui.use(['laytpl','laypage','form','layer','table'], function() {

        var $ = layui.jquery;
        var laytpl = layui.laytpl;
        var table = layui.table;
        var tablet = table.render({
            elem: '#thisSortTable'
            ,where:{sortName:text}
            ,url:'/getAll/getAllSortList'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{field:'listId', title: 'listId'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'title', title: '歌单', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'createName', width:'10%', title: '创建者'}
                ,{field:'createTime', width:'13%', title: '创建时间'}
                ,{field:'sortName', width:'10%', title: '标签'}
                ,{field:'playNum', width:'10%', title: '播放次数'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'22%', title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'暂无歌单哦'
            }
            ,done:function(res,curr,count){
                // 隐藏列
                $(".layui-table-box").find("[data-field='listId']").css("display","none");
            }

        });

        table.on('tool(thisSortTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if(layEvent === 'more'){
                //console.log(data.listId)
                window.location.href="/playListMore?id="+data.listId
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
            }
        });
    });

}
