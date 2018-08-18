$(function () {
    // 获取所有的item元素
    var items = $(".carousel-inner .item");

    // 当屏幕大小改变的时候，动态创建图片
    // triggle函数表示页面在第一次加载的时候，自动触发一次。
    $(window).on("resize", function () {
        // 判断屏幕的大小，以决定加载大图还是小图
        var screenWidth = $(window).width();
        // 添加大屏幕的图片
        if (screenWidth >= 768) {
            // 为每个item添加大图片
            items.each(function (index, value) {
                // 获取每个item的图片，使用data()获取自定义属性
                var imgSrc = $(this).data("largeImage");
                // 使用插入小图片的方法不可以，因为路径符号会被解析成空格
                $(this).html($('<a href="javascript:;" class="bigImg"></a>').css("backgroundImage", "url('" + imgSrc + "')"));
            });

            // 添加小屏幕的图片
        } else {
            // 为每个item添加小图片
            items.each(function (index, value) {
                // 获取每个item的图片，使用data()获取自定义属性
                var imgSrc = $(this).data("smallImage");
                $(this).html('<a href="javascript:;" class="smallImg"><img src="' + imgSrc + '"></a>');
            });
        }
    }).trigger("resize");

    // 实现滑动轮播效果
    // 实现滑动轮播可以可以直接调用插件的点击按钮上下切换的功能

    // 获取滑动区域的元素
    var carouselInner = $(".carousel-inner");
    var carousel = $(".carousel");
    var startX, endX;
    // 给元素添加touchstart和touchend事件
    carouselInner[0].addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;
    });

    carouselInner[0].addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        // endX - startX > 10px 证明往右滑动
        if (endX - startX > 10) {
            carousel.carousel("prev");
        } else if (startX - endX > 10) {
            carousel.carousel("next");
        }
    });

    // 产品块的宝，北标签的鼠标悬停效果
    $('[data-toggle="tooltip"]').tooltip();

    // 设置产品块的标签栏在移动端时可以滑动
    var ulProduct = $(".tabs-parent .nav-tabs");
    var liProducts = ulProduct.children("li");
    var totleWidth = 0;
    liProducts.each(function (index, element) {
        /*获取宽度的方法的说明：
         * width():它只能得到当前元素的内容的宽度
         * innerWidth():它能获取当前元素的内容的宽度+padding
         * outerWidth():获取当前元素的内容的宽度+padding+border
         * outerWidth(true):获取元素的内容的宽度+padding+border+margin*/
        totleWidth += $(element).innerWidth();

    });
    ulProduct.width(totleWidth);
    // 使用iScroll插件实现滑动效果
    /*使用插件实现导航条的滑动操作*/
    var myScroll = new IScroll('.tabs-parent', {
        /*设置水平滑动，不允许垂直滑动*/
        scrollX: true,
        scrollY: false
    });
});