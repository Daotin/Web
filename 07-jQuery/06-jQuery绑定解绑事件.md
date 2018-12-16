## 一、绑定事件

### 1、事件名（不推荐）

语法：

```js
// 元素.事件名(数据，事件处理函数); 
$("div").click({a:1,b:2}, function(e){
	console.log(e.data); // {a:1,b:2}
});
```

> 注意：数据的解释参考 on绑定事件。

示例：

```js
// 绑定鼠标进入，离开，点击事件
$("#btn").mouseenter(function () {
    console.log("mouseenter");
});
$("#btn").mouseleave(function () {
    console.log("mouseleave");
});
$("#btn").click(function () {
    console.log("click");
});

// 链式编程
$("#btn").mouseenter(function () {
    console.log("mouseenter");
}).mouseleave(function () {
    console.log("mouseleave");
}).click(function () {
    console.log("click");
});
```

示例：模拟css的hover事件

```js
$("div").hover(function(){
    // 鼠标放上去触发的事件 // 类似mouseenter
},function(){
    // 鼠标离开触发的事件 // 类似mouseleave
})
```



### ~~2、bind方法~~

> jQuery1.7 以前采用。

语法：

```js
元素.bind("事件名", 事件处理函数);
```

示例：

```js
$("#btn").bind("mouseenter", function () {
    console.log("bind:mouseenter");
});
$("#btn").bind("mouseleave", function () {
    console.log("bind:mouseleave");
});
$("#btn").bind("click", function () {
    console.log("bind:click");
});

// 链式编程
$("#btn").bind("mouseenter", function () {
    console.log("bind:mouseenter");
}).bind("mouseleave", function () {
    console.log("bind:mouseleave");
}).bind("click", function () {
    console.log("bind:click");
});
```



### ~~3、bind对象~~

语法：

```js
元素.bind({"事件名1":事件处理函数1, "事件名2":事件处理函数2,...});
```

示例：

```js
    $("#btn").bind({
        "mouseenter": function () {
            console.log("bind-obj:mouseenter");
        }, "mouseleave": function () {
            console.log("bind-obj:mouseleave");
        }, "click": function () {
            console.log("bind-obj:click");
        }
    });
```

>   使用 bind 对象的方式，只需要一个bind，可以绑定多个事件。





### 4、delegate方法

语法：（父元素替子元素绑定事件）

```js
父元素.delegate("子元素"，"事件名"，事件处理函数);
```

示例：

```js
// 为div下p标签绑定点击事件
$("#dv").delegate("p", "click", function () {
  //....
});
```



### 5、on(推荐)

我发现 delegate 方法内部调用的是 on 方法，那么 on 方法也可以绑定事件

> 注意：on 的参数顺序和 delegate 相反。

语法：

```js
// ele绑定incident事件，事件处理函数incHandler
ele.on("incident",function(){})

// 可以一次绑定多个事件
ele.on("incident1 incident2", function(){});

// 或者这样
ele.on({
    "incident1":function(){},
    "incident2":function(){}
});

// 可以给子元素绑定事件
父元素.on("incident", "子元素", function(){});

// 子元素的位置可以传入参数
// 通过 event.data 获取额外数据，可以是数字、(字符串)、数组、对象, json等
元素.on("inclident", 数据, function(e){
    console.log(e.data); // 获取传入的数据
})
```

>    注意：当中间的数据为字符串时，会自动识别为子元素，这时打印 e.data 为undefined。






### - 为元素绑定多个相同的事件

```js
// 方式一
$("#btn").click(function () {
    console.log("click1");
}).click(function () {
    console.log("click2");
}).click(function () {
    console.log("click3");
});

// 方式二
$("#btn").bind("click",function () {
    console.log("bind:click1");
}).bind("click",function () {
    console.log("bind:click2");
}).bind("click",function () {
    console.log("bind:click3");
});
```

**注意：下面使用 bind 对象的方式，只会执行最后一个相同的绑定事件。**

```js
$("#btn").bind({
    "click": function () {
        console.log("bind-obj:click1");
    }, "click": function () {
        console.log("bind-obj:click2");
    }, "click": function () {
        console.log("bind-obj:click3");
    }
});
```



### - 为事件添加ID

在为元素绑定多个相同事件的时候，可以为绑定的事件加个id，这样在解绑的时候，可以单独针对其中一个或多个进行解绑，而不会把所有相同的事件全部解绑。

