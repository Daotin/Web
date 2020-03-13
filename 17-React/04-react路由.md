## 一、react的路由

> Tips:
>
> `import ReactDOM from 'react-dom';`
>
> `ReactDOM.render(<MyRouter />, document.getElementById('app'));`
>
> 可以直接写成下面的方式：
>
> `import { render } from 'react-dom';`
>
> `render(<MyRouter />, document.getElementById('app'));`



好了，言归正传。我们先创建Home和Goods页面。

然后再创建一个`AppRouter.js`文件。

由于用到路由，所以还需要安装路由插件：

```
npm i react-router-dom -S
```



然后在AppRouter.js中引入：

```jsx
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';
// 给BrowserRouter起个别名Router
```

> `BrowserRouter`：表示正常斜杠跳转的路由
>
> `HashRouter`：类似vue的带#的路由跳转
>
> `Route`：配置路由的跳转地址

如果使用HashRouter可以不做任何配置，但是如果使用正常跳转需要在在config中进行配置：

```json
devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
},
```

上面两句话的意思是：**不管跳转的理由路径是什么，始终加载index.html文件，保证单页面应用。**



然后在AppRouter.js中进行路由跳转配置：

```jsx
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Goods } from './Pages/Goods';

export class Router extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            // BrowserRouter下面只能有一个子元素，所以用div包裹起来
            // 使用Route进行路由配置。
            <Router>
                <div>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/goods" component={Goods}></Route>
                </div>
            </Router>
        );
    }
}
```



### 1、设置dist生成的App.js为绝对路径

当我们把`<Route path="/goods" component={Goods}></Route>` 改为`<Route path="/home/goods" component={Goods}></Route>` 的时候，会报错，找不到app.js文件：

```
GET http://localhost:3000/home/app.js net::ERR_ABORTED 404 (Not Found)
```

这是因为在配置文件中设置的App.js是相对路径，我们需要把它改为绝对路径：

```json
output: {
    path: __dirname + "/dist/",
    filename: "app.js",
    publicPath: "/"
},
devServer: {
    publicPath: "/"
},
```





### 2、设置只加载一个组件

此时我们发现，Home和Goods同时加载出来了，怎么设置同时只加载一个组件呢？

添加`Switch`组件。

```jsx
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';

export class MyRouter extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                {/* 用 Switch 包裹需要显示的路由即可*/}
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/home/goods" component={Goods} />
                </Switch>
            </Router>
        );
    }
}
```



### 3、设置严格匹配

此时不管是`/home`还是`/home/goods`都只加载的Home组件，原因是路由匹配默认是只要开头匹配到就显示，不再往后面匹配，如何设置严格匹配？

使用`exact={true}`设置严格匹配模式。

```jsx
<Route path="/home" exact={true} component={Home} />
<Route path="/home/goods" exact={true} component={Goods} />
```



### 4、设置自动跳转

刚开启服务打开浏览器的时候，默认不会显示任何东西，我们希望自动跳转到/home路由如何设置？

```jsx
import { BrowserRouter as Router, HashRouter, Route, Switch,  Redirect} from 'react-router-dom';

<Switch>
    {/* 在根路径下自动跳转到home页 */}
    <Redirect path="/" exact={true} to="/home" />
    <Route path="/home" exact={true} component={Home} />
    <Route path="/home/goods" exact={true} component={Goods} />
</Switch>
```



### 5、设置link跳转

设置类似vue的router-link点击后跳转的方式：

```jsx
import { Link } from "react-router-dom";

<Link to="/home/goods" >跳转到goods页</Link>
```

也可以写成对象的方式：

```jsx
<Link to={{ pathname: '/home/goods', search: '?goodsid=8' }} >跳转到goods页</Link>
<Link to={{ pathname: '/home/goods?goodsid=8' }} >跳转到goods页</Link>
```

如果想让Link跳转之后不能后退的话，可以加一个`replace={true}`

```jsx
<Link replace={true} to={{ pathname: '/home/goods?goodsid=8' }} >跳转到goods页</Link>
```



**实现Link选中样式效果：**

react不能像vue那样，直接加class属性，react需要注意两点：

> 1、不能在Link上面添加，只能在`NavLink`上面添加类样式。
>
> 2、类样式名不叫 active-class，而是 `activeClassName`.

```jsx
import { Link, Route, Switch, NavLink } from "react-router-dom";

<NavLink activeClassName="active" to="/goods" >跳转到goods页</NavLink>
```



### 6、多视图路由

react的路由匹配采用分布式路由，即**不需要一个单独的文件来书写路由匹配规则，而是直接写在路由上。**



多视图路由就是：一次显示多个路由匹配的组件。

