>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、接口文档的使用

需求：使用接口文档验证用户名、邮箱、手机的唯一性



## 1、接口文档

当前端界面需要从服务器获取数据的时候，其实就是眼访问一个 URL 地址，指定特定的参数即可。这个 URL 对应的是 php 或者 jsp 等都是服务器开发人员已经开发好了。服务器开发人员开发好相关的接口之后，会提供一份接口文档给前端开发人员，在接口中会详细说明你要获取什么数据，访问什么地址，传入什么参数等等内容，下面就是一个简单接口文档的内容：

**验证用户名唯一性的接口**

| 地址      | /server/checkUsername.php         |
| ------- | --------------------------------- |
| 作用描述    | 验证用户名是否可用                         |
| 请求类型    | get 请求                            |
| 参数      | uname                             |
| 返回的数据格式 | 普通字符串                             |
| 返回数据说明  | 返回 ok：代表用户名可用； 返回 error：代表用户名不可用。 |

**验证邮箱唯一性的接口**

| 地址      | /server/checkEmail.php     |
| ------- | -------------------------- |
| 作用描述    | 验证邮箱是否可用                   |
| 请求类型    | post 请求                    |
| 参数      | e                          |
| 返回的数据格式 | 数字                         |
| 返回数据说明  | 返回 0：代表邮箱可用； 返回 1：代表邮箱不可用。 |

**验证手机号唯一性的接口**

| 地址      | /server/checkPhone.php |
| ------- | ---------------------- |
| 作用描述    | 验证手机号是否可用              |
| 请求类型    | post 请求                |
| 参数      | phonenumber            |
| 返回的数据格式 | json格式                 |
| 返回数据说明  | 如下：                    |

```
手机号可用情况下返回如下：
{
  "status":0,
  "message":{
    "tips":"手机号可用",
    "phonefrom":"中国电信"
  }
}
手机号不可用情况下返回如下：
{
  "status":1,
  "message":"手机号已被注册"
}
```



## 2、示例代码

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
    <div id="dv">
        <h1>用户注册</h1>
        用户名：<input type="text" name="username"><span id="user-span"></span><br>
        邮箱：<input type="text" name="email"><span id="email-span"></span><br>
        手机：<input type="text" name="phone"><span id="phone-span"></span><br>
    </div>
    <script>

        // 获取所有元素
        var userObj = document.getElementsByName("username")[0];
        var emailObj = document.getElementsByName("email")[0];
        var phoneObj = document.getElementsByName("phone")[0];

        var userSpanObj = document.getElementById("user-span");
        var emailSpanObj = document.getElementById("email-span");
        var phoneSpanObj = document.getElementById("phone-span");

        //用户名文本框失去焦点事件
        userObj.onblur = function () {  
            // 获取文本内容
            var userText = this.value;

            var xhr = new XMLHttpRequest();
            xhr.open("get", "./server/checkUsername.php?uname="+userText, true);
            xhr.send(null);
            xhr.onreadystatechange = function () {  
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        if(this.responseText == "ok") {
                            userSpanObj.innerHTML = "用户名可用";
                        } else if(this.responseText == "error") {
                            userSpanObj.innerHTML = "用户名不可用";
                        }
                    }
                }
            };
        };
        
        //邮箱文本框失去焦点事件
        emailObj.onblur = function () {  
            // 获取文本内容
            var emailText = this.value;

            var xhr = new XMLHttpRequest();
            xhr.open("post", "./server/checkEmail.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("e="+emailText);
            xhr.onreadystatechange = function () {  
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        console.log(this.responseText);
                        if(this.responseText == 0) {
                            emailSpanObj.innerHTML = "邮箱可用";
                        } else if(this.responseText == 1) {
                            emailSpanObj.innerHTML = "邮箱不可用";
                        }
                    }
                }
            };
        };

        //手机号文本框失去焦点事件
        phoneObj.onblur = function () {  
            // 获取文本内容
            var phoneText = this.value;

            var xhr = new XMLHttpRequest();
            xhr.open("post", "./server/checkPhone.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("phonenumber="+phoneText);
            xhr.onreadystatechange = function () {  
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        var val = JSON.parse(this.responseText);
                        // console.log(val.status);
                        if(val.status == 0) {
                            phoneSpanObj.innerHTML = val.message.tips + " " + val.message.phonefrom;
                        } else if(val.status == 1) {
                            phoneSpanObj.innerHTML = val.message;
                        }
                        
                    }
                }
            };
        };
        
    </script>
