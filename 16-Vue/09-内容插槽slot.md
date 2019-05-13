举例示例内容链接到上一篇 **Vue的组件**

---

<!-- TOC -->

- [一、slot内容插槽](#一slot内容插槽)
    - [1、slot的基本使用](#1slot的基本使用)
    - [2、具名slot](#2具名slot)
    - [3、slot-scope](#3slot-scope)

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

现在有一个问题就是父组件想将不同的标签插入到不同的slot中怎么办？原来的slot会把父组件在子组件插入的所有内容全部替换slot，没有区分。所以为了区分，我们给slot价格名字。

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



### 3、slot-scope

**使用场景：父组件使用子组件，需要使用插槽的时候，而插槽又需要用到子组件的数据，这时候会使用slot-scope。**

**也就是子组件向子组件里面插槽的内容传递数据。**

这时候，父组件可以获取到Box组件中的数据，`<Box>{{Box的data中的属性}}</Box>` ，但是如果这个数据写在里面的内容上就获取不到了。比如获取count属性，如下面这样：

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
                <h3 slot='h' slot-scope='BoxData'>头部{{BoxData.dcount}}</h3>
                <p>中部</p>
                <button slot='f'>底部</button>
            </Box>
        </div>
    `,
    //...
    components: { Header, A, B, Box }
}
```

上面的`<h3 slot='h' slot-scope='BoxData'>头部{{BoxData.dcount}}</h3>` 就从子组件的内容上获得子组件的数据。



