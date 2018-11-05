>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！

![](https://github.com/Daotin/pic/raw/master/fgx.png)



# 一、日期

## 1、日期的定义

**定义日期**： 

```js
var date = new Date(); // 获取当前日期

// 带参数的日期形式
var date = new Date("month dd,yyyy hh:mm:ss"); // 自定义日期(日期必须合法)
var date = new Date("month dd,yyyy"); // 自定义日期(日期必须合法)
var date = new Date(yyyy,mth,dd,hh,mm,ss); // 日期可以不合法，会自动转换
var date = new Date(yyyy,mth,dd); // 日期可以不合法，会自动转换
var date = new Date(ms);// 毫秒

// 示例：
var d1 = new Date("January 6,2006 23:15:35");			
var d2 = new Date("January 6,2006");			
var d3 = new Date(2006,2,8,12,15,35);			
var d4 = new Date(2006,4,6);
var d5 = new Date(1137075575000);

```



 

## 2、日期（获取）相关方法

```js
var date = new Date();
var year = date.getFullYear(); // 获取当前年份 //2018
var month = date.getMonth() + 1; // 获取当前月份 //11
var day = date.getDate(); // 获取当前天数 //3
var week = date.getDay() // 获取当前星期几 //6

var hour = date.getHours(); // 时
var min = date.getMinutes(); // 分
var sec = date.getSeconds(); // 秒
```

> 注意：我们获取到的月份比实际月份少一个月，所以要加一。



## 3、日期（设置）相关方法

```js
var date = new Date();
var year = date.setFullYear(2000); // 获取当前年份为2000年
var month = date.setMonth(11); // 获取当前月份为11月
var day = date.setDate(1); // 设置当前天数为1号
// var week = date.setDay() // 不能设置当前星期几
```



## 4、时间处理函数

```js
Date.parse("2015-08-24"); // 计算自1970年1月1日至2015年8月24日的毫秒数（转换格式默认支持2015-08-24或2015/08/24）

getTime(); // getTime获取某个日期自1970年以来的毫秒数

setTime() // setTime修改日期的毫秒数，对应的日期时间也会修改

// 示例：
var d = new Date();  
d.setTime(56521211021);
```



## 5、封装日期相关函数

```js
// 获取当前月的天数
function getCurrentDays(date) {
    // 设置临时日期格式，防止在设置日期的时候，月份+1，-1的转换
    var tmp = new Date("2000-01-01");
    tmp.setFullYear(date.getFullYear());
    tmp.setMonth(date.getMonth() + 1); // date.getMonth() 是比当前月上一天的，但是设置的时候会自动多加一天，抵消了
    tmp.setDate(0);
    return tmp.getDate();
}

// 获取上个月的天数
function getPrevMonthDays(date) {
    // 设置临时日期格式，防止在设置日期的时候，月份+1，-1的转换
    var tmp = new Date("2000-01-01");
    tmp.setFullYear(date.getFullYear());
    tmp.setMonth(date.getMonth());
    tmp.setDate(0);
    return tmp.getDate();
}

// 根据日期获取当月的第一天是星期几
function getWeekByFirstDay(date) {
    // 设置临时日期格式，防止在设置日期的时候，月份+1，-1的转换
    var tmp = new Date("2000-01-01");
    tmp.setFullYear(date.getFullYear());
    tmp.setMonth(date.getMonth());
    tmp.setDate(1);

    return tmp.getDay();
}
```


