window.onload = function () {
    bannerEffect();
    timeCount();
    slideshowEffect();
};

// 搜索栏上下滚动时改变透明度
function bannerEffect() {
    var bannerObj = document.querySelector(".search");
    var slideshowObj = document.querySelector(".slideshow")

    // 获取搜索栏的高度
    var bannerHeight = bannerObj.offsetHeight; //40
    // 获取轮播图高度
    var slideshowHeight = slideshowObj.offsetHeight; //311

    window.addEventListener("scroll", function () {
        // 页面向上滚动的距离（兼容代码）
        var scrolllen = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrolllen < (slideshowHeight - bannerHeight)) {
            var setopacity = scrolllen / (slideshowHeight - bannerHeight);
            bannerObj.style.backgroundColor = "rgba(233, 35, 34, " + setopacity + ")";
        }
    }, false);
}

// 主体内容秒杀栏目的倒计时
function timeCount() {
    var spanObjs = document.querySelector(".content-title-left-time").children;
    var titleCount = 2 * 60 * 60; // 2小时倒计时

    var timeId = setInterval(function () {
        titleCount--;

        var hour = Math.floor(titleCount / 3600);
        var minute = Math.floor((titleCount % 3600) / 60);
        var second = titleCount % 60;

        if (titleCount >= 0) {
            // 下面的true实际想表达的是不执行任何操作，但是必须要写个语句，所以用true代替。
            spanObjs[0].innerHTML == Math.floor(hour / 10) ? true : spanObjs[0].innerHTML = Math.floor(hour / 10);
            spanObjs[1].innerHTML == hour % 10 ? (true) : spanObjs[1].innerHTML = hour % 10;
            spanObjs[3].innerHTML == Math.floor(minute / 10) ? true : spanObjs[3].innerHTML = Math.floor(minute / 10);
            spanObjs[4].innerHTML == minute % 10 ? true : spanObjs[4].innerHTML = minute % 10;
            spanObjs[6].innerHTML == Math.floor(second / 10) ? true : spanObjs[6].innerHTML = Math.floor(second / 10);
            spanObjs[7].innerHTML == second % 10 ? true : spanObjs[7].innerHTML = second % 10;
        } else {
            titleCount = 0;
            clearInterval(timeId);
            return;
        }
    }, 1000);
}