```js
$("div").on("click.a",function (e) {
    console.log("aaa")
});

$("div").on("click.b",function (e) {
    console.log("bbb")
});

// 解绑的其中一个的时候
$("div").off("click.a");
```



### 6、一次性事件

```js
元素.one("事件",function(){}); //只能执行一次的事件
```





## 二、jQuery事件对象e

jQuery中的事件对象e和DOM中的事件对象e不同。

jQuery中的事件对象对DOM的事件对象e进行了封装。`jQuery的 e.originalEvent == DOM中的e`

```js
e.stopPropagation() //阻止事件冒泡 // 前提绑定了相同的事件。
e.preventDefault(); // 阻止默认事件

// 同时阻止事件冒泡和阻止默认事件
return false;
```



示例：div拖动案例

```html
<script src="../js/jquery-1.12.4.js"></script>
<script>
    $("<div></div>").appendTo("body")
        .css({
            width: 50,
            height: 50,
            backgroundColor: "red",
            position: "absolute"
        })
        .on("mousedown mouseup", function (e) {
            if (e.type === "mousedown") {
                $(document).on("mousemove", {
                    div: this,
                    x: e.offsetX,
                    y: e.offsetY
                }, function (e) {
                    $(e.data.div).css({
                        left: e.clientX - e.data.x,
                        top: e.clientY - e.data.y
                    });
                });
            } else if (e.type === "mouseup") {
                $(document).off("mousemove");
            }
        })
</script>
```





## 三、元素绑定事件的区别

先说结论：**通过调用事件名的方式和 bind 的方式只能绑定之前存在的元素，后添加的元素不能绑定事件；而 delegate 和 on 的方式绑定元素的方式可以。**

示例1：

```js
// 事件名   
$("#btn").click(function () {
    $("#dv").append($("<p>p标签</p>"));
    $("p").click(function () {
        alert("p被点了");
    });
    $("#dv").append($("<p>p标签2</p>"));
});

// bind
$("#btn").click(function () {
    $("#dv").append($("<p>p标签</p>"));
    $("p").bind("click", function () {
        alert("p被点了");
    });
    $("#dv").append($("<p>p标签2</p>"));
});
```

>   点击 p标签2 的时候不会弹出对话框。



示例2：

```js
// delegate   
$("#btn").click(function () {
    $("#dv").append($("<p>p标签</p>"));
    $("#dv").delegate("p", "click", function () {
        alert("p被点了");
    });
    $("#dv").append($("<p>p标签2</p>"));
});

// on   
$("#btn").click(function () {
    $("#dv").append($("<p>p标签</p>"));
    $("#dv").on("click", "p", function () {
        alert("p被点了");
    });
    $("#dv").append($("<p>p标签2</p>"));
});
```

>   后添加的 p 标签也会被绑定点击事件。





## 三、解绑事件

用什么方式绑定的事件，最好用什么方式解绑事件。

### ~~1、unbind 解绑事件~~

语法：

```js
// 解绑单个或多个事件
绑定事件的元素.unbind("事件名1 事件名2 ...");
// 解绑所有的事件
绑定事件的元素.unbind();
```

>   PS：unbind 也可以解绑 `元素.事件名(事件处理函数)`  方式的绑定事件。



### 2、undelegate 解绑事件

语法：

```js
// 解绑子元素单个或多个事件
父元素.undelegate("子元素", "事件1 事件2 ...");
// 解绑子元素的所有事件
父元素.undelegate();
```

>   下面的写法是无效的：`父元素.undelegate("子元素");`，不能移除子元素的所有事件。



### 3、off 解绑事件

> 1、当绑定事件的时候是：``on(事件，参数，有名字函数)`
>
> 解绑事件：`off(事件，有名字函数)`
>
> 2、当绑定事件的时候是：`on(事件，参数，匿名函数)`
>
> 解绑事件：`off(事件)`



语法：

```js
// 父元素和子元素的所有事件都会解绑
父元素.off();
// 父元素和子元素的单个或多个事件解绑
父元素.off("事件1 事件2 ...");

// 子元素的所有事件解绑
父元素.off("", "子元素"); 
// 子元素的单个或多个事件解绑
父元素.off("事件1 事件2 ...", "子元素"); 

// 父元素中所有的子元素的所有事件解绑
父元素.off("", "**"); 
// 父元素中所有的子元素的单个或多个事件解绑
父元素.off("事件1 事件2 ...", "**"); 
```

>   注意：子元素的所有事件解绑 。下面的写法是无效的。`父元素.off("子元素"); `


