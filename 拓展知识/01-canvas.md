画布



通过JS完成画图而不是css



canvas 默认 inline-block



canvas划线

```js
// 1、获取原生dom对象
let dom = document.getElementById('can');

// 2、获取绘图对象
let can = dom.getContext('2d');

// 定义线条起点
can.moveTo(0,0);

// 定义线条中点（非终点）
can.lineTo(400,400);

// 对标记范围进行描边
can.stroke()
```







