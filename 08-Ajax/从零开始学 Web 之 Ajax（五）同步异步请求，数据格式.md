>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、同步请求与异步请求

**同步请求：**在用户进行请求发送之后，浏览器会一直等待服务器的数据返回，如果网络延迟比较高，浏览器就一直卡在当前界面，直到服务器返回数据才可进行其他操作。

**异步请求：**在用户进行请求发送之后，浏览器可以自由操作页面中其他的元素，当服务器放回数据的时候，才触发相应事件，对返回的数据进行操作。



如果将 Ajax 请求改为同步请求的话：

1、界面会卡顿，卡顿事件取决于网络速度；

2、xhr.onreadystatechange 的回调函数不会执行，因为在 xhr.send() 之后，xhr.readyState 就为 4 了，所以数据的处理，直接跟在xhr.send() 之后就可以了。





## 1、异步的底层原理

js 中的异步实现原理是单线程+事件队列。js 的代码执行是单线程的，单线程的意思是代码从上到下按照顺序执行，而事件队列存储了一些回调函数，当 js 从上往下执行的时候，遇到回调函数就将其放到事件队列，在所有 js 代码执行完成之后处于空闲状态时，才会去事件队列看有没有回调函数达到触发条件，有的话就执行，没有的话就继续闲着。



**Ajax 的四步操作中，同步和异步的区别：**

如果是异步请求，在 send 的时候，会调用浏览器进行网络数据的请求，send 就执行完了，接着将第四步的回调函数存储在事件队列里面，浏览器数据请求完了，readyState 状态发生变化，触发第四步回调函数的执行。

而在同步请求中， send 时是自己进行网络数据的请求，这个时候非得请求到数据，才会接着将第四步的回调函数存储在事件队列里面，所以如果网络延时页面就会卡死，在 send 过后接受到数据的时候 readyState 已经为4了，不会再变化，所以第四步的回调函数不会执行。







# 二、数据格式

什么是数据格式？

数据格式就是通过一定的规范组织起来，叫做数据格式。



## 1、XML 数据格式

XML 数据格式是将数据以标签的方式进行组装，必须以 `<? xml version="1.0" encoding="utf-8" ?>` 开头，标签必须成对出现，也就是有开始标签就一定要有结束标签。

```xml
<? xml version="1.0" encoding="utf-8" ?>
<students>
	<student>
      <name>张三</name>
      <age>18</age>
      <sex>男</sex>
  </student>
</students>
```



缺点：体积太大，元数据（描述数据的数据）太多，解析不方便，目前使用很少。



## 2、json 数据格式

json 数据格式通过 key-value 的方式组装。

```json
{
  "student" : [
    {
      "name": "张三",
      "age": "18",
      "sex": "男"
    },
    {
      "name": "李四",
      "age": "23",
      "sex": "女"
    }
  ]
}
```

优点：体积小，传输快，解析方便。



## 3、案例：获取图书信息

**接口文档：**

| 地址     | /server/getBooks/php |
| ------ | -------------------- |
| 作用描述   | 获取图书信息               |
| 请求类型   | get 请求               |
| 参数     | 无                    |
| 返回数据格式 | xml 格式               |
| 返回数据说明 | 如下                   |

```
<?xml version="1.0" encoding="utf-8" ?>
<booklist>
    <book>
        <name>三国演义</name>
        <author>罗贯中</author>
        <desc>一个杀伐纷争的年代</desc>
    </book>
    
    <book>
        <name>水浒传</name>
        <author>施耐庵</author>
        <desc>108条好汉的故事</desc>
    </book>
    
    <book>
        <name>西游记</name>
        <author>吴承恩</author>
        <desc>佛教与道教斗争</desc>
    </book>
    
    <book>
        <name>红楼梦</name>
        <author>曹雪芹</author>
        <desc>一个封建王朝的缩影</desc>
    </book>
</booklist>
```



