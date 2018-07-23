>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、服务器和客户端

服务器和客户端都是电脑，在硬件层面上没有明显的划分，配置很差的个人电脑任然可以作为服务器。

服务器如果想对外提供服务，必须安装相应的软件，所以不是服务器这台电脑可以提供服务，而是其安装的软件提供的服务。比如：

HTTP网页服务：Apache，Tomcat，IIS等

文件上传下载服务：VsFtp等

邮箱服务：SendMail 等

数据存储服务：MySql，Oracle 等



## 1、网路相关概念

**IP 地址：**

地址是为了标注某个地点，方便查找。

互联网上又很多公司，每家公司都有自己的服务器。通过 IP 地址就可以找到特定的服务器，使用这台服务器提供的服务。比如百度服务器的地址为：123.125.114.144。

可以通过：`ipconfig` 查看本机  IP 地址。



**域名：**

由于 IP 地址是一串数字，很难记忆，为了便于人们记忆，就把域名代替 IP 地址。

比如：www.baidu.com 就是百度的域名。

通过 `ping www.baidu.com` 可以查看域名对应的 IP 地址。



**DNS 域名解析器**

DNS 又叫做域名解析服务器，提供域名和 ip 地址的映射关系。

一台电脑访问服务器的过程如下：

比如访问百度服务器：当在地址栏输入 www.baidu.com 点击回车的时候，浏览器会将域名发送到 DNS 域名解析器，解析出 www.baidu.com 对应的 ip 为：123.125.114.144，然后再将这个域名返回给浏览器，浏览器再从这个 ip 访问百度服务器。

然而，一般我们电脑上有一个 hosts 文件，里面保存的是域名和 ip 地址的映射关系。其实在地址栏输入 www.baidu.com 点击回车的时候，会先从 hosts 文件中读取是否有对应域名的 ip 地址，如果有直接返回浏览器访问 ip 地址，如果找不到再从 DNS 域名解析器解析出 ip 地址访问。

本机 hosts 文件的路径：C:\Windows\System32\drivers\etc\hosts

 

**端口**

当我们电脑找到一台服务器时，这台服务器可能会提供很多服务，如何区分客户端需要哪种服务就需要端口来区分。

比如：我们在访问百度提供的网页服务时，完整的写法为：`www.baidu.com:80`，80 这个端口就是百度提供网页服务的，但是80这个端口比较特殊，可以省略不写。

再比如我们在设置邮箱客户端的时候，也需要指定端口号。



## 2、通信协议

通信协议就是事先商量好的规则。而计算机之间的通信也需要规则。

常见的协议有：

HTTP、HTTPS：超文本传输协议

FTP：文件传输协议

SMTP：简单邮件传输协议





# 二、WAMP 的安装配置

**什么是Wamp？**

Wamp指的是：Windows、Apache、MySQL、PHP 几个服务器软件的缩写，类似的还有 LAMP，只不过把 Windows 换成了 Linux。



**为什么要安装 Wamp？**

以前我们写的 html 文件都是在本地执行的，现在我们想把我们的电脑变成一台服务器，然后将我们的 html 界面以服务的方式提供给别的客户机访问。



**Wamp的安装配置**

安装很简单，略。

Wamp 的简单配置：

**配置访问权限**

默认情况下，apache 提供的网页服务只允许 localhost 和 127.0.0.1 （其实这两个是一个映射关系，在 hosts 里面有写）访问，如果我们想让别的客户机访问，就需要对配置文件进行修改。配置文件位于：C:\wamp\bin\apache\Apache2.4.4\conf\httpd.conf 将 268 行的 Deny from all 改成 Allow from all。

注意：在修改所有配置文件之前，都应该先做备份。



**网站根路径的配置**

默认情况下，网站的根路径为 c:\wamp\www ，在此目录下的文件才可以以服务的方式提供给别人访问，如果想更改这个路径，也需要修改 C:\wamp\bin\apache\Apache2.4.4\conf\httpd.conf 文件，将 DocumentRoot 修改为自己想要的目录。

```
DocumentRoot "I:/Web/Demo/php"
<Directory "I:/Web/Demo/php">
```

注意：修改之后，原路径  c:\wamp\www 将不可访问。





# 三、静态网站和动态网站

**静态网站**

所有的 HTML 代码全部都已经写好，任何人访问都是相同的。每次网页的改变，都需要修改 HTML 源码，而且如果有1000个 HTML 文件，就需要修改 1000 个 HTML代码，工作量巨大。



**动态网站**

一般动态网站通过数据库进行架构，动态网站的内容可以根据不同用户的不同需求展示不同的页面。一般是以 asp、jsp、php、aspx 等结尾。



![](https://github.com/Daotin/pic/raw/master/fgx.png)