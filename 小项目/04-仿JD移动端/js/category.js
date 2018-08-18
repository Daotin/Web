window.onload = function () {  
    leftSlideEffect();
};

// 左侧滑动栏效果和点击效果
function leftSlideEffect() {  
    // 添加左侧栏的滑动效果
    var mainObj = document.querySelector(".main");
    var leftUlObj = document.querySelector(".main-left").children[1];

    var mainLeftHeight = document.querySelector(".main-left").offsetHeight;
    var leftUlObjHeight = leftUlObj.offsetHeight;

    var liObjs = leftUlObj.querySelectorAll("li");


    var startY=0; // 起始位置
    var diffY=0;  // 滑动后与起始位置的偏移
    var currentY=0; // 保存每次滑动后的偏移

    var maxTop = 0; // 最大top偏移值
    var minTop = mainLeftHeight-leftUlObjHeight; // 最大top偏移值
    var maxBounceTop = maxTop + 100; //弹性最大高度
    var minBounceTop = minTop - 100; //弹性最小高度
    leftUlObj.addEventListener("touchstart", function(e) {
        // 计算起始坐标
        startY = e.targetTouches[0].clientY;
    });

    leftUlObj.addEventListener("touchmove", function(e) {
        /*计算距离的差异*/
        diffY = e.targetTouches[0].clientY - startY;
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        if((diffY+currentY > maxBounceTop) || (diffY+currentY < minBounceTop)) {
            return;
        }
        /*先将之前可能添加的过渡效果清除*/
        leftUlObj.style.transition = "none";
        /*实现偏移操作:应该在之前的滑动距离的基础之上再进行滑动*/
        leftUlObj.style.top = diffY+currentY + "px";
    });

    leftUlObj.addEventListener("touchend", function() {
        
        if(diffY+currentY > maxTop) {
            // 回到maxTop位置，设置currentY当前值
            leftUlObj.style.transition = "top 0.5s"
            leftUlObj.style.top = maxTop + "px";
            currentY = maxTop;
        } else if(diffY+currentY < minTop) {
            // 回到minTop位置，设置currentY当前值
            leftUlObj.style.transition = "top 0.5s"
            leftUlObj.style.top = minTop + "px";
            currentY = minTop;
        } else {
            // 记录当前滑动的距离
            currentY += diffY;
        }
    });

    /*为每一个li元素设置添加一个索引值*/
    for(var i=0; i<liObjs.length; i++) {
        // liObjs是对象，给对象增加属性值
        liObjs[i].index = i;
    }
    // 点击事件
    fingerTap.tap(leftUlObj, function (e) {
        // 清除所有li标签
        for(var i=0; i<liObjs.length; i++) {
            liObjs[i].classList.remove("active");
        }
        //设置点击的li标签的样式
        var indexLi = e.target.parentElement;
        
        indexLi.classList.add("active");
        // 每个li标签的高度
        var indexLiHeight = indexLi.offsetHeight;

        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        leftUlObj.style.transition = "top 0.5s";

        if(-indexLiHeight*indexLi.index < minTop) {
            leftUlObj.style.top = minTop + "px";
            // 记得重置currentY的值
            currentY=minTop;
        } else {
            leftUlObj.style.top = -indexLiHeight*indexLi.index + "px";
            // 记得重置currentY的值
            currentY=-indexLiHeight*indexLi.index;
        }
    });
}

