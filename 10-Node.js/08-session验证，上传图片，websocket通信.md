## 1、加密模块



我们之前用户登录和注册的时候，密码都是明文形式进行数据存取的，这样安全性就非常糟糕。

node中有专门的加密工具可以进行文本的加密，这个工具叫做`crypto`。



安装crypto

```js
npm i crypto -S
```



编写自己的加密模块，作用是输入一段文本进行加密输出。

在项目根目录新建一个`tools`文件夹，存放项目会用到的一些工具。这里以md5加密算法为例：

```js
// encrypt.js
let crypto = require('crypto');

module.exports = text => {
    // 获取加密对象(这里以md5加密算法为例)
    let md5 = crypto.createHash('md5');
    // 将需要加密的文本注入到加密对象中
    md5.update(text);
    // 通过方法将密文输出
    return md5.digest('hex');
}
```



然后在注册的界面，在注册成功时，将密码加密后存入数据库。

```js
let md5 = require('../tools/encrypt');

//...

router.post('/register', function(req, res, next) {
    let data = req.body; // { user: '1', pwd: '2' }
    data.pwd = md5(data.pwd); // 对密码进行加密
    console.log(data.pwd); // 密码111111加密后为： 96e79218965eb72c92a549dd5a330112
    let user = dbc("users");
    user.insert(data, (err, info) => {
        res.json({
            code: !err ? 200 : 500,
            msg: !err ? '录入数据成功' : '录入数据失败'
        });
    });
});
```





## 2、session验证

我们知道在把商品加入购物车啊，进入购物车啊等都需要先登录才可以进行，之前我们登录的信息是保存在cookie的，那么其他人可以访问，这就不是很安全。大部分时候我们的登录信息是在服务器的，并且也有失效时间，这个是怎么做到的呢？



这个功能需要用到一个模块：`express-session`

先安装：

```
npm i express-session -S
```



我们需要在 app.js文件加入代码来实现这个功能。

```js
// app.js 增加的代码

let session = require('express-session');

app.use(cookieParser());
// 在cookie代码下写代码，因为是基于cookie的
app.use(session({
    secret: "daotin", // 生成签名
    cookie: { maxAge: 3600000 } // 有效时长60分钟
}));
```



然后在用户登录成功后记录用户信息：

```js
router.post('/login', function(req, res, next) {
    let { name, pwd } = req.body; // { name: '1', price: '2', num: '3' }
    let user = dbc("users");
    user.find({ name }).toArray((err, list) => {
        if (!err) {
            if (list.length == 0) {
                res.json({
                    msg: '用户名不存在'
                })
            } else {
                if (list[0].pwd == pwd) {
                    req.session.userObj = list[0]; // 保存用户信息 userObj自己起的名称
                    res.json({
                        msg: '登录成功'
                    })
                } else {
                    res.json({
                        msg: '密码错误'
                    })
                }
            }

        } else {
            console.log("数据查询失败");
        }
    });
});
```



然后设置在录入商品数据之前先检查用户有无登录，登录了才可以录入数据，否则重定向到登录界面。

```js
router.get('/input', function(req, res, next) {
    // 将input渲染到前端页面
    if (req.session.userObj) {
        res.render('input');
    } else {
        res.redirect('login');
    }
});
```



**遇到的问题：**

当进入录入商品页时，第一次由于没有登录，所以会跳转到登录界面，登录成功后再次进入录入商品界面成功。

但是当刷新录入商品界面的时候，session就没了，又要从新登录。

我在网上也找到有人也遇到过这个问题：

https://segmentfault.com/q/1010000013760905/a-1020000013761198



**解决办法：**

好像是需要跨域授权，资源共享什么的。

于是在保存用户信息的时候，加入下面代码，但是不知道是不是都是必须的，但是确实起效了。

```js
req.session.userObj = list[0]; // 保存用户信息 userObj自己起的名称
res.header("Access-Control-Allow-Origin", req.headers.origin)
res.header('Access-Control-Allow-Credentials', 'true')
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
```



**删除登录信息**

```js
delete req.session.userObj;
```



## 3、上传图片到服务器

我们在录入商品的时候，可能需要录入图片，这就是图片的上传的功能。图片上传后一般都保存到服务器，然后返回图片的路径给客户端，然后客户端在页面渲染出来，表示已经上传图片成功，

所有通常我们点击上传图片后看到图片的缩略图的时候，其实图片已经上传到了服务器。

**然后我们在录入商品图片的时候，其实录入的是商品图片在服务器中的地址信息。**



了解了这个原理后开始干活。

