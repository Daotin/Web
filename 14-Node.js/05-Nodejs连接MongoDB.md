## 1、Nodejs连接MongoDB数据库

Nodejs连接MongoDB数据库需要引入一个专门的模块，叫做“mongodb”。

所以先在项目引入这个模块：

```js
npm i mongodb@2.2.36 -S
```

> 这里使用mongodb模块的2.2.36版本，可能是比较稳定吧。
>
> PS：2018.12.20
>
> **不是比较稳定，而是不用这个版本，直接服务器保存，搞了一个多小时才发现。。。**
>
> `POST http://localhost:3000/xxx 500 (Internal Server Error)`



之后创建一个nodejs文件来连接mongodb，然后就可以进行数据的增删改查。

> 在此之前，首先MongoDB的服务要先启动起来。

```js
// main.js
// 引入mongodb模块，使用其中的MongoClient来连接mongodb服务器
const mc = require("mongodb").MongoClient;

//"mongodb://localhost:27017/test"
// mongodb:// ：表示mongodb的协议
// localhost:27017/test：当前主机下的27017端口下的test数据库
// db：数据库对象
mc.connect("mongodb://localhost:27017/test", (err, db) => {
    if (!err) {
        // 通过数据库对象获取需要操作的集合
        let users = db.collection("users");

        // 查询数据(获取到的data是对象的集合)
        users.find().toArray((error, data) => {
            if (!error) {
                // console.log(data);
            } else {
                console.log("获取users失败，原因如下：");
                console.log(err);
            }
        });

        // 计数
        users.count({age: {$gt: 35}}, (err, data) => {
            console.log(data);
        });

        // 插入数据
        users.insert({user: "fengdaoting",age: 18}, (err, info) => {
            if (err) {
                console.log("插入数据失败");
            }
        });

        // 修改数据
        users.update({user: "daotin"}, {$set: {age: 19}}, (err, info) => {
            if (err) {
                console.log("修改数据失败");
            }
        });

        // 删除数据
        users.remove({user: "fengdaoting"}, (err, info) => {
            if (err) {
                console.log("删除数据失败");
            }
        })
    } else {
        console.log("连接数据库失败，原因如下：");
        console.log(err);
    }
})
```



2、案例：

需求：一个页面用于将商品写入数据库，另一个页面用于展示写入的商品数据，并且实现商品的分页和排序。

首先有一个商品信息登录界面：

```html
// index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div>
        <form action="" id="box">
            <div>
                <label for="">
                    商品名称：<input type="text">
                </label>
            </div>
            <div>
                <label for="">
                    商品价格：<input type="text">
                </label>
            </div>
            <div>
                <label for="">
                    商品数量：<input type="text">
                </label>
            </div>
            <input type="submit" value="录入数据">
        </form>

    </div>
</body>
<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
    $("#box").submit((e) => {
        e.preventDefault();

        $.ajax({
            type: "get",
            url: "/loadGoods",
            data: {
                name: $("input")[0].value,
                price: $("input")[1].value,
                num: $("input")[2].value
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    })
</script>

</html>
```



需要一个本地服务器显示这个文件：

```js
// main.js
const http = require("http");
const url = require("url");
const router = require("./router");

http.createServer((req, res) => {
    let path = url.parse(req.url, true).pathname;
    path = path.substring(1);

    if (router[path]) {
        router[path](req, res);
    } else {
        if (path === "") {
            res.writeHead(301, {
                "Location": "/home"
            })
            res.end();
        } else {
            router["err"](req, res);
        }
    }

}).listen(3000, () => {
    console.log("server running at http://localhost:3000");
})
```

然后用到路由 `router.js` 和`readFile.js` 

```js
// router.js
const rf = require("./readFile");
const url = require("url");
const qs = require("querystring");
const cdb = require("./connectDB");
const mix = require("./mixture");

module.exports = {
    home(req, res) {
        out("public/index.html", req, res);
    },
    err(req, res) {
        out("public/error.html", req, res);
    },
    loadGoods(req, res) {
        let reqData = url.parse(req.url, true).query; //{ name: '11', price: '22', num: '33' }
        // goods
        let goods = cdb("goods");

        goods.insert(reqData, (err, info) => {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            if (!err) {
                res.end(JSON.stringify({
                    code: 200,
                    msg: "录入成功！"
                }));
            } else {
                res.end(JSON.stringify({
                    code: 500,
                    msg: "录入失败！"
                }));
            }
        });
        console.log("录入一件商品成功！");

    },
    goodslist(req, res) {
        let goods = cdb("goods");
        let data = url.parse(req.url, true).query;

        let {
            page = 1, pageSize = 5, upOrDown = 1, sortBy = "price"
        } = data;

        goods.find().limit(pageSize * 1).skip((page - 1) * pageSize).sort({
            sortBy: upOrDown * 1
        }).toArray((err, data) => {
            if (!err) {
                rf("public/goodslist.html", html => {
                    let newHtml = mix(html, data);
                    res.end(newHtml);
                })
            }
        });
    }
}

function out(url, req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    rf(url, data => {
        res.end(data);
    });
}
```



```js
// readFile.js
const fs = require("fs");

module.exports = (url, cb, ecode = "utf-8") => {
    fs.readFile(url, ecode, (err, data) => {
        if (!err) {
            cb(data)
        }
    });
}
```



既然需要录入数据，那么就需要链接MongoDB：

```js
const mc = require("mongodb").MongoClient;

let urlDB = "mongodb://localhost:27017/goodslist";
let db_g = null;

mc.connect(urlDB, (err, db) => {
    if (!err) {
        db_g = db;
    } else {
        console.log("数据库连接失败，原因如下：");
        console.log(err);
    }
})

// 导出db模块
module.exports = (collName) => {
    return db_g.collection(collName);
}
```

然后index.html发出ajax请求录入数据，返回给前端录入成功或失败的结果。

数据要在商品列表展示，需要个商品列表：

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
    <div>
        <a href="/goodslist?page=1">第一页</a>
        <a href="/goodslist?page=2">第二页</a>
        <a href="/goodslist?page=3">第三页</a>
        <a href="/goodslist?page=4">第四页</a>
    </div>
    <div>
        <a href="/goodslist?sort=price&upOrDown=1">按价格升序</a>
        <a href="/goodslist?sort=price&upOrDown=-1">按价格降序</a>
        <a href="/goodslist?sort=num&upOrDown=1">按数量升序</a>
        <a href="/goodslist?sort=name&upOrDown=1">按姓名升序</a>
    </div>
    <div id="box">
        <div class="good">
            <h3>商品名称：<span></span></h3>
            <ul>
                <li>商品价格：<span class="price"></span></li>
                <li>商品数量：<span class="num"></span></li>
            </ul>
        </div>
    </div>

</body>
<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>

</html>
```

在路由里面访问的时候，获取其html地址和data数据，然后融合，需要`mixture.js` 

```js
// mixture.js
const cheerio = require("cheerio");

module.exports = (html, data) => {
    let $ = cheerio.load(html);

    let box = $("#box");
    let div = box.find("div");
    box.empty();

    data.map((item) => {
        let newDiv = div.clone(false);

        newDiv.find("h3 span").text(item.name);
        newDiv.find(".price").text(item.price);
        newDiv.find(".num").text(item.num);

        box.append(newDiv);
    });

    return $.html();
}
```

最后加入分页，排序功能。





