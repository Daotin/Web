## 一、单位em与rem

`em`：就是一种长度单位，它是**参照当前元素的字号，如果没有设置，就参照父容器，一直到当前浏览器的默认字号。**

比如：当前浏览器默认字体大小为 16px，则 1em = 16px;



`rem`：css3新增的一种长度单位，它是**参照根元素(html)的字号**。

比如：当前浏览器默认字体大小为 16px，而 html 的字号为 20px，则 1rem = 20px;



**em 是相对长度单位（参照父元素）**，其参照当前元素字号大小，如果当前元素未设置字号则会继承其祖先元素字号大小。

例如：` .box {font-size: 16px;}` 则 1em = 16px 

`.box {font-size: 32px;} `则 1em = 32px，0.5em = 16px

**rem 相对长度单位（参照 html 元素）**，其参照根元素(html)字号大小。

例如 ：`html {font-size: 16px;}` 则 1rem = 16px 

`html {font-size: 32px;}` 则 1rem = 32px，0.5rem = 16px.



**vw：viewport width，视口宽度**  （1vw = 1%视口宽度）

**vh：viewport height   视口高度**  （1vh = 1%视口高度）





## 二、rem 的使用

一般情况下，美工给前端的移动端 UI 图的尺寸一般为 **640px** 和 **750px**。之后我们要设计的移动端的大小可能是 320px（iPhone5），375px（iPhone6），414px（iPhone6plus）等。

那么如何等比例的在这些移动端上进行一些元素布局的设计呢？

可以使用 em 吗？不好，不同浏览器可能默认字号大小不同，如果使用者对元素没有设置字号大小的话，就会参考父元素，可能一直到浏览器的默认字号大小。这样的话，可能不同的浏览器 1em 的大小不同。

所以，一般来说在移动端大多使用 rem 作为单位。

如何使用呢？

我们以 640px 的 UI 为例。**一般我们把 640px 的 UI 分成 20份，那么每一份的大小为 32px。**

那么 **750px 的 UI 分成 20份，那么每一份的大小为 37.5px。**

如何我们要在 320px 的屏幕上进行缩放的话，我们也将 320px 分成 20 份，每一份为 16px。

这时，我们想把 UI 上面一个 160px*160px 的矩形，缩放到 320px 的屏幕上的话，160 是占 UI 的5份，那么在 320px 上的矩形也应该占 16px 的 5 份。

![](./images/16.png)

所以，这个矩形在 320px 上的长度应该为：`160/32 * 16px  `，如何把 16px 换成 rem ？

rem 是按照 html 的字号决定的，那么我们可以这样做，我们先根据屏幕的大小，设置 html 的字号：

```css
@media screen and (device-width: 320px) {
  html {
    font-size: 16px;
  }
}
@media screen and (device-width: 360px) {
  html {
    font-size: 18px;
  }
}
@media screen and (device-width: 375px) {
  html {
    font-size: 18.75px;
  }
}
@media screen and (device-width: 414px) {
  html {
    font-size: 20.07px;
  }
}
```

之后，我们的代码可以改为：`160/32 rem` ，那么这份代码在不同屏幕的浏览器下，就有相应的大小，以保持不同屏幕下的不同缩放尺寸。


> 常见手机屏幕尺寸大全：https://strerr.com/screen.html




## 三、通用使用步骤

**1、设置各种屏幕尺寸下的 HTML 的字号大小。** 

```css
@media screen and (device-width: 320px) {
  html {
    font-size: 16px;
  }
}
@media screen and (device-width: 360px) {
  html {
    font-size: 18px;
  }
}
@media screen and (device-width: 375px) {
  html {
    font-size: 18.75px;
  }
}
@media screen and (device-width: 414px) {
  html {
    font-size: 20.07px;
  }
}
```

**2、将 UI 下各个元素，不论是元素还是边距，边框等值全部除以每一份的大小，单位为 rem 即可得到在不同屏幕下的不同缩放大小。**

比如：640px 的 UI，设置为：`元素等/32 rem;`

750px 的 UI，设置为：`元素等/37.5 rem;`



示例：

```less
// UI稿件为640px
.item{
    height:218/32rem;
    border: 3/32rem dashed #dedede;
    background-color: #fff;
    padding-top:36/32rem;
    font-size: 104/32rem;
    box-sizing: border-box;
    a{
      color: #aeaeae;
      text-align: center;
    }
    span{
      font-size: 26/32rem;
      display: block;
      margin-top:16/32rem;
    }
}
```
>  Tips：把 rem 理解成`份`  的意思更好理解，你在640px上占多少份，在实际的屏幕上就占多少份。

## 移动端适配补充（2021-07-22）

我们可以看到，我们在书写的时候每次这样除以一个32或者37.5还挺难看的，而且css还不能使用，在less或者sass这种css处理器上才可以使用除号：

```less
{
    height:218/32rem;
    border: 3/32rem dashed #dedede;
    padding-top:36/32rem;
    font-size: 104/32rem;
}
```

```less
{
    height:218/37.5rem;
    border: 3/37.5rem dashed #dedede;
    padding-top:36/37.5rem;
    font-size: 104/37.5rem;
}
```



所以，为了兼容css，也为了好看，我们就不要分成20份了，我们可以把640px的UI分成`6.4`份，把750px的UI分成`7.5`份，这样每一份的大小都是`100px`。