// 轮播图
function slideshowEffect() {
    // 1. 自动轮播图
    // 思路：1.1、使用js在图片开头动态添加原本最后一张图片
    // 1.2、使用js在图片结尾动态添加原本第一张图片

    // 获取轮播图
    var slideshowObj = document.querySelector(".slideshow");

    // 获取ul
    var ulObj = document.querySelector(".slideshow-img");

    // 获取所有li
    var liObjs = ulObj.children;
    // 设置li的索引值
    var index = 1;

    // 要添加的第一个li和最后一个li
    var first = liObjs[0].cloneNode(true);
    var last = liObjs[liObjs.length - 1].cloneNode(true);

    // 在li开头结尾添加克隆图片
    ulObj.appendChild(first);
    ulObj.insertBefore(last, ulObj.firstElementChild);

    // 设置ul宽度
    ulObj.style.width = liObjs.length + "00%";
    // 设置每个li的宽度
    for (var i = 0; i < liObjs.length; i++) {
        liObjs[i].style.width = slideshowObj.offsetWidth + "px";
    }
    // 默认显示第一张图
    ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth) + "px)"

    // 改变窗口大小的时候自动调节轮播图的宽度
    window.addEventListener("resize", function () {
        ulObj.style.width = liObjs.length + "00%";
        for (var i = 0; i < liObjs.length; i++) {
            liObjs[i].style.width = slideshowObj.offsetWidth + "px";
        }
        // 改变窗口的大小的时候，不能仅仅回到第一张，要回到第index张
        ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index) + "px)"

    }, false);

    // 1. 实现自动轮播效果
    var timerId;
    var timerStart = function () {
        timerId = setInterval(function () {
            index++;

            ulObj.style.transition = "transform 0.5s ease-in-out";
            ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index) + "px)";

            // 设置小白点
            if(index >= liObjs.length - 1) {
                setDot(1);
                return;
            }
            setDot(index);
            
            // 由于过渡效果，使得过渡的时候，就进行if、判断，无法显示最后一张图片。
            // 所以进行延时过渡的时候，等所有过渡效果完成后再进行判断是否到达最后一张。
            setTimeout(function () {
                if (index >= liObjs.length - 1) {
                    index = 1;
                    // 从最后一张调到第一张的时候，取消过渡效果
                    ulObj.style.transition = "none";
                    ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index) + "px)";
                }
            }, 500);            
        }, 1500);
       
    };

    timerStart();

    // 2. 轮播图的手动滑动效果
    // 2.1、记录手指的起始位置
    // 2.2、记录手指滑动时与起始位置水平轴的偏移距离
    // 2.3、设置当手指松开后，判断偏移距离的大小，决定回弹还是翻页。
    var startX, diffX;
    // 设置节流阀，避免手动滑动过快，在过渡过程中也有滑动，造成的最后图片会有空白的操作，也就是index越界了，没有执行相应的 webkitTransitionEnd 事件。
    var isEnd = true;
    ulObj.addEventListener("touchstart", function (e) {
        // 手指点击轮播图时，停止自动轮播效果
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;

    }, false);

    // 最开始的时候不触发，原因ul的高度为0
    ulObj.addEventListener("touchmove", function (e) {
        if (isEnd) {
            // 手指移动的距离
            diffX = e.targetTouches[0].clientX - startX;
            // 关闭过渡效果，否则手指滑动困难
            ulObj.style.transition = "none";
            ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index - diffX) + "px)";
        }
    }, false);


    ulObj.addEventListener("touchend", function (e) {        
        isEnd = false;

        // 判断当前滑动的距离是否超过一定的距离，则翻页
        if (Math.abs(diffX) > 100) {
            if (diffX > 0) {
                index--;
            } else {
                index++;
            }
            // 翻页
            ulObj.style.transition = "transform 0.5s ease-in-out";
            ulObj.style.transform = "translateX(-" + slideshowObj.offsetWidth * index + "px)";
        } else if (Math.abs(diffX) > 0) { // 回弹
            ulObj.style.transition = "transform 0.5s ease-in-out";
            ulObj.style.transform = "translateX(-" + slideshowObj.offsetWidth * index + "px)";
        }

        // 每次离开手指清除startX, diffX的值
        startX = 0;
        diffX = 0;

        if(index == liObjs.length-1) {
            setDot(1);
            return;
        } else if(index == 0) {
            setDot(liObjs.length-2);
            return;
        }
        setDot(index);

        // 手指离开重新开启定时器
        timerStart();
    }, false);

    // 我们发现在第一张往右滑动，或者最后一张往左滑动时，会造成空白
    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
    ulObj.addEventListener("webkitTransitionEnd", function () {
        // 如果到了第一张（index=0），让index=count-2
        // 如果到了最后一张(index=count-1)，让index=1;
        if (index == 0) {
            index = liObjs.length - 2;
            // 从第一张到最后一张的时候，取消过渡效果
            ulObj.style.transition = "none";
            ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index) + "px)";
        } else if (index >= liObjs.length - 1) {
            index = 1;            
            // 从最后一张调到第一张的时候，取消过渡效果
            ulObj.style.transition = "none";
            ulObj.style.transform = "translateX(" + -(slideshowObj.offsetWidth * index) + "px)";
        }

        // 设置过渡效果完成后，才可以继续滑动
        setTimeout(function () {
            isEnd = true;
        }, 100);
    }, false);


    // 3. 设置轮播图小白点
    function setDot(index) {
        var dotliObjs = document.querySelector(".slideshow-dot").children;

        // 建议不使用className，因为class属性可能有多个，使用dotliObjs[i].className = "";可能将其他的类样式一起清除。
        for (var i = 0; i < dotliObjs.length; i++) {
            // 清除所有select样式
            dotliObjs[i].classList.remove("select");
        }
        // 设置当前索引的样式为select
        dotliObjs[index-1].classList.add("select");
    }
}