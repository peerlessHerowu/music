
var Util = {
//读取cookies
    getCookie:function (name)
    {
        var cookies = document.cookie;
        console.log(cookies)
        var list = cookies.split("; ");          // 解析出名/值对列表

        for(var i = 0; i < list.length; i++) {
            var arr = list[i].split("=");          // 解析出名和值
            if(arr[0] == name)
                return decodeURIComponent(arr[1]);   // 对cookie值解码
        }
        return "";
    },
    status: {
        ok: 200
    }

    , url: {
        prefix: "/management"
        , manage_index: "/management/index"
        , login: "/login"
    }

    , browser: {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) === " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    , request: function (url, data, success) {
        layui.$.ajax({
            type: 'post'
            , dataType: 'json'
            ,async:false
            , url: url
            , data: data
            , success: success
            , error: function () {
                layer.msg("发生未知错误！");
            }
        })
    }

    , ajax: function (url, data, success) {
        layui.$.ajax({
            type: 'post'
            , dataType: 'json'
            , url: url
            , data: data
            , success: success
            , error: function () {
                layer.msg("发生未知错误！");
            }
        })
    }
    , get: function (url, data, success) {
        layui.$.ajax({
            type: 'get'
            , dataType: 'json'
            , url: url
            , data: data
            , success: success
            , error: function () {
                layer.msg("发生未知错误！");
            }
        })
    }
    , post: function (url, pData) {
        layui.$.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: pData,
            success: function (resp) {
                layer.msg(resp.message);
                setTimeout(function () {
                    if (resp.code === 200 || resp.code === -1) {
                        location.reload();
                    }
                }, 1000);
            }, error: function (xhr, err, ex) {
                layer.msg(xhr.responseJSON.message)
            }
        })
    }


    , okMsgHandle: function (json, ok) {
        if (json.code === NBV5.status.ok) {
            var okMsg = ok !== undefined ? ok : json.message;
            layer.msg(okMsg);
        } else {
            layer.msg(json.message);
        }
    }


    , okHandle: function (json, index, tableId, ok) {
        if (json.code === Util.status.ok) {
            var okMsg = ok !== undefined ? ok : json.message;
            layer.msg(okMsg);
            if (index)
                layer.close(index);
            if (tableId)
                layui.table.reload(tableId);
        } else {
            layer.msg(json.message);
        }
    }

    , getQueryString: function (name) {
        // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        // if (r != null) {
        //     return unescape(r[2]);
        // } else {
        //     return null;
        // }
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null) return  decodeURI(r[2]);
        return null;
    }

};