# Btools

[![LICENSE](https://img.shields.io/github/license/imba97/Btools.svg)](https://github.com/imba97/Btools/blob/master/LICENSE)
[![chrome-web-store](https://img.shields.io/chrome-web-store/users/codgofkgobbmgglciccjabipdlgefnch.svg)](https://chrome.google.com/webstore/detail/take-webpage-screenshots/codgofkgobbmgglciccjabipdlgefnch)
[![github-releases](https://img.shields.io/github/downloads/imba97/Btools/total.svg)](https://github.com/imba97/Btools/releases)
[![website](https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=website)](http://g.imba97.cn)


#### 首先感谢：[【干货】Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
#### 这个教程给了我很大帮助

## 介绍
Btools(逼砣)，本插件主要目的是以B站为主的网站页面优化，增强用户体验，有方便快捷的功能。

## 功能介绍

### 查看B站收藏夹失效视频 (viv)
插件开启后查看收藏夹，会自动将失效视频显示出来，点击失效视频会自动根据视频标题搜索视频。
这里说明这个方法并不能还原B站的视频，因为B站已经将视频文件删除、或者设置了不可访问的权限。我想能做的只有搜索了。

### 直播助手 (liveHelper)

##### `直播助手 > 隐藏显示PK分数`
顾名思义，因为有时候PK分数窗口会挡住视频的精♂彩内容。

##### `直播助手 > 隐藏迷你播放器`
顾名思义×2，有时候迷你播放器有点烦。

##### `直播助手 > 盲人模式`
顾名思义×3，隐藏直播画面，只听声音。我怕不是有毒。

### 转发抽奖 (european)
至于为什么要做这个，如果想用B站的转发抽奖，首先你得是1万粉丝以上的认证用户。这个的话可以让所有人都能用，虽然功能方面不如官方的（目前完善的距离官方还差两步，一是Btools还不能判断转发者是否关注了你，二是不支持人数太多，500以上可能加载的时候会出问题，大概吧）

### 获取专题文章中的URL (getUrl)
发布专栏文章时如果作者选了禁止转载，文章内的文字是不能被选中的，加上文章内的超链接只能链接B站站内的地址，所以外部链接不能选中又不能点击，打开这些链接就很困难。只能用“审查元素”这种办法，通过网页代码找到超链接打开，但很少人会用。

### 获取视频封面 (openImg)
在视频页内获取视频封面，经改良现在可以获取普通视频封面、“稍后再看”列表视频封面、番剧封面、直播间封面和专题文章头图（本来想做获取文章内所有图片来着，然后发现文章内的图是可以右键打开的，但头图不行，就只做了这一个）。

### 微博评论自动加载功能 (weiboAutoLoad)
查看微博评论可以不用每次都点“查看更多”按钮，滚动条到最下面时自动加载。

## 更新介绍

### v1.0.0
* `2018-12-22 ~ `
   * 新功能：查看B站收藏夹失效视频 (viv)
   * 新功能：转发抽奖 (european) ← 不要吐槽这个命名
   * 新功能：直播助手 (liveHelper)
   * 新功能：直播助手 > 隐藏显示PK分数
   * 增加设置界面
* `2018-12-26`
   * 优化转发抽奖：添加提示、给按钮添加相应颜色、添加用户的私信按钮
   * 修改viv在点击某些按钮后会失效的bug
   * 埋下第一个小彩蛋
* `2018-12-27`
   * 新功能：微博评论自动加载功能 (weiboAutoLoad)
   * 新功能：获取专题文章中的URL (getUrl)
   * 优化设置页面代码
   * 优化转发抽奖的自动加载功能，加入进度条、百分比
* `2018-12-28`
   * 新功能：直播助手 > 隐藏迷你播放器
   * 优化、统一设置页面代码
   * 转发抽奖功能添加设置At人数，添加判断At人数功能、过滤重复At人功能
   * 修复转发抽奖按钮定位不对的BUG
* `2018-12-29`
   * 新功能：获取视频封面 (openImg)
   * LOGO由图片改为base64
* `2018-12-31`
   * 支持直播间封面的获取
   * 有了一个用户群
* `2019-01-01 Happy New Year`
   * 支持专题文章头图获取
   * 新功能：直播助手 > 盲人模式？？？
* `2019-01-02`
   * 修复在“稍后再看”页面有时会打不开封面的BUG
   * 盲人模式下H5播放器可以调声音
   * 打包等待发布（划掉
* `2019-01-06`
   * 转发抽奖结束抽奖后会将中奖者名单保存在Excel中并可下载
   * 优化获取专题文章中的URL功能
* `2019-01-07`
   * 转发抽奖添加手动新增用户功能
   * 优化转发抽奖的文字，避免太长的用户名挡屏，做了省略处理
   * 添加获取番剧、电影的封面（之前是获取的海报）
* `2019-01-10`
   * 撤回修复了个智障的BUG，然后打包发布

## 反馈
* 魔改的用户群：[Lost Temple 97 & Btools](https://jq.qq.com/?_wv=1027&k=5WdaKxF)
* 演示视频下留言：[【程序猿日常】Btools Chrome插件开发](https://www.bilibili.com/video/av38950957/)
* GitHub issues：[GitHub issues](https://github.com/imba97/Btools/issues)

## LICENSE
[MIT](https://github.com/imba97/Btools/blob/master/LICENSE)
