## 一、Vue.js 概述

### 1、什么是Vue.js

Vue.js 是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App， Vue语法也是可以用于进行手机App开发的，需要借助于Weex）

Vue.js 是前端的**主流框架之一**，和Angular.js、React.js 一起，并成为前端三大主流框架！

Vue.js 是一套构建用户界面的框架，**只关注视图层**，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）。

在Vue中，一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑；



### 2、框架和库的区别

**框架**：是一套完整的解决方案；对项目的侵入性较大，项目如果需要更换框架，则需要重新架构整个项目。

**库（插件）**：提供某一个小功能，对项目的侵入性较小，如果某个库无法完成某些需求，可以很容易切换到其它库实现需求。（比如从 jQuery 切换到 Zepto 等）



### 3、MVC 与 MVVM 区别与联系

MVC 是后端的分层开发概念；

**M 为数据层，V 视图层，C 逻辑层。**

MVVM是前端视图层的概念，主要关注于 视图层分离，也就是说：MVVM把前端的视图层，分为了 三部分 Model, View , VM ViewModel。

**其中 VM 是中间层，负责协调 V  层 和 M 层，V 层即视图层（对应的就是DOM元素），就是我们的网页 html 结构，M 层就是网页里面的数据（对应的就是JavaScript对象）。**



下图为 MVC 和 MVVM 的联系图示：

![](./images/1.png)



### 4、虚拟DOM

当你用传统的源生api或jQuery去操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程。

比如当你在一次操作时，需要更新10个DOM节点，理想状态是一次性构建完DOM树，再执行后续操作。但浏览器没这么智能，收到第一个更新DOM请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程。显然例如计算DOM节点的坐标值等都是白白浪费性能，可能这次计算完，紧接着的下一个DOM更新请求，这个节点的坐标值就变了，前面的一次计算是无用功。

真实的DOM节点，哪怕一个最简单的div，也会有特别多的属性。

![](./images/25.png)



虚拟DOM就是为了解决这个浏览器性能问题而被设计出来的。虚拟DOM和真实DOM之间会有一个映射的关系。

例如前面的例子，假如一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地的一个js对象中，最终将这个js对象一次性渲染到DOM树上，通知浏览器去执行绘制工作，这样可以避免大量的无谓的计算量。



## 二、Vue.js 基本结构

Vue.js 的基本结构主要分三块：

**1、导入 Vue 的包；**

**2、body 中的设置一个被 vue 控制的区域（元素）；**

**3、在 script 中 new 一个 vue 实例，参数为一个对象，对象中一般有三个元素为 `el`，`data`，`methods`**

el 则关联 body 中被 vue 控制的元素的 id 或 类名。

data 则存放页面的数据；

methods 为页面事件对象集合。



示例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <!-- 1. 导入Vue的包 -->
  <script src="./lib/vue-2.4.0.js"></script>
</head>

<body>
  <!-- 将来 new 的Vue实例，会控制这个 元素中的所有内容 -->
  <!-- Vue 实例所控制的这个元素区域，就是我们的 V  -->
  <div id="app">
    <p>{{ info }}</p>
  </div>

  <script>
    // 2. 创建一个Vue的实例
    // 当我们导入包之后，在浏览器的内存中，就多了一个 Vue 构造函数
    //  注意：我们 new 出来的这个 vm 对象，就是我们 MVVM中的 VM调度者
    var vm = new Vue({
      el: '#app',  // 表示，当前我们 new 的这个 Vue 实例，要控制页面上的哪个区域
      // 这里的 data 就是 MVVM中的 M，专门用来保存 每个页面的数据的
      data: { // data 属性中，存放的是 el 中要用到的数据
        info: '欢迎学习Vue'; // 通过 Vue 提供的指令，很方便的就能把数据渲染到页面上，程序员不再手动操作DOM元素了【前端的Vue之类的框架，不提倡我们去手动操作DOM元素了】
      }
    })
  </script>
</body>

