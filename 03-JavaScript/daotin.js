// 获取任一元素（只能是单个元素）
// 示例：$("#dv .uu span")
function $(str, parent) {
    parent = parent || document;
    if (str.indexOf(" ") != -1) { // str中有空格
        var strList = str.split(" "); // [ul,#dv]
        for (var i = 0; i < strList.length; i++) {
            if (i == strList.length - 1) {
                return $(strList[i], parent);
            }
            if (strList[i].indexOf("#") == 0) {
                parent = $(strList[i], parent);
            } else {
                parent = $(strList[i], parent)[0];
            }
        }
        return tmpObj;

    } else {
        switch (str.charAt(0)) {
            case "#":
                return parent.getElementById(str.substring(1));
                break;
            case ".":
                return parent.getElementsByClassName(str.substring(1))[0];
                break;
            default:
                return parent.getElementsByTagName(str)[0];
                break;
        }
    }
}

// 从array中取length个不重复随机数，返回组成的字符串
function getSecurityCode(array, length) {
    var index = [];
    var tmp = 0;
    while (1) {
        tmp = Math.floor(Math.random() * array.length);
        if (!checkNumIfRepeat(index, array[tmp])) { // 下标存在
            index[index.length] = array[tmp];
        }

        if (index.length == length) {
            break;
        }
    }
    return index.join("");
}

function checkNumIfRepeat(list, num) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == num) {
            return true;
        }
    }
    return false;
}

// 获取当前月的天数
function getCurrentDays(date) {
    var tmp = new Date(date);
    tmp.setDate(1);
    tmp.setMonth(date.getMonth() + 1); // date.getMonth() 是比当前月上一天的，但是设置的时候会自动多加一天，抵消了
    tmp.setDate(0);
    return tmp.getDate();
}

// 获取上个月的天数
function getPrevMonthDays(date) {
    var tmp = new Date(date);
    // tmp.setMonth(date.getMonth());
    tmp.setDate(0);
    return tmp.getDate();
}

// 根据日期获取当月的第一天是星期几
function getWeekByFirstDay(date) {
    var tmp = new Date(date);
    // tmp.setMonth(date.getMonth());
    tmp.setDate(1);

    return tmp.getDay();
}

// 格式化date函数
// 示例：dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss")
function dateFormat(date, formatStr) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;

    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    var min = date.getMinutes();
    min = min < 10 ? "0" + min : min;
    var sec = date.getSeconds();
    sec = sec < 10 ? "0" + sec : sec;

    return formatStr.replace("yyyy", year).replace("mm", month).replace("dd", day).replace("hh", hour).replace("mm",
        min).replace("ss", sec);
}

// 设置任意标签的文本内容为任意内容
function setInnerText(element, text) {
    (typeof element.TextContent === "undefined") ? (element.innerText = text) : (element.textContent = text);
}

// 获取任意标签的文本内容
function getInnerText(element) {
    return typeof element.TextContent === "undefined" ? element.innerText : element.textContent;
}


// 为任意元素绑定任意事件
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + type, fn);
    } else {
        obj["on" + type] = fn;
    }
}

// 为任意元素解绑任意事件
function removeEvent(obj, type, fnName) {
    if (obj.removeEventListener) {
        obj.removeEventListener(type, fnName, false);
    } else if (obj.detachEvent) {
        obj.detachEvent("on" + type, fnName);
    } else {
        obj["on" + type] = null;
    }
}

// 获取页面可视区域宽高
function getAvail() {
    return {
        width: document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

// 获取页面实际宽高
function getReal() {
    return {
        width: document.documentElement.scrollWidth || document.body.scrollWidth || 0,
        height: document.documentElement.scrollHeight || document.body.scrollHeight || 0
    };
}

// 获取浏览器滑动栏向上向左卷曲的距离
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}


// 获取任意元素的任意一个属性值
function getStyle(element, attr) {
    return window.getComputedStyle ?
        window.getComputedStyle(element, null)[attr] :
        element.currentStyle[attr];
}

// 函数描述：匀速动画函数
// element：要实现动画的元素
// onestep：每次移动的大小
// json：设置的目标属性集合（比如{"left":100,"top":400,"width":400,"height":200}）
// fn：动画完成之后的回调函数
function animate_ys(obj, json, step, fn) {
    clearInterval(obj.timer);
    step = step || 10;
    var len = 0;

    for (let i in json) {
        len++;
    }

    obj.timer = setInterval(function () {
        var count = 0;
        for (let attr in json) {
            var start = parseInt(getStyle(obj, attr));
            var target = json[attr];
            step = target > start ? Math.abs(step) : -Math.abs(step);
            obj.style[attr] = parseInt(getStyle(obj, attr)) + step + "px";

            if (step > 0) {
                if (parseInt(getStyle(obj, attr)) >= target) {
                    obj.style[attr] = target + "px";
                    count++;
                }
            } else {
                if (parseInt(getStyle(obj, attr)) <= target) {
                    obj.style[attr] = target + "px";
                    count++;
                }
            }
        }
        if (len == count) {
            clearInterval(obj.timer);
            if (fn) fn();
        }

    }, 100);
};


// 函数描述：变速动画函数
// element：要实现动画的元素
// json：设置的目标属性集合（比如{"left":100,"top":400,"width":400,"height":200}）
// fn：动画完成之后的回调函数

function animation(element, json, fn) {
    clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
    // 判断当前的位置
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            // 判断attr是不是层级zIndex
            if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else if (attr == "opacity") { // 判断attr是不是透明度opacity
                // 获取当前透明度*100，方便计算
                var current = getStyle(element, attr) * 100;
                // 目标透明度也*100
                var target = json[attr] * 100;
                var onestep = (target - current) / 10;
                onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                current += onestep;
                element.style[attr] = current / 100;
            } else { // 其他属性
                var current = parseInt(getStyle(element, attr)); // 获取任意元素的任意一个属性值
                var target = json[attr];
                var onestep = (target - current) / 10; // 变速
                // var onestep = -3; // 匀速
                onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                current += onestep;
                element.style[attr] = current + "px";
            }
            // 有一个没到的flag都为false
            if (target != current) {
                flag = false;
            }
        }

        if (flag) {
            clearInterval(element.timeId);

            if (fn) {
                fn();
            }
        }
        // 测试代码
        console.log("target=" + target + ", current=" + current + ", step=" + onestep);
    }, 50);
}