以后就不需要写成`36/37.5rem;` 的形式，而是 `0.36rem` 的形式，是不是好看多了。

但是要注意，媒体查询需要变一下：
```css
// 对于640px的UI
@media screen and (device-width: 320px) {
  html {
    font-size: 50px;  // 320÷6.4
  }
}
@media screen and (device-width: 360px) {
  html {
    font-size: 56.25px; // 360÷6.4
  }
}

// 对于750px的UI
@media screen and (device-width: 320px) {
  html {
    font-size: 42.67px;  // 320÷7.5
  }
}
@media screen and (device-width: 360px) {
  html {
    font-size: 48px; // 360÷7.5
  }
}
```


**继续改进：**

从上文看出，为了适配320px，360px，375px等等尺寸的屏幕，我们需要写多个媒体查询，而且还没有做到连续，只是挑选出了几个经典的尺寸进行媒体查询设置html的font-size大小，如果出现一个350px的，我们就只能使用320px的适配了。

于是，我们需要通过js动态设置不同尺寸html的font-size大小。

我们已750px的UI为例，把它分成7.5份，每一份100（100的话是为了好算）。

如果UI中有一个300px的元素的话，我们在320px的设备中应该显示多少呢？



**计算过程：**

- 300px在UI中占（300/100=3）份
- 那么在320px中也应该占3份，320px因为也是分成7.5份的，那么就应该是（320/7.5）× 3 = 128px



**写出rem形式的通用公式就是：**

- 设置 html 的 font-size： `deviceWidth/7.5`

- 在使用的时候在UI上是300px占了3份，所以320px也占3份就是：`3rem`，类比在UI上是320px就是`3.2rem` 。。。



所以，我们发现只要设置好了html的font-size后，我们只需要在使用的时候把图形**在原UI尺寸的基础上除以100，然后加上rem即可**。



那么回到上面的问题，**如何使用js动态设置 html的font-size？**

在脚本开始的时候，获取设备宽度`deviceWidth`，然后设置html的font-size大小。这样就不必写很多媒体查询了。

```js
<script type="text/javascript">
    (function() {
        var deviceWidth = document.documentElement.clientWidth;
        deviceWidth = deviceWidth < 320 ? 320 : deviceWidth > 640 ? 640 : deviceWidth;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'; // 设计稿是750px
    	// document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px'; // 设计稿是640px
    })();
</script>

```

## 使用viewport代替rem

![image](https://github.com/Daotin/Web/assets/23518990/31ab48fc-c4ad-41be-b92e-b18d0a018f64)

截止到2024年5月，viewport的支持率早已经很好了，没必要采用rem的方式了。

而且在[flexible.js](https://github.com/amfe/lib-flexible)官网也提到：由于viewport单位得到众多浏览器的兼容，lib-flexible这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用viewport来替代此方。

vh、vw方案即将视觉视口宽度 window.innerWidth和视觉视口高度 window.innerHeight 等分为 100 份。

上面的 flexible方案就是模仿这种方案，因为早些时候 vw还没有得到很好的兼容。

vw(Viewport's width)： 1vw等于视觉视口的 1%
vh(Viewport's height) : 1vh 为视觉视口高度的 1%
vmin : vw 和 vh 中的较小值
vmax : 选取 vw 和 vh 中的较大值

如果视觉视口为 375px，那么 1vw=3.75px，这时 UI给定一个元素的宽为 75px（设备独立像素），我们只需要将它设置为 75/3.75=20vw。

这里的比例关系我们也不用自己换算，我们可以使用 PostCSS的 `postcss-px-to-viewport` 插件帮我们完成这个过程。写代码时，我们只需要根据 UI给的设计图写 px 单位即可，插件会自动将px转换成vh，vw的形式。

1、安装：
```
npm install postcss-px-to-viewport --save-dev
```

2、配置 postcss.config.js
```
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false     // 允许在媒体查询中转换`px`
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    }
  }
}
```

## 如果在uniapp开发小程序，使用rpx

链接：https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D

下面对 rpx 详细说明：

设计师在提供设计图时，一般只提供一个分辨率的图。

严格按设计图标注的 px 做开发，在不同宽度的手机上界面很容易变形。

而且主要是宽度变形。高度一般因为有滚动条，不容易出问题。由此，引发了较强的动态宽度单位需求。

微信小程序设计了 rpx 解决这个问题。uni-app 在 App 端、H5 端都支持了 rpx，并且可以配置不同屏幕宽度的计算方式，具体参考：rpx 计算配置。

rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。uni-app 规定屏幕基准宽度 750rpx。

开发者可以通过设计稿基准宽度计算页面元素 rpx 值，设计稿 1px 与框架样式 1rpx 转换公式如下：

```
设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx
```

换言之，页面元素宽度在 uni-app 中的宽度计算公式：

```
750 * 元素在设计稿中的宽度 / 设计稿基准宽度
```

举例说明：

- 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：`750 * 100 / 750`，结果为：100rpx。
- 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：`750 * 100 / 640`，结果为：117rpx。
- 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：`750 * 200 / 375`，结果为：400rpx。

也就是，如何设计稿为750px，那么其中一个元素是100px，则在代码中写100rpx即可。

**参考链接：**
- https://juejin.cn/post/6844903721697017864
- https://www.manster.me/?p=311
