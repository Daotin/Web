我们现在需要做一个用户信息的注册登录和显示所有用户注册信息的功能。

我们目前数据库是：`mydb`，数据表：`mytable`。



首先需要一个注册界面：

#### register.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    用户名: <input id="username"></br>
    密&nbsp;码:<input id="userpwd"></br>
    <button id="btn">注册</button>
</body>
<script>
    var btn = document.getElementById("btn");
    var userpwdInput = document.getElementById("userpwd");
    var usernameInput = document.getElementById("username");
    btn.onclick = function () {
        //此处省略表单验证
        var username = usernameInput.value;
        var userpwd = userpwdInput.value;

        var req = new XMLHttpRequest();
        req.open("get", "php/register.php?username=" + username + "&userpwd=" + userpwd, true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                let result = req.responseText;
                //只需要知道 是否注册成功
                let obj = JSON.parse(result);
                if (obj.code == 1) {
                    window.location.href = "login.html";
                } else {
                    alert(obj.msg);
                }
            }
        }
    }
</script>

</html>
```

注册的时候，必然后台会提示我们是否注册成功，这就需要一个后台接口来处理。

这个接口我们在 `register.php` 中实现。



#### register.php

```php
<?php
@require_once("config.php");//引入数据库配置信息

$name = $_GET["username"];
$pwd = $_GET["userpwd"];

// 准备用户名查询语句
$sql_query = "select * from mytable where name = '$name'";
$result = mysql_query($sql_query);
$item  = mysql_fetch_array($result);

// 将结果组合成对象
$obj = array();

if($item){
// echo  "存在";
    $obj["code"]=0;
    $obj["msg"]= "该用户名已经存在";

}else{
    // echo  "不存在"; 
    //把数据新增到数据库
    $sql_insert  = "INSERT INTO mytable(name,pwd) VALUES ('$name','$pwd')";
    mysql_query($sql_insert);
    $count = mysql_affected_rows();//受影响的行数

    if($count>0){
        $obj["code"]=1;
        $obj["msg"]= "注册成功";
    }else{
        $obj["code"]=0;
        $obj["msg"]= "注册失败";
    }

}

echo  json_encode($obj);
?>
```

我们返回给注册前端的是一个对象，对象中有两个属性，一个是状态码 `code`，一个是说明 `msg`。

类似下面的结构：

```json
{
    "code": 0,
    "msg": "注册失败"
}
```



在 `register.php` 的开头，我们引入了 `config.php` 配置文件，这样我们就可以每次少配置一些信息：



#### config.php

```php
<?php
@header("content-type:text/html;charset=utf8"); // 支持中文字符
//@header("Access-Control-Allow-Origin:http://localhost:63342");//cors 配置请求头
@header("Access-Control-Allow-Origin:*");// 运行所有网站访问此php文件
mysql_connect("localhost:3306", "root", "root"); // 如果无法链接将会报错，报错信息如下：
 // Warning: mysql_connect() [function.mysql-connect]: [2002] 由于目标计算机积极拒绝，无法连接。 (trying to connect via tcp://localhost:33062) in 
mysql_select_db("mydb"); // 选择的数据库存在返回1，否则为空

?>
```

主要是设置php支持中文，设置跨域请求，以及连接到我们的数据库 `mgdb`。



注册成功后，我们来进行登录验证：

#### login.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    用户名: <input id="username"></br>
    密&nbsp;码:<input id="userpwd"></br>
    <button id="btn">登录</button>
</body>
<script>
    var btn = document.getElementById("btn");
    var userpwdInput = document.getElementById("userpwd");
    var usernameInput = document.getElementById("username");
    btn.onclick = function () {
        //此处省略表单验证
        var username = usernameInput.value;
        var userpwd = userpwdInput.value;

        var req = new XMLHttpRequest();
        req.open("get", "php/login.php?username=" + username + "&userpwd=" + userpwd, true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                let obj = JSON.parse(req.responseText);
                if (obj.code == 1) {
                    window.location.href = "list.html";
                } else {
                    alert(obj.msg);
                }
            }
        }

    }
</script>

</html>
```

登录的时候也是一样，由 `login.php` 来处理，处理完后只需一个对象，告知我们有没有登录成功即可。

```json
{
    "code": 0,
    "msg": "密码错误"
}
```



#### login.php

```php
<?php
@require_once("config.php");//引入数据库配置信息

$name = $_GET["username"];
$pwd = $_GET["userpwd"];

// 准备用户名查询语句
$sql_query = "select * from mytable where name = '$name'";
$result = mysql_query($sql_query);
$item  = mysql_fetch_array($result);

// 将结果组合成对象
$obj = array();

if($item){
    if($item["pwd"] == $pwd) {
        $obj["code"]=1;
        $obj["msg"]= "密码正确";
    } else {
        $obj["code"]=0;
        $obj["msg"]= "密码错误";
    }
    
}else{
    $obj["code"]=0;
    $obj["msg"]= "该用户名不存在";
}

echo  json_encode($obj);
?>
```



