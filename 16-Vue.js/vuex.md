使用示例还是 **vue的组件**

---



## 一、Vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态（意思就是数据），并以相应的规则保证状态以一种可预测的方式发生变化。

简单来说，vuex就是用来集中管理组件的数据的。



## 二、Vuex使用场合

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 store 模式就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：

> Flux 架构就像眼镜：您自会知道什么时候需要它。





### 1、store模式



安装vuex

```
npm i vuex -S
```



我们在原有项目下新建一个store.js管理Home，Goods，Users组件的数据。

其中state属性就是保存Home，Goods，Users组件所有的数据。

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title: '首页',
        goodsList: [
            { goodsName: '苹果', price: 20 },
            { goodsName: '橘子', price: 22 },
            { goodsName: '香蕉', price: 50 },
            { goodsName: '菠萝', price: 43 },
        ],
        userList: [
            { userName: 'lvonve', age: 18 },
            { userName: 'daotin', age: 19 },
            { userName: 'wenran', age: 17 },
        ]
    }
});

export { store }
```



然后各个组件在获取数据的时候，是在computed属性中获取的，例如User组件（我们在user组件也把所有的数据都显示出来吧）：

获取的方式通过`this.$store.state` 的方式获取。

```js
export let Users = {
    template: require('./index.html'),
    // data() {
    //     return {
    //         users: [
    //             { name: 'lvonve' },
    //             { name: 'daotin' },
    //             { name: 'wenran' },
    //         ]
    //     }
    // },
    computed: {
        // 这个userList就是获取到的state中的userList
        title: function() {
            return this.$store.state.title;
        },
        userList: function() {
            return this.$store.state.userList;
        },
        goodsList: function() {
            return this.$store.state.goodsList;
        }
    }
}
```

然后在user组件进行显示：

```html
<div>
    <h1>{{title}}</h1>
    <h4>用户列表</h4>
    <ul>
        <li v-for="user in userList">{{user.userName}}+{{user.age}}</li>
    </ul>
    <h4>商品列表</h4>
    <ul>
        <li v-for="goods in goodsList">{{goods.goodsName}}+{{goods.price}}</li>
    </ul>
</div>
```

![](images/37.png)

但是现在有个不好的地方就是，每个组件都需要使用`this.$store.state`来获取其中的数据，显得有些麻烦，有没有简单的办法呢？



### 2、mapState

vuex提供了一个工具叫做`mapState`，通过它可以简化我们获取数据的方式。

mapState的作用就是返回一个对象，这个对象可以直接丢给computed。所以上面获取state的数据的方式可以写成下面的方式：

```js
import { mapState } from 'vuex'

export let Users = {
    template: require('./index.html'),
    // computed: {
    //     userList: function() {
    //         return this.$store.state.userList;
    //     },
    //     goodsList: function() {
    //         return this.$store.state.goodsList;
    //     }
    // }
    computed: mapState({
        title(state) {
            return state.title;
        },
        userList(state) {
            return state.userList;
        },
        goodsList(state) {
            return state.goodsList;
        }
    }),
}
```

或者你想要更简单，可以使用ES6的解构赋值：

```json
computed: mapState({
    title: ({ title }) => title,
    userList: ({ userList }) => userList,
    goodsList: ({ goodsList }) => goodsList,
}),
```

还有更简单的写法：如果state上有某个属性，可以直接赋值：

```json
computed: mapState({
    title: 'title',
    userList: 'userList',
    goodsList: 'goodsList'
}),
```

终极写法，就是如果mapState属性的名字和state中属性的名字相同的话，就可以采用下面更简单的写法：

（我们上面的例子就是mapState属性的名字和state中属性的名字相同）

```js
computed: mapState(['title', 'goodsList', 'userList'])
```



**mapState使用展开符写法**

一个项目中，有些时候有些mapState属性的名字和state中属性的名字相同，有些又不相同，比如下面的例子：

```js
computed: mapState({
    title: 'title',
    users: 'userList',
    goods: 'goodsList'
}),
```

受到users和goods的拖累，title也不能写成终极进化版，这时候可以使用展开符。

```js
...mapState(['title'])

// 就类似于

