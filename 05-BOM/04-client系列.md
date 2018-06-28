>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！


![](https://github.com/Daotin/pic/raw/master/fgx.png)





# 一、client 系列

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #dv {
            width: 300px;
            height: 200px;
            border: 20px solid purple;
            margin-top: 50px;
            margin-left: 100px;
        }
        #dv2 {
            width: 100px;
            height: 50px;
            border: 15px solid #e88e1d;
            margin-top: 20px;
            margin-left: 30px;
        }
    </style>
</head>
<body>
<div id="dv">
    <div id="dv2"></div>
</div>
<script src="common.js"></script>
<script>
    console.log(my$("dv").clientWidth); // 300
    console.log(my$("dv").clientHeight); // 200
    console.log(my$("dv").clientLeft); // 20
    console.log(my$("dv").clientTop); // 20

    console.log(my$("dv2").clientWidth); // 100
    console.log(my$("dv2").clientHeight); // 50
    console.log(my$("dv2").clientLeft); // 15
    console.log(my$("dv2").clientTop); // 15
</script>
</body>
</html>
```

> **clientWidth**：可视区域的宽度**（不含边框）**
>
> **clientHeight**：可视区域的高度**（不含边框）**
>
> **clientLeft**：左边框的宽度
>
> **clientTop**： 上边框的宽度
>
> **clientX**：可视区域的横坐标
>
> **clientY**：可视区域的纵坐标



## 1、案例：图片跟着鼠标移动最终版

之前图片跟着鼠标移动的案例有些bug，就是IE8不支持。

在IE8 下 没有事件参数，但是有 window.event 可以代替。

window.event： 谷歌， IE8 支持，但是火狐不支持。

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        img {
            position: absolute;
        }
    </style>
</head>
<body>
<img src="images/Daotin.png" id="im">
<script src="common.js"></script>
<script>
    document.onmousemove = function (e) {
        // 获取鼠标的横纵坐标
        e = window.event || e;
        my$("im").style.left = e.clientX + "px";
        my$("im").style.top = e.clientY + "px";

        console.log(window.event);
    }
</script>
</body>
</html>
```



这个时候，如果 body 的高度/宽度变化了，可以滚动滑轮了会怎样呢？

```javascript
body {
    height: 5000px;
}
```

这时候，如果鼠标不动，只滚动滑轮的话，会发现图片会距离鼠标原点越来越远。为什么呢？

因为当我们滚动滑轮的时候，鼠标距离页面顶部的距离改变了，但是 clientY 是可视区域的大小，滚动滑轮的时候， clientY 的大小是没有变的，但是鼠标距离页面顶部的距离改变了，而图片在 Y 轴的距离计算还是按照 clientY 计算的，所以图片就会距离鼠标越来越远。

那么，怎么办呢？

事件参数 e 有连个属性：pageX,pageY 是距离页面顶部边界的距离，可以直接使用，但是不幸的是，IE8 又不支持。看来，只能是鼠标移动的距离 + 滑轮卷曲出去的距离来实现了。



思路：

之前我们封装的兼容代码都在一个函数里面，这里我们封装到一个对象 evt 里面。

这个 evt 对象封装了所有浏览器都支持的关于 clientX,clientY 等页面坐标的函数。

**图片跟着鼠标移动的最终版：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body {
            height: 5000px;
        }

        img {
            position: absolute;
        }
    </style>
