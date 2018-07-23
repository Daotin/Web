>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、跨域

跨域这个概念来自一个叫 “同源策略” 的东西。同源策略是浏览器上为了安全考虑实施的非常重要的安全机制。

Ajax 默认只能获取到同源的数据，对于非同源的数据，Ajax是获取不到的。



**什么是同源？**

协议、域名、端口全部相同。



比如一个界面地址为：http://www.example.com/dir/page.html 这个网址，在这个地址中要去访问下面服务器的数据，那么会发生什么情况呢？

| URL                                      | 结果   | 原因                |
| ---------------------------------------- | ---- | ----------------- |
| https://www.example.com/dir/other.html   | 不同源  | 协议不同，https 和 http |
| http://en.example.com/dir/other.html     | 不同源  | 域名不同              |
| http://www.example.com:81/dir/other.html | 不同源  | 端口不同              |
| http://www.example.com/dir/page2.html    | 同源   | 协议，域名，端口都相同       |
| http://www.example.com/dir2/page.html    | 同源   | 协议，域名，端口都相同       |



如果使用 Ajax 获取非同源的数据，会报错，报错信息如下：

```
Failed to load http://hr.pcebg.efoxconn.com/checkUsername.php?uname=176: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost' is therefore not allowed access. The response had HTTP status code 404.
```



那么。想要获取非同源地址的数据，就要使用跨域。不论是 Ajax 还是跨域，都是为了访问服务器的数据。简单的来说， **Ajax 是为了访问自己服务器的数据，跨域是为了访问别人服务器的数据（比如获取天气信息，航班信息等）。**





## 1、跨域的实现

### 1.1、引入外部 js 文件

我们可以通过 script 标签，用 script 标签的属性引入一个外部文件，这个外部文件是不涉及到同源策略的影响的。

```html
<script src="http://www.example.com/dir/xxx.js"></script>
```

然后，这个外部文件中有一个或几个方法的调用，这些方法的定义在自己的界面文件中，而我们想要的是方法的参数，可以在自己定义的方法中拿到。**这就是跨域的本质。**



### 1.2、引入外部 PHP 文件

script 引入的应该是 js 文件，如果我们想要引入 php 文件的话，就需要在 php 代码中，返回 js 格式的代码。

```php
<?php
  	echo "var str = 'hello'";
	echo "func('123')";
  ?>
```

在我们 html 文件中：

```html
<script>
  function func(data) { // 就为了获取参数
    console.log(data);
  }
</script>
<script src="http://www.example.com/xxx.php"></script>
```



再进一步，如果我们在 PHP 地址中传入了参数：

```php
<?php
    $city = $_GET["city"];
    if($city == "beijing") {
		echo "func('获取到北京天气')";
    } else {
      	echo "func('为获取到天气信息')";
    }
 ?>
```

html 文件：

```html
<script>
  function func(data) { // 就为了获取参数
    console.log(data);
  }
</script>
<script src="http://www.example.com/xxx.php?city=beijing"></script>
```



### 1.3、动态创建 script 标签

当然，如果只是手动的在php文件后面传入参数，就太固定了，那么我们可不可以根据用户的输入来获取不同城市天气信息呢？

答案是肯定的。**我们可以采取动态创建 script 的方式来获取用户想要的信息。**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>天气查询</h1><br>
<input type="text" placeholder="请输入城市" id="txt"><br>
<input type="button" value="获取天气" id="btn">

<script>
    function func(data) {
        console.log(data);
    }

    document.getElementById("btn").onclick = function () {
        var city = document.getElementById("txt").value;

        var script = document.createElement("script");
        script.src = "http://hr.pcebg.efoxconn.com/checkUsername.php?city=" + city;

        document.getElementsByTagName("head")[0].appendChild(script);
    };
</script>
</body>
</html>
```



### 1.4、动态指定回调函数名称

还记得我们 html 中有个回调函数的定义吗？这个函数的名称是固定的，我们可不可以动态指定呢？答案也是肯定的，我们既然可以在 php 地址传递参数过去，就可以顺便把回调函数的名称也传递过去，动态的指定回调函数的名称。

```js
//...
function foo (data) {
  console.log(data);
}

