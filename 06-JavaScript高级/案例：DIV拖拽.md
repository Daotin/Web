面向对象



1、以后写代码不能有零散的代码。代码都在对象或者函数中。

2、常见的写法：

```js
var Method = (function(){
    return {
        fn: function() {
            
        }  
    };
})();

// 调用的时候
Method.fn();
```



拖拽案例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
</head>

<body>
    <div></div>
</body>

<script>
    var Method = Method || (function () {
        var mouseBind = null;
        return {
            drag: function (ele) {
                // this --> Method
                mouseBind = this.mouseHandler.bind(this);
                ele.addEventListener("mousedown", mouseBind);
            },
            mouseHandler: function (e) {
                if (e.type === "mousedown") {
                    // this -> ele
                    this.point = {
                        x: e.offsetX,
                        y: e.offsetY
                    };
                    document.addEventListener("mousemove", mouseBind);
                    e.currentTarget.addEventListener("mouseup", mouseBind);

                    this.ele = e.currentTarget;

                } else if (e.type === "mousemove") {
                    // this -> Method
                    // e.currentTarget -> document
                    Object.assign(this.ele.style, {
                        left: e.x - this.point.x + "px",
                        top: e.y - this.point.y + "px"
                    });

                } else if (e.type === "mouseup") {
                    document.removeEventListener("mousemove", mouseBind);
                    e.currentTarget.removeEventListener("mouseup", mouseBind);
                }
            }
        }
    })();

    Method.drag(document.querySelector("div"));
</script>

</html>
```



下面是不用 bind 的写法：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
</head>

<body>
    <div></div>
</body>

<script>
    // var Method = Method || (function () {
    //     var mouseBind = null;
    //     return {
    //         drag: function (ele) {
    //             // this --> Method
    //             mouseBind = this.mouseHandler.bind(this);
    //             ele.addEventListener("mousedown", mouseBind);
    //         },
    //         mouseHandler: function (e) {
    //             if (e.type === "mousedown") {
    //                 // this -> ele
    //                 this.point = {
    //                     x: e.offsetX,
    //                     y: e.offsetY
    //                 };
    //                 document.addEventListener("mousemove", mouseBind);
    //                 e.currentTarget.addEventListener("mouseup", mouseBind);

    //                 this.ele = e.currentTarget;

    //             } else if (e.type === "mousemove") {
    //                 // this -> Method
    //                 // e.currentTarget -> document
    //                 Object.assign(this.ele.style, {
    //                     left: e.x - this.point.x + "px",
    //                     top: e.y - this.point.y + "px"
    //                 });

    //             } else if (e.type === "mouseup") {
    //                 document.removeEventListener("mousemove", mouseBind);
    //                 e.currentTarget.removeEventListener("mouseup", mouseBind);
    //             }
    //         }
    //     }
    // })();

    var Method = Method || (function () {
        return {
            drag: function (ele) {
                // this --> Method
                ele.addEventListener("mousedown", this.mouseHandler);
                ele.self = this;
            },
            mouseHandler: function (e) {
                if (e.type === "mousedown") {
                    // this -> ele
                    document.point = {
                        x: e.offsetX,
                        y: e.offsetY
                    };
                    document.addEventListener("mousemove", this.self.mouseHandler);
                    this.addEventListener("mouseup", this.self.mouseHandler);
                    document.ele = this;
                } else if (e.type === "mousemove") {
                    // this -> document
                    Object.assign(this.ele.style, {
                        left: e.x - this.point.x + "px",
                        top: e.y - this.point.y + "px"
                    });

                } else if (e.type === "mouseup") {
                    document.removeEventListener("mousemove", this.self.mouseHandler);
                    this.removeEventListener("mouseup", this.self.mouseHandler);
                }
            }
        }
    })();

    Method.drag(document.querySelector("div"));
</script>

</html>
```



















