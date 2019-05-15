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



## 6、案例：日历

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

        #box {
            width: 210px;
            overflow: hidden;
            margin: 50px auto;
        }

        #header {
            width: 210px;
            height: 30px;
        }

        #header span {
            float: left;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: #333333;
            color: #ffffff;
        }

        #first {
            width: 210px;
            height: 60px;
        }

        #first p {
            width: 210px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: rgb(221, 27, 59);
            color: #fff;
        }

        #first #nongli {
            background-color: rgb(48, 141, 218);
        }

        #header #prev,
        #header #next {
            width: 20%;
            cursor: pointer;
            background-color: rgb(234, 248, 35);
            color: #333;
        }

        #middle {
            width: 60%;
        }

        .th {
            width: 210px;
            height: 30px;
        }

        ul li {
            float: left;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: #333333;
            color: #fff;
            box-sizing: border-box;
            border: 1px solid transparent;
        }

        ul li:hover {
            border: 1px solid #fff;
            background-color: #666;
        }
    </style>

</head>

<body>
    <div id="box">
        <div id="first">
            <p id="time"></p>
            <p id="nongli"></p>
        </div>
        <div id="header">
            <span id="prev">上</span>
            <span id="middle">2018-11</span>
            <span id="next">下</span>
        </div>

        <ul class="th">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
        </ul>

        <ul id="content">
        </ul>
    </div>
</body>
<script src="../js/daotin.js"></script>
<script src="../js/nongli.js"></script>
<script>
    var pFirst = document.getElementById("time");
    var pSecond = document.getElementById("nongli");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var middle = document.getElementById("middle");
    var content = document.getElementById("content");

    var date = new Date();

    nowTime(date);
    setInterval(function () {
        nowTime(new Date());
    }, 1000);

    // 实时时钟部分
    function nowTime(date) {
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        pFirst.innerHTML = hour + " : " + minute + " : " + sec;
    }


    // 农历部分
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var ww = date.getDay();
    // var ss = parseInt(date.getTime() / 1000);
    if (yyyy < 100) {
        yyyy = "19" + yyyy;
    }

    pSecond.innerHTML = GetLunarDay(yyyy, mm, dd);

    // 日历部分
    // 显示日历
    showCalendar();

    prevBtn.onclick = function () {
        date.setMonth(date.getMonth() - 1);
        showCalendar();
        // prevBtn.style.backgroundColor = "red";
    };
    prevBtn.onmouseover = function () {
        prevBtn.style.backgroundColor = "red";
    };
    prevBtn.onmouseout = function () {
        prevBtn.style.backgroundColor = "";
    };


    nextBtn.onclick = function () {
        date.setMonth(date.getMonth() + 1);
        showCalendar();
    };
    nextBtn.onmouseover = function () {
        nextBtn.style.backgroundColor = "red";
    };
    nextBtn.onmouseout = function () {
        nextBtn.style.backgroundColor = "";
    };

    function showCalendar() {

        middle.innerHTML = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";


        var weekByFirstDay = getWeekByFirstDay(date);
        var currentDays = getCurrentDays(date);
        var prevDays = getPrevMonthDays(date);

        weekByFirstDay == 0 ? weekByFirstDay = 7 : weekByFirstDay;

        var html = "";

        // 上个月剩余的部分
        for (var i = prevDays - weekByFirstDay + 2; i <= prevDays; i++) {
            html += "<li style='background-color: orange;'>" + i + "</li>";
        }

        // 本月的日历
        for (var i = 1; i <= currentDays; i++) {
            html += "<li>" + i + "</li>";
        }

        // 下个月的部分
        for (var i = 1; i <= (42 - weekByFirstDay - currentDays) + 1; i++) {
            html += "<li style='background-color: blue;'>" + i + "</li>";
        }

        content.innerHTML = html;
    }
</script>

</html>
```



![](./images/1.gif)