script.src = "http://hr.pcebg.efoxconn.com/checkUsername.php?city=" + city + "&callback=foo";
//...
```



外部 php 代码：

```php
<?php
    $city = $_GET["city"];
	$callback = $_GET["callback"];
    if($city == "beijing") {
		echo $callback . "('获取到北京天气')";
    } else {
      	echo $callback . "('为获取到天气信息')";
    }
 ?>
```



之后，再看我们在 script 里面写的 foo 函数的定义，会不会觉得很突兀？我们把它改成 window 的方法就可以了。

```js
window["foo"] = function(data) { console.log(data); };
```

然后把它放到按钮的点击事件中，这样就和按钮的点击事件融为一体了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>天气查询</h1><br>
<input type="text" placeholder="请输入城市" id="txt"><br>
<input type="button" value="获取天气" id="btn">

<script>
    document.getElementById("btn").onclick = function () {
      	window["foo"] = function(data) { console.log(data); };
        var city = document.getElementById("txt").value;

        var script = document.createElement("script");
        script.src = "http://hr.pcebg.efoxconn.com/checkUsername.php?city=" + city + "&callback=foo";

        document.getElementsByTagName("head")[0].appendChild(script);
    };
</script>
</body>
</html>
```

>   在修改回调函数的名称时，只需修改两个部分就可以了（window["foo"] 和 "&callback=foo";），php 的代码不需要修改。





## 2、案例：淘宝提示词

**淘宝提示词接口**

| 地址     | https://suggest.taobao.com/sug |
| ------ | ------------------------------ |
| 作用描述   | 获取淘宝提示词接口                      |
| 请求类型   | get 请求                         |
| 参数     | q：关键词； callback：回调函数名称         |
| 返回数据格式 | jsonp格式                        |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="dv">
    <h1>淘宝提示词</h1>
    <input type="text" placeholder="请输入关键词" id="txt">
    <input type="button" value="查询" id="btn">
    <ul id="uu"></ul>
</div>

<script>
    document.getElementById("btn").onclick = function () {
        var script = document.createElement("script");
        var txt = document.getElementById("txt").value;
        script.src = "https://suggest.taobao.com/sug?q="+txt+"&callback=sug";
        window["sug"] = function (data) {
            var str = "";
            if(data.result.length !== 0) {
                for (var i = 0; i < data.result.length; i++) {
                    str += "<li>"+data.result[i]+"</li>";
                }
                document.getElementById("uu").innerHTML = str;
            } else {
                str = "<li>未找到关键词</li>";
                document.getElementById("uu").innerHTML = str;
            }
        };
        document.querySelector("head").appendChild(script);
    };
</script>
</body>
</html>
```



## 3、案例：百度提示词

**百度提示词接口**

| 地址     | http://suggestion.baidu.com/su |
| ------ | ------------------------------ |
| 作用描述   | 获取百度提示词接口                      |
| 请求类型   | get 请求                         |
| 参数     | wd：关键词； cb：回调函数名称              |
| 返回数据格式 | jsonp格式                        |

>   PS：与淘宝提示词代码相同，只需要修改地址、参数即可。



我们从之前的 Ajax 的代码知道，这样的代码太过于冗余，我们需要对代码进行封装。

我们将实现的代码封装成一个 js 文件。

```js
//my-sug.js 文件

