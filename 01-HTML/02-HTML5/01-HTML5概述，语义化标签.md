## 一、HTML5 简介

### 1、什么是 HTML5

HTML5 不是一门新的语言，而是我们之前学习的 HTML 的第五次重大修改版本。

### 2、HTML 的发展历史

- 超文本标记语言（第一版，不叫 HTML 1.0）——在 1993 年 6 月作为互联网工程工作小组（IETF）工作草案发布（并非标准）；
- HTML 2.0——1995 年 11 月作为 RFC 1866 发布，在 RFC 2854 于 2000 年 6 月发布之后被宣布已经过时
- HTML 3.2——1997 年 1 月 14 日，W3C 推荐标准
- HTML 4.0——1997 年 12 月 18 日，W3C 推荐标准
- HTML 4.01（微小改进）——1999 年 12 月 24 日，W3C 推荐标准
- HTML 5——2014 年 10 月 28 日，W3C 推荐标准

### 3、HTML5 的设计目的

HTML5 的设计目的是**为了在移动设备上支持多媒体**。之前网页如果想嵌入视频音频，需要用到 flash ，但是苹果设备是不支持 flash 的，所以为了改变这一现状，html5 应运而生。

新的语法特征被引进以支持视频音频，如 video、audio 和 canvas 标记。

HTML5 还引进了新的功能，可以真正改变用户与文档的交互方式。比如增加了新特性：语义标签，本地存储，网页多媒体等等，以及 CSS3 特性。

相比之前的进步：

- 取消了一些过时的 HTML4 标签
- 新的表单控件（比如 date、time、email、url、search）
- 语义化标签（比如 article、footer、header、nav、section）
- 对本地离线存储的更好的支持
- 用于绘画的 canvas 元素
- 用于多媒体的 video 和 audio 元素

## 二、语义化标签

### 1、什么是语义化标签？

类似于 p，span，img 等这样的，看见标签就知道里面应该保存的是什么内容的是语义化标签。

像 div 这样的里面可以装任意东西的就是非语义化标签。

以前我们要做下面这个结构可能会这么布局：

![1](./images/1.png)

```html
<div class="header"></div>
<div class="nav"></div>
<div class="main">
  <div class="left"></div>
  <div class="right"></div>
</div>
<div class="footer"></div>
```

那么在 html5 下语义化标签怎么做呢？

![1](./images/2.gif)

```html
<header></header>
<nav></nav>
<main>
  <article></article>
  <aside></aside>
</main>
<footer></footer>
```

是不是语义化的代码结构更清晰、简洁呢？

### 2、HTML5 部分新增的标签

#### 2.1、结构标签

- `header`：一个区块的头部信息/标题；
- `footer`：一个区块的底部信息；
- `nav`：导航栏区域；
- `section`：一个通用独立章节或者区域。一般来说会包含一个标题。
- `article`：一块独立区块，表示一块相对比较独立的内容；
- `aside`：表示一个和主体内容几乎无关的部分，可以被单独的拆分出来而不会使整体受影响。

#### 2.2、表单标签

- email：邮件控件；
- url：地址控件；
- range：数字范围控件；
- 日期选择器：
  - date：选取日、月、年
  - month：选取月、年
  - week：选取周和年
  - time：选取时间（小时和分钟）
  - datetime：选取时间、日、月、年（UTC 时间）
  - datetime-local：选取时间、日、月、年（本地时间）
- search：搜索控件；
- color：颜色控件

```html
<form action="">
  <fieldset>
    <legend>学生档案</legend>
    <label for="userName">姓名:</label>
    <input
      type="text"
      name="userName"
      id="userName"
      placeholder="请输入用户名"
    /><br />

    <label for="userPhone">手机号码:</label>
    <input
      type="tel"
      name="userPhone"
      id="userPhone"
      pattern="^1\d{10}$"
    /><br />

    <label for="email">邮箱地址:</label>
    <input type="email" required name="email" id="email" />
    <br />

    <label for="collage">所属学院:</label>
    <input
      type="text"
      name="collage"
      id="collage"
      list="cList"
      placeholder="请选择"
    />
    <datalist id="cList">
      <option value="前端学院"></option>
      <option value="后端学院"></option>
      <option value="C语言学院"></option></datalist
    ><br />

    <label for="level">基础水平:</label>
    <meter id="level" value="60" max="100" min="0" low="59" high="90"></meter>
    <br />

    <label for="inTime">入学日期:</label>
    <input type="date" id="inTime" name="inTime" />
    <br />

    <label for="leaveTime">毕业日期:</label>
    <input type="date" id="leaveTime" name="leaveTime" />
  </fieldset>
</form>
```

**表单标签新增的一些属性：**

- `autofocus`：自动获取焦点
- `required`：不能为空
- `disabled`：禁用
- `hidden`：隐藏

#### 2.3、媒体标签

- video：视频；
- audio：音频；
- embed：嵌入内容（包括各种媒体），Midi、Wav、AU、MP3、Flash、AIFF 等。

