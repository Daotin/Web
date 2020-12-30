## 1、学习资源

MongoDB学习教程：https://piaosanlang.gitbooks.io/mongodb/content/

MongoDB教程：http://www.mongodb.org.cn/tutorial/





## 2、关于MongoDB

MongoDB是面向文档型的数据库。

在MySql里面我们是一个个的数据表，但是在MongoDB里面是一个个的集合，集合里面是一个个的文档。

在MySql里面的数据表中是一行一行的数据，但是在MongoDB里面的文档中是一个对象的集合，每个对象类似一行的数据。

MongoDB是以键值对的形式保存数据的。





## 3、MongoDB的安装

略。



在MongoDB的安装目录下的bin下有两个重要的程序。

`mongo.exe` 和 `mongod.exe`

其中`mongod.exe`是启动MongoDB的程序。程序启动后运行`mongo.exe` ，然后就可以在特定的MongoDB命令行中执行指令进行数据的增删改查。



MongoDB的启动指令：（E:\MongoDB\data 自己存放数据库的位置）

```js
.\mongod.exe --dbpath E:\MongoDB\data

// 然后运行 
mongo.exe 就可以执行mongoDB的指令了。
```





## 4、MongoDB一些指令

### 4.1、常用指令

```js
show dbs // 查看已经存在的数据库

use 数据库名  //切换到指定的数据库(无论数据库是否存在 均可切换成功)

db  // 查看当前所在的数据库

db.getCollectionNames() //查看当前数据库下一共有哪些文档集合

db.集合名.insert(文档)  //向指定的集合录入一条文档(如果集合不存在会自动创建)
//例如:  db.users.insert({user:"daotin",age:18})  

db.集合名.insert([文档1,文档2]) // 向指定的集合插入多条文档
// 例如:db.users.insert([{user:"lvonve",age:10},{user:"wenran", age:20}])

// 插入多条数据或单条数据的其他写法
//db.集合名.insertMany([文档1,文档2])  插入多条数据
//db.集合名.insertOne(文档)            插入单条数据
db.users.insert([
    {username:"马云",age:58,height:167,friends:["马化腾","许家印","雷军","李彦宏","柳传志"]},
    {username:"许家印",age:52,height:177,friends:["马化腾","雷军","柳传志"]},
    {username:"雷军",age:48,height:174,friends:["马化腾","董明珠","柳传志"]},
    {username:"雷德承",age:18,height:180,friends:["马化腾","王健林","柳传志"]},
    {username:"王思聪",age:32,height:179,friends:["林更新","林缓存","陈赫","雷军"]}
])
```



### 4.2、查询语句

> 查询的方式都是以对象的形式查询的

```js
db.集合名.find()  // 查询指定的集合内所有数据
//{ "_id" : ObjectId("5c18e0aef024bd18615cc516"), "user" : "daotin", "age" : 18 }
//{ "_id" : ObjectId("5c18e188dc1d4d80df2f4ae6"), "user" : "lvonve", "age" : 10 }
//{ "_id" : ObjectId("5c18e188dc1d4d80df2f4ae7"), "user" : "wenran", "age" : 20 }

// 查询指定字段
db.集合名.find({筛选条件},{显示字段})

// 显示字段
// 显示user字段，不显示_id字段
db.users.find({},{_id:0, user:1}) // 显示的字段值为1，不显示的字段值为0

// 筛选条件
//条件格式:   属性名:{条件操作符:值} 
//条件操作符
//    $gt : 大于
//    $gte : 大于等于
//    $lt : 小于
//    $lte : 小于等于
//    $in : 包含其中任意一个  注意 $in操作符的值必须为数组类型
//    $all : 包含所有  值同上,必须为数组类型
//    $nin : 不包含其中任意一个 值要求同上
//    $ne : 不等于
//    $not : 对已定义好的条件进行取反 {属性:{$not:{条件}}}
//    $mod : 取模 (取余)   $mod:[x,y] 取所有除x余y的值
db.users.find({age:{$gt:35}},{_id:0}) // 筛选条件为年龄大于35
db.users.find({friends:{$in:["林更新"]}},{_id:0}) // 筛选条件为friends字段有林更新的。
db.users.find({friends:{$in:["林更新","雷军"]}},{_id:0}) // 筛选条件为friends字段有林更新或者有雷军的。
db.users.find({friends:{$all:["马化腾","雷军"]}},{_id:0}) // 筛选条件为friends字段同时包含马化腾和雷军
db.users.find({friends:{$nin:["马化腾","雷军"]}},{_id:0}) // 筛选条件为friends字段不包含马化腾或者不包含雷军即可
db.users.find({age:18},{_id:0}) // 筛选条件为age为18的文档
db.users.find({age:{$ne:18}},{_id:0}) // 筛选条件为age不为18的文档
db.users.find({age:{$ne:18}},{_id:0}) // 筛选条件为age不为18的文档
db.users.find({age:{$not:{$gt:18}}},{_id:0}) // 筛选条件为年龄不大于18
db.users.find({age:{$mod:[3,0]}},{_id:0})  // 筛选条件为age/3余数为0的文档

// 模糊查询🎅🏼
// https://blog.csdn.net/comhaqs/article/details/23822479
1、db.goods.find({name:/joe/ig})
2、db.goods.find({name:{$regex:/joe/ig}})
3、db.goods.find({goodsName:{$regex: "joe", $options:"ig"}})
var reg = new RegExp("joe", "ig");
4、db.goods.find({name:reg})
5、db.goods.find({name:{$regex:reg}})
// 以上5种写法均可
```



