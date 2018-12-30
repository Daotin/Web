## require.js使用教程

AMD（Asynchronous Module Definition(异步模块定义)）

官网：https://github.com/amdjs/amdjs-api/wiki/AMD

特点：专门用于浏览器端的一种模块化规范，模块的加载是异步的。



### 基础语法

**定义暴露模块：**

```js
//定义没有依赖的模块
define(function(){
	return 模块
})

//定义有依赖的模块
// 这里的m1,m2 形参，分别对应传入过来的依赖module1,module2
define(['module1', 'module2'], function(m1, m2){
	return 模块
})
```



**引入使用模块**

```js
require(['module1', 'module2'], function(m1, m2){
	使用m1/m2
})
```


相关参考资料：

http://www.requirejs.cn/

http://www.ruanyifeng.com/blog/2012/11/require_js.html







### 使用步骤

1、下载require.js, 并引入
* 官网: http://www.requirejs.cn/
* github : https://github.com/requirejs/requirejs
* 将require.js导入项目: `js/libs/require.js `




2、创建项目结构

```
|-js
  |-libs
    |-require.js
  |-modules
    |-alerter.js
    |-dataService.js
  |-main.js
|-index.html
```



3、定义require.js的模块代码

* dataService.js（没有依赖的js模块）
 ```js
  define(function () {
    let msg = 'atguigu.com'

    function getMsg() {
      return msg.toUpperCase()
    }

    return {getMsg}
  })
 ```
* alerter.js（依赖dataService.js 和 jquery 的 js 模块）
 ```js
  define(['dataService', 'jquery'], function (dataService, $) {
    let name = 'Tom2'

    function showMsg() {
      $('body').css('background', 'gray')
      alert(dataService.getMsg() + ', ' + name)
    }

    return {showMsg}
  })
 ```



4、应用主(入口)js: main.js

 ```js
  (function () {
    //配置
    require.config({
      //基本路径
      baseUrl: "js/",
      //模块标识名与模块路径映射
      // 模块依赖名的路径
      paths: {
        "alerter": "modules/alerter",
        "dataService": "modules/dataService",
        'jquery': 'libs/jquery-1.10.1'
      }
    })
    //引入使用模块
    require( ['alerter'], function(alerter) {
      alerter.showMsg()
    })
  })()
 ```

> 注意：
>
> 在引入 jQuery 模块的时候，jQuery 的依赖名称不能使用大写，只能是小写 `jquery` ，在jQuery内部是支持AMD语法的，在AMD中使用jQuery 的时候，它直接定义了一个模块的名字叫`jquery` ，这个在 jQuery.js 文件 的最后有说明。



5、页面使用模块:

```html
<script data-main="js/main" src="js/libs/require.js"></script>
```

