## 一、响应式编程

### 1、什么是响应式编程

响应式编程就是用异步数据流进行编程，这不是新理念。即使是最典型的点击事件也是一个异步事件流，从而可以对其进行侦测（observe）并进行相应操作。

可以基于任何东西创建数据流。流非常轻便，并且无处不在，任何东西都可以是一个流：用户输入、缓存、数据结构等等。例如，想象一下微博推文也可以是一个数据流，和点击事件一样。你可以对其进行侦听，并作相应反应。



使用响应式编程实现观察者模式。

观察者模式存在着被观察对象和观察者。



Angular中使用 RxJS 模块可以创建一个流对象，流对象就是一个被观察者。流对象可以被订阅，也就是被接收到。

为了测试流对象上面的一些方法，我们创建一个流对象。



### 2、流对象的方法

#### 2.1、创建接收流对象

```typescript
import { Observable } from "rxjs"

export class StreamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // 创建触发3次的流对象
    let streamObj = Observable.from([1, 2, 3]);

      // 订阅流对象（接收流对象）
    streamObj.subscribe(data => {
      console.log(data);
    })
  }

}

```

> Observable.from的参数由于是个数组，所以数组长度就是流对象触发的次数，在订阅的时候就会接收到所有的流对象。



#### 2.2、筛选流对象

流对象在接收之前可以进行筛选：

```typescript
 streamObj
 	// 筛选接收到的数据为偶数的流对象，然后再进行接收
      .filter(data => { return data % 2 == 0 })
      .subscribe(data => {
        console.log(data);
      })
```



#### 2.3、对流对象进行二次运算

```typescript
streamObj
      .filter(data => { return data % 2 == 0 })
	// 对流对象进行+10后进行接收
      .map(data => { return data + 10 })
      .subscribe(data => {
        console.log(data);
      })
```





## 二、响应式表单

我们在使用百度搜索的时候，但我们输入一个关键词时，并没有回车就显示了搜索结果。

实现过程最容易想到的是绑定输入框，设定个延时，每次用户输入的时候，延时清零。当用户停止输入xxx毫秒时再进行请求数据。

其实这个功能使用流对象的方法很容易实现。使用流对象实现的方式就是响应式表单。



使用响应式表单需要在主模块app.module.ts中加入一个模块`ReactiveFormsModule`:

```js
imports: [
    ReactiveFormsModule
],
```



我们在Home模块创建一个Input表单。

```html
<input type="text">
```

在Home组件控制器中与Input表单绑定：

```typescript
import { FormControl } from '@angular/forms';

export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
	// 3、this.searchText.valueChanges是一个流对象，每当表单的值发生改变，就可以得到表单中的值。
    this.searchText.valueChanges
      .subscribe(data => {
        console.log(data);
      })
  }
	// 1、设置需要绑定的属性
  searchText: FormControl = new FormControl();
}
```

```html
<!--2、将属性和表单绑定起来-->
<input type="text" [formControl]="searchText">
```



设置流对象订阅间隔：

```js
this.searchText.valueChanges
	// 间隔500ms才订阅，如果流数据的触发间隔<500，后面的流数据会覆盖前面的流数据 
	.debounceTime(500)
      .subscribe(data => {
        console.log(data);
      })
```

这样就可以使得每次用户输入的间隔>=500ms的时候才会向服务器请求数据，服务器压力更小，用户体验更好。

