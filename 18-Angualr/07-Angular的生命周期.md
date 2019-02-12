一、Angular组件的生命周期函数



constructor：

最先执行，构建组建时执行。

此时，可以拿到内部定义的属性的值，不可以拿到父组件传过来的输入属性。



OnInit：

接受完父组件传递过来的值后执行。可以拿到父组件传过来的输入属性。

```js
export class StreamComponent implements OnInit {
  ngOnInit() {
  }
    
  @Input()
  receiveGoods: Goods

  streamTxt: string = 'aaa';
}
```





OnChange ： 

- 只在输入属性发生变化时执行（但是不能深度监听，只在输入属性的指针发生改变时触发）
- 内部属性变化时不会执行

```js
export class StreamComponent implements OnChange  {
  ngOnChange() {
  }
}
```



DoCheck : 

- 可以深度监听输入属性，并且在获取或者失去焦点时都会触发，特别敏感，所以内部代码尽量轻量和高效。
- 可以监听内部属性的变化

```js
export class StreamComponent implements DoCheck  {
  ngDoCheck() {
  }
}
```





AfterViewInit：

视图初始化完毕之后，触发此函数

```js
export class StreamComponent implements AfterViewInit  {
  ngAfterViewInit() {
  }
}
```

> 子组件的AfterViewInit先执行，父组件的AfterViewInit后执行。（因为只有子组件初始化完毕后，父组件才可能初始化完毕）



AfterViewChecked：

- 子组件视图改变（内部属性，输入属性等）触发
- 获取或失去焦点也会触发。

```js
export class StreamComponent implements AfterViewChecked  {
  ngAfterViewChecked() {
  }
}
```