登录成功跳转到用户信息列表 `list.html` 中， `list.html` 用于展示所有我们注册的数据，并且可以实现搜索查找，id或者名称排序，还可以升序降序，类似于后台管理一样。



由于实现的功能很多，所以写起来最复杂。关键性的代码都标了注释。



#### list.html

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
            list-style: none;
        }

        #table {
            width: 440px;
            margin: 10px auto;
        }

        #table ul {
            width: 440px;
            height: 30px
        }

        #table ul li {
            float: left;
            height: 30px;
            width: 110px;
            text-align: center;
            line-height: 30px;
            background-color: #e42942;
            color: aliceblue;
        }
        .box {
            width: 440px;
            overflow: hidden;
            margin: 10px auto;
        }
    </style>
</head>

<body>
    <div class="box">
        <input type="text" id="search-txt">
        <button class="search">搜索</button>

        <input type="radio" name="type" value="id" checked> ID
        <input type="radio" name="type" value="name"> 名称
        <input type="radio" name="upordown" value="asc" checked> 升序
        <input type="radio" name="upordown" value="desc"> 降序

        <br>
        <button class="prev">上一页</button>
        <button class="next">下一页</button>
    </div>
    <div id="table">
        <ul id="th">
            <li>编号</li>
            <li>用户名</li>
            <li>密码</li>
            <li>操作</li>
        </ul>
        <div id="tbody">

        </div>
    </div>
</body>
<script>
    var tbody = document.getElementById("tbody");
    var searchBtn = document.querySelector(".search");
    var orderTypeList = document.getElementsByName("type");
    var orderUpDownList = document.getElementsByName("upordown");
    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");

    var key = "";
    var orderType = "id"; // 获取value作为id或name排序的依据
    var orderUpDown = "asc"; // 获取value作为升序或降序排序的依据
    var showIndex = 0; // 每页的索引
    var showNum = 6; // 每页显示的个数

    searchBtn.onclick = function () {
        var searchTxt = document.querySelector("#search-txt");
        key = searchTxt.value;
        showList(key, orderType, orderUpDown, showIndex * showNum, showNum);
    };

    for (var i = 0; i < orderTypeList.length; i++) {
        orderTypeList[i].onclick = function () {
            orderType = this.value;
            showList(key, orderType, orderUpDown, showIndex * showNum, showNum);
        };
    }
    for (var i = 0; i < orderUpDownList.length; i++) {
        orderUpDownList[i].onclick = function () {
            orderUpDown = this.value;
            showList(key, orderType, orderUpDown, showIndex * showNum, showNum);
        };
    }

    showList(key, orderType, orderUpDown, showIndex * showNum, showNum);

    // 封装显示函数
    // key: 搜索框的内容
    // orderType: id或name排序
    // orderUpDown: 升序或降序
    // showSkip: 从第几条开始显示（showSkip = showIndex * showNum）
    // showNum: 每页显示的个数
    function showList(key, orderType, orderUpDown, showSkip, showNum) {
        var url =
            `php/list.php?key=${key}&orderType=${orderType}&orderUpDown=${orderUpDown}&showSkip=${showSkip}&showNum=${showNum}`;
        myAjax(url, function (data) {
            let list = data;
            let html = "";
            for (let i = 0; i < list.length; i++) {
                let userinfo = list[i];
                let userid = userinfo["id"];
                let username = userinfo["name"];
                let userpwd = userinfo["pwd"];
                // onclick="del(${userid}, this) this是精华，可以将li这个元素作为参数传入，这样就可以获取这个元素，进而可以进行删除操作。
                html += 
                    `<ul class="tr">
                            <li>${userid}</li>
                            <li>${username}</li>
                            <li>${userpwd}</li>
                            <li onclick="del(${userid}, this)">删除</li>
                    </ul>`;
            }
            tbody.innerHTML = html;

            prevBtn.disabled = false;
            nextBtn.disabled = false;

            // 获取数据库的总数量来决定翻页的个数
            myAjax(`php/count.php?key=${key}`, function (data) {
                let count = data["count"];
                let maxShowIndex = Math.ceil(count / showNum) - 1;

                prevBtn.onclick = function () {
                    showIndex--;
                    showList(key, orderType, orderUpDown, showIndex * showNum, showNum);
                };

                nextBtn.onclick = function () {
                    showIndex++;
                    showList(key, orderType, orderUpDown, showIndex * showNum, showNum);
                };

                if (showIndex == 0) {
                    prevBtn.disabled = true;
                    prevBtn.onclick = null;
                }
                if (showIndex == maxShowIndex) {
                    nextBtn.disabled = true;
                    nextBtn.onclick = null;
                }
            });
        });
    }

    // 一个用户信息的删除
    function del(id, liObj) {
        var url = `php/delete.php?id=${id}`;

        myAjax(url, function (data) {
            if (data.code == 1) {
                tbody.removeChild(liObj.parentNode);
            } else {
                alert("删除失败");
            }
        });
    }

    function myAjax(url, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                fn(JSON.parse(xhr.responseText));
            }
        }
    };
