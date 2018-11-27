数据库的增删改查



## 操作数据库

### 新增数据库

> `create database 数据库名称 [库选项];` // create dabase mydb charset utf8;

库选项：

字符集设定: charset/character set 具体字符集(数据存储的编码格式): 常用字符集: GBK和UTF8

校对集设定: collate 具体校对集(数据比较的规则)



### 查询数据库

> // 查看所有数据库
>
> `show databases;` 
>
> // 查看指定部分的数据库(模糊匹配)
>
> `show databases like pattern; ` // show databases like 'my%
>
> // 查看数据库的创建语句
>
> `show create database 数据库名称;` // show create database mydb;

pattern: 查看指定部分的数据库

%: 表示匹配多个字符

_: 表示匹配单个字符























