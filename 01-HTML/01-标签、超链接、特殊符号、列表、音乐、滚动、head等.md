# 一、标签

## 1、单标签

- 注释标签 ：`<!-- 注释 --> ` 
- 换行标签：`<br> 或 <br />` 
- 水平线标签：`<hr> 或 <hr />` 


## 2、双标签

- 段落标签：`<p></p>`
> 特点：上下自动生成空白行。br 换行不会生成空白行。

- 标题标签：`<h1></h1>,<h2></h2>,<h3></h3>,<h4></h4>,<h5></h5>,<h6></h6>`
> h1 在一个页面里只能出现一次。（作用是：便于SEO 搜索引擎优化）

- 文本标签：`<font size="" color=""></font>`
- 文本格式化标签

**文本加粗** ：`<strong></strong>   <b></b>`
> 工作里尽量使用strong，对于盲人来说 strong有语义强调的功能。

**文本倾斜：**`<em></em>     <i></i>  <!-- 工作里尽量使用em，原因同strong -->`
**删除线标签：**`<del></del>     <s></s>   <!--工作里尽量使用del -->`
**下划线标签：**`<ins></ins>   <u></u>     <!--工作里尽量ins-->`
**图片标签：**`<img src="" alt="" title=""width="" height="" >`
> src  : 图片的来源（必写属性）
> alt  :  替换文本 ，图片不显示的时候显示的文字（重要性：1.SEO优化 2.盲人阅读需求）
> title :  提示文本，鼠标放到图片上显示的文字
> width :  图片宽度
> height : 图片高度	
>
> PS：图片没有定义宽高的时候，图片按照百分之百比例显示，如果只更改图片的宽度或者高度，图片等比例缩放

---



# 二、超链接

```html
<a href="" title="" target="">填写内容</a>
```
> href ：去往的路径、跳转的页面， 必写属性
> title ： 提示文本，鼠标放到链接上显示的文字
> target=”self"   （默认值），在自身页面打开（关闭自身页面，打开链接页面）  
>
> Target=”blank”   打开新页面，（自身页面不关闭，打开一个新的链接页面）
>
> PS：当 href 的值为 `javascript:void(0);` 或 `javascript:;` ，表示超链接不做任何事情，不做任何跳转。



## 1、锚链接

我们先搞清楚什么是锚链接：

锚链接也称锚点链接，命名锚点链接（也叫书签链接）常常用于那些内容庞大繁琐的网页，通过点击命名锚点，自动跳转到我们设置锚点的位置，类似于我们阅读书籍时的目录页码或章回提示。

锚点链接可以跳转到页面的任何位置。一般用于在页面下面的时候，点击回到最上面。锚点链接的名称可以随意取，只起到标记作用。

```html
<p id="AAA">
  
</p>
...
<a href="#AAA"></a>   // 超链接到锚点

```



## 2、空链

不知道链接到那个页面的时候，用空链

```html
<a href="#">空链</a>
```

> PS：空链相当于 #top，实际点击此链接的时候会跳转到页首的位置。



## 3、压缩文件下载

```html
<a href="../../xxx.rar"></a>
```

> PS：不推荐使用



## 4、超链接优化写法

```html
<base target="_blank">   // 让所有的超链接都在新窗口打开
```

> PS：写的位置在  head 里面。

------



# 三、特殊字符

| 特殊符号 | 字符代码       |
| ---- | ---------- |
| (空格) | `&nbsp;`   |
| <    | `&lt;`     |
| >    | `&gt;`     |
| &    | `&amp;`    |
| ¥    | `&yen;`    |
| ©    | `&copy;`   |
| ®    | `&reg;`    |
| ×    | `&times;`  |
| ÷    | `&devide;` |

参考链接：[HTML特殊字符编码对照表](http://www.jb51.net/onlineread/htmlchar.htm)

---



# 四、列表

## 1、无序列表

```html
<ul type="">
	<li></li>    <!-- 列表项 -->
	<li></li>
	<li></li>
	......
</ul>
```

> `type="square"`      ：小方块
> `type="disc"`      ： 实心小圆圈
> `type="circle"`    ：  空心小圆圈



## 2、有序列表

```html
<ol type="" start="">
    <li></li>   <!-- 列表项 -->
    <li></li>
    <li></li>
    ......
</ol>
```

> `type="1,a,A,i,I"`  ，type的值可以为1,a,A,i,I
>
> `start="3"`  决定了开始的位置。



## 3、自定义列表

```html
<dl>
 <dt></dt>    <!-- 小标题 -->
  <dd></dd>   <!-- 解释标题 -->
  <dd></dd>   <!-- 解释标题 -->
</dl>
```

------



# 五、音乐标签

```html
<embed src="1.mp3" hidden="true"></embed>
```

> `hidden="true"` 隐藏音乐标签

------



# 六、滚动标签

```html
<marquee width="" height="" bgcolor="" behavior="" direction="" loop="">
</marquee>
```

> width：宽度
> height：高度
> bgcolor：背景颜色
>
> behavior：设置滚动的方式
> ​	alternate：在两端之间来回滚动
> ​	scroll：由一端滚动到另一端，会重复
> ​	slide：由一端滚动到另一端，不会重复
>
> direction：设置滚动的方向
> ​	left | right | up | down
> loop：滚动次数（-1：一直滚动下去）

------





# 七、head里面相关知识

## 1、charset编码

```html
<meta charset="UTF-8">
```

> ASCII/ANSI/Unicode：英语
> GBK ：亚洲通用字符集
> GB2312：中文简体
> Big5 ：台澳港繁体
> UTF-8：世界通用字符集



## 2、name

### 2.1、关键字

```html
<meta name="keywords" content="">
```

> 告诉搜索引擎你的站点的关键字。SEO优化使用 

### 2.2、网页描述

```html
<meta name="discription" content="">
```

> 告诉搜索引擎你的站点的主要内容。这个description是给SEO和用户看的。 

### 2.3、作者

```html
<meta name="author" content="名字">
```

> 告诉搜索引擎你的站点的制作者 

### 2.4、文件检索

```html
<meta name="robots" content="all | none | index | noindex | follow | nofollow">
```

> 有时候会有一些站点内容，不希望被 robots 抓取而公开。为了解决这个问题，robots 开发界提供了两个办法：一个是robots.txt，另一个是 robots meta 标签。
> 其中的属性说明如下： 
> all：（默认）文件将被检索，且页面上的链接可以被查询； 
> none：文件将不被检索，且页面上的链接不可以被查询； 
> index：文件将被检索； 
> follow：页面上的链接可以被查询； 
> noindex：文件将不被检索，但页面上的链接可以被查询； 
> nofollow：文件将不被检索，页面上的链接可以被查询。 



## 3、http-equiv 网页重定向

```html
<meta http-equiv="reflesh" content="5; http://www.google.com">
```

> 网页自动跳转：网页5秒后自动跳转到谷歌主页 



## 4、链接外部样式表

```html
<link rel="stylesheet" type="text/css" href="1.css">
```

> `rel="stylesheet"`：链接的是什么？样式表还是图标
> `type="text/css" type="text/css"`：规定链接文件的MIME类型，就是说链接文件时css还是js
> `href="1.css"`：链接的文件路径



## 5、设置 icon 图标

```html
<link rel="icon" href="1.ico">
```

---

# 八、小结

今天将的内容是：标签、超链接、特殊符号、列表、音乐标签、滚动标签、和 head 里面相关知识点。
下次将讲解表格、表单等内容。