mapState({
    title:'title'
})
```

所以上面的例子的最终写法为：

```json
computed: {
    ...mapState(['title']),
    ...mapState({
        users: 'userList',
        goods: 'goodsList'
    })
},
```

由于我们的babel只能编译基础的ES6语法，展开符是高级ES6语法，所以还要安装一个模块：

```js
npm i babel-preset-stage-2 -D
```

然后在`.babelrc` 里面添加：

```json
{
    "presets": [
        "env", "stage-2"
    ]
}
```

使用展开符的写法还有一个好处就是可以写自己的computed计算属性，而终极写法是没办法加自己的计算属性的。所以展开符的写法是最灵活的写法。



### 3、mutations

#### 修改state

现在有个新需求，在user组件，点击按钮，添加一个新用户（先把没用的商品列表去掉），我门一般的想法是直接操作state数据，如下：

```json
methods: {
    addUser() {
        this.$store.state.userList.push({userName: 'aaa',age: 9})
    }
}
```

但是这种写法是不符合store架构规范的，只能通过store提供的`mutations`来操作自己的state。所以我们在store中定义一个mutations属性，然后这个属性中定义一个addUser方法来添加用户，这个方法的参数指向的就是store的state属性：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title: '我是title',
        goodsList: [
            { goodsName: '苹果', price: 20 },
            { goodsName: '橘子', price: 22 },
            { goodsName: '香蕉', price: 50 },
            { goodsName: '菠萝', price: 43 },
        ],
        userList: [
            { userName: 'lvonve', age: 18 },
            { userName: 'daotin', age: 19 },
            { userName: 'wenran', age: 17 },
        ]
    },
    // 添加mutations属性用来操作state数据
    mutations: {
        addUser(state) {
            state.userList.push({ userName: 'aaa', age: 10 });
        }
    }
});

export { store }
```

然后在User.js中怎么调用这个addList方法呢？

使用`this.$store.commit('mutations的属性名')`来调用：

```js
import { mapState } from 'vuex'

export let Users = {
    template: require('./index.html'),
    computed: {
        ...mapState(['title', 'userList', 'goodsList'])
    },
    methods: {
        addUser() {
            // 使用commit的方式调用
            this.$store.commit('addUser');
        }
    },

}
```

这样就可以点击按钮添加用户了。

> 整个应用程序，只有mutations才可以操作state状态。
>
> 但是注意：
>
> **mutations中的属性，必须为纯函数，必须为同步代码。**
>
> 纯函数就是传入相同的参数，得到相同的结果。
>
> 同步代码就不能是异步的，比如ajax，比如setTimeout等。



#### 修改state时传参

我们现在希望添加的用户信息自定义怎么向addUser传递参数呢？

**我们在commit的第二个参数传递数据。这里有个专业的术语叫做【载荷】**

```js
import { mapState } from 'vuex'

export let Users = {
    template: require('./index.html'),
    data() {
        return {
            name: '',
            age: 0
        }
    },
    computed: {
        ...mapState(['title', 'userList', 'goodsList'])
    },
    methods: {
        addUser() {
            // commit的第二个参数填写传递的载荷
            this.$store.commit('addUser', {
                name: this.name,
                age: this.age
            });
        }
    },
}
```

在store里面addUser的第二个参数接收数据：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title: '我是title',
        goodsList: [
            { goodsName: '苹果', price: 20 },
            { goodsName: '橘子', price: 22 },
            { goodsName: '香蕉', price: 50 },
            { goodsName: '菠萝', price: 43 },
        ],
        userList: [
            { userName: 'lvonve', age: 18 },
            { userName: 'daotin', age: 19 },
            { userName: 'wenran', age: 17 },
        ]
    },
    mutations: {
        // data接收commit的载荷
        addUser(state, data) {
            state.userList.push({
                userName: data.name,
                age: data.age
            });
        }
    }
});