**源代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>书籍列表</title>
	<style>
		div{
			width: 800px;
			margin: 20px auto;
		}
		table{
			width: 800px;
			margin: 20px auto;
			border-collapse: collapse;
		}
		th{
			background-color: #0094ff;
			color:white;
			font-size: 16px;
			padding: 5px;
			text-align: center;
			border: 1px solid black;
		}
		td{
			padding: 5px;
			text-align: center;
			border: 1px solid black;
		}
	</style>
	<script>
		window.onload = function () {  
			var xhr = new XMLHttpRequest();
			xhr.open("get", "./server/getBooks.php", true);
			xhr.send(null);
			xhr.onreadystatechange = function () {  
				if(this.readyState == 4) {
					if(this.status = 200) {
						var booklists = this.responseXML.getElementsByTagName("booklist")[0].getElementsByTagName("book");
						
						for(var i=0; i<booklists.length; i++) {
							var name = booklists[i].getElementsByTagName("name")[0].textContent;
							var author = booklists[i].getElementsByTagName("author")[0].textContent;
							var desc = booklists[i].getElementsByTagName("desc")[0].textContent;

							var trObj = document.createElement("tr");
							trObj.innerHTML = "<td>"+name+"</td><td>"+author+"</td><td>"+desc+"</td>";
							document.getElementsByTagName("table")[0].appendChild(trObj);
						}
					}
				}
			};


		};
	</script>
</head>
<body>
	<div>
		<table>
			<tr>
				<th>书名</th>
				<th>作者</th>
				<th>描述</th>
			</tr>
			<!-- <tr>
				<td>三国演义</td>
				<td>罗贯中</td>
				<td>一个杀伐纷争的年代</td>
			</tr> -->
		</table>
	</div>
</body>
</html>
```

>   XML 数据的格式主要是通过：getElementsByTagName 来获取的。





## 4、案例：获取学生信息

**接口文档：**

| 地址     | /server/getStudents/php |
| ------ | ----------------------- |
| 作用描述   | 获取学生信息                  |
| 请求类型   | get 请求                  |
| 参数     | 无                       |
| 返回数据格式 | json 格式                 |
| 返回数据说明 | 如下                      |

```json
[
  {
    "name":"张三",
    "age":"18",
    "sex":"男"
  }
]
```

**源代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>学生列表</title>
	<style>
		div{
			width: 800px;
			margin: 20px auto;
		}
		table{
			width: 800px;
			margin: 20px auto;
			border-collapse: collapse;
		}
		th{
			background-color: #0094ff;
			color:white;
			font-size: 16px;
			padding: 5px;
			text-align: center;
			border: 1px solid black;
		}
		td{
			padding: 5px;
			text-align: center;
			border: 1px solid black;
		}
	</style>
	<script>
		window.onload = function () {  
			var xhr = new XMLHttpRequest();
			xhr.open("get", "./server/getStudents.php", true);
			xhr.send(null);
			xhr.onreadystatechange = function () {  
				if(this.readyState == 4) {
					if(this.status = 200) {
						var jsonObj = JSON.parse(this.responseText);
						for(var i=0; i<jsonObj.length; i++) {
							var name = jsonObj[i].name;
							var age = jsonObj[i].age;
							var sex = jsonObj[i].sex;

							var trObj = document.createElement("tr");
							trObj.innerHTML = "<td>"+name+"</td><td>"+age+"</td><td>"+sex+"</td>";
							document.getElementsByTagName("table")[0].appendChild(trObj);
						}
					}
				}
			};
		};
	</script>
</head>
<body>
	<div>
		<table>
			<tr>
				<th>姓名</th>
				<th>年龄</th>
				<th>性别</th>
			</tr>
			<!-- <tr>
				<td>张三</td>
				<td>20</td>
				<td>男</td>
			</tr> -->
		</table>
	</div>
</body>
</html>
```

>   只需要将获取的 responseText 转化为 json 格式的对象，使用`JSON.parse(this.responseText);`



![](https://github.com/Daotin/pic/raw/master/fgx.png)