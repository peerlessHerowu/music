# music


## 项目介绍

　　基于Spring Boot+MyBatis和前端框架layui实现的音乐网站，内含近两万条歌单，各类歌单的歌曲数量共两百二十万首，六万多张专辑，这些数据来源于网易云。该网站包含歌曲、歌单管理，列表播放和搜索歌曲等功能。
 
## 项目架构
　　Spring Boot+SSM+HTML+CSS+JS+JQuery+Ajax+Layui+MySQL+Redis

## 项目内容
### 登录和注册

- 前端使用用户名、密码和验证码进行注册，注册成功后进入登陆界面。
- 登录后将用户名存入cookie，用以在主页或其他界面回显用户名。
- 退出登陆后清除cookie

### 首页
- 展示十六个热门歌单、当红艺人，点击切换按钮会刷新这十六个歌单或艺人。
- 点击某一歌单或歌手，将进入相应歌曲列表界面，在这个界面，展示歌单或歌手的详细信息，可以进行歌曲的下载、播放，收藏歌曲到“我的歌单”，也可以收藏整个歌单。


### 歌单
- 该界面分类显示所有歌单，使用Layui的水平导航菜单进行分类展示。
- 由于歌单数量较多，这里使用了Redis进行缓存不同分类的的歌单数据，加快了查找效率
- 点击不同菜单可以查看该歌单下的所有歌曲。使用的都是Layui的数据表格。
- 所有的歌单的歌曲共两百多万首，为了加快对某一歌单的歌曲的查询速度，为表的listId字段建立索引，大大加快了查询速度。

### 我的音乐

- 要进入这个界面，需要先登录，其中使用了拦截器进行是否登陆的判断，未登录将显示一个提示未登陆的信息。
- 这个界面可以创建“我的歌单”、查看最近播放和“我的收藏”。

### 搜索

- 输入关键字，可以按照歌曲、歌手、歌单、专辑进行模糊查询，并使用Layui的面板组件和数据表格，将结果进行展示。

## 问题与总结
1.Layui对于实现用户交互的效果不友好，比如实现数据表格中的歌曲播放自动切换的效果，获取下一行数据比较麻烦。  
2.实现歌曲下载功能时使用的是HttpURLConnection，比较慢。  
3.在动态为按钮添加点击事件时要注意添加off清除事件后再添加事件，否则会重复导致事件重复触发。