export { store }
```



### 3、actions

除了state和mutations，store还有一个属性叫做`actions`。

actions里面放的就是mutations不能放的非纯函数，异步函数等。

actions里面的方法，**第一个参数不是指向state，而知指向store**，第二个参数还是载荷。

> 需要注意的是，能操作state的只有mutations，actions也不行。只能调用mutations去操作state。

举个例子，这里我们还是添加user，不过是间隔3s才写入state。

```json
actions: {
    // 第一个参数指向store
    // 第二个参数还是载荷
    addUserTimeout(cStore, data) {
        setTimeout(() => {
            cStore.commit('addUser', data);
        }, 3000);
    }
}
```



然后在调用的时候就不能使用commit了，而是使用`dispatch` ：

```json
methods: {
    addUser() {
        this.$store.commit('addUser', {
            name: this.name,
            age: this.age
        });
    },
    addUserTimeout() {
        // 使用dispatch调用actions的属性
        this.$store.dispatch('addUserTimeout', {
            name: this.name,
            age: this.age
        });
    }
},
```



> **总结mutations与actiosn的区别：**
>
> 1、commit方法用于调用mutation；dispatch 方法用于调用action；
>
> 2、mutation 函数必须是纯函数，而且不能有异步代码；action 可以不是纯函数，也可以有异步代码；
>
> 3、按照上述规则，可以用mutation完成的事情，可以直接调用mutation，mutation不能实现的事情丢给action来完成。
>
> 4、在action中，当完成异步操作，最终需要修改数据模型时，还是需要通过mutation来完成对数据模型的操作。action不允许直接操作数据模型。




### 4、getters

store还有一个属性`getters`，相当于store的一个计算属性，就是对state的数据进行计算，当组件需要取到state的属性然后进行计算得到想要的结果的时候，计算的过程可以在`getters` 中进行，组件从getters中就可以直接拿到计算好的值。

这样还有一个好处就是，不仅当前组件可以拿个计算好的值，所有组件都可以拿到，如果所有组件都需要这个计算的话，那就方便多了。

举个例子：我们获取所有用户age之和：

```json
getters: {
    countAge(state) {
        let num = 0;
        state.userList.map(user => {
            num += user.age;
        })
        return num;
    }
}
```

然后在user组件里面：

```json
computed: {
    ...mapState(['title', 'userList', 'goodsList']),
    // 直接调用getters的countAge属性即可
    allAge() {
        return this.$store.getters.countAge
    }
},
```

然后页面：`<div>age之和：{{allAge}}</div>` 就会显示所有用户age之和。



和获取state值一样类似，每次获取getters的值都要使用`this.$store.getters` 的方式很麻烦，所以类似mapState还有mapGetters,写法和mapState一样：

```json
computed: {
    ...mapState(['title', 'userList', 'goodsList']),
    ...mapGetters({ allAge: 'countAge' }),
    // allAge() {
    //     return this.$store.getters.countAge
    // }
},
```



> 实际上，除了有mapState，mapActions，mapMutations，mapGetters都有，且用法相同。



我们将user组件进行进行改造：

```json
methods: {
    // addUser() {
    //     this.$store.commit('addUser', {
    //         name: this.name,
    //         age: this.age
    //     });
    // },
    // addUserTimeout() {
    //     console.log('user', this.name, this.age);
    //     this.$store.dispatch('addUserTimeout', {
    //         name: this.name,
    //         age: this.age
    //     });
    // },
    // 改造一
    ...mapMutations({ addUser: 'addUser' }),
    ...mapActions({ addUserTimeout: 'addUserTimeout' }),
    // 改造二
    ...mapMutations(['addUser']),
    ...mapActions(['addUserTimeout']),
},
```

上面的写法有个问题就是没法传递载荷？

那么载荷在哪里传递呢？在视图中绑定点击事件时传递：

**给事件加上参数，这个参数就是载荷。**

```html
<div>
    <h1>{{title}}</h1>
    <h4>用户列表</h4>
    <div>用户名：<input type="text" v-model="name"></div>
    <div>年龄：<input type="text" v-model.number="age"></div>

    <!-- 原始的只有函数名 -->
    <!-- <button @click='addUser'>添加用户</button> -->
    <!-- <button @click='addUserTimeout'>间隔3s添加用户</button> -->

    <!-- 改造一 -->
    <!-- <button @click='addUser({name:name,age:age})'>添加用户</button>
    <button @click='addUserTimeout({name:name,age:age})'>间隔3s添加用户</button> -->

    <!-- 改造二 -->
    <button @click='addUser({name,age})'>添加用户</button>
    <button @click='addUserTimeout({name,age})'>间隔3s添加用户</button>
    <ul>
        <li v-for="user in userList">{{user.userName}}+{{user.age}}</li>
    </ul>
    <div>age之和：{{allAge}}</div>
</div>
```



## 三、store拆分

如果组件特别多，每个组件的数据也就特别多，我们希望对这些数据根据不同的组件进行拆分方便管理。

现在有Home和User组件，Home组件的数据放在Home的store里面，User的数据放在User的store里面。

分别为homeStore.js和userStore.js，然后还有一个合并一起的主store叫index.js。

我们在home组件就显示一个title，user组件还是显示之前的内容。

```js
// homeStore.js
export default {
    state: {
        title: '我是首页',
    }
}

