>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、Ajax 概述

Ajax 全称：Asynchronous JavaScript and XML（异步 JavaScript 和 XML）。它不是一种新的编程语言，而是一种用于创建更好更快以及交互性更强的Web应用程序的技术。它可以在无需重新加载整个网页的情况下，能够更新部分网页的技术。而传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。



还有为什么叫异步呢？

因为在加载的时候，页面的其他部分还是可以自由操作的，没有出现卡死的状态，所以是异步。



有很多使用 AJAX 的应用程序案例：新浪微博、Google 地图、开心网等等。

在此之前，我们可以通过以下几种方式让浏览器发出对服务端的请求，获得服务端的数据：

-   地址栏输入地址，回车，刷新
-   特定元素的 href 或 src 属性
-   表单提交 

 这些方案都是我们无法通过或者很难通过代码的方式进行编程（对服务端发出请求并且接受服务端返回的响应） 。



如果仔细观察一个Form的提交，你就会发现，一旦用户点击“Submit”按钮，表单开始提交，浏览器就会刷新页面，然后在新页面里告诉你操作是成功了还是失败了。如果不幸由于网络太慢或者其他原因，就会得到一个404页面。

这就是Web的运作原理：一次HTTP请求对应一个页面。

如果要让用户留在当前页面中，同时发出新的HTTP请求，就必须用JavaScript发送这个新请求，接收到数据后，再用JavaScript更新页面，这样一来，用户就感觉自己仍然停留在当前页面，但是数据却可以不断地更新。

最早大规模使用AJAX的就是Gmail，Gmail的页面在首次加载后，剩下的所有数据都依赖于AJAX来更新。

用JavaScript写一个完整的AJAX代码并不复杂，但是需要注意：AJAX请求是异步执行的，也就是说，要通过回调函数获得响应。




# 二、Ajax快速上手

使用 Ajax 的过程可以类比平常我们访问网页过程 ：

```js
// 1. 创建一个 XMLHttpRequest 类型的对象 —— 相当于打开了一个浏览器
			var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
// 2. 打开与一个网址之间的连接 —— 相当于在地址栏输入访问地址
            xhr.open("get", "checkusername.php?username=" + uname, true);
// 3. 通过连接发送一次请求 —— 相当于回车或者点击访问发送请求
            xhr.send(null);
            // 仅仅针对 post 请求
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 4. 指定 xhr 状态变化事件处理函数 —— 相当于处理网页呈现后的操作
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { 
                        console.log(this.responseText);
                    }
                }
            };
```



## 1、创建对象

在IE6及以下的时候，是不支持 XMLHttpRequest 对象的，那么与之对应写法为：

```js
var xhr = new ActiveXObject("Microsoft.XMLHTTP");
```

所以为了兼容性，上面的创建对象的方式改为：

```js
var xhr = null;
if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```



## 2、open 方法

第一个参数是请求的方式，是 get 请求还是 post 请求。一般取决后端开发的php文件里面写的是 get 还是 post。

第二个参数是需要请求的地址。如果是 get 请求，需要在地址后面加上 ？ 进行连接操作，连接的是需要请求的你内容。（参考下面验证用户名示例），如果是 post 请求，只需要写请求的地址就可以了，它的请求内容是写在 send 中的。

第三个参数是同步或者异步，一般可以不写，不写默认异步，false：同步，true：异步。



## 3、send 方法

对于 get 方式，参数为 null；

对于 post 方式，参数为请求的数据。

```js
var param = "username=" + uname; // 和 get 地址后面 ？ 链接请求内容一致
shr.send(param);
```



对于 post 请求，还需要设置下请求头（post请求才有）

```js
// 仅仅针对 post 请求才有
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```



## 4、onreadystatechange 回调函数

之所以是回调函数，这样不会阻塞当前的操作，什么时候服务器返回数据，什么时候使用。这就是异步。

>   status：服务器返回的状态码
>
>   this.status == 200：表示响应成功；404 表示没有找到请求的资源；500 表示服务器端错误。



>    readyState：
>
>    xhr对象的状态改变时，readyState的值也会相应的改变。具体数值的含义见下表：

| readyState | xhr状态            | 说明                               |
| ---------- | ---------------- | -------------------------------- |
| 0          | UNSENT           | 代理（xhr）被创建，但尚未调用 open 方法         |
| 1          | OPENED           | open 方法已经被调用，建立了连接               |
| 2          | HEADERS_RECEIVED | send 方法已经被调用，已经可以获取状态行和响应头       |
| 3          | LOADING          | 响应体下载中，responseText 属性可能已经包含部分数据 |
| 4          | DONE             | 响应体下载完成，可以直接调用 responseText 获取数据 |

详细解析代码：

```js
var xhr = new XMLHttpRequest();
console.log(xhr.readyState);
// => 0
// 初始化 请求代理对象

xhr.open('GET', 'time.php');
console.log(xhr.readyState);
// => 1
// open 方法已经调用，建立一个与服务端特定端口的连接

xhr.send();

xhr.addEventListener('readystatechange', function () {
    switch (this.readyState) {
        case 2:
        // => 2
        // 已经接受到了响应报文的响应头
        // 可以拿到头
        // console.log(this.getAllResponseHeaders())
        console.log(this.getResponseHeader('server'));
        // 但是还没有拿到体
        console.log(this.responseText);
        break;
        
        case 3:
        // => 3
        // 正在下载响应报文的响应体，有可能响应体为空，也有可能不完整
        // 在这里处理响应体不保险（不可靠）
        console.log(this.responseText);
        break;
        
        case 4:
        // => 4
        // 一切 OK （整个响应报文已经完整下载下来了）
        // 这里处理响应体
        console.log(this.responseText);
        break;
    }
});
```

>   当 readyState == 2 时，只获取到数据头，这时不能使用 responseText 获取，而是用 getResponseHeader 来获取数据头信息。
>
>   当 readyState == 3 时，可能已经获取部分数据体，但是处理数据是不可靠的，所以一般一般我们都是在 readyState 值为 4 时，执行响应的后续逻辑 。



其实，当 onreadystatechange 执行时 并且 readyState == 4 的时候，在 HTML5 中有了更加便捷的写法：

```js
xhr.onload = function () {
  	console.log(this.readyState); // 4
  	console.log(this.readyState);
}
```





## 三、案例：点击按钮验证用户名是否存在

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div>
        <h1>用户注册</h1>
        用户名：
        <input type="text" name="username">
        <input type="button" value="验证用户名" id="btn">
        <span></span>
        <br> 密码：
        <input type="password" name="passwd">
        <br>
        <input type="submit" value="注册提交">
    </div>

    <script>
        var spanObj = document.getElementsByTagName("span")[0];
        document.getElementById("btn").onclick = function () {
            // 获取用户名
            var uname = document.getElementsByName("username")[0].value;

            // 发送给服务器处理
            var xhr = new XMLHttpRequest();
            xhr.open("get", "checkusername.php?username=" + uname, true);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {                    
                    spanObj.innerText = xhr.responseText;

                    if (xhr.responseText == "用户名已存在！") {
                        spanObj.style.color = "red";
                    } else {
                        spanObj.style.color = "green";
                    }
                }
            };
        };
    </script>
</body>
</html>
```

后台 PHP代码：

```php
<?php
    $user = $_GET["username"];
    if($user == "lvonve") {     // 这里仅仅只判断一个用户名，实际上是由数据库提供
        echo "用户名已存在！";
    } else {
        echo "用户名可以使用！";
    }
?>
```



![](https://github.com/Daotin/pic/raw/master/fgx.png)