function animate_bs(obj, json, step, fn) {
    clearInterval(obj.timer);
    step = step || 10;
    var len = 0;
    for (let attr in json) {
        len++;
    }
    obj.timer = setInterval(function () {
        var count = 0;
        for (var attr in json) {
            var start = parseInt(getStyle(obj, attr));
            var target = json[attr];
            var step = (target - start) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style[attr] = parseInt(getStyle(obj, attr)) + step + "px";

            if (step == 0) {
                count++;
            }
        }
        if (len == count) {
            clearInterval(obj.timer);
            if (fn) fn();
        }
    }, 100);
}

// 封装通用事件位置相关对象
// 使用示例:
// document.onmousemove=function (e) {
//     obj.style.left = evt.getPageX(e)+"px";
//     obj.style.top = evt.getPageY(e)+"px";
//   };
var evt = {
    // 获取通用事件对象
    getEvent: function (e) {
        return window.event || e;
    },
    // 获取通用 ClientX
    // 兼容IE浏览器不支持.evt的事件
    getClientX: function (e) {
        return this.getEvent(e).clientX;
    },
    // 获取通用 ClientY
    getClientY: function (e) {
        return this.getEvent(e).clientY;
    },
    // 获取通用 scrollLeft
    getScrollLeft: function () {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    },

    // 获取通用 scrollTop
    getScrollTop: function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },

    // 获取通用 pageX
    getPageX: function (e) {
        return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getClientX(e) + this.getScrollLeft();
    },

    // 获取通用 pageY
    getPageY: function (e) {
        return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getClientY(e) + this.getScrollTop();
    }
};

// 获取cookie中对应key的value值

// for循环实现的
// function getCookie(key) {
//     var cookie = document.cookie;
//     if (cookie) {
//         var cookieStr = cookie.split("; ");
//         for (var i = 0; i < cookieStr.length; i++) {
//             var item = cookieStr[i];
//             if (item.split("=")[0] == key) { //key
//                 return item.split("=")[1]; // value
//             }
//         }
//         return "";
//     } else {
//         return "";
//     }
// };
function getCookie(key, decode) {
    var cookie = document.cookie;
    if (decode) {
        if (cookie) {
            var cookieStr = cookie.split("; ");
            var item = cookieStr.filter(function (ele) {
                return ele.split("=")[0] == encodeURIComponent(key);
            })[0];

            if (item) {
                return decodeURIComponent(item.split('=')[1]);
            } else {
                return "";
            }
        } else {
            return "";
        }
    } else {
        if (cookie) {
            var cookieStr = cookie.split("; ");
            var item = cookieStr.filter(function (ele) {
                return ele.split("=")[0] == key;
            })[0];

            if (item) {
                return item.split('=')[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }
};

// cookie的增加，删除，修改
// key 键
// value 值
// days 过期时间
//path 可访问路径
// encode 是否对key和value进行编码
function setCookie(key, value, days, path, encode) {
    path = path || "/"; // 网站根路径
    if (encode) {
        if (days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";expires=" + date + ";path=" + path;

        } else {
            document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";path=" + path;
        }
    } else {
        if (days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            document.cookie = key + "=" + value + ";expires=" + date + ";path=" + path;

        } else {
            document.cookie = key + "=" + value + ";path=" + path;
        }
    }
};


// 封装 getElementByClassName 函数兼容 IE8
// Tips：IE8 不兼容getElementByClassName和 indexOf函数 
function daotin_indexOf(str, list) {
    var index = -1;
    for (var i = 0; i < list.length; i++) {
        if (str == list[i]) {
            return i;
        }
    }
    return index;
};

function daotin_getElementByClassName(className) {
    var allEle = document.getElementsByTagName("*");
    var list = [];

    for (var i = 0; i < allEle.length; i++) {
        if (allEle[i].className) {
            var classList = allEle[i].className.split(" "); //["ll", "haha"]
            // if (classList.indexOf(className) != -1) {
            if (daotin_indexOf(className, classList) != -1) {
                list.push(allEle[i]);
            }
        }
    }
    return list;
}

// 调用此函数：阻止事件传递（不止是冒泡）
function daotin_stopPropagation(e) {
    var e = window.event || e;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
};

// 阻止默认事件
function stopDefault(e) {
    var e = window.event || e;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
};