>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！


![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、直接使用 document 获取的元素

```javascript
// 获取 body
document.body;
// 获取 title
document.title; // 获取的是 title 中的值
// 获取 html
document.documentElement;
```



## 1、案例：图片跟着鼠标移动

```html
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
    document.onmousemove = function (ev) {
        // 获取鼠标的横纵坐标
        my$("im").style.left = ev.clientX + "px";
        my$("im").style.top = ev.clientY + "px";
    }
</script>
</body>
</html>
```

> 1、获取鼠标的横纵坐标在鼠标移动的事件中；
>
> 2、注意：图片能够移动，一定要脱标。



---


# 二、offset系列

```
offsetWidth：获取元素的宽（加边框）
offsetHeight：获取元素的高（加边框）
offsetLeft：获取元素距离左边位置的值
offsetTop：获取元素距离上边位置的值
```

---

# 三、scroll 系列

scroll：卷曲

```
scrollWidth：如果元素中内容宽度小于元素的宽度，则为元素的宽度（不含边框），否则为元素中内容的实际宽度。
scrollHeight：如果元素中内容高度小于元素的高度，则为元素的高度（不含边框），否则为元素中内容的实际高度。
scrollLeft：元素中的内容往左卷曲出去的距离。（有滚动条的时候）
scrollTop：元素中的内容往上卷曲出去的距离。（有滚动条的时候）
```



## 1、封装获取 scrollLeft 和 scrollTop 的函数

```javascript
function getScroll() {
    return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    };
}
```

> 1、返回的是一个对象，这个对象有两个自定义属性 left 和 top ，使用的时候直接使用 getScroll().left 或者 getScroll().top 即可获得浏览器滚动条向左向上移动的距离。

> 2、之所以用 “||” 操作是因为浏览器兼容问题。 



# 四、变速动画函数

```javascript
// 变速动画移动函数
function animation(element, target) {
  clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
  // 判断当前的位置
  element.timeId = setInterval(function () {
    var current = element.offsetLeft; // 不能使用 element.style.left
    var onestep = (target - current) / 10;
    onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
    current += onestep;
    element.style.left = current + "px";
    // if (Math.abs(current - target) >= onestep) {
    //     element.style.left = current + "px";
    // } else {
    //     clearInterval(timeId);
    //     element.style.left = target + "px";
    // }

    if(target === current) {
      clearInterval(element.timeId);
      return;
    }

    // 测试代码
    console.log("target="+target+", current="+current+", step="+onestep);
  }, 20);
}
```

>   1、Math.ceil() 和 Math.round() 和 Math.floor() 的区别：

```javascript
zconsole.log(Math.ceil(11.1)); // 12
console.log(Math.ceil(11.8)); // 12
console.log(Math.ceil(-11.1)); // -11
console.log(Math.ceil(-11.8)); // -11

console.log(Math.round(11.1)); // 11
console.log(Math.round(11.8)); // 12
console.log(Math.round(-11.1)); // -11
console.log(Math.round(-11.8));// -12

console.log(Math.floor(11.1)); // 11
console.log(Math.floor(11.8)); // 11
console.log(Math.floor(-11.1)); // -12
console.log(Math.floor(-11.8)); // -12
```



> 2、这里 onestep 使用向上取整，才能走到终点。
>
> 3、这里就不需要判断 if (Math.abs(current - target) >= onestep) 了，因为每次走的 onestep 总是越来越小，到最后都会变成1，所以不存在走不够或者超出的情况。
>
> 4、定时器中加个 return，可以防止走到终点，函数还在不停循环的情况。





## 1、案例：筋斗云



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
            width: 800px;
            height: 50px;
            margin: 0 auto;
            margin-top: 200px;
            background-color: pink;
            position: relative;
        }

        li {
            float: left;
            list-style-type: none;
            width: 100px;
            height: 30px;
            background-color: #fff;
            margin: 10px;
            cursor: pointer;
            text-align: center;
            font: 700 20px/30px "Microsoft YaHei";
        }

        span {
            position: absolute;
            width: 100px;
            height: 30px;
            background-color: rgba(181, 14, 205, 0.8);
            left: 10px;
            top: 10px;

        }
    </style>
</head>
<body>
<input type="button" value="按钮" id="btn">

<div id="box">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ul>
    <span></span>
</div>

<script src="common.js"></script>
<script>

    // 获取box元素
    var boxObj = my$("box");

    // 获取span元素
    var spanObj = boxObj.children[1];

    // 获取所有li元素
    var liObjs = boxObj.children[0].children;

    // 为所有的li注册事件
    for (var i = 0; i < liObjs.length; i++) {
        // 注册鼠标进入
        liObjs[i].onmouseover = mouseoverHandle;
        // 注册鼠标点击
        liObjs[i].onclick = clickHandle;
        // 注册鼠标出来
        liObjs[i].onmouseout = mouseoutHandle;
    }

    function mouseoverHandle() {
        animationChangeSpeed(spanObj, this.offsetLeft);
    }
    var currentPos = 10;
    function clickHandle() {
        currentPos = this.offsetLeft;
    }
    function mouseoutHandle() {
        animationChangeSpeed(spanObj, currentPos);
    }

