举例示例内容链接到上一篇 **Vue的组件**

---

<!-- TOC -->

- [一、slot内容插槽](#一slot内容插槽)
    - [1、slot的基本使用](#1slot的基本使用)
    - [2、具名slot](#2具名slot)
    - [3、slot-scope](#3slot-scope)
    - [补充](#3补充)

<!-- /TOC -->

## 一、slot内容插槽

### 1、slot的基本使用

现在我们在component文件夹新建一个组件Box.js

```js
// Box.js
export let Box = {
    template: require('./Box.html')
}
```

```html
<div>
    <h4>我是Box组件</h4>
</div>
```



这时候我们在Home中调用Box组件。

```js
import { Header } from '../components/Header'
import { A } from '../components/A'
import { B } from '../components/B'
import { Box } from '../components/Box'

export let Home = {
    template: `
        <div>
            <Header :title="title"></Header>
            <h1>首页</h1>
            <A @countChange="change"></A>
            <B :cCount="count"></B>
            <Box></Box>
        </div>
    `,
    data() {
        return {
            title: '首页的title',
            count: 0
        }
    },
    methods: {
        change(count) {
            console.log(count);
            this.count = count;
        }
    },
    components: { Header, A, B, Box }
}
```

这时候如何我们往`<Box></Box>`中插入一个按钮代码会怎么？会显示按钮吗？

```html
<Box>
	<button>我是按钮</button>
</Box>
```

答案是不会显示的。但是我们就想在子组件中插入其他标签怎么办呢？

这时候就用到了vue的内容插槽slot。



我们在Box.html代码里面写上：

```html
<div>
    <h4>我是Box组件</h4>
    <slot />
</div>
```

`<slot />` 代码位置就会被按钮标签代替。

> **slot的作用是：父组件在调用子组件的时候，往子组件中插入内容会出现在子组件slot标签的位置来替换slot标签，就相当于在子组件中形成了一个内容插槽，里面的内容可以由父组件进行选择性填充。**



### 2、具名slot

> 注意：本章节 `具名slot` 方法在 2.6.0 后已废弃，新的使用具名插槽方法参看《补充》章节。

现在有一个问题就是父组件想将不同的标签插入到不同的slot中怎么办？

原来的slot会把父组件在子组件插入的所有内容全部替换slot，没有区分。所以为了区分，我们给slot加个名字。

我们想在header，main和footer分别插入不同的内容。

```html
<!--Box.html-->
<div>
    <h4>我是Box组件</h4>

    <header>
        <slot name="h" />
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <slot name="f" />
    </footer>
</div>
```

> 当子组件中存在多个slot时，我们可以给不同的slot加上name属性。
>
> 在父级内，给不同的内容添加上slot属性，设置对应的名字，即可将内容显示在子组件的对应位置。

父组件的template这样写，使用`slot='名称'`的方式插入到子组件name为‘名称’的地方。

没有名称的就插入到没有名称的地方。

```js
// Home.js

// ...
export let Home = {
    template: `
        <div>
            <Header :title="title"></Header>
            <h1>首页</h1>
            <A @countChange="change"></A>
            <B :cCount="count"></B>

            <Box>
                <h3 slot='h'>头部</h3>
                <p>中部</p>
                <button slot='f'>底部</button>
            </Box>
        </div>
    `,
    //...
    components: { Header, A, B, Box }
}
```



*(added in 20190715)*

###  编译作用域

当你想在一个插槽中使用数据时，例如：

```html
<Box url="/app">
    <h3>头部{{ user.name }}</h3>
</Box>
```

该插槽跟 Box 一样可以访问相同的实例属性 (父组件的数据)，而**不能**访问 `<Box>` 的里面的数据。例如 `url` 是访问不到的：

也就是说，**子组件的插槽和子组件本身都可以访问父组件的数据，但是子组件的插槽访问不到子组件本身的数据。**

如何让子组件中的插槽访问到子组件本身的数据？

往下看：



### 3、作用域插槽slot-scope

> 注意：自 2.6.0 起有所更新。 `slot-scope` 已废弃，更新内容见《补充》章节。

**使用场景：子组件中的插槽需要用到子组件的数据，这时候会使用slot-scope。也就是子组件向子组件里面插槽的内容传递数据。**

这时候，父组件可以获取到Box组件中的数据，`<Box>{ {Box的data中的属性} }</Box>` ，但是如果这个数据写在里面的内容上就获取不到了。比如获取count属性，如下面这样：

```js
// Home.js

// ...
export let Home = {
    template: `
        <div>
            <Header :title="title"></Header>
            <h1>首页</h1>
            <A @countChange="change"></A>
            <B :cCount="count"></B>

            <Box>
                <h3 slot='h'>头部{{count}}</h3>
                <p>中部</p>
                <button slot='f'>底部</button>
            </Box>
        </div>
    `,
    //...
    components: { Header, A, B, Box }
}
```

看起来h3在Box内部，其实不然。那么怎么在Box中间的内容中获取到子组件的数据呢？

> 在子组件的slot标签上使用自定义属性的方式传递数据

```html
<div>
    <h4>我是Box组件</h4>
    <header>
        <slot name="h" :dcount="count" />
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <slot name="f" />
    </footer>
</div>
```

然后在父组件的template中：

```js
//...

export let Home = {
    template: `
        <div>
            <Header :title="title"></Header>
            <h1>首页</h1>
            <A @countChange="change"></A>
            <B :cCount="count"></B>
            <Box>
                <h3 slot='h' slot-scope='BoxData'>头部{ {BoxData.dcount}}</h3>
                <p>中部</p>
                <button slot='f'>底部</button>
            </Box>
        </div>
    `,
    //...
    components: { Header, A, B, Box }
}
```

上面的`<h3 slot='h' slot-scope='BoxData'>头部{ {BoxData.dcount}}</h3>` 就从子组件的内容上获得子组件的数据。



*(added in 20190715)*

### 补充

> 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 `v-slot` 指令)。它取代了 `slot` 和 `slot-scope` 这两个目前已被废弃但未被移除且仍在[文档中](https://cn.vuejs.org/v2/guide/components-slots.html#废弃了的语法)的特性。



#### 具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的 `<base-layout>` 组件：

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

对于这样的情况，`<slot>` 元素有一个特殊的特性：`name`。这个特性可以用来定义额外的插槽：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

> 一个不带 `name` 的 `<slot>` 出口会带有隐含的名字`default`。

在向具名插槽提供内容的时候，我们可以在元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

> Tips：已废弃的方案采用的是 `slot="header"` 的方式。

现在元素中的所有内容都将会被传入相应的插槽。

任何没有被包裹在带有 `v-slot` 元素的中的内容都会被视为`默认插槽`的内容。

然而，如果你希望更明确一些，仍然可以在元素中包裹`默认插槽`的内容：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```



#### 作用域插槽

> 以下内容来自官网文档：

当你想在一个插槽中使用数据时，例如：

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

该插槽跟当前模板的其它地方一样可以访问data的数据，而不能访问子组件 `<navigation-link>` 的作用域。例如 `url` 是访问不到的：

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
  _传递给_ <navigation-link> 的而不是
  在 <navigation-link> 组件*内部*定义的。
  -->
</navigation-link>
```

作为一条规则，请记住：

> **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

