>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、each 方法

each 方法用来遍历 jQuery 对象的，它的参数是一个事件处理函数，这个事件处理函数有两个参数，第一个参数是索引，第二个参数时索引对应的 DOM 对象，使用的时候注意转成 jQuery 对象。

语法：

```js
// 参数1：元素集合索引
// 参数2：索引对应的DOM元素
元素集合.each(function (index, ele) {
  // ...
})
```

示例：

```js
$("#uu>li").each(function (index, ele) {
    $(ele).css("opacity", (index + 1) / 10);
})
```





# 二、多库共存

**由来：**

当引入多个 js 库，而这些 js 库中有的方法具有相同的名称，那么在调用这个方法的时候就会出现冲突。



**解决办法：**

权限转让：`var 新方法名 = 旧方法名.noConflict();`

之后，所有使用旧方法名的地方都可以用新方法名代替。





# 三、包装集

我们获取的 jQuery 对象其实都是 DOM 对象的集合，从 jQuery 对象转换成 DOM 集合的方法也可以看出。jQuery 对象转换 DOM 对象的方式：`jQuery对象[0]`，这就说明jQuery 对象其实都是DOM对象的集合。

既然 jQuery 对象是一个集合，那么就有 length 属性。这个 length 属性作用重大，它可以帮助我们在创建元素的只创建一个。



示例：点击按钮，在div中只添加一个p标签。

```js
$("#btn").click(function (param) {
  if ($("#pp").length == 0) {
    $("#dv").append($("<p id='pp'>标签p</p>"));
  }
});
```



# 四、几个元素的宽高属性

```js
元素.innerWidth()/innerHeight() // 方法返回元素的宽度/高度（包含padding，不含边框）
元素.outerWidth()/outerHeight() // 方法返回元素的宽度/高度（包含padding，含边框）
元素.outerWidth(true)/outerHeight(true) // 方法返回元素的宽度/高度（包含padding，含边框，含外边距）
```







# 五、插件

## 1、什么是插件？

插件其实就是一个功能的实现。包括所用到的 css ，jQuery 等的所有代码的封装集合。我们在使用插件的时候只需要引入其对应的 css ，jQuery 文件以及html代码，经过少许的修改就可以得到相似的效果，大大节省了开发的时间，避免了重复造轮子。



插件下载下来一般包括下面几个部分：

css 文件夹：包括 css 文件

js 文件夹：jQuery 官方 js 文件， 插件的 js文件

index.html  ：演示文件（我们可以直接在上面改成自己需要的文件，或者copy里面的代码到自己的文件中）



## 2、插件的制作和使用

jQuery插件制作方式主要有三种：

1、通过`$.extend()`来扩展jQuery；

2、通过`$.fn `向jQuery添加新的方法；

3、通过`$.widget()`应用jQuery UI的部件工厂方式创建。



参考链接（教你开发 jQuery插件）：https://www.cnblogs.com/ajianbeyourself/p/5815689.html



jQuery 插件的使用：

1、导入下载下来的 css 文件

2、导入 jQuery 官方库

3、导入插件的 jQuery 库文件

4、复制 index.html 相关代码到自己的文件中。



![](https://github.com/Daotin/pic/raw/master/fgx.png)