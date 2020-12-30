// 封装移动端的tap事件

var fingerTap = {
    tap: function (dom, callback) {  
        // 判断dom是否存在
        if((!dom) || (typeof dom != "object")) {
            return;
        }
        var startX, startY, endX, endY, startTime, endTime;
        dom.addEventListener("touchstart", function (e) {  
            // 不止一个手指
            if(e.targetTouches.length > 1) {
                return;
            }
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
            
            // 点击时记录毫秒数
            startTime = Date.now(); 

        });

        dom.addEventListener("touchend", function (e) {
            // 不止一个手指
            if(e.changedTouches.length > 1) {
                return;
            }
            // 之所以使用changedTouches，是因为手指离开后就没有targetTouches了
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            // 记录离开手指的毫秒数
            endTime = Date.now();
            //如果是长按操作就返回
            if(endTime - startTime > 300) {
                return;
            }
            // 判断从按下到抬起手指在一定的范围滑动也算tap事件
            if((Math.abs(endX-startX) <= 6) && (Math.abs(endY-startY) <= 6)) {
                // tap点击事件的处理函数
                callback && callback(e);
            }

        });
    }
};