</head>
<body>
<img src="images/Daotin.png" id="im">
<script src="common.js"></script>
<script>
    var evt = {
        // 获取通用事件对象
        getEvent: function (e) {
            return window.event||e;
        },
        // 获取通用ClientX
        getClientX: function (e) {
            return this.getEvent(e).clientX;
        },
        // 获取通用ClientY
        getClientY: function (e) {
            return this.getEvent(e).clientY;
        },
        // 获取通用 scrollLeft
        getScrollLeft: function () {
            return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        },

        // 获取通用 scrollTop
        getScrollTop: function () {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        },

        // 获取通用 pageX
        getPageX: function (e) {
            return this.getEvent(e).pageX?this.getEvent(e).pageX:this.getClientX(e)+this.getScrollLeft();
        },

        // 获取通用 pageY
        getPageY: function (e) {
            return this.getEvent(e).pageY?this.getEvent(e).pageY:this.getClientY(e)+this.getScrollTop();
        }
    };

    document.onmousemove = function (e) {
        my$("im").style.left = evt.getPageX(e) + "px";
        my$("im").style.top = evt.getPageY(e) + "px";
    }
</script>
</body>
</html>
```



## 2、案例：淘宝宝贝放大镜

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        /*#box {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-color: lightpink;*/
        /*}*/
        .small {
            float: left;
            width: 384px;
            height: 240px;
            margin-top: 50px;
            margin-left: 50px;
        }

        .mask {
            width: 128px;
            height: 80px;
            background-color: yellow;
            opacity: 0.4;
            position: absolute;
            margin-top: 50px;
            margin-left: 50px;
            left: 0;
            top: 0;
            cursor: move;
            display: none;
        }

        .big {
            width: 640px;
            height: 400px;
            float: left;
            margin-left: 50px;
            overflow: hidden;
            display: none;
        }

    </style>
</head>
<body>
<div id="box">
    <div class="small">
        <img src="images/dos.jpg" alt="">
        <div class="mask"></div>
    </div>
    <div class="big">
        <img src="images/window.jpg" alt="">
    </div>
</div>
<script src="common.js"></script>
<script>
    // 获取所有需要的元素
    var boxObj = my$("box");

    // 获取 small
    var smallObj = boxObj.children[0];

    // 获取 mask
    var maskObj = smallObj.children[1];

    // 获取 big
    var bigObj = boxObj.children[1];

    // 获取 bigImg
    var bigImgObj = bigObj.children[0];

    // 鼠标进入，显示遮挡层和大图
    smallObj.onmouseover = function () {
        maskObj.style.display = "block";
        bigObj.style.display = "block";
    };

    // 鼠标退出，隐藏遮挡层和大图
    smallObj.onmouseout = function () {
        maskObj.style.display = "none";
        bigObj.style.display = "none";
    };

    // 遮挡层跟着鼠标移动，使鼠标位于遮挡层中央
    smallObj.onmousemove = function (e) {
        var x = evt.getClientX(e) - parseInt(maskObj.offsetWidth / 2)-50; // 这50是遮挡层初始偏移left的距离
        var y = evt.getClientY(e) - parseInt(maskObj.offsetHeight / 2)-50;// 这50是遮挡层初始偏移top的距离
		// 遮挡层的最小移动范围
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
		// 遮挡层的最大移动范围
        x = x > smallObj.offsetWidth - maskObj.offsetWidth
            ? smallObj.offsetWidth - maskObj.offsetWidth
            : x;
        y = y > smallObj.offsetHeight - maskObj.offsetHeight
            ? smallObj.offsetHeight - maskObj.offsetHeight
            : y;

        maskObj.style.left = x + "px";
        maskObj.style.top = y + "px";

        // 小图移动的距离/小图能移动的最大距离 == 大图移动的距离/大图能移动的最大距离
        // 大图移动的距离 = 小图移动的距离 * 大图能移动的最大距离 / 小图能移动的最大距离；
        var bigImgX = x * (bigImgObj.offsetWidth - bigObj.offsetWidth) / (smallObj.offsetWidth - maskObj.offsetWidth);
        var bigImgY = y * (bigImgObj.offsetHeight - bigObj.offsetHeight) / (smallObj.offsetHeight - maskObj.offsetHeight);

        bigImgObj.style.marginLeft = -bigImgX + "px";
        bigImgObj.style.marginTop = -bigImgY + "px";
    };
</script>
</body>
</html>
```

