## Node.js模块化教程

后端 commonJS node 就是在后端node.js使用 commonJS 实现 js 模块化。

在服务器端: 模块的加载是运行时同步加载的。



### 语法：

**commonJS 导出模块语法：**

```js
module.exports = Object|Function|Array|String|Number|Boolean;  //一个文件内只能使用一次
exports.xxx = Object|Function|Array|String|Number|Boolean; //一个文件可以导出多次
```

**commonJS 导入模块语法：**

```js
let xxx = require(模块名或模块路径);
// 如果是使用npm下载的第三方模块，直接使用模块名
// 如果是在项目目录下的自定义模块，使用模块路径
```



（问题: 暴露的模块到底是什么?

暴露模块的本质是暴露一个 exports 对象）







### 操作步骤：

1、下载安装node.js

2、创建项目结构
```
|-modules
  |-module1.js
  |-module2.js
  |-module3.js
|-app.js
|-package.json
  {
    "name": "commonJS-node",
    "version": "1.0.0"
  }
```
在后端可以使用指令自动生成package.json

```
npm init
```



3、下载第三方模块

```
npm install uniq --save
```



4、模块化编码

* module1.js
  ```js
  module.exports = {
    foo() {
      console.log('moudle1 foo()')
    }
  }
  ```

* module2.js
  ```js
  module.exports = function () {
    console.log('module2()')
  } 
  ```

* module3.js
  ```js
  exports.foo = function () {
    console.log('module3 foo()')
  }

  exports.bar = function () {
    console.log('module3 bar()')
  }
  ```


- app.js 

  ```js
  //引用模块
  let module1 = require('./modules/module1')
  let module2 = require('./modules/module2')
  let module3 = require('./modules/module3')

  let uniq = require('uniq') // 去除重复数字模块

  //使用模块
  module1.foo()
  module2()
  module3.foo()
  module3.bar()

  console.log(uniq([1, 3, 1, 4, 3])) 
  ```

- 通过 node 运行 app.js

```
node app.js
```







**npm相关选项：**

`--save`局部安装，把依赖写入package.json

`-dev` 开发依赖



开发依赖：开发时候用到的，一旦上线就不需要了

运行依赖：命令行运行 broserify 指令用到



```
{
  "devDependencies":{}, // 开发依赖包
  "dependencies":{}, // 运行依赖包
}
```

















