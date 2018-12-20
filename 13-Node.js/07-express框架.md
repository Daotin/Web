## Express 简介

Express 是一个简洁而灵活的 node.js Web应用框架。Express提供了一个轻量级模块，把Node.js的http模块功能封装在一个简单易用的接口中。Express也扩展了http模块的功能，使你轻松处理服务器的路由、响应、cookie和HTTP请求的状态。使用Express可以充当Web服务器。

使用 Express 可以快速地搭建一个完整功能的网站。



简单来说就是，之前我们每次引入静态文件的时候，都需要自己写路由来解析界面，有了 express 框架，就可以像php一样，放入的静态文件可以自动解析。

还有可以自动生成package.json等创建一个web网站基本的文件架构。总之很方便了。



## Express的安装

### 安装 express 到项目

```js
npm i express -S
```



### 安装 express 快速构建工具

```
npm i express-generator -g
```

（其实安装 express 快速构建工具就可以了，不需要安装express，我们在初始化项目的时候，会自动安装express的。）



### 快速构建项目

```js
express -e expressDemo //项目名
```

项目构建好了会自动创建如下文件：

![](img/4.png)

其中就有了package.json项目依赖文件列表。我们可以看到有我们必须的express依赖。

![](img/5.png)

可以看到有很多依赖项目没有的，怎么一次性下载所由需要的依赖呢？



### 初始化项目

在当前项目目录下使用指令：

```
npm install
```

就可以下载所有package.json下的所有指定版本的依赖（这也就是我之前说的不需要先下载express模块了），最后生成node_modules文件夹。



### 运行项目

在bin文件夹下有个www文件，这个就是类似我们的main.js文件，启动文件了。

我们可以直接使用node命令运行：

```
node ./bin/www
```

或者我们看到在package.json中有个`scripts`属性，其值有个start属性，对应的正是node运行项目的指令，故可以在项目目录下使用：

```
npm run start 
```

也可以将项目跑起来。



有时候我们修改了node后端的代码就需要重启服务，每次都要重启太麻烦了，有没有什么工具可以在修改完服务代码保存的时候自动重启服务呢？

答案是有的，只需要全局安装`supervisor`工具就可以了。

```
npm i supervisor -g
```

然后像node一样启动服务就可以实时监听服务代码的改动自动重启：

```
supervisor ./bin/www
```



案例：使用express实现商品信息录入MongoDB数据库，并且提取出来展示在列表，具有翻页排序功能。









