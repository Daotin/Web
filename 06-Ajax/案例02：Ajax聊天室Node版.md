这个聊天室的案例是:

填写用户名和发送的消息,点击发送按钮,就会在textarea中显示出来。



node后台：

```js
var http=require("http"); // 导入http.js文件
var msgList=[];
// 创建server服务
// req：接收前端的数据
// res：发送给前端的数据
var server=http.createServer(function (req,res) {
    var data="";
	// post请求接收数据的函数
	// post接收到的数据就在函数的参数d里面
    req.on("data",function (d) {
        data+=d;
    });
	// get请求接收数据的函数
    req.on("end",function () {
        var obj=JSON.parse(decodeURIComponent(data));
        if(obj.type===0){
            delete obj.type;
            msgList.push(obj);
        }
        res.writeHead(200,{"Access-Control-Allow-Origin":"*"});
        res.write(encodeURIComponent(JSON.stringify(msgList)));
        res.end();
    })
});
// 地址 http://192.168.53.213:3002
server.listen(3002,"192.168.53.213",function () {
    console.log("开启服务了");
});

```



前端代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #names{
            width: 120px;

        }
        #msgs{
            width: 680px;
        }
    </style>
</head>
<body>
    <textarea id="msgText" rows="30" cols="120"></textarea>
    <br>
    <input id="names" type="text">:
    <input id="msgs" type="text">
    <button id="bn">发送</button>

    <script>
        
// 接口文档
    // 1、
    // req
    //     type=0
    //     user="xie"
    //     msg="聊天信息"
    // res
    //     [
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //     ]

    //   2、实时获取聊天信息
    //     req
    //        type=1
    //     res
    //          [
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //        {user:"xie",msg:"聊天信息"},
    //     ]

        
        var msgText=document.querySelector("#msgText");
        var names=document.querySelector("#names");
        var msgs=document.querySelector("#msgs");
        var bn=document.querySelector("#bn");
        bn.addEventListener("click",clickHandler);
        
        function clickHandler(e) {
			// 判断输入的姓名和留言信息是否为空
            if(names.value.trim().length===0 || msgs.value.trim().length===0)return;
            // type为0是发送消息
			ajax({type:0,user:names.value,msg:msgs.value});
        }
        function ajax(data) {
            var xhr=new XMLHttpRequest();
            xhr.addEventListener("load",loadHandlder);
            xhr.open("POST","http://192.168.53.213:3002");
            xhr.send(encodeURIComponent(JSON.stringify(data)));
        }

        function loadHandlder(e) {
            var arr=JSON.parse(decodeURIComponent(this.response));
			// 将服务器返回的消息进行格式处理，方便显示
            arr=arr.map(function (item) {
                return item.user+":"+item.msg;
            });
			//每条消息换行显示
            msgText.value=arr.join("\n");
			//设置滚动条一直在底部
            msgText.scrollTop=msgText.scrollHeight;
        }
		
		// 每16ms向后台获取一次消息
        setInterval(getMsg,16);
        // type为1是获取消息
        function getMsg() {
            ajax({type:1});
        }
    </script>
</body>
</html>


```

