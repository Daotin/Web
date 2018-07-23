>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、jQuery中的Ajax

前面我们写了这么多 Ajax 的代码，其实都是基于 js 的原生代码，在 jQuery 的内部，对 Ajax 已经进行了封装，它提供了很多方法可以供开发者进行调用。不过这些封装都是基于一个方法的基础上进行的修改，这个方法就是`$.ajax()` 。



我们主要学习3个方法：

-   $.ajax();
-   $.get();
-   $.post();





## 1、$.ajax()

$.ajax() 和 自己的 myAjax2() 使用起来非常的相似，基本上原理一致。同样是传入一个对象，有些参数不传递的话也有默认值。

```js
// 其他代码省略
userObj.blur(function () {
  $.ajax({
    url: "./server/checkUsername.php",
    type: "get",
    data: {uname: this.value},
    success: function (result) {
      if(result == "ok") {
        userSpanObj.text("用户名可用");
      } else if(result == "error") {
        userSpanObj.text("用户名不可用");
      }
    }
  });
});
```



## 2、$.get() 和 \$.post

只需要传两个参数，第一个参数是url（带param的，里面有参数和值），第二个参数是回调函数。

```js
// $.get()
$.get(url + "?" + params, function (result) {});
// $.post()
$.post(url, {参数: 值}, function(result) {});
```



示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="dv">
    <h1>用户注册</h1>
    用户名：<input type="text" name="username"><span id="user-span"></span><br>
    邮箱：<input type="text" name="email"><span id="email-span"></span><br>
    手机：<input type="text" name="phone"><span id="phone-span"></span><br>
</div>
<script src="jquery-1.12.4.min.js"></script>
<script>
    // 获取所有元素
    var userObj = $("input[name='username']");
    var emailObj = $("input[name='email']");
    var phoneObj = $("input[name='phone']");

    var userSpanObj = $("#user-span");
    var emailSpanObj = $("#email-span");
    var phoneSpanObj = $("#phone-span");

    //用户名文本框失去焦点事件
    userObj.blur(function () {
        $.get("./server/checkUsername.php?uname=" + $(this).val(), function (result) {
            if (result == "ok") {
                userSpanObj.text("用户名可用");
            } else if (result == "error") {
                userSpanObj.text("用户名不可用");
            }
        });
    });

    //邮箱文本框失去焦点事件
    emailObj.blur(function () {
        $.post("./server/checkEmail.php", {e: $(this).val()}, function (result) {
            if (result == 0) {
                emailSpanObj.text("邮箱可用");
            } else if (result == 1) {
                emailSpanObj.text("邮箱不可用");
            }
        });
    });

    //手机号文本框失去焦点事件
    phoneObj.blur(function () {
        $.post("./server/checkPhone.php", {phonenumber: $(this).val()}, function (result) {
            result = JSON.parse(result);
            if (result.status == 0) {
                phoneSpanObj.text(result.message.tips + " " + result.message.phonefrom);
            } else if (result.status == 1) {
                phoneSpanObj.text(result.message);
            }
        });
    });
</script>
</body>
</html>
```



![](https://github.com/Daotin/pic/raw/master/fgx.png)