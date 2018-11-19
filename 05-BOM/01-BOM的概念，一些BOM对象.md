# 一、BOM

## 1、BOM的概念

BOM（Browser Object Model）：浏览器对象模型。

在浏览器中的一些操作都可以使用 BOM 的方法进行编程处理。

比如：刷新浏览器、前进、后退、在地址栏输入 URL 等。



## 2、BOM 顶级对象

BOM 的顶级对象是：`window`

window 是浏览器的顶级对象，当调用 window 下的属性和方法时，可以省略 window。

>   注意：
>
>   1、window 下的一个特殊属性：window.name，所以不要轻易定义 name 变量，会导致 window.name 被修改。
>
>   2、top 等同于 window。



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



## 4、window对象方法

### 4.1、open

**描述：**打开一个新的浏览器窗口或查找一个已命名的窗口。

**语法：**`var openId = window.open(新窗口地址,"窗口名",窗口属性);`

**示例：**`var openId = window.open("sub.html","窗口名","Width=300px, height=250px, left=100px, top=100px");`

> width: 新窗口的宽
>
> height：新窗口的高
>
> left：新窗口距离屏幕左边的距离
>
> top：新窗口距离屏幕顶部的距离



**注意：**如果两次弹出窗口名一样，将不会打开新弹窗，而再之前的弹窗中加载新页面。



**关闭窗口：**

```js
openId.close(); //关闭id为openId的窗口
close(); // 关闭当前窗口
```







## 5、页面加载对象

**提出问题：**

我们知道，如果将 script 标签放在 head 里面的话，页面加载的时候是先加载的 script 标签，之后才加载 body 里面的标签。如果 script 特别大的话，就很影响用户体验。



**解决办法：**

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
>
> `onscroll` ：当滚轮滚动时触发。
>
> `onresize` ：当窗口大小改变时触发。









## 6、location 对象（地址栏）

学习一个对象主要是学习它里面的属性和方法。

### 6.1、属性

```javascript
console.log(window.location.href); // 地址域名	
console.log(window.location.search);//?_ijt=28855sggj8kcffva8q9bhc1eh0  --- 搜索的内容
console.log(window.location.hash); // 地址栏上#及后面的内容
console.log(window.location.host); // localhost:63342 ---- 主机名及端口号
console.log(window.location.hostname); // localhost  ---- 主机名
console.log(window.location.port); //63342  ---- 端口号
console.log(window.location.pathname);// /JS/images/location.html --- 相对路径
console.log(window.location.protocol);// http:   --- 协议
```

### 6.2、方法

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
> `location.reload() `： 刷新页面。刷新页面也可以使用：把href =自己本身的地址
>
> `location.replace() `: 设置跳转的页面地址，但是不保存跳转前的地址。



## 7、history 对象

```js
window.history.length // 返回浏览器历史列表中的 URL 数量
window.history.forward(); // 前进，加载 history 列表中的下一个 URL
window.history.back() // 后退，加载 history 列表中的前一个 URL
window.history.go(number);  //加载 history 列表中的某个具体页面，或者要求浏览器移动到指定的页面数量（负数为后退number页，正数为前进number页）
```

`<a href="javascript:window.history.reload()"></a>`

a 标签可以使用 javascript的方式来编写js代码。



## 8、navigator 对象

```js
window.navigator.platform; // 判断浏览器所在的系统平台 // win32
window.navigator.appName  // 浏览器名称 // Netscape
window.navigator.appVersion  // 浏览器版本 //5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36
window.navigator.userAgent; // 判断浏览器的类型，是谷歌火狐还是IE // chrome 下结果：Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
```





## 9、screen 对象

screen 对象包含有关客户端显示屏幕的信息。

很少使用，用的话只在移动端使用，在PC端固定不变，获取的是设备的宽高，而不是页面的宽高。

```js
screen.availHeight // 返回可用显示屏幕的高度 (除 Windows 任务栏之外)。 
screen.availWidth//返回可用显示屏幕的宽度 (除 Windows 任务栏之外)。 
screen.height //返回显示器屏幕的高度。 
screen.width  //返回显示器屏幕的宽度。
```





## 10、document

属性：

```js
document.all   //提供对文档中所有 HTML 元素的访问。是数组类型 
document.forms // 返回对文档中所有 Form 对象引用。是数组类型
document.URL    //返回当前文档的 URL。 
document.bgColor //可以改变文档的颜色；（ document.bgColor="gray";）
document.documentElement   // html元素
document.body     // body元素
```

方法：

```js
document.getElementById() //返回对拥有指定 id 的第一个对象的引用。 
document.getElementsByName()// 返回带有指定名称的对象集合。 
document.getElementsByTagName() //返回带有指定标签名的对象集合。  
document.write() //向文档写 HTML 表达式 或 JavaScript 代码。
```





## 11、iframe

引入外部链接，一般用于展示，可以一个页面放多个外部链接页面。如果操作页面的话，还是会跳转到外部链接网站。

```html
<iframe src="http://www.360.com" width="400px" height="400px"></iframe>
```