</script>

</html>
```



> TIPS：
>
> 不管是购物车，还是用户信息等，都会在页面中增加元素。有的很少的元素，一般使用 createElement 来新增，而有大片的元素的时候，都会使用字符串模板来填写。
>
> 但是字符串模板有个不好的地方就是添加事件和获取这个元素。
>
>
>
> **大概有下列处理办法：**
>
> 1、添加事件可以使用内联事件，需要用的变量可以以事件参数的形式传入。需要用到本身对象，可以使用 `this` 传入事件参数中。
>
> 2、在向页面中添加完元素之后，使用DOM操作来获取元素，需要用到的参数使用自定义参数来传入。然后既然获取到了元素，绑定事件就简单了。



用户数据的遍历使用到 `list.php` 来处理，

用户数据的总量使用 `count.php` 来处理，

用户数据的删除使用 `delete.php` 来处理。



#### list.php

```php
<?php
@header("content-type:text/html;charset=utf8");

mysql_connect("localhost:3306", "root", "root"); // 如果无法链接将会报错，报错信息如下：
 // Warning: mysql_connect() [function.mysql-connect]: [2002] 由于目标计算机积极拒绝，无法连接。 (trying to connect via tcp://localhost:33062) in 

$connect =  mysql_select_db("mydb"); // 选择的数据库存在返回1，否则为空

$key = $_GET["key"];
$orderType = $_GET["orderType"];
$orderUpDown = $_GET["orderUpDown"];
$showSkip = $_GET["showSkip"];
$showNum = $_GET["showNum"];

// ORDER BY： 以什么排序
// limit 0,3 : 从第0条开始，显示3条

$sql = "SELECT * FROM mytable WHERE `status` = 1 and (`name` LIKE '%$key%' or pwd like '%$key%') ORDER BY $orderType $orderUpDown limit $showSkip, $showNum"; // 定义查询数据表（mytable）语句

$res = mysql_query($sql); // 执行数据表查询语句，返回值是resouce格式的数据。

// mysql_fetch_array 将resouce格式的数据转化成Array数据类型
// 由于mysql_fetch_array每次只能转换数据表的一行数据，所以要循环转换。
// 使用while是因为没有数据的地方转换的结果为false
// 最后将多个array加入数组list中。
$list = array();
while($item = mysql_fetch_array($res)) { 
    $tmp = array();
    if($item["status"] == 1) {
        $tmp["id"] = $item["id"];
        $tmp["name"] = $item["name"];
        $tmp["pwd"] = $item["pwd"];
        $tmp["status"] = $item["status"];
        $list[] = $tmp;
    }   
}

// 使用json_encode将转换的array集合变成json对象集合。
echo json_encode($list);
?>
```



用户数据的总量使用 `count.php` 来处理，



#### count.php

```php
<?php
require_once("config.php");
$key = $_GET["key"];
$sql = "select count(*) from  mytable WHERE  `status` = 1  and ( name like '%$key%' or pwd like '%$key%' ) ";

$result = mysql_query($sql);

$item = mysql_fetch_array($result);

$obj= array();
$obj["count"]= $item[0];

echo  json_encode($obj);

?>
```



用户数据的删除，用到了 delete.php 来处理：

> 用户删除数据，一般不是真正的删除数据，而是将数据中的一个 flag 改变，这里是 `status == 0`，来表示删除，我们在显示的时候不显示 `status == 0` 的即可。



#### delete.php

```php
<?php
@require_once("config.php");//引入数据库配置信息

$userid = $_GET["id"];


$spl_del = "update mytable set `status` = 0 where id = $userid ";
mysql_query($spl_del);
$count = mysql_affected_rows();

$obj = array();


if($count>0) {
    $obj["code"] = 1;
} else {
    $obj["code"] = 0;
}
echo JSON_encode($obj);
?>
```

删除操作，返回的是删除成功或者失败的信息对象。





#### 演示：

![](images/2.gif)