</script>
</body>
</html>
```

> 1、var currentPos = 10; 是因为我的 span 有个 maigin-left:10px，如果是从最左边开始的话就为 0。
>



# 五、获取任意元素的任意属性值

在 window 下有一个方法：`window.getComputedStyle(element, string)`  可以获取一个元素所有的属性值。

其中第一个参数为需要获取的元素；第二个参数为是否有伪类或者伪样式。返回值是这个元素所有属性的对象集合。

当我们需要什么属性的时候，点出来就可以了。

但是这个方法 IE8 不支持，在 IE8 下有一个属性 currentStyle， 通过 `元素.currentStyle`  的方式可以得到返回值为这个元素所有属性的集合。



兼容代码：

```javascript
function getStyle(element, attr) {
    return window.getComputedStyle ?
        window.getComputedStyle(element, null)[attr] :
        element.currentStyle[attr];
}
```



# 六、为变速动画函数增强

## 1、增加任意一个属性值

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

        input {
            margin-top: 10px;
        }

        div {
            position: absolute;
            width: 200px;
            height: 100px;
            background-color: yellowgreen;
            margin-top: 10px;
            /*left: 20px;*/
        }
    </style>
</head>
<body>
<input type="button" value="移动400px" id="btn1">
<input type="button" value="移动800px" id="btn2">
<div id="dv"></div>

<script src="common.js"></script>
<script>
    // 移动400px
    my$("btn1").onclick = function () {
        animation(my$("dv"), "top", 400);

    };
    // 移动800px
    my$("btn2").onclick = function () {
        animation(my$("dv"), "width", 800);

    };

    var timeId = 0;

    // 变速动画移动函数
    // element --- 任意元素
    // attr ---- 任意属性名字
    // target ---目标位置
    function animation(element, attr, target) {
        clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
        // 判断当前的位置
        element.timeId = setInterval(function () {
            var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
            var onestep = (target - current) / 10;
            onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
            current += onestep;
            element.style[attr] = current + "px";

            if(target === current) {
                clearInterval(element.timeId);
            }
            // 测试代码
            console.log("target="+target+", current="+current+", step="+onestep);
        }, 20);
    }
</script>
</body>
</html>
```

> getStyle 函数返回的属性值是加“px”的所以要加 `parseInt` 进行处理。



## 2、增加任意多个属性值

```html
<body>
<input type="button" value="移动" id="btn">
<div id="dv"></div>

<script src="common.js"></script>
<script>
    my$("btn").onclick = function () {
        animation(my$("dv"), {"left":100,"top":400,"width":400,"height":200});

    };

    var timeId = 0;

    // 变速动画移动函数
    // element --- 任意元素
    // attr ---- 任意属性名字
    // target ---目标位置
    function animation(element, json) {
        clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
        // 判断当前的位置
        element.timeId = setInterval(function () {
            var flag = true;
            for(var attr in json) {
                var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
                var target = json[attr];
                var onestep = (target - current) / 10;
                onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                current += onestep;
                element.style[attr] = current + "px";

                // 保证所有属性都达到目标才清理定时器
                if(target !== current) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId);
            }
            // 测试代码
            console.log("target="+target+", current="+current+", step="+onestep);
        }, 20);
    }
</script>
</body>
```

> 1、既然需要多对属性，很自然的想到 json
>
> 2、在移动的时候使用 for in 循环遍历 json
>
> 3、因为每个属性达到目标值的次数不同，所以需要在所有属性都到达目标值时才清理定时器。



## 3、增加回调函数

回调函数：当一个函数作为参数的时候，这个函数就是回调函数。

作用：增加动画的次数。

```javascript
<body>
<input type="button" value="移动" id="btn">
<div id="dv"></div>

<script src="common.js"></script>
<script>
    my$("btn").onclick = function () {
        animation(my$("dv"), {"left":100,"top":400,"width":400,"height":200}, function (){
            animation(my$("dv"), {"left":300,"top":40,"width":140,"height":20}, function (){
                animation(my$("dv"), {"left":50,"top":200,"width":200,"height":100});
            });
        });
    };

    var timeId = 0;

    // 变速动画移动函数
    // element --- 任意元素
    // attr ---- 任意属性名字
    // target ---目标位置
    function animation(element, json, fn) {
        clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
        // 判断当前的位置
        element.timeId = setInterval(function () {
            var flag = true;
            for(var attr in json) {
                var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
                var target = json[attr];
                var onestep = (target - current) / 10;
                onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                current += onestep;
                element.style[attr] = current + "px";

                // 保证所有属性都达到目标才清理定时器
                if(target !== current) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId);

                if(fn) {
                    fn();
                }
            }
            // 测试代码
            //console.log("target="+target+", current="+current+", step="+onestep);
        }, 20);
    }

    // 获取任意元素的任意一个属性值
    function getStyle(element, attr) {
        return window.getComputedStyle ?
            window.getComputedStyle(element, null)[attr] :
            element.currentStyle[attr];
    }
</script>
</body>
```

