### 问题描述

在一个div中放一个img，但是img的下方和div之间有3px的间隔。

这是浏览器的解析问题，不同的浏览器间隔的还不同。

foxfire是5px，chrome是3px。



### 解决办法

```css
/*方式一*/
div {fint-size: 0;}
/*方式二*/
img{display: block;}
/*方式三*/
img{vertical-align: top;}
```

