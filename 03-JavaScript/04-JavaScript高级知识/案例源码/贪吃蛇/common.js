function my$(id) {
    return document.getElementById(id);
}

// 设置任意标签的文本内容为任意内容
function setInnerText(element, text) {
    (typeof element.TextContent === "undefined") ? (element.innerText = text) : (element.textContent = text);
}

// 获取任意标签的文本内容
function getInnerText(element) {
    return typeof element.TextContent === "undefined" ? element.innerText : element.textContent;
}

// 获取任意一个父元素的第一个子元素
function getFirstElement(element) {
    if(element.firstElementChild) {
        return element.firstElementChild;
    } else { // 主要考虑到多个文本节点的影响
        var node = element.firstChild;
        while((node) && (node.nodeType !== 1)) {
            node = node.nextSibling;
        }
        return node;
    }
}
// 获取任意一个父元素的最后一个子元素
function getLastElement(element) {
    if(element.lastElementChild) {
        return element.lastElementChild;
    } else { // 主要考虑到多个文本节点的影响
        var node = element.lastChild;
        while((node) && (node.nodeType !== 1)) {
            node = node.previousSibling;
        }
        return node;
    }
}
// 获取任意一个元素的前一个兄弟元素
function getPreviousElement(element) {
    if(element.previousElementSibling) {
        return element.previousElementSibling;
    } else { // 主要考虑到多个文本节点的影响
        var node = element.previousSibling;
        while((node) && (node.nodeType !== 1)) {
            node = node.previousSibling;
        }
        return node;
    }
}
// 获取任意一个元素的后一个兄弟元素
function getNextElement(element) {
    if(element.nextElementSibling) {
        return element.nextElementSibling;
    } else { // 主要考虑到多个文本节点的影响
        var node = element.nextSibling;
        while((node) && (node.nodeType !== 1)) {
            node = node.nextSibling;
        }
        return node;
    }
}


// 为任意元素绑定任意事件
function addAnyEventListener(element, type, func) {
    if(element.addEventListener) {
        element.addEventListener(type, func, false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+type, func);
    } else {
        element["on"+type] = func;
    }
}

// 为任意元素解绑任意事件
function removeAnyEventListener(element, type, funcName) {
    if(element.removeEventListener) {
        element.removeEventListener(type, funcName, false);
    } else if(element.detachEvent) {
        element.detachEvent("on"+type, funcName);
    } else {
        element["on"+type] = null;
    }
}

// 获取浏览器滑动栏向上向左卷曲的距离
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}

// // 封装动画移动函数
// function animation(element, target) {
//     clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
//     // 判断当前的位置
//     var current = element.offsetLeft;
//     var onestep = 7;
//     element.timeId = setInterval(function () {
//         current += current < target ? onestep : -onestep;
//         if (Math.abs(current - target) >= onestep) {
//             element.style.left = current + "px";
//         } else {
//             clearInterval(element.timeId);
//             element.style.left = target + "px";
//         }
//         // 测试代码
//         console.log("target="+target+", current="+current+", step="+onestep);
//     }, 10);
// }

// 获取任意元素的任意一个属性值
function getStyle(element, attr) {
    return window.getComputedStyle ?
        window.getComputedStyle(element, null)[attr] :
        element.currentStyle[attr];
}

// element --- 任意元素
// attr ---- 任意属性名字
// target ---目标位置
function animation(element, json, fn) {
    clearInterval(element.timeId); // 每次调用函数就清理之前的timeId
    // 判断当前的位置
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            // 判断attr是不是层级zIndex
            if (attr === "zIndex") {
                element.style[attr] = json[attr];
            } else if (attr === "opacity") { // 判断attr是不是透明度opacity
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
                var onestep = (target - current) / 10;
                onestep = onestep > 0 ? Math.ceil(onestep) : Math.floor(onestep);
                current += onestep;
                element.style[attr] = current + "px";
            }
            // 保证所有属性都达到目标才清理定时器
            if (target !== current) {
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
        console.log("target="+target+", current="+current+", step="+onestep);
    }, 20);
}

// 封装通用事件位置相关对象
var evt = {
    // 获取通用事件对象
    getEvent: function (e) {
        return window.event||e;
    },
    // 获取通用 ClientX
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
        return this.getEvent(e).pageX?this.getEvent(e).pageX:this.getClientX(e)+this.getScrollLeft();
    },

    // 获取通用 pageY
    getPageY: function (e) {
        return this.getEvent(e).pageY?this.getEvent(e).pageY:this.getClientY(e)+this.getScrollTop();
    }
};