</html>
```

>   {{ info }} ：在 html 中可以直接使用 **双重大括号** 的方式使用 data 中的数据。





## 三、Vue 指令

### 1、插值表达式

插值表达式就是以**双重大括号** ，类似 ` {{ info }}`  的形式插入到 html 代码中。

> 1、插值表达式还可以进行简单的运算（比如加减乘除等），但是不能完全放置js代码。
>
> 2、插值表达式只能放在标签之间，而不能放在标签内部。

使用 `v-once` 也能执行一次性地插值，但是当数据改变时，插值处的内容不会更新。

```html
<span v-once>这个将不会改变: {{ info }}</span>
```



### 2、v-cloak

在 使用 `{{ info }}` 的方式插入数据的时候，如果网速特别慢的话，  `{{ info }}`  所代表的值不会立即显示出来，而会显示  {{ info }} 这个字符串本身，怎么解决这个问题呢？

**使用 v-cloak 和 CSS 表达式结合，能够解决插值表达式闪烁的问题，这样会在网络未加载完时，不显示字符串本身。**

示例：

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>
...
<p v-cloak> {{ info }} </p>
```



### 3、v-text

默认 v-text 是没有闪烁问题的，但是 v-text 会覆盖元素中原本的内容，而 v-cloak 只会替换插值表达式，不会把 整个元素的内容清空。

```html
<span v-text="info"></span>
```



### 4、v-html 

**v-text 只是插入的纯文本格式内容，而 v-html 可以插入为 html 标签的代码，并解析出来。**

```html
<span v-html="info"></span>
...
data: {
  info: '<h1>哈哈，我是一个大大的H1， 我大，我骄傲</h1>'
},
```

> 1、v-html会将整个标签替换为info 的内容。
>
> 2、你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。



### 5、v-bind

v-bind 是 Vue中，提供的用于**绑定属性**的指令。**将一个属性的值变成动态值。**

>   注意： `v-bind:` 指令可以被简写为` : `

```html
<input type="button" value="按钮" v-bind:title="mytitle + '123'">
...
data: {
  mytitle: '这是一个自己定义的title'
},
```

> title 里面的内容就不是字符串了，而是会将 data 中的变量进行替换得到一个字符串整体。



### 温馨提示：

上面的例子中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。如下都是可以的：

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

>  注意：每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

```js
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```



### 6、v-on

v-on ：给某个元素绑定事件监听函数。注意，函数必须封装在methods内。

>   注意：` v-on:` 指令可以被简写为`@`

```html
<input type="button" value="按钮" :title="mytitle + '123'" v-on:click="show">
...
data: {
  mytitle: '这是一个自己定义的title'
},
methods: { // 这个 methods属性中定义了当前Vue实例所有可用的方法
  show: function () {
  	alert('Hello')
  }
}
```

在点击按钮的时候，会自动调用 methods 中的 show 方法。



**案例：字体滚动播放**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./lib/vue-2.4.0.js"></script>
</head>

<body>

    <div id="box">
        <input type="button" value="摇起来" id="btn1" @click="move">
        <input type="button" value="停下来" id="btn2" @click="stop">
        <h2 v-text="info"></h2>
    </div>

    <script>
        var vm = new Vue({
            el: "#box",
            data: {
                info: "落霞与孤鹜齐飞，秋水共长天一色。",
                timeId: null
            },
            methods: {
                move: function () {
                    if (this.timeId != null) {
                        clearInterval(this.timeId);
                    }

                    var that = this;
                    this.timeId = setInterval(function () {
                        var start = that.info.substring(0, 1);
                        var end = that.info.substring(1);
                        that.info = end + start;
                    }, 200);
                },
                stop: function () {
                    clearInterval(this.timeId);
                }
            }
        });
    </script>

</body>

</html>
```

>   注意：
>
>   1、在 VM 对象实例中，如果想要获取 data 上的数据，或者 想要调用 methods 中的 方法，必须通过 `this.数据属性名`  或  `this.方法名` 来进行访问，这里的 this，就表示 我们 new 出来的  VM 实例对象。
>
>   2、VM实例，会自动监听自己身上 data 中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data 上同步到页面中去；【好处：程序员只需要关心数据，不需要考虑如何重新渲染DOM页面】

![](./images/01.gif)



### 动态参数【2.6.0 新增内容】

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<a v-bind:[attributeName]="url"> ... </a>
```

现在 attributeName 也是动态的了。如果 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

同样地，当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus。

