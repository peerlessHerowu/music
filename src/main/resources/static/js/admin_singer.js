$(document).ready(function () {
    layui.use(['laytpl','laypage','form','layer','table'], function() {

        var $ = layui.jquery;
        var laytpl = layui.laytpl;
        var table = layui.table;
        var tablet = table.render({
            elem: '#thisSortTable'
            ,url:'/getAll/getAllSinger'
            ,page: true //开启分页
            , method: 'post'
            //,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,cols: [[
                {type:'checkbox', width:'5%'}
                ,{type:'numbers', width: '5%'}
                //,{ field: 'id', width: '5%', title: 'ID', sort: true }
                ,{title: '头像', width: 80, templet: '#temp_img', field: 'imgSrc'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'title', title: '歌手', width: '25%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增,
                ,{field:'intro', width:'30%', title: '歌手介绍'}
                // ,{field:'时长', width:'20%', title: '时长'},
                ,{field:'right', width:'22%', title: '操作',toolbar:'#operateToolBar',align:'center'}
            ]]
            ,limit: 10
            ,limits: [5, 10,15, 20, 25, 30]
            ,text:{
                none:'暂无歌手哦'
            }
            // ,done:function(res,curr,count){
            //     // 隐藏列
            //     $(".layui-table-box").find("[data-field='imgSrc']").css("display","none");
            // }

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

});