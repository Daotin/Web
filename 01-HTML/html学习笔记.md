[TOC]



---

# 认识网页

## 网页组成

由文字、图片、输入框、视频、音频、超链接等组成。

## web标准

W3C组织（万维网联盟）

> Html    （结构标准 ），相当人的身体。
> Css    样式（表现）标准  ，  相当与给人化妆 变的更漂亮。
> Js     行为标准 ，  相当与人在唱歌，页面更灵动。

## 浏览器内核 

也就是渲染引擎（决定了浏览器如何显示网页的内容及页面的格式信息（兼容性问题） 

---

# 认识html

## Hyper   text  markup   language  

超文本标记语言。超文本：超链接。（实现页面跳转）

## html结构标准

```html
< !doctype html>    声明文档类型
<html>              根标签
<head>             头标签
<title></title>       标题标签
</head>
<body>             主体标签
</body>
</html>
```

## html标签分类

单标签   `<! Doctype html>`
双标签   `<html> </html>   <head></head>   <title></title>`



## Html标签关系分类

  包含（嵌套关系）  `<head><title></title></head>`     父子
  并列关系       `<head></head><body></body>`     兄弟姐妹



## 开发工具

Dw  历史悠久，设计师使用。
Sublime   轻量级    有很多好用的插件。
Webstorm  重量级    太过智能。

---

# 标签

## 单标签

### 注释标签

```html
<!-- 注释 -->
```

### 换行标签

```html
<br> 或 <br />
```

### 水平线标签

```html
<hr> 或 <hr />
```



## 双标签

### 段落标签

```html
<p></p>
```

> 特点：上下自动生成空白行。br 换行不会生成空白行。



### 标题标签

```html
<h1></h1>
<h2></h2>  
<h3></h3>  
<h4></h4>  
<h5></h5>  
<h6></h6>  
```

> h1 在一个页面里只能出现一次。（SEO 搜索引擎优化）

### 文本标签

```html
<font size="" color=""></font>
```

### 文本格式化标签

#### 文本加粗

```html
<strong></strong>   <b></b>
```

> 工作里尽量使用strong，对于盲人来说 strong有语义强调的功能。

#### 文本倾斜

```html
<em></em>     <i></i>  工作里尽量使用em，原因同strong
```



#### 删除线标签

```html
<del></del>     <s></s>   工作里尽量使用del
```



#### 下划线标签

```html
<ins></ins>   <u></u>    工作里尽量ins
```



### 图片标签

```html
<img src="" alt="" title=""width="" height="" >
```

> Src    图片的来源   (必写属性)
> Alt    替换文本    图片不显示的时候显示的文字（重要性：1.SEO 2.盲人阅读需求）
> Title   提示文本    鼠标放到图片上显示的文字
> Width  图片宽度
> Height  图片高度	
>
> PS：图片没有定义宽高的时候，图片按照百分之百比例显示，如果只更改图片的宽度或者高度，图片等比例缩放

---

# 路径（略）

相对路径

绝对路径

---

# 超链接

```html
<a href="" title="" target="">填写内容</a>
```

> href   去往的路径（跳转的页面） 必写属性
> title   提示文本   鼠标放到链接上显示的文字
> target=”self"   （默认值）    在自身页面打开（关闭自身页面，打开链接页面）  Target=”blank”   打开新页面 （自身页面不关闭，打开一个新的链接页面）。
>
> PS：如果 href 中写的是 `javascript:void(0);`或者 不要 void(0) 直接是 `javascript:;` 的话。表示这个超链接不做任何跳转，也不做任何事情。



## 锚链接

先定义一个锚点：超链接跳转到页面的任何位置。一般用于在页面下面的时候，点击回到最上面。名称AAA可以随意区，只要是标记作用。

```html
<p id="AAA">
  
</p>
...
<a href="#AAA"></a>   // 超链接到锚点

```



## 空链

不知道链接到那个页面的时候，用空链

```html
<a href="#">空链</a>
```



## 压缩文件下载  

**（不推荐使用）**

```html
<a href="../../xxx.rar"></a>
```



## 超链接优化写法

```html
<base target="_blank">   // 让所有的超链接都在新窗口打开
```

> PS：写的位置在  head 里面。

---

# 特殊字符



![1.png](html学习笔记01/1.png)



---

# 列表

## 无序列表

```html
<ul type="">
	<li></li>    列表项
	<li></li>
	<li></li>
	......
</ul>
```

> `type="square"`      小方块
> `type="disc"`       实心小圆圈
> `type="circle"`      空心小圆圈



## 有序列表

```html
<ol type="" start="">
    <li></li>    列表项
    <li></li>
    <li></li>
    ......
</ol>
```

> `type="1,a,A,i,I"`  type的值可以为1,a,A,i,I
>
> `start="3"`  决定了开始的位置。



## 自定义列表

```html
<dl>
 <dt></dt>    小标题
  <dd></dd>   解释标题
  <dd></dd>   解释标题
</dl>
```

---

# 音乐标签

```html
<!-- <embed src="" hidden="true"></embed> --> 此方法已无法显示
<ifream src="1.mp3" hidden=true""></ifream>
```

