

cookie 就是一种特殊的字符串。是存放于指定网站的指定浏览器下面的文件夹下。用来帮助页面记录用户操作（会话跟踪技术）

cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。

cookie不支持本地文件，只能是网站下文件。

cookie 的属性有：名称，内容，域名，路径，创建时间，到期时间。



cookie 的创建与保存：

使用document对象的cookie属性，cookie是以键值对（key=value）字符串的方式保存在文件里的。

```js
// 定义语法 document.cookie = "名称=内容"
document.cookie = "myname=Daotin";
document.cookie = "myage=18";
```

> 
> 在cookie 里面，名称是唯一的标识；
>
> 如果定义的时候改变了名称，那么cookie会被覆盖；
>
> 如果定义的时候改变了名称后面的内容，那么cookie取到的内容也会改变。



读取cookie：
```js
// 取值，返回值为字符串
console.log(document.cookie); //"myname=Daotin; myage=18" (使用服务器模式打开网页才可以看到)
```





cookie失效时间:

如果不加失效时间，默认情况下为临时cookie，即单会话cookie，也就是关闭浏览器则cookie失效。

如果设置的是一个过期的时间，会自动删除。

```js
// 设置cookie 到期时间
var date = new Date();
date.setDate(date.getDate()+7); // 设置7天后的时间点
document.cookie = "myage=18; expires=" + date; 	
```



cookie注意点：

- 一次创建多个cookie，可以使用 “&”进行分割：
- 在cookie 的名或值中不能有：分号（;）、逗号（,）、等号（=）以及空格。
- 对于中文怎么办？中文编码问题，使用`encodeURIComponent('xxxxx')`编码，再使用`decodeURIComponent(document.cookie)`解码，能解决中文乱码问题。
- 给document.cookie赋值，并不会覆盖原来的值，除非键是一样的。




常见cookie应用



日期cookie ：

当我们访问某些网站时，首页会显示：“你上次访问的时间是：2016.03.21”。日期是在 cookie 中保存着。

保存用户登录状态：

将用户id存储于一个cookie内，这样当用户下次访问该页面时就不需要重新登录了。cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。

跟踪用户行为：

一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是烦 琐的，当利用了 cookie后就会显得很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，它就会自动显示上次用户所在地区的天气情况。

定制页面（md2all）：

如果网站提供了换肤或更换布局的功能，那么可以使用cookie来记录用户的选项，例如：背景色、分辨率等。当用户下次访问时，仍然可以保存上一次访问的界面风格。 





实现cookie的增删改查。



