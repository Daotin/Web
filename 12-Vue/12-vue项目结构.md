## 项目github仓库
[vue-demo](https://github.com/Daotin/vue-demo)

## vue项目结构
![](./images/structure.jpg)

## webpack+vue项目代码结构：
![](./images/38.png)


## 简要描述
main.js加载主组件App.js，App.js又是一个空的组件，里面主要放三部分：

Entry组件，Login组件，Register组件。

Entry组件下包括Home，List，Detail，ShoppingCar子组件，这些子组件有会包含Components文件夹下的更小的组件。

Login组件，显示登录界面。

Register组件，显示注册界面。

> Components文件夹下的小组件的数据都是父组件传入的。