// userStore.js
export default {
    state: {
        title: '我是用户页',
        userList: [
            { userName: 'lvonve', age: 18 },
            { userName: 'daotin', age: 19 },
            { userName: 'wenran', age: 17 },
        ]
    },
    mutations: {
        addUser(state, data) {
            state.userList.push({
                userName: data.name,
                age: data.age
            });
        }
    },
    actions: {
        // 第一个参数指向store
        // 第二个参数还是载荷
        addUserTimeout(cStore, data) {
            setTimeout(() => {
                cStore.commit('addUser', data);
            }, 3000);
        }
    },
    getters: {
        countAge(state) {
            let num = 0;
            state.userList.map(user => {
                num += user.age;
            })
            return num;
        }
    }
}
```

然后主store，index.js：

通过`modules`属性来注入各个子store

```js
import Vue from 'vue'
import Vuex from 'vuex'

import homeStore from './homeStore'
import userStore from './userStore'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        home: homeStore,
        user: userStore
    }
});

export { store }
```

然后在main.js里面vue实例中注入的就不是原先的store.js而是index.js。

由于store下的主store名字是index.js，所以不需要修改，但是要重启服务。

```js
import Vue from 'vue'

import { router } from './router'
import { store } from './store'
import { App } from './App'


new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
});
```



然后在Home.js和User.js显示这些数据：

```js
// Home.js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export let Home = {
    template: require('./index.html'),
    computed: {
        ...mapState(['title'])
    }
}

//User.js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export let Users = {
    template: require('./index.html'),
    data() {
        return {
            name: '',
            age: 0
        }
    },
    computed: {
        ...mapState(['title', 'userList', 'goodsList']),
        ...mapGetters({ allAge: 'countAge' }),
    },
    methods: {
        ...mapMutations(['addUser']),
        ...mapActions(['addUserTimeout']),
    },
}
```



但是我们发现一个问题就是Home.js中的：

```json
computed: {
    ...mapState(['title'])
}
```

拿不到title的值，为什么呢？上面的写法相当于：

```js
computed: {
    ...mapState({
        //title:'title'
        title: (state)=>state.title;
    })
}
```

但是我们现在state里面还title吗，没有了state.home下才有title。

所以，令人沮丧的是，如果使用了store拆分，就不能使用展开符的写法了。

正确的写法是：

```json
computed: {
    ...mapState({
        title: (state) => state.home.title;
    })
}
```

User.js也是一样的。

> 注意：
>
> 但是对于mutations，actions，getters不会区分home和user，都会集合到一起，类似于全局的属性，所欲的组件都可以访问到，所以也就不需要加home和user前缀。



### 1、namespaced命名空间

但是可能会存在这样一个问题，就是home和user下的mutations或者actions或者getters都有一个叫做add的方法，那么在调用的时候，调用的是谁的add呢？命名会冲突吗？

我们可以在子store里面加一句话：

`namespaced:true` 开启命名空间。

```js
// homeStore.js
export default {
    // 开启命名空间
    namespaced: true,
    state: {
        title: '我是首页',
    }
}
```

然后获取的这些方法的时候就要加前缀home或者user：

```js
// User.js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export let Users = {
    template: require('./index.html'),
    data() {
        return {
            name: '',
            age: 0
        }
    },
    computed: {
        ...mapState({
            title: (state) => state.user.title,
            userList: (state) => state.user.userList
        }),
        // 加user前缀
        ...mapGetters({ allAge: 'user/countAge' }),
    },
    methods: {
        // 加user前缀
        ...mapMutations({ addUser: 'user/addUser' }),
        ...mapActions({ addUserTimeout: 'user/addUserTimeout' }),
    },
}
```

然后还有一种写法如下，效果一样：

就是把前缀路径‘user/’提到第一个参数的位置，后面的写法和以前相同。

```json
computed: {
    ...mapState({
        title: (state) => state.user.title,
        userList: (state) => state.user.userList
    }),
    // 'user/'提前
    ...mapGetters('user/', { allAge: 'countAge' }),
},
methods: {
    // 'user/'提前
    ...mapMutations('user/', ['addUser']),
    ...mapActions('user/', ['addUserTimeout']),
},
```

