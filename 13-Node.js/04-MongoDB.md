## 学习资源

MongoDB学习教程：https://piaosanlang.gitbooks.io/mongodb/content/

MongoDB教程：http://www.mongodb.org.cn/tutorial/





## 关于MongoDB

MongoDB是面向文档型的数据库。

在MySql里面我们是一个个的数据表，但是在MongoDB里面是一个个的文档。

在MySql里面的数据表中是一行一行的数据，但是在MongoDB里面的文档中是一个对象的集合，每个对象类似一行的数据。

MongoDB是以键值对的形式保存数据的。





## MongoDB的安装

略。



在MongoDB的安装目录下的bin下有两个重要的程序。

`mongo.exe` 和 `mongod.exe`

其中`mongod.exe`是启动MongoDB的程序。程序启动后运行`mongo.exe` ，然后就可以在特定的MongoDB命令行中执行指令进行数据的增删改查。



## MongoDB一些指令

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

db.集合名.find()  // 查询指定的集合内所有数据
//{ "_id" : ObjectId("5c18e0aef024bd18615cc516"), "user" : "daotin", "age" : 18 }
//{ "_id" : ObjectId("5c18e188dc1d4d80df2f4ae6"), "user" : "lvonve", "age" : 10 }
//{ "_id" : ObjectId("5c18e188dc1d4d80df2f4ae7"), "user" : "wenran", "age" : 20 }
```



