> `hidden="true"` 隐藏音乐标签



---

# 滚动

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

---

# head里面相关知识



## charset编码

```html
<meta charset="UTF-8">
```

> ASCII/ANSI/Unicode      英语
> GBK   亚洲通用字符集
> GB2312   中文简体
> Big5    台澳港繁体
> UTF-8   世界通用字符集

## name

### 关键字

```html
<meta name="keywords" content="">
```

> 告诉搜索引擎你的站点的关键字。SEO优化使用 



### 网页描述

```html
<meta name="discription" content="">
```

> 告诉搜索引擎你的站点的主要内容。这个description是给SEO和用户看的。 



![](html学习笔记01/2.png)



### 作者

```html
<meta name="author" content="名字">
```

> 告诉搜索引擎你的站点的制作者 

### 文件检索

```html
<meta name="robots" content="all | none | index | noindex | follow | nofollow">
```



## http-equiv 网页重定向

```html
<meta http-equiv="reflesh" content="5; http://www.google.com">
```

> 网页自动跳转：网页5秒后自动跳转到谷歌主页 



## 链接外部样式表

```html
<link rel="stylesheet" type="text/css" href="1.css">
```

> `rel="stylesheet"`：链接的是什么？样式表还是图标
> `type="text/css" type="text/css"`：规定链接文件的MIME类型，就是说链接文件时css还是js
> `href="1.css"`：链接的文件路径



## 设置 icon 图标

```html
<link rel="icon" href="1.ico">
```



---

# 表格

## 表格的结构

### 标准结构

```html
<table>
<thead>
  <tr>
  <td></td>
  <td></td>
  </tr>
</thead>
  
<tbody>
  <tr>
  <td></td>
  <td></td>
  </tr>
</tbody>
  
<tfoot>
  <tr>
  <td></td>
  <td></td>
  </tr>
</tfoot>
</table>
```

> 写 `<thead> <tbody> <tfoot>`对SEO更好，不写也没问题。 



### 常见写法

```html
<table width="300px" height="300px" border="5px" cellspacing="10px" cellpadding="0" bgcolor="pink" align="center" >
		<tr>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
		</tr>
		<tr>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
		</tr>
		<tr>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
			<td>窗外的麻雀</td>
		</tr>
	</table>
```

>width（宽度）
>height（高度）
>border（边框宽度） 
>cellspacing（单元格与单元格的距离）
>cellpadding（内容距边框的距离）
>bgcolor（表格背景颜色）
>align=”left | right | center”
>​	如果直接给表格用align=”center” 表格居中
>​	如果给tr或者td使用 ，tr或者td内容居中。 



## 快速建表格的方式

`table>tr*3>td*5 + tab` ： 建立3行5列的表格 



## 表头

`<caption></caption>`：位于table标签和tr标签之间

```html
<table>
		<caption>表头</caption>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</table>
```



## 单元格合并

`<td colspan=“2”>填写内容</td>`：合并同一行的单元格，合并行数为2 

`<td rowspan=“3”>填写内容</td>` ：合并同一列的单元格，合并列数为3 

```html
<table border="2" cellspacing="0" width="400" height="100" align="center">
	<caption><strong>表头</strong></caption>
		<tr align="center" bgcolor="yellow" height="100">
			<td colspan="2">在电线杆上多嘴</td>
			<!-- <td><strong>2</strong></td> -->
			<td>在电线杆上多嘴</td>
		</tr>

		<tr align="center" bgcolor="#CCC" height="100">
			<td>在电线杆上多嘴</td>
			<td>在电线杆上多嘴</td>
			<td rowspan="2">在电线杆上多嘴</td>
		</tr>

		<tr align="center" bgcolor="#CCC" height="100">
			<td>在电线杆上多嘴</td>
			<td>在电线杆上多嘴</td>
			<!-- <td><strong>3</strong></td> -->
		</tr>
	</table>
```



![](html学习笔记01/3.png)



## 表格标题

```html
<tr>
  <th></th>
  <th></th>
  <th></th>
</tr>
```

> 注意：将td改为th 
>
> 特点：标题的文字自动加粗水平居中对齐 



## 边框颜色

```html
<table bordercolor=""></table>
```



## 内容对齐方式

```html
<tr>
	<td valign="bottom">张三</td>
</tr>
```

> `valign="top | middle | bottom"`



## 补充：细线表格

```html
<table width="500" height="300" bgcolor="green" cellspacing="1" >
		<tr bgcolor="white">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr bgcolor="white">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr bgcolor="white">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr bgcolor="white">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</table>
```



---

# 表单



## 组成

### 文本（提示信息）

![](html学习笔记01/4.png)



### 表单控件

![](html学习笔记01/5.png)



### 表单域

上面提示信息和表单控件等所在的区域 。

```html
<form action="1.php" method="get"></form>
```

> action：处理信息
> `method=”get | post”`
> get通过地址栏提供（传输）信息（可以在地址栏里看到你输入的账号和密码），安全性差。post 通过文件例如1.php来处理信息，安全性高。 



## 文本输入框

```html
<input type="text"
	name="username"
	maxlength="6"
	readonly="readonly"
	disabled="disabled"
	value="用户名">
```