function myAjaxCross(obj) {
    var defaults = {
        url: "#", //地址
        data: {}, // 业务逻辑参数 ，比如：wd=web&pwd=123
        success: function (data) {}, // 参数传递回来的处理函数
        jsonp: "callback", // 获取方法名的key值。是一个回调函数，由后端接口文档指定
        jsonpCallback: "sug" // 获取方法名的value值，也就是方法名字
    };
    // 由 obj 传入的对象覆盖 defaults
    for (var key in obj) {
        defaults[key] = obj[key];
    }

    var script = document.createElement("script");
    // 将 data 里面的参数拼接到 url 后面
    var params = "";
    for (var attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    // 去掉最后多出来的 & 符号
    if (params && (params !== "")) {
        params = params.substring(0, params.length - 1);
    }
    // 再在地址后面拼接回调函数
    script.src = defaults.url + "?" + params + "&" + defaults.jsonp + "=" + defaults.jsonpCallback;

    console.log(script.src);
    // 对回调函数进行定义，将参数传入自己定义的处理数据函数中
    window[defaults.jsonpCallback] = function (data) {
        defaults.success(data);
    };

    document.querySelector("head").appendChild(script);
}
```



下面以百度提示词为例，使用这个封装好的 js 文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="dv">
    <h1>百度提示词</h1>
    <input type="text" placeholder="请输入关键词" id="txt">
    <input type="button" value="查询" id="btn">
    <ul id="uu"></ul>
</div>
<script src="my-sug.js"></script>
<script>

    document.getElementById("btn").onclick = function () {
        myAjaxCross({
            url: "http://suggestion.baidu.com/su",
            data: {wd:document.getElementById("txt").value},
            success: function (data) {
                console.log(data);

                var str = "";
                if(data.s.length !== 0) {
                    for (var i = 0; i < data.s.length; i++) {
                        str += "<li>"+data.s[i]+"</li>";
                    }
                    document.getElementById("uu").innerHTML = str;
                } else {
                    str = "<li>未找到关键词</li>";
                    document.getElementById("uu").innerHTML = str;
                }
            },
            jsonp: "cb",
            jsonpCallback: "sug"

        });
    };
</script>
</body>
</html>
```





## 4、使用 jQuery 获取跨域数据

类似 jQuery 封装好了 Ajax 一样，jQuery 也对跨域数据的获取进行了封装，调用方法跟 Ajax 一模一样。

我们还是以百度提示词举例，使用 jQuery 来获取数据。

```js
        $.ajax({
            url: "http://suggestion.baidu.com/su",
            data: {wd: document.getElementById("txt").value},
            success: function (data) {
                console.log(data);

                var str = "";
                if(data.s.length !== 0) {
                    for (var i = 0; i < data.s.length; i++) {
                        str += "<li>"+data.s[i]+"</li>";
                    }
                    document.getElementById("uu").innerHTML = str;
                } else {
                    str = "<li>未找到关键词</li>";
                    document.getElementById("uu").innerHTML = str;
                }
            },
            dataType: "jsonp",  // 重点
            jsonp: "cb",         // 根据需求指定，默认为：callback
            jsonpCallback: xxx  // 可以省略

        });
```

>   1、dataType: "jsonp" 是重点，当 dataType 的类型为 jsonp 的时候，才能实现 jQuery 的跨域获取数据，否则只能使用同源策略。
>
>   2、jsonp: "cb" ：根据后端需求指定
>
>   3、jsonpCallback: xxx：可以不需要。



## 5、完善myAjax方法达到能获取同源数据和非同源数据

主要借鉴了 jQuery 的处理方法，判断 dataType 的值。

```js
//跨域数据obj   dataType=jsonp
function myAjax(obj){
	if(obj.dataType == "jsonp") {
		myAjax4Across(obj);
	} else {
		myAjax4Normal(obj);
	}

}

function myAjax4Across(obj){
	var defaults = {
		type:"get",
		url:"#",
		data:{},
		success:function(data){},
		jsonp:"callback",
		jsonpCallback:"hehe"
	};

	for(var key in obj) {
		defaults[key] = obj[key];
	}

	var params = "";
	for(var attr in defaults.data){
		params += attr + "=" + defaults.data[attr]  + "&";
	}
	if(params) {
		params = params.substring(0,params.length-1);
		defaults.url += "?" + params;
	}

	defaults.url += "&"+defaults.jsonp+"=" + defaults.jsonpCallback;
	console.log(defaults.url);

	var script = document.createElement("script");
	script.src = defaults.url;

	window[defaults.jsonpCallback] = function(data){
		defaults.success(data);
	};

	var head = document.querySelector("head");
	head.appendChild(script);

}

function myAjax4Normal(obj) {

	var defaults = {
		type:"get",
		url:"#",
		dataType:"json",
		data:{},
		async:true,
		success:function(result){console.log(result);}
	};

	//obj中的属性，覆盖到defaults中的属性
	//1、如果有一些属性只存在obj中，会给defaults中增加属性
	//2、如果有一些属性在obj和defaults中都存在，会将defaults中的默认值覆盖
	//3、如果有一些属性只在defaults中存在，在obj中不存在，这时候defaults中将保留预定义的默认值
	for(var key in obj){
		defaults[key] = obj[key];
	}

	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//得到params
	// data:{
	// 	uname:"zhangsan",
	// 	age:"18"
	// }//  uname=zhangsan&age=18
	var params = "";
	for(var attr in defaults.data){
		params += attr + "=" + defaults.data[attr] + "&";
	}
	if(params) {
		params = params.substring(0,params.length - 1);
	}
	if(defaults.type == "get") {
		defaults.url += "?" + params;
	}
	xhr.open(defaults.type,defaults.url,defaults.async);

	if(defaults.type == "get") {
		xhr.send(null);
	} else if(defaults.type == "post") {
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(params);
	}

	if(defaults.async) {
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					var result = null;
					if(defaults.dataType == "json") {
						result = xhr.responseText;
						result = JSON.parse(result);
					} else if(defaults.dataType == "xml") {
						result = xhr.responseXML;
					} else {
						result = xhr.responseText;
					}
					defaults.success(result);
					
				}
			}
		};
	} else {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				var result = null;
				if(defaults.dataType == "json") {
					result = xhr.responseText;
					result = JSON.parse(result);
				} else if(defaults.dataType == "xml") {
					result = xhr.responseXML;
				} else {
					result = xhr.responseText;
				}
				defaults.success(result);
			}
		}
	}
}
```





## 6、模板引擎的使用

我们之前做的所有工作都是为了获取服务器的数据，不管是同源的数据还是跨域的数据。获取到数据之后，我们就需要将其在页面上展示出来。前端的界面都是由标签构成的，这种展示的过程其实最主要的就是生成 html 标签。

我们之前显示获取到的数据是使用字符串拼接成 li 标签，然后将 li 标签添加到 ul 标签的方式。这种做法有个弊端，就是当界面特别复杂的时候，使用字符串拼接的方式就会很复杂，对于后期的维护也会很困难。



下面介绍的模板引擎就可以很方便的生成 html 标签。

模板引擎的本质是：**将数据和模板结合来生成 html 片段。**

这里介绍一款效率很高的模板引擎：artTemplate，这个模板引擎是腾讯公司出品的开源模板引擎。



**使用步骤：**

1、引入 js 文件

2、定义模板

3、将数据和模板结合起来生成 html 片段

4、将 html 片段渲染到界面中



### 6.1、改造百度提示案例

还是以百度提示词为例：

比如我想生成类型如下格式标签的代码片段：

```html
<li>
  <div>
    <span>索引</span>
    <span>索引对应的值</span>
  </div>
</li>
```



源代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="dv">
    <h1>百度提示词</h1>
    <input type="text" placeholder="请输入关键词" id="txt">
    <input type="button" value="查询" id="btn">
    <ul id="uu"></ul>
</div>
<script src="../jquery-1.12.4.min.js"></script>
<script src="template.js"></script>
  
<!--定义模板-->
<!--1、指定type类型为type="text/html"，而不是jacascript-->
<!--2、指定一个id值-->
<!--3、循环遍历接收到的数据，生成html片段-->

<!--each 就是循环遍历data中的数组，在百度案例里面，data中的数组是s，所以遍历s -->
<!--as 是关键字，i 是索引，value是索引的值。-->
<!--在代码片段中使用的时候，记得要加两个大括号来使用变量的值-->
<script type="text/html" id="myart">
    {{each s as value i}}
        <li>
            <div>
                <span>结果{{i}} --- </span>
                <span>{{value}}</span>
            </div>
        </li>
    {{/each}}
</script>
<script>
    document.getElementById("btn").onclick = function () {

        $.ajax({
            url: "http://suggestion.baidu.com/su",
            data: {wd: document.getElementById("txt").value},
            success: function (data) {
                // 将数据和模板结合起来
                // template 是模板引擎提供的
                // 第一个参数：自定义的模板的id值
                // 第二个参数：接收到的后端的数据
                var html = template("myart", data);
                document.getElementById("uu").innerHTML = html;
            },
            dataType: "jsonp",  // 重点
            jsonp: "cb"         // 根据需求指定，默认为：callback
        });
    };
</script>
</body>
</html>
```



### 6.2、artTemplate的常用语法

**示例1：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>模板引擎</title>
    <script type="text/javascript" src="./template.js"></script>
    <script type="text/html" id="resultTemplate">
         <h1>{{title}}</h1>
         {{each books as value i}}
            <div>{{value}}</div>
         {{/each}}
    </script>
 
    <script type="text/javascript">
        window.onload = function(){
            var data = {
                title : '四大名著图书信息',
                books:['三国演义','水浒传','西游记','红楼梦']
            };
            var html = template("resultTemplate",data);
            var container = document.querySelector("#container");
            container.innerHTML = html;
        }
    </script>
</head>
<body>
    <div id="container">
         
    </div>
</body>
</html>
```

>   在定义的模板里面，使用的是 data 里面的属性，可以直接使用，比如 title。



**示例2：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="./template.js"></script>
    <script id="test" type="text/html">
        {{if isAdmin}}
            <h1>{{title}}</h1>
            <h2>一共有{{count}}条数据</h2>
            <ul>
                {{each list as value i}}
                    <li>索引 {{i + 1}} ：{{value}}</li>
                {{/each}}
            </ul>
        {{/if}}

        {{if !isAdmin}}
            <h1>没有任何数据</h1>
        {{/if}}

    </script>

    <script>
        window.onload = function(){
            var data = {
                title: '条件判断基本例子',
                isAdmin: true,
                list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
            };
            data.count = data.list.length;
            var html = template("test",data);
            document.querySelector("#content").innerHTML = html;
        }
    </script>
</head>

<body>
    <div id="content">
        
    </div>
</body>

</html>

```

>   1、定义的模板里面也可以加条件判断语句：{{if data里面的属性}}。
>
>   2、可以将得到的数据进行处理，比如增加 count 属性，然后在定义的模板里面直接使用。



**实例3：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="./template.js"></script>
    <!-- data.data -->
    <script id="test" type="text/html">
        <ul>
            {{each arr as value i}}
                <li>{{value}}</li>
            {{/each}}
        </ul>
    </script>

    <script>
        window.onload = function(){
            var data = ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他'];
            var temp = {};
            temp.arr = data;
            var html = template("test",temp);//data.xxx 
            document.querySelector("#content").innerHTML = html;
        }
    </script>
</head>

<body>
    <div id="content">
        <ul>
            <li>文艺</li>
            <li>博客</li>
        </ul>
    </div>
</body>

</html>

```

>   1、当我们获取的数据没有内部属性的时候，比如上面的例子，不可以直接使用 data，不然程序会认定为 data.data 属性，而这个属性是不存在的。
>
>   2、我们可以通过增加一个对象，增加这个对象的一个属性 arr，其值为 data，然后遍历 arr 来使用。



**示例4：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="./template.js"></script>
    <script id="test" type="text/html">
        <p>转义：{{#value}}</p>
        <p>不转义： {{value}}</p>
    </script>

    <script>
        window.onload = function(){
            // 这里的数据当中包含特殊字符
            var data = {
                value: '<span style="color:#F00">hello world!</span>'
            };
            var html = template('test', data);
            document.getElementById('content').innerHTML = html;
        }
    </script>
</head>

<body>
    <div id="content"></div>
</body>

</html>

```

>   1、我们获取到的数据也可能是 html 的代码。
>
>   2、在定义的模板中调用的时候，通过在属性前加 “#” 可以将 html 代码转义处理。否则只会理解成字符串。





## 7、第三方接口网站

MOB：www.mob.com，里面有个 MobAPI 服务，有很多好玩的 API 接口，比如天气、电影、汽车等。

一般第三方的接口都需要先注册，然后获得  appkey，才能使用。



## 8、存在的问题

**问题：如果第三方接口返回的是 json 而不是 jsonp 格式的数据的话，怎么办么？**

我们知道 Ajax 需要返回的是函数的调用，函数的参数是 json 格式的，如果第三方直接返回一个 json 的字符串怎么办呢？由于不是返回的函数调用，按照跨域的方式肯定是会报错的。



**解决办法：通过自己的服务器作为中介来实现。**

首先，自己的服务器后台，不管是 PHP 还是 JSP，来获取第三方的数据，由于后台不受同源策略的限制，所以自己的服务器获取到 json 数据后，echo 回来，然后我们前端再使用 Ajax 的四步骤来获取后台返回的 json 类型的字符串。



![](https://github.com/Daotin/pic/raw/master/fgx.png)















