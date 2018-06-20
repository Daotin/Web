> 大家好，这里是「 Daotin的梦呓 」从零开始学 Web 系列教程。此文首发于「 Daotin的梦呓 」公众号，欢迎大家订阅关注。在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![这里写图片描述](https://img-blog.csdn.net/20180613192754906?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


# 一、DOM概念

DOM 的全称为：**Document Object Model 文档对象模型**

我们把 html 文件看成一个文档，因为万物皆对象，所以这个文档也是一个对象。这个文档中所有的标签都可以看成一个对象，比如 div 标签，p 标签等。



## 1、相关概念

- html 页面有一个根标签 html 标签。
- 标签也叫元素，也叫对象。
- 页面中的顶级对象：document。



**节点（node）**：页面中所有的内容都是节点。包括标签，属性，文本等


xml 文件也可以看成一个文档。
html：侧重于展示数据。
xml：侧重于存储数据。



## 2、DOM树

文档下面有根标签 html，html 下有 head 和 body 标签，head 下又有 title 等，body 下又有 div 等。

由文档及文档中的所有元素（标签）组成的树状结构，叫树状图（DOM树）





# 二、DOM的作用

DOM的作用主要是：**操作页面的元素（标签）。**



**DOM经常进行的操作**

- 获取元素
- 动态创建元素
- 对元素进行操作（设置属性或调用其方法）
- 事件（什么时机做相应的操作）








# 三、DOM初体验

**基本上分三步走：**

- 根据 id 等获取元素
- 为获取的元素注册事件
- 添加事件处理函数



> 注意：所有function后面都有分号。





## 1、对标签的操作



### 1.1、点击按钮，弹出对话框

```javascript
<body>
    <input type="button" value="按钮" id="btn">
    <script>
        document.getElementById("btn").onclick = function () {
            alert("hahahaha");
        };
    </script>
</body>
```

### 1.2、点击按钮显示图片，并设置图片宽高

```html
<body>
    <input type="button" value="按钮" id="btn">
    <img src="" id="im">
    <script>
        document.getElementById("btn").onclick = function() {
            document.getElementById("im").src = "1.png";
            document.getElementById("im").width = 600;
            document.getElementById("im").height = 200;
        };
    </script>
</body>
```




> document.getElementById("xxx"); 返回值是一个标签对象，利用这个对象可以操作其中的元素，像 type，value 等都是它的元素。

> 注意：html 标签里面的 width 和 height 属性是不需要加 px 的，css 的 style 里面的宽高才要加。



### 1.3、点击按钮修改 p 标签的内容

```html
<body>
    <input type="button" value="按钮" id="btn">
    <p id="p1">p标签</p>
    <script>
        document.getElementById("btn").onclick = function() {
            document.getElementById("p1").innerText = "我是一个P标签";
        };
    </script>
</body>
```

> 凡是成对的标签，设置中间的中间的文本内容，都是用`innerText`属性。



### 1.4、点击按钮设置所有的 p 标签内容

```html
<body>
	<input type="button" value="按钮" id="btn"/>
	<div>
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
	</div>
	<div>
		<p>Daotin</p>
		<p>Daotin</p>
		<p>Daotin</p>
	</div>

	<script>
		document.getElementById("btn").onclick = function () {
			var pObjs = document.getElementsByTagName("p");			
			
			for(var i=0; i<pObjs.length; i++) {
				pObjs[i].innerText = "world";
			}
		}
	</script>

</body>
```



*如果只想设置第一个 div 里面的 p标签怎么办呢？*

```html
<body>
	<input type="button" value="按钮" id="btn"/>
	<div id="box">
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
	</div>
	<div>
		<p>Daotin</p>
		<p>Daotin</p>
		<p>Daotin</p>
	</div>

	<script>
		document.getElementById("btn").onclick = function () {
			var pObjs = document.getElementById("box").getElementsByTagName("p");			
			
			for(var i=0; i<pObjs.length; i++) {
				pObjs[i].innerText = "world";
			}
		}
	</script>
</body>
```



### 1.5、点击按钮修改图片的 alt 和 title 属性

```html
<body>
<input type="button" value="按钮" id="btn">
<img src="1.png" alt="Google" title="logo">

<script>
    document.getElementById("btn").onclick = function () {
        var imgObjs = document.getElementsByTagName("img");
        imgObjs[0].alt = "Daotin"; 
        imgObjs[0].title = "nihao";
    };
</script>
</body>
```

> imgObjs[0]：代表的就是伪数组的第一个对象。



### 1.6、点击按钮修改多个文本框的值

```html
<body>
<input type="button" value="点击按钮填充文本" id="btn"><br>
<input type="text" value=""><br>
<input type="text" value=""><br>
<input type="text" value=""><br>
<input type="text" value=""><br>
<input type="text" value=""><br>

<script>
    document.getElementById("btn").onclick = function (ev) {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            // 判断 type 是否为text
            if(inputs[i].type === "text") {
                // 这时候不能使用 innerText ，因为这不是成对的标签
                inputs[i].value = "Daotin,你好啊";
            }
        }
    };
</script>
</body>
```



### 1.7、点击按钮修改 value 属性

```html
<body>
<input type="button" value="点击按钮填充文本" id="btn"><br>

<script>
    var btnObj =  document.getElementById("btn");
    btnObj.onclick = function (ev) {
        // btnObj.value = "Daotin";
        // btnObj.type = "text";
        // btnObj.id = "btn2";
        this.value = "Daotin";
        this.type = "text";
        this.id = "btn2";
    };
</script>
</body>
```

> 在一个对象的事件里面对当前事件的属性的操作，可以使用`this.属性`来修改。



### 1.8、按钮的排他功能

```html
<body>
<input type="button" value="lvonve">
<input type="button" value="lvonve">
<input type="button" value="lvonve">
<input type="button" value="lvonve">
<input type="button" value="lvonve">

<script>
    // 获取全部按钮
    var btnObjs = document.getElementsByTagName("input");

    // 循环为所有按钮注册点击事件
    for(var i=0; i<btnObjs.length; i++) {
        btnObjs[i].onclick = function (ev) {
            // 先设置点击每个按钮的时候将所有的按钮value为lvonve
            for(var j=0; j<btnObjs.length; j++) {
                btnObjs[j].value = "lvonve";
            }
            //再设置当前点击的按钮为Daotin
            this.value = "Daotin";
        };
    }
</script>
</body>
```

> 并不是我们通常想的，点击某一个按钮的时候，将之前点击的按钮恢复，而是点击每一个按钮之前，将所有的按钮恢复。



### 1.9、点击图片修改路径

```html
<body>
<input type="button" value="lvonve" id="btn">
<img src="1.png" id="im">

<script>
    function myid(id) {
        return document.getElementById(id);
    }
    myid("btn").onclick = function (ev) {
        myid("im").src = "2.jpg";
    };
</script>
</body>
```

> 如果有多个地方都使用了`document.getElementById("")` 的话，可以封装成一个函数来调用。



### 1.10、点击按钮选择性别和兴趣

```html
<body>
<input type="button" value="修改性别" id="btn1">
<input type="radio" value="1" name="sex">男
<input type="radio" value="2" name="sex" id="nv">女
<input type="radio" value="3" name="sex">保密
<br>
<input type="button" value="选择兴趣" id="btn2">
<input type="checkbox" value="1" name="hobby" id="chi">吃饭
<input type="checkbox" value="2" name="hobby">睡觉
<input type="checkbox" value="3" name="hobby" id="play">打豆豆

<script>
    function my$(id) {
        return document.getElementById(id)
    }

    my$("btn1").onclick = function () {
        my$("nv").checked = true; // 填“checked”等同于true
    };

    my$("btn2").onclick = function () {
        my$("chi").checked = true;// 填“checked”等同于true
        my$("play").checked = true;// 填“checked”等同于true
    };
</script>
</body>
```

> 1、在单标签中，如果属性对应的值只有一个，而且值和属性同名，那么 js 操作 DOM 的时候，这个属性值可以用布尔类型表示。比如：`checked="checked"` `selected="selected"` `disabled="disabled"` `readonle="readonly"` 等。
>
> 2、在上面例子，不管是写 "checked"还是其他任何的字符串，都会选中的，因为非空字符串都会被浏览器转换成 true。
>
> 3、在 html 中，如果属性的值只有一个，可以直接写这个属性，而不需要赋值，也是有效的。比如：`<input type="text" value="文本" readonly />`  这个时候，这个文本框也是被禁用的。


![这里写图片描述](https://img-blog.csdn.net/20180613192719649?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

