## 几个要点：

- Nodejs 是基于 Chrome 的 V8 引擎开发的一个 C++ 程序，目的是提供一个 **JS 的运行环境**。
- Node.js 和浏览器是不同的环境，是有着很多细小的差异的。首先，二者各自包含的全局变量不同。document 对象是用来操作页面的，所以只有浏览器环境下才可以直接使用。但是如果是要放到 Node.js 环境下运行代码，就不要使用 document 。同样的道理，Node.js 中可以直接拿来使用的 http 对象，在浏览器环境下就没有。其次，Node.js 和浏览器对 ES6 新特性的支持程度也是不同的，这一点也要注意。（参考：[Node.js与浏览器的区别](http://nodejs.cn/learn/differences-between-nodejs-and-the-browser)）

## node和npm的关系

- npm由于内置在node.js中，所以就一并安装了。
- 如果只想单独安装npm，不想安装node.js，这个好像是不行的。

**引用大神的总结：**

其实npm是nodejs的包管理器（package manager）。

我们在Node.js上开发时，会用到很多别人已经写好的javascript代码，如果每当我们需要别人的代码时，都根据名字搜索一下，下载源码，解压，再使用，会非常麻烦。

于是就出现了包管理器npm。

大家把自己写好的源码上传到npm官网上，如果要用某个或某些个，直接通过npm安装就可以了，不用管那个源码在哪里。

并且如果我们要使用模块A，而模块A又依赖模块B，模块B又依赖模块C和D，此时npm会根据依赖关系，把所有依赖的包都下载下来并且管理起来。试想如果这些工作全靠我们自己去完成会多么麻烦！

**发展历程**

npm作者已经将npm开发完成，于是发邮件通知 jQuery、Bootstrap、Underscore 作者，希望他们把 jquery、bootstrap 、 underscore 放到npm远程仓库，但是没有收到回应，于是npm的发展遇到了瓶颈。

Node.js作者也将Node.js开发完成，但是 Node.js 缺少一个包管理器，于是他和 npm 的作者一拍即合、抱团取暖，最终 Node.js 内置了 npm。

后来的事情大家都知道，Node.js 火了。随着 Node.js 的火爆，大家开始用 npm 来共享 JS 代码了，于是 jQuery 作者也将 jQuery 发布到 npm 了。

所以现在，你可以使用 npm install jquery 来下载 jQuery 代码。现在用 npm 来分享代码已经成了前端的标配。


## 参考文档：
- http://nodejs.cn/learn
- https://zhuanlan.zhihu.com/p/47822968