</body>
</html>
```

>   书写以上代码的过程中，完全不需要查看对应的 php 文件，只需要查看接口文档就可以搞定。



## 3、代码封装

上面验证用户名，邮箱和手机号的时候，都是使用的 Ajax 的四部操作，有很多代码冗余，所以将 Ajax 的四步操作封装在一个函数中很有必要的。

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
    <div id="dv">
        <h1>用户注册</h1>
        用户名：<input type="text" name="username"><span id="user-span"></span><br>
        邮箱：<input type="text" name="email"><span id="email-span"></span><br>
        手机：<input type="text" name="phone"><span id="phone-span"></span><br>
    </div>
    <script>

        // Ajax 四步操作的封装函数
        function myAjax(type, url, param, async, dataType, callback) {           
            var xhr = null;
            // 兼容性处理
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if((type == "get") || (type == "GET")) {
                if(param && param != "") {
                    url += "?" + param;
                }
                xhr.open(type, url, async);
                xhr.send(null);
            } else if((type == "post") || (type == "POST")) {
                xhr.open(type, url, async);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(param);
            }

            if(async) {
                xhr.onreadystatechange = function () {
                    if(this.readyState == 4) {
                        if(this.status == 200) {
                            if(dataType == "xml") {
                                callback(this.responseXML);
                            } else if(dataType == "json") {
                                callback(JSON.parse(this.responseText));
                            } else {
                                callback(this.responseText);
                            }
                            
                        }
                    }
                };
            } else {
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        if(dataType == "xml") {
                            callback(this.responseXML);
                        } else if(dataType == "json") {
                            callback(JSON.parse(this.responseText));
                        } else {
                            callback(this.responseText);
                        }
                        
                    }
                }
            }
        }

        // 获取所有元素
        var userObj = document.getElementsByName("username")[0];
        var emailObj = document.getElementsByName("email")[0];
        var phoneObj = document.getElementsByName("phone")[0];

        var userSpanObj = document.getElementById("user-span");
        var emailSpanObj = document.getElementById("email-span");
        var phoneSpanObj = document.getElementById("phone-span");

        //用户名文本框失去焦点事件
        userObj.onblur = function () {  
            // 获取文本内容
            var userText = this.value;

            myAjax("get", "./server/checkUsername.php", "uname="+userText, "true", "text", function (result) {  
                if(result == "ok") {
                    userSpanObj.innerHTML = "用户名可用";
                } else if(result == "error") {
                    userSpanObj.innerHTML = "用户名不可用";
                }
            });
        };
        
        //邮箱文本框失去焦点事件
        emailObj.onblur = function () {  
            // 获取文本内容
            var emailText = this.value;

            myAjax("post", "./server/checkEmail.php", "e="+emailText, "true", "text", function (result) {  
                if(result == 0) {
                    emailSpanObj.innerHTML = "邮箱可用";
                } else if(result == 1) {
                    emailSpanObj.innerHTML = "邮箱不可用";
                }
            });
        };

        //手机号文本框失去焦点事件
        phoneObj.onblur = function () {  
            // 获取文本内容
            var phoneText = this.value;

            myAjax("post", "./server/checkPhone.php", "phonenumber="+phoneText, "true", "json", function (result) {  
                if(result.status == 0) {
                    phoneSpanObj.innerHTML = result.message.tips + " " + result.message.phonefrom;
                } else if(result.status == 1) {
                    phoneSpanObj.innerHTML = result.message;
                }
            });
        };
        
    </script>
</body>
</html>
```



**仍然存在的问题**：
1、参数的顺序不可改变；
2、参数没有默认值，所有的参数必须传递。



## 4、代码进一步封装

