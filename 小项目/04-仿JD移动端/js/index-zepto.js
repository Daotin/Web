$(function () {  
    // 1.在开始和最后位置添加图片
    // 2.重新设置图片盒子的宽度和图片的宽度
    // 3.添加定时器，自动轮播
    // 4.添加过渡结束事件
    // 5.设置小白点
    // 6.添加手动轮播

    // 获取元素
    var ulObj = $(".slideshow-img");
    var first = ulObj.find("li:first-of-type");
    var last = ulObj.find("li:last-of-type");

    var bannerWidth = $(".slideshow").width();

    // 在开始和最后位置添加图片
    ulObj.append(first.clone());
    last.clone().insertBefore(first);

    // 重新设置图片盒子的宽度和图片的宽度
    var liObjs = ulObj.find("li");

    ulObj.width(liObjs.length +"00%");
    liObjs.each(function (index) {  
        // 数组是DOM操作，要转换成zepto元素
        $(liObjs[index]).width(bannerWidth);
    });    

    // 设置默认显示第一张图
    ulObj.css("transform", "translateX("+ -bannerWidth +"px)");

    var index = 1;

    // 盒子改变大小的时候重现设置图片盒子的宽度和图片的宽度
    $(window).on("resize", function () {  
        ulObj.width(liObjs.length +"00%");
        liObjs.each(function (index) {  
            // 数组是DOM操作，要转换成zepto元素
            $(liObjs[index]).width($(".slideshow").width());            
        });
        ulObj.css("transform", "translateX("+ -$(".slideshow").width()*index +"px)");
    });

    // 轮播动画函数
    var setAnimate = function () {  
        ulObj.animate(
            {"transform": "translateX("+ -$(".slideshow").width()*index +"px)"},
            500,
            "linear",
            function () {  // 过渡结束事件回调函数
                if(index == 0) {
                    index = liObjs.length -2;
                    ulObj.css("transform", "translateX("+ -$(".slideshow").width()*index +"px)");
                } else if(index == liObjs.length -1) {
                    index = 1;
                    ulObj.css("transform", "translateX("+ -$(".slideshow").width()*index +"px)");
                }
                // 设置小白点
                $(".slideshow-dot").children("li").removeClass("select").eq(index-1).addClass("select");          
    
            }
        );
    };

    var timerId;
    // 添加定时器，自动轮播
    var timerStart = function () {  
        timerId = setInterval(function () {  
            index++;
            setAnimate();
        }, 1500);
    };
    timerStart();

    // 手动轮播操作
    ulObj.on("swipeLeft", function () {
        clearInterval(timerId);
        index++;
        setAnimate();
        //手动轮播操作完成后再开启定时器
        timerStart();
    });
    ulObj.on("swipeRight", function () {
        clearInterval(timerId);
        index--;
        setAnimate();
        // 手动轮播操作完成后再开启定时器
        timerStart();
    });

    //------------------------------------------------

    // 搜索栏上下滚动时改变透明度
    var bannerEffect = function () {  
        var bannerObj = $(".search");
        var slideshowObj = $(".slideshow");
        var bannerHeight = bannerObj.height();
        var imgHeight = slideshowObj.height();
        // console.log(bannerHeight + '  ' + imgHeight);

        $(window).on("scroll", function (e) {  
            var scrollHeight = $(window).scrollTop();            
            if(scrollHeight < (imgHeight-bannerHeight)) {
                var setopacity = scrollHeight / (imgHeight-bannerHeight);
                bannerObj.css("backgroundColor", "rgba(233, 35, 34,"+setopacity+")");
            }
            
        });
        
    };
    bannerEffect();

    //-----------------------------------------------------

    // 设置倒计时
    var timerCount = function () {  
        var timers = $(".content-title-left-time").children("span");
        var titleCount = 2*60*60;

        var timerId = setInterval(function () {  
            titleCount--;
            var hour = Math.floor(titleCount / 3600);
            var minute = Math.floor((titleCount % 3600) / 60);
            var second = titleCount % 60;

            if(titleCount >= 0) {
                $(timers[0]).html(Math.floor(hour / 10));
                $(timers[1]).html(hour % 10);
                $(timers[3]).html(Math.floor(minute / 10));
                $(timers[4]).html(minute % 10);
                $(timers[6]).html(Math.floor(second / 10));
                $(timers[7]).html(second % 10);
            } else {
                titleCount = 0;
                clearInterval(timerId);
                return;
            }

        }, 1000);
    };
    timerCount();

});