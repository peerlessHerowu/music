
layui.define(['table', 'form'], function(exports){
  var $ = layui.$
  ,table = layui.table
  ,form = layui.form;

  function insertOrUpdate(tagData){
    layer.open({
      type: 2
      ,title: tagData!=null? '编辑分类': '添加分类'
      ,content: 'tagsform.html'
      ,area: ['500px', '250px']
      ,btn: ['确定', '取消']
      ,success: tagData==null? null : function(layero, index){
        //给表单元素赋值
        // console.log(data);
        var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags");
        othis.find('input[name="id"]').val(tagData.id);
        othis.find('input[name="tagName"]').val(tagData.tagName);
        othis.find('input[name="orderNum"]').val(tagData.orderNum);
      }
      ,yes: function(index, layero){
        //获取iframe元素的值
        var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags");
        var id=othis.find('input[name="id"]').val();
        var tagName=othis.find('input[name="tagName"]').val();
        var orderNum=othis.find('input[name="orderNum"]').val();
        // console.log(id);
        Util.post("/admin/content/tag/insertOrUpdate",
            {
                id:id,
                tagName:tagName,
                orderNum:orderNum
            });

        // if(!tags.replace(/\s/g, '')) return;
        //
        // obj.update({
        //   tags: tags
        // });
        layer.close(index);
        // table.reload('LAY-app-content-tags');
      }
    });
  }


  //分类管理
  var tagsTable=table.render({
    elem: '#LAY-app-content-tags'
    ,url:  '/admin/content/tag/list.json' //模拟接口
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field: 'id', width: 100, title: 'ID', sort: true}
      ,{field: 'tagName', title: '分类名', minWidth: 100,sort: true}
      ,{field: 'orderNum', title: '排序', minWidth: 30,sort: true}
      ,{title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#layuiadmin-app-cont-tagsbar'}
    ]]
      , request: {
          pageName: 'current' //页码的参数名称，默认：page
          , limitName: 'size' //每页数据量的参数名，默认：limit
      }
      , initSort: {
          field: 'orderNum'
          , type: 'asc'
      }
    ,page: true
    ,limit: 3
    ,limits: [3, 15, 20, 25, 30]
    ,text: '对不起，加载出现异常！'
  });

  //监听工具条
  table.on('tool(LAY-app-content-tags)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('确定删除此分类？', function(index){
        // obj.del();
        Util.post("/admin/content/tag/del",{id:data.id});
        layer.close(index);
        // table.reload('LAY-app-content-tags');
      });
    } else if(obj.event === 'edit'){
      insertOrUpdate(data);
    }
  });

  $('#btn-tags-add').on('click', function(){
    insertOrUpdate(null);
  });

    $('#btn-tags-batchdel').on('click', function(){
        var checkStatus = table.checkStatus('LAY-app-content-tags')
            ,data = checkStatus.data;
        var idarr=data.map( x => {return x.id});
        console.log(idarr);

        Util.post("/admin/content/tag/delbatch",{ids:idarr.join(",")});
        // table.reload('LAY-app-content-tags');
        // var arr = [];
        // for (var i = 0; i < data.length; i++) { //循环筛选出id
        //     arr.push(data[i].id);
        // }
        // console.log(arr);

    });

    table.on('sort(LAY-app-content-tags)', function (obj) {
        table.reload('LAY-app-content-tags',{
            initSort: obj
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
            , where: {
                sort: obj.field
                , order: obj.type
            }
        });

    });


  exports('tags', {})
});