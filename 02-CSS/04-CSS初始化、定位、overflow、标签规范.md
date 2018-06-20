>大家好，这里是「 Daotin的梦呓 」从零开始学 Web 系列教程。此文首发于「 Daotin的梦呓 」公众号，欢迎大家订阅关注。在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！


---

# 一、CSS初始化
## 1、什么是CSS初始化呢？
 CSS初始化是指**重设浏览器的样式**。不同的浏览器默认的样式可能不尽相同，所以开发时的第一件事可能就是如何把它们统一。如果没对CSS初始化往往会出现浏览器之间的页面差异。每次新开发网站或新网页时候通过初始化CSS样式的属性，为我们将用到的CSS或html标签更加方便准确，使得我们开发网页内容时更加方便简洁，同时减少CSS代码量，节约网页下载时间。

## 2、为什么要初始化CSS呢？
为了考虑到**浏览器的兼容问题**，其实不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面差异。当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法就是：` * {padding: 0; margin: 0;} ` 。有很多人也是这样写的。这确实很简单，但有人就会感到疑问：*号这样一个通用符在编写代码的时候是快，但如果网站很大，CSS样式表文件很大，这样写的话，他会把所有的标签都初始化一遍，这样就大大的加强了网站运行的负载，会使网站加载的时候需要很长一段时间。

写过css的都知道每个网页引进的css首先都需要初始化，而出名的css reset有YUI css reset（QQ、淘宝等都出现他的影子），业内用的最多的还有Erik Meyer’s CSS Reset。

[以上参考链接：Gavin_zhong](https://www.cnblogs.com/Gavinzhong/p/6995328.html)


## 3、常见的一些CSS初始化代码
- 腾讯

```css
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0} 
body{font:12px"宋体","Arial Narrow",HELVETICA;background:#fff;-webkit-text-size-adjust:100%;} 
a{color:#2d374b;text-decoration:none} 
a:hover{color:#cd0200;text-decoration:underline} 
em{font-style:normal} 
li{list-style:none} 
img{border:0;vertical-align:middle} 
table{border-collapse:collapse;border-spacing:0} 
p{word-wrap:break-word}
```

- 新浪

```css
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{margin:0;padding:0;border:0;} 
body{background:#fff;color:#333;font-size:12px; margin-top:5px;font-family:"SimSun","宋体","Arial Narrow";}
ul,ol{list-style-type:none;} 
select,input,img,select{vertical-align:middle;} 
a{text-decoration:none;} 
a:link{color:#009;} 
a:visited{color:#800080;} 
a:hover,a:active,a:focus{color:#c00;text-decoration:underline;}
```



- 淘宝

```css
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:underline; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; } 
```



---

# 二、overflow 属性

> overflow 属性规定当内容溢出元素框时发生的事情.

![这里写图片描述](https://img-blog.csdn.net/20180530184354599?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

> visible: 默认值。如果内容超出了元素框，则会在框外显示。
> hidden: 如果内容超出了元素框，则会隐藏超出的内容。
> scroll：不管内容有没有超出元素框，一直显示滚动条.
> auto：只有内容出了盒子才显示滚动条。
> inherit: 规定应该从父元素继承 overflow 属性的值。

​	

---

# 三、定位

> 定位有四个方向: left  | right  | top  | bottom

## 1、静态定位（默认）

```css
position: static; // 就是文档流模式的定位。
```



## 2、绝对定位

```css
position:absolute;
```


**然后使用left  | right  | top  | bottom 来确定具体位置。**

> 特点：
> 1.元素使用绝对定位之后不占据原来的位置（脱标）
> 2.元素使用绝对定位，位置是从浏览器出发。
> 3.嵌套的盒子，父盒子没有使用定位，子盒子绝对定位，子盒子位置是从浏览器出发。
> 4.嵌套的盒子，父盒子使用定位，子盒子绝对定位，子盒子位置是从父元素位置出发。
> 5.给行内元素使用绝对定位之后，转换为行内块。（不推荐使用，推荐使用`display:inline-block;`）



## 3、相对定位

```css
position: relative;
```

> 特点：
> 1.使用相对定位，位置从自身出发。
> 2.**不脱标**，其他的元素不能占有其原来的位置。
> **3.子绝父相（父元素相对定位，子元素绝对定位），用的最多的场景。**
> 4.行内元素使用相对定位不能转行内块元素。



## 4、固定定位

```css
position:fixed;
```

> 特点：
> 1.固定定位之后，不占据原来的位置（脱标）
> 2.元素使用固定定位之后，位置从浏览器出发。
> 3.元素使用固定定位之后，会转化为行内块（不推荐，推荐使用display:inline-block;）



## 5、定位（脱标）的盒子居中对齐

`margin:0 auto; ` 只能让标准流的盒子居中对齐

**定位的盒子居中：子绝父相，然后子盒子先往右走父盒子的一半50%，在向左走子盒子的一半(margin-left:负值。**

![这里写图片描述](https://img-blog.csdn.net/20180530184426153?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

> PS：`z-index:10 `改变层叠优先级，值越大优先级越高

---

# 四、标签包含规范

- div可以包含所有的标签。
- p标签不能包含div， h1等标签（一般包含行内元素）。
- h1可以包含p，div等标签（一般不这样）。
- 行内元素尽量包含行内元素，行内元素不要包含块元素。

![这里写图片描述](https://img-blog.csdn.net/20180530184434955?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



---

# 五、规避脱标流

1. **尽量使用标准流。**
2. **标准流解决不了的使用浮动。**
3. **浮动解决不了的使用定位。**

```css
margin-left:auto; //盒子一直往右冲，一直冲不动为止。也是 margin:0 auto; 的由来。
```

---

# 六、图片和文字垂直居中对齐

```css
vertical-align 主要用在 inline-block 标签上，效果最好。
默认属性是: vertical-align:baseline;
```

![这里写图片描述](https://img-blog.csdn.net/20180530184446238?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