其实不加`Switch`的方式就是多视图路由，所有的Route路由匹配到的都会显示出来。

而严格模式只是确定多视图路由中视图是否显示而已。匹配不到就不显示，但是那个坑还在的。



### 7、路由嵌套

只需要在组件中继续写`Route`即可，这个路由就是子路由。

如我们在Home下嵌套A.js。

```jsx
import { Link, Route } from "react-router-dom";
import { A } from './A'

export class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h4>首页</h4>
                <Link to={{ pathname: '/home/goods', search: '?goodsid=8' }} >跳转到goods页</Link>
                
                {/* 添加子路由A */}
                <Route pathname="/home/a" component={A} />
            </div>
        );
    }
}
```

> 需要注意的是：子路由的 pathname 一定是绝对路径。



### 8、编程式导航

什么是编程式导航？说人话就是js代码触发路由跳转，而不是在标签中设置路由跳转。

举例：在Home页点击按钮，跳转到Goods页。

```jsx
// Home.js
export class Home extends React.Component {
    constructor() {
        super();
        this.goGoods = this.goGoods.bind(this);
    }
    goGoods() {
        // 使用push或者replace跳转
        this.props.history.push('/goods');
    }
    render() {
        return (
            <div>
                <button onClick={this.goGoods}>跳转到Goods</button>
            </div>
        );
    }
}
```

> 注意：
>
> 1、并不是所有组件的`this.props`所有history属性。只有当前的组件是**通过路由加载出来**的（也就是通过`<Route path="/home" exact={true} component={Home} />`加载出来）才会有history属性。
>
> 2、如果不是通过路由加载出来的组件，但是想要编程式导航怎么办？**可以由它的父组件传递`this.props.history`过来。如果它父组件有的话**。
>
> 比如：Home组件下加载Box组件，Home组件给Box组件传递参数。
>
> `<Box history={this.props.history}>`
>
> 此时，Box的`this.props`就有了history属性了。



### 9、路由传参

示例：点击goods列表，传递id给detail组件。

#### 9.1、问号传参

```jsx
//goods.js
import { Link } from 'react-router-dom'

export class Goods extends React.Component {
    constructor() {
        super();
        this.state = {
            goodsList: [
                { goodsId: 1, name: 'AAA', price: 12 },
                { goodsId: 2, name: 'BBB', price: 42 },
                { goodsId: 3, name: 'CCC', price: 54 },
            ]
        }
    }
    render() {
        let list = this.state.goodsList.map(item => {
            return (
                // 问号传参
                <Link to={`/detail?id=${item.goodsId}`} key={item.goodsId}>
                    <h3>名称：{item.name}</h3>
                    <p>价格：{item.price}</p>
                </Link>
            );
        });
        return (
            <div>
                {list}
            </div >
        );
    }
}
```

在detail组件，在组件加载完毕后接收：

> 问号传参传递过来的数据存放在：`this.props.location.search`

```jsx
// detail.js
import url from 'url';

componentDidMount() {
    // 问号传参：获取传递过来的id
    let { id } = url.parse(this.props.location.search, true).query;
    console.log(id);
}
```

> 由于在webpack可以使用node的一些插件，比如url，可以方便获取到`this.props.location.search`中的id值，而不需要自己解析。



#### 9.2、路径传参

首先要在路由配置：

```jsx
<Route path="/detail/:goodsid" exact={true} component={Detail} />
```

然后在goods.js里面和问号传参基本一致，只是问号改成了路径。

```jsx
<Link to={`/detail/${item.goodsId}`} key={item.goodsId}>
    <h3>名称：{item.name}</h3>
    <p>价格：{item.price}</p>
</Link>
```

在detail.js加载完成接收：

> 路径传参传递的数据存放在：`this.props.match.params`

```jsx
componentDidMount() {
    // 路径传参：获取传递过来的id
    console.log(this.props.match.params);
}
```



#### 9.3、state传参

如果要传递大量数据，使用`state`进行传递，这种传递的方式**不会在地址栏显示。**

```jsx
<Link to={ { pathname: `/detail/${item.goodsId}`, state: { name: item.name, price: item.price }  } } key={item.goodsId} >
    <h3>名称：{item.name}</h3>
    <p>价格：{item.price}</p>
</Link >
```

> 这种state传参的写法，需要注意to的值不再是字符串拼接，而是一个对象。

接收还是在detail加载后接收：

其state内容存在于：`this.props.location.state`

```jsx
componentDidMount() {
    // state大量数据传递
    console.log(this.props.location.state);
}
```

> 注意：state传参不适合详情页，因为无法分享给别人查看相同的内容。



