> 1、回调函数的调用应该在循环之后，清理定时器之后调用。
>
> 2、测试 chrome、firefox 都可以， IE8 出错，显示 element.style[attr] = current + "px"; 有问题，暂时不知道什么原因。



## 4、增加透明度和层级

透明度：opacity

层级：z-Index

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
        div {
            position: absolute;
            width: 200px;
            height: 100px;
            background-color: yellowgreen;
        }
        input {
            z-index: 1;
            position: absolute;
        }
    </style>
</head>
<body>
<input type="button" value="移动" id="btn">
<div id="dv"></div>

<script src="common.js"></script>
<script>
    my$("btn").onclick = function () {
        animation(my$("dv"),
            {"height": 200, "width":15,"opacity":1,"zIndex":10});
    };

    // 获取任意元素的任意一个属性值
    function getStyle(element, attr) {
        return window.getComputedStyle ?
            window.getComputedStyle(element, null)[attr] :
            element.currentStyle[attr];
    }

    // 变速动画移动函数
    // element --- 任意元素
    // attr ---- 任意属性名字
    // target ---目标位置
    function animation(element, json, fn) {
        clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
        // 判断当前的位置
        element.timeId = setInterval(function () {
            var flag = true;
            for (var attr in json) {
                // 判断attr是不是层级zIndex
                if (attr === "zIndex") {
                    element.style[attr] = json[attr];
                } else if (attr === "opacity") { // 判断attr是不是透明度opacity
                    // 获取当前透明度*100，方便计算
                    var current = getStyle(element, attr) * 100;
                    // 目标透明度也*100
                    var target = json[attr] * 100;
                    var onestep = (target - current) / 10;
                    onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                    current += onestep;
                    element.style[attr] = current / 100;
                } else { // 其他属性
                    var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
                    var target = json[attr];
                    var onestep = (target - current) / 10;
                    onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                    current += onestep;
                    element.style[attr] = current + "px";
                }
                // 保证所有属性都达到目标才清理定时器
                if (target !== current) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId);

                if (fn) {
                    fn();
                }
            }
            // 测试代码
            //console.log("target="+target+", current="+current+", step="+onestep);
        }, 20);
    }
</script>
</body>
</html>
```

> 1、此为最终版变速动画函数。
>
> 2、透明度的设置因为是小数计算，所以需要都乘以100，最后再除以100.
>
> 3、层级 zIndex 不需要渐变，直接设置即可。



## 5、案例：手风琴效果

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
        div {
            width: 1200px;
            height: 500px;
            margin: 100px 0 0 100px;
            border: 1px solid red;
            overflow: hidden;
        }

        li {
            float: left;
            list-style: none;
            width: 240px;
            height: 500px;
        }

    </style>
</head>
<body>
<div id="dv">
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

<script src="common.js"></script>
<script>

    var liObjs = my$("dv").getElementsByTagName("li");

    for (var i = 0; i < liObjs.length; i++) {
        liObjs[i].style.backgroundImage = "url(images/dos.jpg)";
        // 鼠标进入
        liObjs[i].onmouseover = mouseoverHandle;
        // 鼠标退出
        liObjs[i].onmouseout = mouseoutHandle;
    }

    function mouseoverHandle() {
        // 先设置所有宽度为100
        for (var j = 0; j < liObjs.length; j++) {
            animation(liObjs[j], {"width": 100});
        }
        // 再设置当前元素宽度为800
        animation(this, {"width": 800});
    }

    function mouseoutHandle() {
        for (var j = 0; j < liObjs.length; j++) {
            animation(liObjs[j], {"width": 240});
        }
    }

    // 获取任意元素的任意一个属性值
    function getStyle(element, attr) {
        return window.getComputedStyle ?
            window.getComputedStyle(element, null)[attr] :
            element.currentStyle[attr];
    }

    // 变速动画移动函数
    // element --- 任意元素
    // attr ---- 任意属性名字
    // target ---目标位置
    function animation(element, json, fn) {
        clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
        // 判断当前的位置
        element.timeId = setInterval(function () {
            var flag = true;
            for (var attr in json) {
                // 判断attr是不是层级zIndex
                if (attr === "zIndex") {
                    element.style[attr] = json[attr];
                } else if (attr === "opacity") { // 判断attr是不是透明度opacity
                    // 获取当前透明度*100，方便计算
                    var current = getStyle(element, attr) * 100;
                    // 目标透明度也*100
                    var target = json[attr] * 100;
                    var onestep = (target - current) / 10;
                    onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                    current += onestep;
                    element.style[attr] = current / 100;
                } else { // 其他属性
                    var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
                    var target = json[attr];
                    var onestep = (target - current) / 10;
                    onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                    current += onestep;
                    element.style[attr] = current + "px";
                }
                // 保证所有属性都达到目标才清理定时器
                if (target !== current) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId);

                if (fn) {
                    fn();
                }
            }
            // 测试代码
            //console.log("target="+target+", current="+current+", step="+onestep);
        }, 20);
    }
</script>
</body>
</html>
```

![](https://github.com/Daotin/pic/raw/master/fgx.png)

![Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)