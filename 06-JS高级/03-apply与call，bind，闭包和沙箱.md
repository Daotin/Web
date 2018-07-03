>大家好，这里是「 从零开始学 Web 系列教程 」，并在下列地址同步更新......
>
> - github：https://github.com/Daotin/Web
> - 微信公众号：[Web前端之巅](https://github.com/Daotin/pic/raw/master/wx.jpg)
> - 博客园：http://www.cnblogs.com/lvonve/
> - CSDN：https://blog.csdn.net/lvonve/
>
> 在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！


![](https://github.com/Daotin/pic/raw/master/fgx.png)

# 一、apply 和 call 方法

**apple 和 call 都可以改变调用其的函数或方法中的 this 指向。**

不同的是传入参数时，apple有两个参数，第二个参数是数组；call 从第二个参数开始是调用其的函数的所有参数。



> 使用方法：
>
> 1、apply的使用语法：
>
> 函数名.apply(对象，[参数1， 参数2，... ])；
>
> 方法名.apply(对象，[参数1， 参数2，... ])；
>
> 2、call的使用语法：
>
> 函数名.call(对象，参数1， 参数2，... )；
>
> 方法名.call(对象，参数1， 参数2，... )；

## 1、函数调用apply和call

```js
function f1(x, y) {
  console.log(x+y +this); // 这里面的this是window
  return x+y;
}

var r1 = f1.apply(null, [10,20]); // 打印30 window，传入的是null，所以this指向还是window
console.log(r1); // 30
var r2 = f1.call(null, 10,20);// 打印30 window
console.log(r2); // 30
```

```js
//函数改变 this 的指向
var obj = {};

var r1 = f1.apply(obj, [10,20]); // 打印30 window，传入的是Obj，所以this指向是Obj
console.log(r1); // 30
var r2 = f1.call(obj, 10,20);// 打印30 Obj
console.log(r2); // 30

```



## 2、方法调用apply和call

```js
// 方法改变 this 的指向
    function Person(age) {
        this.age = age;
    }
    Person.prototype.eat = function () {
        console.log(this.age); // this 指向实例对象
    };

    function Student(age) {
        this.age = age;
    }

    var per = new Person(18);
    var stu = new Student(20);

    per.eat.apply(stu); // 打印 20
    per.eat.call(stu); // 打印 20
```

> 由于 eat 方法已经指向了 Student 了，所以打印 20，而不是 18.



问题：我们知道函数也是对象，函数可以调用 apple 和 call 方法，但是这两个方法并不在这个函数这个对象的实例函数中，那么在哪里呢？

**解答：所有的函数都是 Function 的实例对象，而 apply 和 call 就在 Function 构造函数的原型对象中。**



---

# 二、bind方法

bind 是复制的意思，也可以改变调用其的函数或方法的 this 指向，参数可以在复制的时候传进去，也可以在复制之后调用的时候传进去。

> 使用语法：
>
> 1、函数名.bind(对象, 参数1, 参数2, ...); // 返回值是复制的这个函数
>
> 2、方法名.bind(对象, 参数1, 参数2, ...); // 返回值是复制的这个方法

## 1、函数调用 bind

```js
function f1(x, y) {
    console.log(x + y + this);
}
// 1.参数在复制的时候传入
var ff = f1.bind(null,10,20); // 这只是复制的一份函数，不是调用，返回值才是
ff();

// 2.参数在调用的时候传入
var ff = f1.bind(null); // 这只是复制的一份函数，不是调用，返回值才是
ff(10,20);
```



## 2、方法调用 bind

```js
function Person(age) {
    this.age = age;
}

Person.prototype.eat = function () {
    console.log(this.age); // this 指向实例对象
};

function Student(age) {
    this.age = age;
}

var per = new Person(18);
var stu = new Student(20);

var ff = per.eat.bind(stu);
ff(); // 20
```



---

# 三、闭包

## 1、闭包的概念

有一个函数 A 中有一个函数或者对象 B，那么函数或者对象 B 可以访问函数 A 中的数据，那么函数 A 的作用域就形成了闭包。

## 2、闭包的模式

函数模式的闭包：函数中包含函数。

对象模式的闭包：函数中包含对象。

## 3、闭包的作用

缓存数据，延长作用域链。

## 4、闭包的优缺点

也是缓存的数据，导致在闭包的范围内一直起作用。

## 5、闭包的应用

缓存数据，函数中的数据，外面可以使用。

如果想要缓存数据，就把这个数据放在外层的函数和里层的函数之间。这样不停的调用里层函数，相当于外层函数里的数据没有得到及时释放，就相当于缓存了数据。

```js
// 函数闭包
function A() {
    var num = 10;
    return function () {
        return num++;
    }
}

var func = A();
console.log(func());
console.log(func());
console.log(func());
```

```js
// 对象闭包
function A() {
    var num = 10;
    return {
        age: num++
    };
}
var func = A();
console.log(func.age);
```



---

# 四、沙箱

沙箱：一小块的真实环境，里面发生的事情不会影响到外面。相同的操作，相同的数据都不会和外面发生冲突。

作用：避免命名冲突。

比如：**自调用函数**里面就相当于一个沙箱环境。

```js
(function (){
        
}());
```



---

# 五、区分伪数组和真数组

```js
// 真数组
    var arr = [10,20,30];
    // 伪数组
    var obj = {
        0:10,
        1:20,
        2:30,
        length: 3
    };
    // 真数组的访问
    for(var i=0; i<arr.length; i++) {
        console.log("真数组的访问："+arr[i]);
    }
    // 伪数组的访问
    for(var j=0; j<obj.length; j++) { // 错误：对象中没有length方法
        console.log("伪数组的访问："+obj[j]);
    }
```

> 方法一、使用 length 来区分
>
> 这样看起来，真数组和伪数组就没法区别了。
>
> 但是真数组的长度 length 可以改变，伪数组不可以，貌似可以区分了。
>
> 但是，你还记得有个 arguement 这个伪数组（对象）的 length 是可以改变的，方法一区分失败。
>
> 
>
> 方法二、使用数组的方法 forEach 来鉴别
>
> 因为每个数组都是 Array 的实例对象，而 forEach 在 Array 的原型对象中，所以其他的伪数组是不能使用的。方法二成功。



![](https://github.com/Daotin/pic/raw/master/fgx.png)



















