> 注意：
>
> 1、如果动态参数attributeName 预期会求出一个字符串，异常情况下值为 null。**这个特殊的 null 值可以被显性地用于移除绑定。**任何其它非字符串类型的值都将会触发一个警告。
>
> 2、动态参数中不能有**空格或引号**，你可以使用计算属性替代这种复杂表达式。
>
> 如：`<a v-bind:['foo' + bar]="value"> ... </a>`
>
> 3、如果在DOM中使用动态参数的话，需要留意浏览器会把特性名全部强制转为小写：
>
> `<a v-bind:[someAttr]="value"> ... </a>` ，在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`





### 7、v-model

v-bind 只能实现数据的单向绑定，从 M 自动绑定到 V（即**修改 data 的数据，自动同步到 html**）， 无法实现数据的双向绑定。

使用  v-model 指令，可以实现 表单元素和 Model 中数据的双向数据绑定（**不仅可以修改 data 的数据，自动同步到 html，也可以修改 html 的代码，同步到 data 数据**）。

>   注意： v-model 只能运用在 **表单元素**中。



示例：

```html
<input type="text" style="width:100%;" v-model="info">
...
data: {
	info: 'hello vue.'
},
```



**案例：简单的计算器**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="./lib/vue-2.4.0.js"></script>
</head>

<body>
    <div id="app">
        <input type="text" v-model="n1">

        <select v-model="opt">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>

        <input type="text" v-model="n2">
        <input type="button" value="=" @click="calc">
        <input type="text" v-model="result">
    </div>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                n1: 0,
                n2: 0,
                result: 0,
                opt: '+'
            },
            methods: {
                calc: function() { // 计算器算数的方法  
                    // 逻辑：
                    switch (this.opt) {
                        case '+':
                            this.result = parseFloat(this.n1) + parseFloat(this.n2)
                            break;
                        case '-':
                            this.result = parseFloat(this.n1) - parseFloat(this.n2)
                            break;
                        case '*':
                            this.result = parseFloat(this.n1) * parseFloat(this.n2)
                            break;
                        case '/':
                            this.result = parseFloat(this.n1) / parseFloat(this.n2)
                            break;
                    }
                }
            }
        });
    </script>
</body>

</html>
```



### 8、v-for

**8.1、v-for 循环普通数组**

我们之前如果要循环赋值给 p 标签 data中 list=[1,2,3,4,5,6]; 数组的话，会这样写：

```html
<body>
    <div id="app">
        <p>{{list[0]}}</p>
        <p>{{list[1]}}</p>
        <p>{{list[2]}}</p>
        <p>{{list[3]}}</p>
        <p>{{list[4]}}</p>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [1, 2, 3, 4, 5, 6]
            },
            methods: {}
        });
    </script>
</body>
```

这样的话，就会很繁琐。而 v-for 会提供循环遍历 list 数组来给 p 标签赋值。如下：

```html
<body>
    <div id="app">
        <p v-for="(item, i) in list">索引：{{i}} --- 项：{{item}}</p>
        <!-- 索引：0 --- 项：1
          	 索引：1 --- 项：2
          	 索引：2 --- 项：3
          	 索引：3 --- 项：4
          	 索引：4 --- 项：5
          	 索引：5 --- 项：6 -->
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [1, 2, 3, 4, 5, 6]
            },
            methods: {}
        });
    </script>
</body>
```



**8.2、v-for 循环对象数组**

```html
<body>
  <div id="app">
    <p v-for="(user, i) in list">Id：{{ user.id }} --- 名字：{{ user.name }} --- 索引：{{i}}</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        list: [
          { id: 1, name: 'zs1' },
          { id: 2, name: 'zs2' },
          { id: 3, name: 'zs3' },
          { id: 4, name: 'zs4' }
        ]
      },
      methods: {}
    });
  </script>
</body>
```



**8.3、v-for 循环对象**

```html
<body>
  <div id="app">
    <!-- 注意：在遍历对象身上的键值对的时候， 除了 有  val  key  ,在第三个位置还有 一个 索引  -->
    <p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        user: {
          id: 1,
          name: 'Tony Stark',
          gender: '男'
        }
      },
      methods: {}
    });
  </script>
</body>
```



**8.4、v-for 循环数字**

```html
<body>
  <div id="app">
    <!-- in 后面我们放过普通数组，对象数组，对象，还可以放数字 -->
    <p v-for="count in 10">这是第 {{ count }} 次循环</p>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
</body>
```

>   注意：如果使用 v-for 迭代数字的话，前面的 count 值从 1 开始。