```html
<body>
  <!--audio:音频-->
  <!--
src:播放文件的路径
controls:音频播放器的控制器面板
autoplay:自动播放
loop:循环播放
muted：静音
preload: 
	auto 默认加载音频文件所有数据；  
	metadata：仅加载多媒体文件元数据（文件属性，比如文件时长，音质信息等）
	none: 不加载任何内容。
-->
  <audio src="../mp3/aa.mp3" controls></audio>

  <!--video：视频-->
  <!--
src:播放文件的路径
controls:音频播放器的控制器面板
autoplay:自动播放
loop:循环播放
poster:指定视频还没有完全下载完毕，或者用户没有点击播放前显示的封面。 默认显示当前视频文件的第一副图像
width:视频的宽度
height:视频的高度
-->
  <!--注意事项：视频始终会保持原始的宽高比。意味着如果你同时设置宽高，并不是真正的将视频的画面大小设置为指定的大小，而只是将视频的占据区域设置为指定大小，除非你设置的宽高刚好就是原始的宽高比例。所以建议：在设置视频宽高的时候，一般只会设置宽度或者高度，让视频文件自动缩放-->
  <video
    src="../mp3/mp4.mp4"
    poster="../images/l1.jpg"
    controls
    height="600"
  ></video>

  <!--source:因为不同的浏览器所支持的视频格式不一样，为了保证用户能够看到视频，我们可以提供多个视频文件让浏览器自动选择-->
  <video src="../mp3/flv.flv" controls></video>
  <video controls>
    <!--视频源，可以有多个源-->
    <source src="../mp3/flv.flv" type="video/flv" />
    <source src="../mp3/mp4.mp4" type="video/mp4" />
  </video>
</body>
```

**媒体标签的方法：（20190221）**

参考连接：[HTML 音频/视频 - 菜鸟教程](http://www.runoob.com/tags/ref-av-dom.html)

可以通过 js 控制音视频的播放：(所有网页音视频的控制都应该使用 js 控制，播放的控件自己画，这样才能达到跨平台界面相同。)

参看连接：http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp

1、获取媒体标签的 dom 元素（例如叫 mdom）

2、控制媒体的行为的方法和属性和触发事件。

```js
// 方法
mdom.play() // 开始播放
mdom.pause() // 暂停播放
mdom.load() // 重新加载音视频

// 属性
autoplay // 设置或返回歌曲是否自动播放
controls // 设置或返回是否显示原生播放控件
currentSrc // 获取当前的播放地址
paused // 是否是暂停状态
currentTime： // 获取或者设置当前音视频播放时长
defaultMuted // 设置或返回当前音频视频是否默认静音
muted      // 设置或返回当前音视频是否静音
duration	// 返回当前音频/视频的长度（以秒计）。需要在媒体加载完成后获取
       // 一般使用  mdom.addEventListener('durationchange',function() {
        //               console.log(this.duration)
         //         }
defaultPlaybackRate // 设置或返回默认的播放速度
                    // 正值为正向播放，负值为负向播放
				  // 1 为正常速度， <1 慢速， >1 加速
playbackRate     // 设置或返回当前的播放速度，值同上
ended  // 返回当前资源是否播放结束
error   // 返回播放错误信息
loop   // 设置或返回是否循环播放

preload // 设置加载机制（自动，metadata，none）
readyState  // 返回当前音视频是否准备完毕
volume    // 设置或返回当前音量


// 事件
canplay // 当前资源可以被播放的时候
durationchange // 当播放总时长发送改变的时候
pause      // 当前资源被暂停时
play       // 当前资源被播放时
playing    // 包含上面play时机，但是因网络原因导致播放终止而后重新开始播放时只会触发playing
ratechange // 播放速度发生变化时触发
seeked     // 由用户更改当前播放时长时触发
seeking    // 由用户刚开始更改播放时长时触发
timeupdate // 当播放位置发生变化时触发（无论是否由用户操作）
volumechange  // 当音量发生变化时触发
```

#### 2.4、其他功能标签

- mark：标注；
- progress：进度条；

  - ` <progress max="100" value="20"></progress>`

- time：数据标签，给搜索引擎使用；

  - 发布日期 `<time datetime="2014-12-25T09:00">9：00</time>`
  - 更新日期 `<time datetime="2015-01-23T04:00" pubdate>4:00</time>`

- ruby 和 rt：对某一个字进行注释；

  - ` <ruby> 汉 <rt>han</rt> 字 <rt>zi</rt> </ruby>`

- canvas：绘图标签；
- deteils ：展开菜单；
- datalist：数据列表元素；

```html
<form action="">
  <!--专业：
    <select name="" id="">
        <option value="1">前端与移动开发</option>
        <option value="2">java</option>
        <option value="3">javascript</option>
        <option value="4">c++</option>
    </select>-->
  <!--不仅可以选择，还应该可以输入-->
  <!--建立输入框与datalist的关联  list="datalist的id号"-->
  专业：<input type="text" list="subjects" /> <br />
  <!--通过datalist创建选择列表-->
  <datalist id="subjects">
    <!--创建选项值：value:具体的值 label:提示信息，辅助值-->
    <!--option可以是单标签也可以是双标签-->
    <option value="英语" label="不会" />
    <option value="前端与移动开发" label="前景非常好"></option>
    <option value="java" label="使用人数多"></option>
    <option value="javascript" label="做特效"></option>
    <option value="c" label="不知道"></option>
  </datalist>

  网址：<input type="url" list="urls" />
  <datalist id="urls">
    <!--如果input输入框的type类型是url,那么value值必须添加http://-->
    <option value="http://www.baidu.com" label="百度"></option>
    <option value="http://www.sohu.com"></option>
    <option value="http://www.163.com"></option>
  </datalist>
</form>
```