**条件“且”和“或”**

```js
// 条件：且
db.users.find({条件1，条件2},{_id:0})
// db.users.find({age:{$gt:35},friends:{$in:["雷军"]}},{_id:0}) // 年龄大于35，并且friends中有雷军的

// 条件：或
db.users.find({$or:[{条件1},{条件2}]},{_id:0}) 
// db.users.find({$or:[{age:{$gt:35}},{friends:{$in:["雷军"]}}]},{_id:0})  // 年龄大于35，或者friends中有雷军的

// 条件：且和或都有
db.users.find({条件1,$or:[{条件2},{条件3}]},{_id:0}) // 满足条件1，并且满足条件2或者条件3中的一个
//  db.users.find({age:{$gt:30},$or:[{height:{$lt:175}},{friends:{$in:["许家印"]}}]},{_id:0}) // 年龄大于30 ，并且身高小于175或者认识许家印
```



**其他条件操作**

```js
.limit(n) //取满足条件的头n条数据
.skip(n) //跳过n条数据再取数据
.count() //对满足条件的数据进行计数
.sort({第一排序条件,第二排序条件,.....})  //按照属性进行排序
.skip(m).limit(n) //跳过m条数据 再取头n条数据 (调用顺序没有讲究,但是作用效果均为先跳过数据再取数据)

//示例
db.users.find({},{_id:0}).limit(3) // 取users集合中所有文档的前3个
db.users.find({},{_id:0}).limit(3).skip(3) // 取users集合中敲过前三个后取目前文档的前3个
db.users.find({},{_id:0,age:1}).sort({age:1})// 按照年龄升序排列（正数为升序）
db.users.find({},{_id:0,age:1}).sort({age:-1})// 按照年龄降序排列（负数为升序）
db.users.find({},{_id:0,age:1,height:1}).sort({age:1,height:1})// 按照年龄升序排列，如果年龄相同，按照身高升序排列
db.users.find({age:{$gt:35}},{_id:0}).count((err,count)=>{console.log(count)}) // 统计年龄大于35岁的文档个数

// 设计翻页的时候，一般会这么用：
 db.users.find().limit(y).skip((x-1)*y)
```





### 4.3、修改语句

> `db.集合名.update(query,{修改器:{属性:值}},option)`
> option 为可选参数, 为对象类型，其下有两个属性：
> ​    `multi` : 布尔值，是否修改所有符合条件的数据，默认false 
> ​    `upsert` : 布尔值，当没有符合条件的数据时，是否创建该数据，默认false

```js
//修改器
//	$set : 重新赋值
//	$inc : 对值进行叠加(值为正)或递减(值为负) 适用于数字类型的值 
//	$unset : 删除整个属性(包括属性名及属性值)

//数组修改器
//	$push : 给数组类型的值添加一个新元素
//	$addToSet : 给数组类型的值添加一个新元素 (该方法不会重复添加已经存在的值,同时也不会影响原来已经存在的重复值)
//	$pop : 从尾部删除一条数据 (值的大小不会对结果产生影响 永远只会操作一条数据) (值为正 从尾部删除一条数据 值为负 从头部删除一条数据)
//	$pull : 按条件删除数组内元素  {$pull:{属性:值}} 删除指定值的元素

//示例：
db.users.update({username:"马云"},{$set:{age:55}}) // 设置马云文档的age为55
db.users.update({username:"马云"},{$inc:{age:2}})) // 设置马云的age在原来的基础上+2，如果是-2的话是减2
db.users.update({username:"马云"},{$unset:{age:1}}) // 删除马云的age属性，这里age设置的值可以任意。
db.users.update({username:"马云"},{$push:{friends:"Daotin"}}) // 给马云的friends属性的最后增加一个值“Daotin”
db.users.update({username:"马云"},{$pop:{friends:0}}) // 给马云的friends属性从最后删除一个值。这里指令friends的值可随意。
db.users.update({username:"王思聪"},{$pull:{friends:"林更新"}}) // 删除马云的friends属性中的林更新
```

> 注意：在默认情况下，修改操作只会操作第一条符合条件的数据。







### 4.4、删除语句

> `db.集合名.remove(query,option)`
> option：为可选参数，为对象类型，拥有属性
> ​    `justOne`: 是否只删除第一条符合条件的数据，默认false

```js
//示例
db.users.remove({user:"lvonve"}) // 删除user属性值为lvonve的所有文档
```



> 注意：默认情况下  会删除所有符合条件的数据