**8.5、v-for 循环 key 属性**

key 属性可以使得每一遍历的项是唯一的。

```html
<body>
  <div id="app">

    <div>
      <label>Id:
        <input type="text" v-model="id">
      </label>

      <label>Name:
        <input type="text" v-model="name">
      </label>

      <input type="button" value="添加" @click="add">
    </div>

    <!-- 注意： v-for 循环的时候，key 属性只能使用 number或者string -->
    <!-- 注意： key 在使用的时候，必须使用 v-bind 属性绑定的形式，指定 key 的值 -->
    <!-- 在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果 v-for 有问题，必须在使用 v-for 的同时，指定 唯一的 字符串/数字 类型 :key 值 -->
    <p v-for="item in list" :key="item.id">
      <input type="checkbox">{{item.id}} --- {{item.name}}
    </p>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        id: '',
        name: '',
        list: [
          { id: 1, name: '李斯' },
          { id: 2, name: '嬴政' },
          { id: 3, name: '赵高' },
          { id: 4, name: '韩非' },
          { id: 5, name: '荀子' }
        ]
      },
      methods: {
        add() { // 添加方法
          this.list.unshift({ id: this.id, name: this.name })
        }
      }
    });
  </script>
</body>
```

![](./images/02.gif)



> *added in 20190610*
>
> 你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：
>
> `<div v-for="item of items"></div>`





### 9、v-if/v-show

v-if 和 v-show 都可以控制元素的显示与否。但是实现原理不同。

v-if：决定某些元素是否存在 (加载性能更高,某个元素不需要被频繁切换时,则应该使用v-if)

v-show：决定某些元素是否显示  (操作性能更高,如果某个元素需要被频繁切换,则应该使用v-show)

> v-if：每次都会重新删除或创建元素。
>
> v-show ： 每次不会重新进行DOM的删除和创建操作，只是切换了元素的 display:none 样式。

所以，如果元素涉及到频繁的切换，最好不要使用 v-if, 而是推荐使用 v-show；

如果元素可能永远也不会被显示出来被用户看到，则推荐使用 v-if。

```html
<h3 v-if="true">这是用v-if控制的元素</h3>
<h3 v-show="true">这是用v-show控制的元素</h3>
```



> 有了v-if就有v-else-if和v-else

v-if和v-show指令中除了可以放简单的值外，还可以**放表达式**：

```html
<h3 v-if="age < 18">这是用v-if控制的元素</h3>    <!--age是data中的一个属性-->
<h3 v-else-if="age < 28">这是用v-if控制的元素</h3>    
<h3 v-else>这是用v-if控制的元素</h3> <!--v-else不用写条件-->
```

> 注意：v-if和v-else-if和v-else之间，不要加任何其他元素，否则会报错。



#### 用key管理可被复用的元素(来自官方文档)

*added in 20190610*  

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

现在，每次切换时，输入框都将被重新渲染。但是，label 元素仍然会被高效地复用，因为它们没有添加 key 属性。



#### 【重要】避免 v-if 和 v-for 用在同一个元素上(来自官方文档)

*added in 20190610*

主要原因：

> v-for 比 v-if 具有更高的优先级。

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。

- 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)。

详解以上两点：

1、当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以这个模板：

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

将会进行如下计算：

```js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

因此，通过将其更换为在如下的一个计算属性上遍历：

```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

我们将会获得如下好处：

- 过滤后的列表只会在 users 数组发生相关变化时才被重新运算，过滤更高效。
- 使用 v-for="user in activeUsers" 之后，我们在渲染的时候只遍历活跃用户，渲染更高效。

2、第二个场景我们将 shouldShowUsers 放到ul上：

```html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

更改为：

```html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

通过将 v-if 移动到容器元素，我们不会再对列表中的每个用户检查 shouldShowUsers。取而代之的是，我们只检查它一次，且不会在 shouldShowUsers 为否的时候运算 v-for。






## 四、Vue中的样式