上传图片需要用到`multer` 的插件：

```
npm i multer -S
```



安装好后，在 tools 目录下新建一个 `upLoad.js` 文件来编写上传功能的代码。

这个代码主要是设置上传图片后的路径和名称。

```js
// upLoad.js
const multer = require('multer');

let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/images'); // 上传的图片保存地址在服务器的public/images目录下
    },
    // 给图片重命名，按时间戳来命名
    filename(req, file, cb) {
        let originName = file.originalname.split('.');// phpto.jpg
        let ext = originName[originName.length - 1]; // 后缀 jpg
        let d = new Date();
        let newFileName = d.getTime() + '.' + ext; // 1545397261902.jpg
        cb(null, newFileName);
    }
});

module.exports = multer({ storage });
```



之后在前端页面，给上传图片绑定个事件change，当选中一个图片确定后就会触发change事件：

```js
$("#upImg").change(function() {
    // 创建一个FormData格式的对象fd
    let fd = new FormData();
	// 将change事件触发图片集合的第一张注入fd，第一个参数为file来标识，可以取其他名字（但是要和后面用到的一个对应）。
    fd.append('file', this.files[0])

    $.ajax({
        type: "post",
        url: "/ajax/upImg",
        data: fd,    // 然后将fd作为ajax的数据发送给服务器
        dataType: "json",
        contentType: false,  // 这两句代码是上传图片必须的
        processData: false,  // 这两句代码是上传图片必须的
        success: function({ src }) { // 服务器返回的json中有src是上传后的图片在服务器中地址，我们将它在前端展示，由于在express的public下的，不需要配置路由就可以直接显示。
            console.log(src);
            $("#img").attr("src", src);
        }
    });
});
```

接下来是服务器收到这个ajax请求的处理，会自动将它保存到`upLoad.js`设置的目录到保存到服务器并且返回给客户端图片地址。

```js
let middleware = require('../tools/upLoad');

// 借助中间件middleware进行图片上传的处理。
// 这里第二个参数 middleware.single('file') 中的'file'就是之前的 fd.append('file', this.files[0]) 的第一个参数'file' ，可以起别的名称，但是一定要保持一致。
router.post('/upImg', middleware.single('file'), (req, res) => {
    // filename : 1545397261902.jpg
    // destination : ./public/images
    let { filename, destination } = req.file; 
    // 由于express中在views中的ejs文件不需要/public地址，所以这里进行返回的图片地址的处理
    let newDest = destination.replace('./public', '');
    res.json({
        code: 200,
        src: newDest + '/' + filename
    });
})
```



然后在前端录入界面，我们先点击录入时就把商品的所有信息，包括图片的地址信息录入到数据库：

```js
$("#box").submit(function(event) {
    event.preventDefault();
    let inputObj = {
        name: this.name.value,
        price: this.price.value,
        num: this.num.value,
        pic: $("#img").attr("src")
    }

    $.ajax({
        type: "post",
        url: "/ajax/inputGoods",
        data: inputObj,
        dataType: "json",
        success: function(res) {
            console.log(res);
        }
    });
});
```

然后数据库录入的数据如下：

```
> db.goods.find({},{_id:0})
{ "name" : "222222", "price" : "222222", "num" : "222222", "pic" : "/images/1545377868419.png" }
{ "name" : "333", "price" : "34", "num" : "3222", "pic" : "/images/1545377977666.png" }
{ "name" : "dasd", "price" : "2", "num" : "444", "pic" : "/images/1545377994033.png" }
```





## 4、WebSocket

之前客户端和服务器之间是通过http协议进行通信的，通信的时候要先进行连接，通话完后又要断开连接。下次通信的时候又要进行连接，并且是客户端请求数据，服务器返回数据，没有客户端的请求，就不好有服务器的回复。

有没有那种像在线聊天室的那种连接，客户端和服务器一直保持联通状态，即使客户端不请求数据，服务器如果有最新数据的时候，也可以及时更新给客户端呢？

这就是 WebSocket 技术。

> WebSocket 技术属于HTML5的新特性。



### 1、WebSocket 服务器的搭建

安装插件：

```
npm i ws -S
```



服务器

```js
//webSocketServer.js
const Server = require('ws').Server;

// 获取websocket实例
let ws = new Server({
    host: 'localhost',
    port: '8800'
});

// 监听连接事件，当有客户端尝试发起连接，则该事件会被触发
// client为当前连接的客户端对象
ws.on('connection', client => {
    console.log('有客户端连接...');

    // 接收到客户端的消息
    client.on('message', msg => {
        console.log(msg);
    });

    // 向客户端发送消息
    // client.send("");

    // 主动断开连接
    // client.close();

    // 被动断开连接（如客户端主动断开连接，或者断网等）
    // client.on("close",()=>{
    //     // 监听close事件  一旦连接断开 则该事件会被触发
    // })

    // 监听连接错误事件
    // client.on("error",()=>{
    //     // 当连接出现错误 则会触发该事件
    // })
});
```

