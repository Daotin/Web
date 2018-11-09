

cookie 就是一种特殊的字符串。是存放于指定网站的指定浏览器下面的。

cookie 的属性有：名称，内容，域名，路径，创建时间，到期时间。

cookie 的创建：

```js
// 定义语法 document.cookie = "名称=内容"
document.cookie = "myname=Daotin";
document.cookie = "myage=18";

// 设置cookie 到期时间
var date = new Date();
date.setDate(date.getDate()+7); // 设置7天后的时间点
document.cookie = "myage=18; expires=" + date;

// 取值
console.log(document.cookie); //"myname=Daotin; myage=18" (使用服务器模式打开网页才可以看到)
```

> 在cookie 里面，名称是唯一的标识，如果定义的时候改变了名称后面的内容，那么cookie取到的内容也会改变





实现cookie的增删改查。