### 1、动态class（使用v-bind绑定）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="./lib/vue-2.4.0.js"></script>
    <style>
        .red {
            color: red;
        }

        .thin {
            font-weight: 200;
        }

        .italic {
            font-style: italic;
        }

        .active {
            letter-spacing: 0.5em;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- <h1 class="red thin">这是一个很大很大的H1，大到你无法想象！！！</h1> -->

        <!-- 第一种使用方式，直接传递一个数组，注意： 这里的 class 需要使用  v-bind 做数据绑定 -->
        <h1 :class="['thin', 'italic']">这是一个很大很大的H1</h1>

        <!-- 在数组中使用三元表达式 -->
        <h1 :class="['thin', 'italic', flag?'active':'']">这是一个很大很大的H1</h1>

        <!-- 在数组中使用对象来代替三元表达式，提高代码的可读性 -->
        <h1 :class="['thin', 'italic', {active:flag} ]">这是一个很大很大的H1</h1>

        <!-- 在为 class 使用 v-bind 绑定 对象的时候，对象的属性是类名，由于 对象的属性可带引号，也可不带引号，所以 这里我没写引号；  属性的值 是一个标识符 -->
        <h1 :class="classObj">这是一个很大很大的H1</h1>


    </div>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                flag: true,
                classObj: {
                    red: true,
                    thin: true,
                    italic: false,
                    active: false
                }
            },
            methods: {}
        });
    </script>
</body>

</html>
```

>   注意：
>
>   1、class 样式需要使用 v-bind 绑定。
>
>   2、class 类样式可以是数组和对象集合。
>
>   **3、动态class可以和静态class并存，但是静态class不能和静态class并存，动态class也不能和动态class并存。**



**标签页案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        a {
            padding: 5px 10px;
            display: inline-block;
        }

        .active {
            color: #fff;
            background-color: salmon;
        }
    </style>
</head>

<body>
    <div id="app">
        <!--根据item.active老确定active样式是否显示-->
        <a href="javascript:;" :class="{active: item.active}" v-for="(item,i) in tabs" @click="changeTab(i)">{{item.title}}</a>
        <ul>
            <li v-for="(item,i) in tabs" v-show="item.active">
                <h2>{{item.content}}</h2>
            </li>
        </ul>
    </div>
</body>
<!-- 引入在线vue -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            tabs: [
                { title: 'tab1', content: '内容1', active: true },
                { title: 'tab2', content: '内容2', active: false },
                { title: 'tab3', content: '内容3', active: false }
            ]
        },
        methods: {
            changeTab(i) {
                let newTabs = this.tabs.map(item => {
                    item.active = false;
                    return item;
                });
                // console.log(newTabs);
                newTabs[i].active = true;
                this.tabs = newTabs;
            }
        }
    });
</script>

</html>
```



### class属性对象与三元运算写法

*added in 20190610*

下面两种写法是等价的：

```html
<!-- 留言 -->
<div class="m-leave-msg" :class="showOther === 2 ? 'show' : ''">
    <leavemsg :ak="ak" @back-main="toMain"></leavemsg>
</div>
<!-- 满意度 -->
<div class="m-leave-msg" :class="showOther === 3 ? 'show' : ''">
    <Satisfaction :sessionId="sessionId" @back-main="toMain"></Satisfaction>
</div>
```

等价于：

```html
<!-- 留言 -->
<div class="m-leave-msg" :class="{show:showOther === 2}">
    <leavemsg :ak="ak" @back-main="toMain"></leavemsg>
</div>
<!-- 满意度 -->
<div class="m-leave-msg" :class="{show:showOther === 3}">
    <Satisfaction :sessionId="sessionId" @back-main="toMain"></Satisfaction>
</div>
```



在组件中使用class

*added in 20190610*

如果你在组件上使用了class属性，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

例如，如果你声明了这个组件：

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些 class：

```html
<my-component class="baz boo"></my-component>
```

则 HTML 会被渲染为：

```html
<p class="foo bar baz boo">Hi</p>
```

而不会覆盖之前的class属性。



### 2、动态style

可以是对象，也可以是对象数组。

直接对象的形式：

```html
<p :style="{ 'max-width':maxWidth+'px' }></p>
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<body>
    <div id="app">
        <!-- 对象就是无序键值对的集合 -->
        <h1 :style="styleObj1">这是一个h1</h1>
        <h1 :style="[ styleObj1, styleObj2 ]">这是一个h1</h1>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                styleObj1: {
                    color: 'red',
                    'font-weight': 200
                },
                styleObj2: {
                    'font-style': 'italic'
                }
            },
            methods: {}
        });
    </script>
</body>
```

>   注意：要绑定到 style 样式。



