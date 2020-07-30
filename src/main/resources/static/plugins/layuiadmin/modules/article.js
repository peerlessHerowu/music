
layui.define(['table', 'form'], function(exports){
  var $ = layui.$
  ,table = layui.table
  ,form = layui.form;

  //文章管理
  var tagsTable=table.render({
    elem: '#LAY-app-article-list'
    ,url:  '/admin/content/article/list.json' //模拟接口
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field: 'id', width: 80, title: 'ID', sort: true}
      ,{field: 'title', title: '标题', minWidth: 300,sort: true}
      ,{field: 'releaseDate', maxWidth:80, title: '发表时间', sort: true}
      ,{field: 'allowComment', maxWidth:80,title: '允许评论',sort: true,templet:'#switchTpl1'}
      // ,{field: 'draft', title: '草稿', sort: true,templet:'#switchTpl2'}
      ,{title: '操作', width: 200, align: 'center', fixed: 'right', toolbar: '#table-article-list'}
    ]]
      , request: {
          pageName: 'current' //页码的参数名称，默认：page
          , limitName: 'size' //每页数据量的参数名，默认：limit
      }
      , initSort: {
          field: 'releaseDate'
          , type: 'asc'
      }
    ,page: true
    ,limit: 3
    ,limits: [3, 15, 20, 25, 30]
    ,text: '对不起，加载出现异常！'
  });

  //监听工具条
  table.on('tool(LAY-app-article-list)', function(obj){
    var data = obj.data;
    if(obj.event === 'del'){
      layer.confirm('确定删除此分类？', function(index){
        // obj.del();
        Util.post("/admin/content/tag/del",{id:data.id});
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
        var href = "/admin/content/article-add.html?id="+data.id
            ,text =data.title;

        //执行跳转
        // console.log(parent === self );
        var topLayui = parent === self ? layui : top.layui;
        topLayui.index.openTabsPage(href, text);
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


  exports('article', {})
});