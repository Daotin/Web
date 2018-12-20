## async模块介绍

*Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm install --save async, it can also be used directly in the browser.*

async是一个实用的模块，对于处理异步javascript来说，它可以提供简介强大的功能。虽然最初设计的时候视为Nodejs设计的，可以通过`npm install --save async` 来引入async模块，但是现在它也可以被直接用在浏览器中，也就是前端js代码中。



## async三个模式

async的异步流程管理主要分为三个模式：

- 并行无关联
- 串行无关联
- 串行有关联



### 并行无关联 parallel

```js
const async = require("async");

/**
 * 并行无关联
 * 语法：async.parallel([],(err,data)=>{})
 * 参数1：可以是个对象或者数组
 *      如果是数组：内容为一系列匿名函数集合，匿名函数的参数为一个回调函数
 *      如果是对象：内容为一系列属性值为匿名函数组成，匿名函数的参数为一个回调函数
 * 
 *  回调函数的第一个参数：并行任务执行失败的错误信息
 *          第二个参数：处理的数据
 * 
 * async.parallel 第二个参数中的data是所有并行任务执行完成后，汇聚成的集合
 */
console.time("time");

// 参数为数组
async.parallel([
    (cb) => {
        setTimeout(() => {
            cb(null, "daotin");
        }, 2000);
    },
    (cb) => {
        setTimeout(() => {
            cb(null, "lvonve");
        }, 1000);
    }
], (err, data) => {
    if (!err) {
        console.timeEnd("time"); // time: 2001.771ms
        console.log(data); // ['daotin', 'lvonve']
    }
});


// 参数为对象
// 最后获取到的data也是对象，属性名就是前面的属性名。
console.time("time");
async.parallel({
    one(cb) {
        setTimeout(() => {
            cb(null, "123");
        }, 2000);
    },
    two(cb) {
        setTimeout(() => {
            cb(null, "123");
        }, 2000);
    }
}, (err, data) => {
    console.timeEnd("time"); // time: 2004.775ms
    if (!err) {
        console.log(data); //{ one: '123', two: '123' }
    }
});
```



### 串行无关联 series

```js
console.time("time");
console.time("time1");
async.series({
    one(cb) {
        setTimeout(() => {
            cb(null, "123");
        }, 2000);
    },
    two(cb) {
        console.timeEnd("time1"); //time1: 2004.965ms
        setTimeout(() => {
            cb(null, "456");
        }, 1000);
    }
}, (err, data) => {
    console.timeEnd("time"); // time: 3010.950ms
    if (!err) {
        console.log(data); //{ one: '123', two: '456' }
    }
});
```

可以看到，除了关键词`series`变了之外，格式都一样，只不过已是串行了。



### 串行有关联 waterfall

> 注意：串行有关联的第一个参数必须是数组，不能是对象
>
> 数组中第一个任务的回调函数cb的第二个参数开始是传给下一个任务的实参。
>
> 第二个任务函数形参前几个就是上一个传下来的实参，这里是name形参对应‘daotin’实参。

```js
console.time("time");
console.time("time1");
async.waterfall([
    cb => {
        setTimeout(() => {
            cb(null, 'daotin');
        }, 2000);
    },
    (name, cb) => {
        console.timeEnd('time1'); // time1: 2004.008ms
        setTimeout(() => {
            cb(null, 'lvonve-' + name);
        }, 1000);
    }
], (err, data) => {
    console.timeEnd("time"); // time: 3008.387ms
    if (!err) {
        console.log(data); //lvonve-daotin
    }
});
```