> type：输入的是文本内容
> name：输入框的名字
> maxlength：限定输入文本长度
> readonly：文本框只读
> disabled：文本框未激活
> value：输入框中的默认内容



## 密码输入框

```html
<input type="password" name="pwd">
```

> PS：文本输入框的所有属性对密码输入框都有效 



## 单选框

```html
<input type="radio" name="gender" checked="checked">男
```

> `checked=”checked”` 设置默认选择项。
>
> PS：当有多个单选框是如何设置只能有一个被选中？
> 只有将name的值设置相同的时候，才能实现单选效果。 

## 下拉列表

```html
<select multiple="multiple">
  <optgroup lable="分组名称">
    <option>下拉列表选项</option>
    <option selected="selected">下拉列表选项</option>
  </optgroup>
</select>
```

> `multiple=”multiple”`： 将下拉列表设置为多选
> `selected=”selected”`：设置默认选中项目
> `<optgroup></optgroup>` 对下拉列表进行分组。
> `Label="分组名称"` 分组名称。



## 多选框

```html
<input type="checkbox" checked="checked">
```

> Checked=”checked” 设置默认选中项 



## 多行文本框

```html
<textarea cols="130" rows="10"></textarea>
```

> cols：控制输入字符的长度 
>
> rows：控制输入字符的行数 

## 文本上传控件

```html
<input type="file">
```



## 文件提交按钮

```html
<input type="submit">
```

> 可以实现信息提交功能 

## 普通按钮

```html
<input type="button" value="普通按钮">
```

> 不能提交信息，配合JS使用 

## 图片按钮

```html
<input type="image" src="">
```

> 图片按钮可实现信息提交功能 

## 重置按钮

```html
<input type="reset">
```

> 将信息重置到默认状态 

## 表单信息分组

```html
<form action="1.php" method="post">
<fieldset>
	<legend>分组1</legend>
</fieldset>
</form>
```

> `<fieldset></fieldset>`：对表单信息分组 
>
> `<legend></legend>`：表单信息分组名称 

## html5补充表单控件

```html
<input type="url">网址控件
<input type="date">日期控件 
<input type="time">时间控件
<input type="email">邮件控件
<input type="number" step="5">数字控件
<input type="range" step="50">滑块控件
```



## 补充示例：

```html
<!-- 表单域 -->
	<form action="1.php" method="post">
	<!-- 对表单信息分组 -->
	<fieldset>
	<!-- 表单信息分组名称 -->
	<legend>分组信息</legend>
	    <!-- 文本输入框 -->
		账户: <input type="text" name="User" value="账号/邮箱/手机号">
		<br>
		<!-- 密码输出框 -->
		密码: <input type="password" name="Pwd">
		<br>
		<!-- 文件提交按钮 -->
		<input type="submit">
		<br>
		<!-- 单选框 -->
		<input type="radio" name="gender">男
		<input type="radio" name="gender" checked="checked">女

		<br>
		<br>
		<!-- 下拉列表 -->
		省(市)&nbsp; <select>
			<!-- 下拉列表选项 -->
			<option value="">北京</option>
			<option value="">山东</option>
			<option value="">广东</option>
			<option value="">福建</option>
			<option value="">河南</option>
			<option value="" selected="selected">湖北</option>
		</select>

		<select>
			<!-- 对下拉列表分组 -->
			<optgroup label="湖北省">
				<option value="">武汉</option>
				<option value="" selected="selected">襄阳</option>
				<option value="">天门</option>
				<option value="">荆州</option>
				<option value="">仙桃</option>
			</optgroup>
		</select>

		<br><br>
		<!-- 多选框 -->
		<input type="checkbox"> A
		<input type="checkbox" checked="checked"> B
		<input type="checkbox"> C

		<br><br>
		<!-- 多行文本框 -->
		<textarea cols="30" rows="10"></textarea><br><br>
		<!-- 文本上传控件 -->
		<input type="file"><br><br>

		<input type="submit">&nbsp;
		<!-- 普通按钮 -->
		<input type="button" value="Button">&nbsp;	
		<!-- 重置按钮 -->
		<input type="reset"><br><br>
		<!-- 图片按钮 -->
		<input type="image" src="1.png" width="100"><br><br>
		<!-- 网址控件 -->
		<input type="url" value="http://www.baidu.com"><br><br>
		<!-- 日期控件 -->
		<input type="date">

    </fieldset>
	</form>
```



---

# 标签语义化

好的语义化的网站标准就是去掉样式表文件(css文件)之后，结构依然很清晰。
根据内容的结构化（内容语义化），选择合适的标签（代码语义化）

> 什么用？
> 1：网页结构合理。
> 2：有了良好的结构和语义你的网页内容自然容易被搜索引擎抓取。
> 3：方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）。
> 4：便于团队开发和维护。
>
> 怎么做？
> 1：尽可能少的使用无语义的标签div和span。（比如使用p是段落标签）
> 2：在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利。
> 3：不要使用纯样式标签，如：b、font、u等，改用css设置。
> 4：需要强调的文本，可以包含在strong或者em标签中。 













