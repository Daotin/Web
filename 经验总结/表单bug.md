1、input文本框和按钮显示模式不同，文本框是标准盒模型（box-sizing: content-box; ），而按钮是怪异盒子（box-sizing: border-box;）。也就是设置相同的宽高时，文本框的实际宽高要更大，而按钮的实际宽高更小。



2、input文本框在IE8及以下浏览器默认不是垂直居中显示的，IE8以上和chrome是默认居中显示的。



3、border:0 与 border: none;

border:0; 只是border-width:0;

而 border:none; 是 border-color,border-style,border-width 都为 none，效率更低。



4、一行文字在宽度显示不够的时候，显示三个点的省略符号：

```css
width: xxxpx; /*设置显示宽度*/
white-space: nowrap; /*文本一行显示*/
overflow: hidden;    /*超出宽度范围不显示*/
text-overflow: ellipsis;  /*超出宽度部分用三个点代替*/
```

