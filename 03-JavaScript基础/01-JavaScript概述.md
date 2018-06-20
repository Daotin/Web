> 大家好，这里是「 Daotin的梦呓 」从零开始学 Web 系列教程。此文首发于「 Daotin的梦呓 」公众号，欢迎大家订阅关注。在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![这里写图片描述](https://img-blog.csdn.net/20180603152057723?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

# 一、JavaScript 概述

## 1、JavaScript简介
**JavaScript历史**
要了解JavaScript，我们首先要回顾一下JavaScript的诞生。在上个世纪的1995年，当时的网景公司正凭借其Navigator浏览器成为Web时代开启时最著名的第一代互联网公司。由于网景公司希望能在静态HTML页面上添加一些动态效果，于是叫Brendan Eich这哥们在两周之内设计出了JavaScript语言。你没看错，这哥们只用了10天时间。

为什么起名叫JavaScript？原因是当时Java语言非常红火，所以网景公司希望借Java的名气来推广，但事实上JavaScript除了语法上有点像Java，其他部分基本上没啥关系。

**ECMAScript**
因为网景开发了JavaScript，一年后微软又模仿JavaScript开发了JScript，为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织定制了JavaScript语言的标准，被称为ECMAScript标准。所以简单说来就是，ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。

那为什么不直接把JavaScript定为标准呢？因为JavaScript是网景的注册商标。不过大多数时候，我们还是用JavaScript这个词。如果你遇到ECMAScript这个词，简单把它替换为JavaScript就行了。

**JavaScript版本**
JavaScript语言是在10天时间内设计出来的，虽然语言的设计者水平非常NB，但谁也架不住“时间紧，任务重”，所以，JavaScript有很多设计缺陷。

此外，由于JavaScript的标准——ECMAScript在不断发展，最新版ECMAScript 6标准（简称ES6）已经在2015年6月正式发布了，所以，讲到JavaScript的版本，实际上就是说它实现了ECMAScript标准的哪个版本。

由于浏览器在发布时就确定了JavaScript的版本，加上很多用户还在使用IE8这种古老的浏览器，这就导致你在写JavaScript的时候，要照顾一下老用户，不能一上来就用最新的ES6标准写，否则，老用户的浏览器是无法运行新版本的JavaScript代码的。

以上简介来自：[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014344991049250a2c80ec84cb4861bbd1d9b2c0c2850e000)

## 2、JS作用

- 验证表单（以前的网速慢）
- 页面特效（PC端的网页效果）
- 移动端（移动web和app）
- 异步和服务器交互（AJAX）
- 服务端开发（nodejs）



## 3、语言类型

js是一种**脚本语言**，不仅是脚本语言还是弱类型的脚本语言。

脚本语言是一种解释性语言，解释性语言是相对于编译性语言而言的。

**编译型语言：**编译代码，把代码编译成CPU认识的语言(文件)，然后整体的执行。

**解释型语言：**一行一行解析，解析一行执行一行。

**弱类型语言：**简单理解定义一个变量，可以有多种数据类型。（如：var）



## 4、前端组成

**HTML**：提供网页上显示的内容（结构）

**CSS**：美化网页（样式）

**JavaScript**：控制网页行为（行为）

 

## 5、js组成

> **js = ECMAScript + DOM + BOM + 高级**

**ECMAScript**（前身为欧洲计算机制造商协会）：JavaScript的语法规范

**DOM**（Document Object Model 的文档对象模型简称）：JavaScript操作网页上元素的API

**BOM**（Browser Object Model 的浏览器对象模型简称）：JavaScript操作浏览器部分功能的API

 

## 6、js书写位置

**内嵌式：**
　　一般放在body的最后，有时放在head标签中（需要写页面加载函数）。
**外链式：**
　　src=”外部js文件路径”



## 7、JS基础知识

**输出语句**

```javascript
console.log("内容");       // 在控制台打印输出内容
alert("内容");                 // 弹窗显示内容
document.write("内容");   // 在页面书写内容，其内容可以识别标签，比如：document.write("<h1>你好</h1>")
```

**其他语句**

```js
alert("内容");       // 弹出对话框
prompt("提示信息"); // 可以在弹出的对话框输入内容给后台
confirm("")           // 弹出对话框，有是否按钮
```

**js代码的注意问题：**

1. 在一对script的标签中有错误的js代码，那么该错误的代码后面的js代码不会执行。
2. 如果第一对的script标签中有错误，不会影响后面的script标签中的js代码执行。
3. script标签里面可以写的内容：`type="text/javascript"` 标准写法，或者` language="JavaScript"`，都是可以省略的，原因是在html开头写了遵循h5标准。
4. script标签可以出现多对。
5. 如果使用引入外部js文件的方式，那么不要在script标签里面写任何js代码，如果想写，就新开一对script标签。


![这里写图片描述](https://img-blog.csdn.net/20180603152042906?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)






