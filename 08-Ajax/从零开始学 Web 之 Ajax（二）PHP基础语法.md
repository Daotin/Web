>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、PHP 基础语法

## 1、基本结构

-   所有PHP代码都要写到 `<?php ... ?>` 里面。
-   PHP文件可以和 HTML 文件结合进行使用。
-   PHP文件的默认扩展名是 ".php"。
-   **PHP代码必须在服务器上执行。**




## 2、打印语句

**echo**： 的作用在页面中输入字符串（只能打印字符串，数字等简单类型）

**print_r** ：输出复杂类型

**var_dump** ：输出复杂类型

```php
<?php

    echo "hello Daotin.";
    echo "<br>";
    echo 123;
    echo "<br>";
    print_r([1,2,3,4,5]);
    echo "<br>";
    var_dump([1,2,3,4,5]);
?>
```

打印结果：

```
hello Daotin.
123
Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 ) 
array (size=5)
  0 => int 1
  1 => int 2
  2 => int 3
  3 => int 4
  4 => int 5
```



## 3、变量的声明和使用

变量的声明和使用都需要加 "$" 符号。

```php
$str = "Hello";
echo $str;
```



## 4、字符串的拼接

字符串的拼接不是使用 "+"，而是使用 "."

```php
$str1 = "Hello";
$str2 = "World";
echo $str1 . " " . $str2;
```



## 5、PHP的执行原理

浏览器是不识别 PHP 文件的，用浏览器发开 PHP 文件，只会显示 PHP 的源代码，所以 PHP 文件必须在服务器中执行。其实 apache 服务器也识别不了 PHP 文件，是 apache 将 PHP 文件再交给 PHP 模块处理的，最后 apache 将处理之后的网页内容返回。



## 6、数组

**一维数组的定义：**

```php
$arr = array();
$arr[0] = "10";
$arr[1] = "20";
$arr[2] = "30";
```

或者

```php
$arr = array("10", "20", "30");
```

注意：数组是复杂类型，不能使用 echo 直接打印，只能打印其中的某个元素，复杂类型使用 print_r 或者 var_dump。



示例：

```php
    $arr1 = array();
    $arr1[0] = "10";
    $arr1[1] = "20";
    $arr1[2] = "30";

    $arr2 = array("40", "50", "60");

    // echo $arr1; // 不能直接打印数组

    print_r($arr1);
    var_dump($arr2);
    echo json_encode($arr1); // 将数组转化成 json 格式打印，转化后是 字符串格式，可以使用echo。
```

打印结果：

```
Array ( [0] => 10 [1] => 20 [2] => 30 )

array (size=3)
  0 => string '40' (length=2)
  1 => string '50' (length=2)
  2 => string '60' (length=2)
  
["10","20","30"]
```



**数组的下标索引自定义**

```php
$arr = array("index1"=>"40", "index2"=>"50", "index3"=>"60");
print_r($arr);
```

或者只自定义其中几个：

```php
$arr = array("40", "index"=>"50", "60");
print_r($arr);
```

此时 "40" 的下标为 0， "60" 的下标为1。

自定义所以的方式不可以使用 for 循环遍历数组，因为其下标已经不是 0,1,2 了。

要使用 foreach 的方式。（key 为索引，value 为索引对应的值）

```php
foreach($arr as $key => $value) {
    echo $key . "---" . $value . "<br>";
}
```



**二维数组的定义：**

```php
$arr = array();
$arr[0] = array("1", "2", "3");
$arr[1] = array("4", "5", "6");

var_dump($arr);
echo json_encode($arr);
```

打印结果：

```
array (size=2)
  0 => 
    array (size=3)
      0 => string '1' (length=1)
      1 => string '2' (length=1)
      2 => string '3' (length=1)
  1 => 
    array (size=3)
      0 => string '4' (length=1)
      1 => string '5' (length=1)
      2 => string '6' (length=1)
      
[["1","2","3"],["4","5","6"]]
```



## 7、函数

系统函数：比如：

json_encode：PHP中将数组转化为 json 格式的字符串。

var_dump：输出复杂的数据类型

print_r：输出复杂的数据类型

count：得到数组的长度



自定义函数：

和 js 类似，以 function 进行声明。

```php
function add($num1, $num2) {
    return $num1 + $num2;
}
```



## 8、预定义变量

我们知道，动态网页会根据不同的需求展示不同的界面，那么是怎么做到的呢？

**请求类型**

请求的时候是需要携带参数的，用来表示不同的要求，根据参数的不同，而展示不同的界面。

根据参数携带的位置不同，可以简单把请求分为 Get 请求 和  Post 请求。

get 请求：跟在 URL 后面，用问号 "?" 连接，多个参数之间用 & 连接。

post 请求：参数在请求体中。



**获取请求参数的值**

`$_GET["属性名字"]` ：获取 get 请求的属性的值。

`$_POST["属性名字"]` ：获取 post 请求的属性的值。





### 8.1、get请求



示例：php 获取用户登录名和密码进行校验

```html
<!--html代码-->
<!--省略代码-->
<body>
    <h1>登录界面</h1>
    <form action="check.php" method="GET">
        用户名：<input type="text" name="username"> <br>
        密 码：<input type="password" name="passwd"> <br>
        <input type="submit" value="提交">
    </form>
</body>
```

```php
// php代码
<?php

    $username = $_GET["username"];
    $password = $_GET["passwd"];

    if(($username == "Daotin") && ($password == "123")) {
        echo "Login Success!";
    } else {
        echo "Login Failed!";
    }
?>
```

>   0、在 form 表单中可以进行 get请求和 post 请求。
>
>   1、我们在输入账号密码，点击提交后，在地址栏卡可以看到：http://localhost/Login/check.php?username=Daotin&passwd=123，参数确实跟在地址之后，用？ 连接，参数之间用 & 连接。
>
>   2、通过 $_GET[ ] 可以获得请求参数的值。





### 8.2、post 请求

```html
<!--HTML主要代码-->
<h1>登录界面</h1>
    <form action="check.php" method="POST">
        用户名：<input type="text" name="username"> <br>
        密 码：<input type="password" name="passwd"> <br>
        <input type="submit" value="提交">
    </form>
```

```php
<?php

    $username = $_POST["username"];
    $password = $_POST["passwd"];

    if(($username == "Daotin") && ($password == "123")) {
        echo "Login Success!";
    } else {
        echo "Login Failed!";
    }
?>
```

>   我们在输入账号密码，点击提交后，在地址栏卡可以看到：http://localhost/Login/check.php ，不再显示请求参数。



**get 请求和 post 请求的区别：**

1、get 请求会把请求参数放在 URL 中，而 post 请求则放在请求体中，post 请求更安全。

2、所以，一般get请求是获取服务器的数据，post 请求是向服务器提交一些数据。



# 二、结语

大家可以发现，我们之前做的 get 和 post 请求，在提交之后，是会进行页面跳转的，从当前的html界面跳转到php界面了，那么有没有办法可以不进行跳转，就在当前界面得到服务器返回的数据呢？敬请关注下期 Ajax 的内容，它可以做到。



![](https://github.com/Daotin/pic/raw/master/fgx.png)