> 第一步：获取所有需要的元素对象。
>
> 第二步：鼠标进入，离开小图，显示和隐藏遮挡层和大图。
>
> 第三步：遮挡层随着鼠标的移动而移动。
>
> 第四步：遮挡层移动的最大范围在小图内。
>
> 第五步：小图移动的距离/小图能移动的最大距离 == 大图移动的距离/大图能移动的最大距离，由此算出大图移动的距离 = 小图移动的距离 * 大图能移动的最大距离 / 小图能移动的最大距离。
>
> 第六步：将得到的大图移动的距离的负值赋值给大图即可。



## 3、案例：DIY 滑动栏

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        #box {
            width: 200px;
            height: 300px;
            border: 1px solid red;
            margin-top: 100px;
            margin-left: 300px;
            overflow: hidden;
        }

        .content {
            float: left;
            width: 180px;
            /*height: 900px;*/
        }

        .right {
            float: left;
            width: 20px;
            height: 300px;
            background-color: #e7e7e7;
            position: relative;
        }

        .bar {
            position: absolute;
            left: 0;
            top: 0;
            width: 12px;
            height: 50px;
            margin: 0 4px;
            background-color: #7b7b7b;
            /*cursor: pointer;*/
        }
    </style>
</head>
<body>
<div id="box">
    <div class="content">
        kkkkkk温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！
        温馨提示：由于厂商可能在未提前通知的情况下更改产品包装、产地、赠品或随机附件等。
        飞虎回复仅在回复当时对提问者有效，其他网友仅供参考！若由此给您带来不便敬请谅解，谢谢！Daotin
    </div>
    <div class="right">
        <div class="bar"></div>
    </div>
</div>
<script src="common.js"></script>
<script>
    // 获取所有的元素
    // 获取 box
    var boxObj = my$("box");

    // 获取 content
    var conObj = boxObj.children[0];

    // 获取 right box
    var rightObj = boxObj.children[1];

    // 获取 bar
    var barObj = rightObj.children[0];

    // 鼠标点击bar，拖动
    barObj.onmousedown = function (e) {
        var spaceY = evt.getClientY(e) - barObj.offsetTop; // 鼠标距离bar顶部的距离

        document.onmousemove = function () {
            var y = evt.getClientY(e) - spaceY;
            y = y < 0 ? 0 : y;
            y = y < rightObj.offsetHeight - barObj.offsetHeight ? y : rightObj.offsetHeight - barObj.offsetHeight;
            barObj.style.top = y + "px";

            // 防止滑动的时候选中了文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

            // 鼠标移动的时候，content也应该移动
            // bar移动的距离/ bar可以移动的最大距离 = content移动的距离/ content可以移动的最大距离
            var contentY = y * (conObj.offsetHeight - boxObj.offsetHeight) / (rightObj.offsetHeight - barObj.offsetHeight);
            conObj.style.marginTop = -contentY + "px";
        };
    };

    document.onmouseup = function () {
        document.onmousemove = null;
    }

    // 鼠标离开
</script>
</body>
</html>
```

> 1、获取所有需要的元素。
>
> 2、鼠标点击，滑动，抬起，三个事件。
>
> 3、鼠标点击的时候获取鼠标的位置。
>
> 4、鼠标滑动的时候计算坐标 y。由于要保证鼠标移动的时候，鼠标相对滑动条顶部的距离一定，所以需要 spaceY。还需要注意滑动条滑动的范围。
>
> 5、鼠标抬起的时候，清除鼠标移动的事件。
>
> 6、防止滑动的时候选中了文字 `window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();` 
>
> 7、通过比例，计算 content 内容反方向移动的距离。



---



# 二、复习

## 1、元素隐藏的不同方式

```javascript
my$("dv").style.display = "none"; // 不占位
my$("dv").style.visibility = "hidden"; // 占位
my$("dv").style.opacity = 0;  // 占位
my$("dv").style.height = 0; // 占位
```

![](https://github.com/Daotin/pic/raw/master/fgx.png)

![Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)