将需要传入的参数做成一个对象，这个对象所有的有默认参数，如果没有传入一些参数的话，使用默认参数代替；如果传入了相关参数，则覆盖掉默认参数。

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
    <div id="dv">
        <h1>用户注册</h1>
        用户名：<input type="text" name="username"><span id="user-span"></span><br>
        邮箱：<input type="text" name="email"><span id="email-span"></span><br>
        手机：<input type="text" name="phone"><span id="phone-span"></span><br>
    </div>
    <script>
        function myAjax2(obj) { 
            var defaults = {
                type: "get",
                url: "#",
                dataType: "",
                data: {}, // 参数有可能多个，用对象保存
                async: true,
                success: function (result) {
                    console.log(result);
                }
            };

            for(var key in obj) {
                defaults[key] = obj[key];
            }

            var xhr = null;
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            var param = "";
            for(var attr in defaults.data) {
                param += attr + "=" + defaults.data[attr] + "&" // 比如：uname=zhangsan&pwd=123
            }
            // 最后一个参数后面去掉 &
            if(param) {
                param = param.substring(0, param.length-1);
            }

            if((defaults.type == "get") || (defaults.type == "GET")) {
                defaults.url += "?" + param;
            }
                
            xhr.open(defaults.type, defaults.url, defaults.async);

            if((defaults.type == "get") || (defaults.type == "GET")) {
                xhr.send(null);
            } else if((defaults.type == "post") || (defaults.type == "POST")) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(param);
            }

            if(defaults.async) {
                xhr.onreadystatechange = function () {
                    if(this.readyState == 4) {
                        if(this.status == 200) {
                            if(defaults.dataType == "xml") {
                                defaults.success(this.responseXML);
                            } else if(defaults.dataType == "json") {
                                defaults.success(JSON.parse(this.responseText));
                            } else {
                                defaults.success(this.responseText);
                            }
                        }
                    }
                };
            } else {
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        if(defaults.dataType == "xml") {
                            defaults.success(this.responseXML);
                        } else if(defaults.dataType == "json") {
                            defaults.success(JSON.parse(this.responseText));
                        } else {
                            defaults.success(this.responseText);
                        }
                    }
                }
            }
        }

        // 获取所有元素
        var userObj = document.getElementsByName("username")[0];
        var emailObj = document.getElementsByName("email")[0];
        var phoneObj = document.getElementsByName("phone")[0];

        var userSpanObj = document.getElementById("user-span");
        var emailSpanObj = document.getElementById("email-span");
        var phoneSpanObj = document.getElementById("phone-span");

        //用户名文本框失去焦点事件
        userObj.onblur = function () {  
            myAjax2({
                url: "./server/checkUsername.php",
                type: "get",
                data: {uname: this.value},
                success: function (result) {
                    if(result == "ok") {
                        userSpanObj.innerHTML = "用户名可用";
                    } else if(result == "error") {
                        userSpanObj.innerHTML = "用户名不可用";
                    }
                }
            });
        };
        
        //邮箱文本框失去焦点事件
        emailObj.onblur = function () {  
            myAjax2({
                url: "./server/checkEmail.php",
                type: "post",
                data: {e: this.value},
                success: function (result) {
                    if(result == 0) {
                        emailSpanObj.innerHTML = "邮箱可用";
                    } else if(result == 1) {
                        emailSpanObj.innerHTML = "邮箱不可用";
                    }
                }
            });
        };

        //手机号文本框失去焦点事件
        phoneObj.onblur = function () {
            myAjax2({
                url: "./server/checkPhone.php",
                type: "post",
                dataType: "json",
                data: {phonenumber: this.value},
                success: function (result) {
                    if(result.status == 0) {
                        phoneSpanObj.innerHTML = result.message.tips + " " + result.message.phonefrom;
                    } else if(result.status == 1) {
                        phoneSpanObj.innerHTML = result.message;
                    }
                }
            });
        };

    </script>
</body>
</html>
```

>   进一步封装后的函数为： myAjax2({})； 里面是一个对象。使用默认对象的方式，不仅可以解决传入参数顺序不一致的问题；还可以解决不传参数时默认值的问题。






![](https://github.com/Daotin/pic/raw/master/fgx.png)