> **注意：WebSocket收发的数据格式只能是字符串。**

> 服务端总结：
>
>
>
> 服务端事件
>
> connection： websocket实例事件  有客户端连接成功
>
>
>
> 客户端对象client事件
>
> message： 接收消息事件
>
> close：连接被关闭事件
>
> error： 连接出错事件
>
>
>
> 客户端对象client方法
>
> .send()：  向客户端发送数据
>
> .close()： 关闭连接



客户端

> 客户端是写在express中的，记得配置路由，否则页面无法加载

```ejs
<!-- webSocketClient.ejs  -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <button>发送</button>
</body>
<script src="http://code.jquery.com/jquery.min.js"></script>
<script>
    // WebSocket对象是H5新增的，自带的，可以直接new出来
    // 不是http服务，而是ws服务
    // 连接localhost:8800服务器地址
    let ws = new WebSocket('ws://localhost:8800');

    // 客户端连接服务器成功，就会触发onopen事件
    ws.onopen = () => {
        console.log('客户端连接服务器成功！');
        // 连接服务器成功后才点击发送消息
        $("button").on('click', function() {
            // ws.send() 方法可以向服务器发送消息
            ws.send($('textarea').val());
        });
    }
    // 客户端接收服务器发送的数据
    ws.onmessage = function(event){
        // 数据存放在event.data里面
        console.log(event.data)
    }
	// 客户端主动断开连接
    ws.onclose = function(event){}
    
	// 连接出错
    ws.onerror = function(){}
</script>

</html>
```

> 客户端总结：
>
>
>
> 客户端事件
> open 事件：连接建立成功
>
> message 事件：接收消息
>
> close 事件：连接被关闭
>
> error 事件：连接出错
>
>
>
> 客户端方法
>
> .send()：发送消息
>
> .close()：关闭连接



### 案例：简易在线聊天室

服务端

```js
let Server = require("ws").Server

let ws = new Server({ port: 8080, host: "192.168.53.243" })

let clients = {}
let count = 0

ws.on("connection", client => {
    count++
    let key = `c${count}`
    clients[key] = client;
    client.on("message", msg => {
        let obj = { key, msg };
        obj = JSON.stringify(obj)
        sendAll(obj)
    })

    client.on("close", () => {
        delete clients[key]
    })

})

/**
 * 将内容群发给所有在线客户端
 * @param {String} msg 消息
 */
function sendAll(msg) {
    for (let key in clients) {
        clients[key].send(msg)
    }
}
```

由于有多个客户端，于是将每个加入进来的客户端加入集合。每个人都用加入进来时候的count来标记。

每次有人发送数据给服务器的时候，如果客户端发送的时间都是错开的话，其实不需要sendAll函数，因为同时只有一个人的话直接`clients[key].send(obj)` 就可以了。除非同时有很多个客户端同时发数据，为了保证数据没漏发给客户端，所以使用了for in循环。



客户端核心代码：

```html
<script>
    let ws = new WebSocket("ws://localhost:8080")
    let btn = document.getElementById("send")
    let msg = document.getElementById("message")

    let ulDom = $(".message-box ul")
    let liDom = ulDom.find("li").eq(0)
    ulDom.empty()

    //点击按钮发送消息给客户端
    ws.onopen = () => {
        btn.onclick = () => {
            ws.send(msg.value)
        }

    }
    // 客户端收到消息显示在文本框中
    // { data }结构赋值，因为收到的数据在 event.data里面
    ws.onmessage = ({ data }) => {
        let { key, msg } = JSON.parse(data)
        let newLi = liDom.clone(false)

        newLi.find(".sender").text(key)
        newLi.find("p").text(msg)

        ulDom.append(newLi)
		// 设置滚动条一直在底部
        // closest() 方法是jquery中获得匹配选择器的第一个祖先元素
        // 其实overflow-y:auto在ul的父元素div上，所以要先获取div元素
        // 相当于ulDom.parent(".message-box").scrollTop(ulDom.parent(".message-box")[0].scrollHeight)
        ulDom.closest(".message-box").scrollTop(ulDom.closest(".message-box")[0].scrollHeight)
    }
</script>
```



















