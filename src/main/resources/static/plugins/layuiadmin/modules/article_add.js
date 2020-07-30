
layui.define(['form','upload', 'element', 'admin'], function (exports) {
    var $ = layui.$,
        element = layui.element,
        form = layui.form,
        upload = layui.upload;



    console.log("before reder form and kineditor");
    element.render();
    form.render();

    Util.ajax("/admin/content/article/tag.json",{},function (resp) {
        console.log(resp.data)
        var data=resp.data;
        $.each(data, function (index, item) {
            $('#tag_id_select').append(new Option(item.tagName, item.id));
        });
        form.render();
    });





    KindEditor.options.filterMode = false;
    var editor = KindEditor.create('#editor', {
        cssData: 'body {font-family: "Helvetica Neue", Helvetica, "PingFang SC", 微软雅黑, Tahoma, Arial, sans-serif; font-size: 14px}',
        width: "auto",
        height: "600px",
        items: [
            'source', 'preview', 'undo', 'redo', 'code', 'cut', 'copy', 'paste',
            'plainpaste', 'wordpaste', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', 'clearhtml', 'quickformat', 'selectall', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'image', 'graft',
            'insertfile', 'table', 'hr', 'emoticons', 'pagebreak',
            'link', 'unlink', 'about', 'br'
        ],
        uploadJson: '/admin/upload?reqType=nk',
        dialogOffset: 0, //对话框距离页面顶部的位置，默认为0居中，
        allowImageUpload: true,
        allowMediaUpload: true,
        themeType: 'black',
        fixToolBar: true,
        autoHeightMode: true,
        filePostName: 'file',//指定上传文件form名称，默认imgFile
        resizeType: 1,//可以改变高度
        afterCreate: function () {
            var self = this;
            KindEditor.ctrl(document, 13, function () {
                self.sync();
                K('form[name=example]')[0].submit();
            });
            KindEditor.ctrl(self.edit.doc, 13, function () {
                self.sync();
                KindEditor('form[name=example]')[0].submit();
            });
        },
        //错误处理 handler
        errorMsgHandler: function (message, type) {
            // try {
            //     JDialog.msg({type: type, content: message, timer: 2000});
            // } catch (Error) {
                alert(message);
            // }
        }
    });

    var $titleInput = $("input[name=title]");

    var post = function (data, draft, msg) {
        console.log(data.field);
        data.field.draft = draft;
        // data.field.cateIds = formSelects.value('cateId', 'val');
        data.field.content = editor.html();
        data.field.summary=editor.text().substr(0,200);
        Util.post("/admin/content/article/add", data.field);
        console.log(editor.text());
    };

    //监听提交9
    form.on('submit(postSubmit)', function (data) {
        post(data, false, "发布博文成功！");
        return false;
    });

    form.on('submit(draftSubmit)', function (data) {
        post(data, true, "保存草稿成功！");
        return false;
    });

    console.log("***"+window.location.search);
    var article_id=Util.getQueryString("id");
    console.log("article_id="+article_id);
    if(article_id==='?') article_id=null;
    if(article_id!=null){
        Util.ajax("/admin/content/article/edit",{id:article_id},function (resp) {
            console.log(resp.data)
            var data=resp.data;

            //form-article 即 class="layui-form" 所在元素对应的 lay-filter="form-article" 对应的值
            form.val("form-article", {//表单回显
                "id": data.id,  //"name": "value",就是表单元素的name
                'tag_id':data.tag_id,
                "title": data.title,
                "allowComment": data.allowComment,
            });
            editor.html(data.content);
            form.render();
        });

    }
    console.log("after reder form and kineditor");


    exports('article_add', {});
});


function isTop(iframeBody) {
    var stop = $(iframeBody).scrollTop();
    if (stop > 0) {
        $("i[name=fullscreen]").parents("li").hide();
    } else {
        $("i[name=fullscreen]").parents("li").show();
    }
}

