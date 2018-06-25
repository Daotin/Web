>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
> +------------------------------------------------------------
> github：https://github.com/Daotin/Web
> 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> 博客园：http://www.cnblogs.com/lvonve/
> CSDN：https://blog.csdn.net/lvonve/
>  +-----------------------------------------------------------
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![分割线](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、BOM

## 1、BOM的概念

BOM（Browser Object Model）：浏览器对象模型。

在浏览器中的一些操作都可以使用 BOM 的方法进行编程处理。

比如：刷新浏览器、前进、后退、在地址栏输入 URL 等。



## 2、BOM 顶级对象

BOM 的顶级对象是：window

window 是浏览器的顶级对象，当调用 window 下的属性和方法时，可以省略 window。

>   注意：
>
>   1、window 下的一个特殊属性：window.name，所以不要轻易定义 name 变量，会导致 window.name 被修改。
>
>   2、top 等同于 windows。



## 3、系统对话框

```javascript
window.alert();
window.prompt();
window.confirm(); // 两个按钮，分别返回 true 和 false。
```

> 以上对话框都不建议使用。
>
> 1、弹框时页面无法加载；
>
> 2、各个浏览器的样式不相同，且样式不可自定义。



## 4、页面加载对象

提出问题：

我们知道，如果将 script 标签放在 head 里面的话，页面加载的时候是先加载的 script 标签，之后才加载 body 里面的标签。如果 script 特别大的话，就很影响用户体验。



解决办法：

1、将 script 标签放在 body 最后。

2、使用 `window.onload` 事件。

```html
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        window.onload = function () {
            document.getElementById("btn").onclick = function () {
                alert("haha");
            }
        }
    </script>
</head>
<body>
<input type="button" value="BUTTON" id="btn">
</body>
```

> 1、如果不写  window.onload 的话，执行到 document.getElementById("btn") 会报错，因为程序是从上至下执行。
>
> 2、window.onload 事件会在页面加载完毕（**页面中所有内容、标签、属性以及外部引入的 js文件**）时触发。
>
> 3、window.onload 可以省略 window。

```javascript
window.onunload = function () {
	alert("yes");
}
```

> `onunload`： 页面关闭后才触发的事件

```javascript
window.onbeforeunload = function () {
    alert("yes");
}
```

> `onbeforeunload`：在页面关闭之前触发的事件



## 5、location 对象（地址栏）

学习一个对象主要是学习它里面的属性和方法。

### 5.1、属性

```javascript
console.log(window.location.hash); // 地址栏上#及后面的内容
console.log(window.location.host); // localhost:63342 ---- 主机名及端口号
console.log(window.location.hostname); // localhost  ---- 主机名
console.log(window.location.port); //63342  ---- 端口号
console.log(window.location.pathname);// /JS/images/location.html --- 相对路径
console.log(window.location.protocol);// http:   --- 协议
console.log(window.location.search);//?_ijt=28855sggj8kcffva8q9bhc1eh0  --- 搜索的内容
```

### 5.2、方法

```javascript
document.getElementById("btn").onclick = function () {
    location.href = "http://fengdaoting.com";
    location.assign("http://fengdaoting.com");
    location.reload();
	location.replace("http://fengdaoting.com");
};
```

> `location.href` 和 ` location.assign()`： 设置跳转的页面地址，这两个属性和方法作用相同，并且都保存跳转前的地址（在浏览器中可以点击返回按钮）。
>
> `location.reload() `： 刷新页面
>
> `location.replace() `: 设置跳转的页面地址，但是不保存跳转前的地址。



## 6、history 对象

### 6.1、方法

```js
window.history.forward(); // 前进
window.history.back() // 后退
window.history.go(number);  // number为正，前进；为负，后退。
```



## 7、navigator 对象

### 7.1、属性

```js
window.navigator.platform; // 判断浏览器所在的系统平台
// win32
window.navigator.userAgent; // 判断浏览器的类型，是谷歌火狐还是IE
// chrome 下结果：Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
```
![分割线](https://github.com/Daotin/pic/raw/master/fgx.png)

![Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)