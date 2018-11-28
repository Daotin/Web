## 操作数据库

### 新增数据库

> `create database 数据库名称 [库选项];` // create dabase mydb charset utf8;



### 查询数据库

> `show databases;` // 查看所有数据库
>
> `show databases like pattern; ` //查看指定部分的数据库(模糊匹配)show databases like 'my%
>
> `show create database 数据库名称;` // 查看数据库的创建语句 show create database mydb;



### 更新数据库

> `alter database 数据库名 [库选项];` // alter database mydb charset gbk;



### 删除数据库

> `drop database 数据库名字;` 



## 操作数据表

### 新增数据表

> create table [if not exists] 数据库名.表名(
>
> ​	字段名字 数据类型,
>
> ​	字段名字 数据类型
>
> )[表选项];

> create table if not exists mydb.mytable(
>
> ​	name varchar(10),
>
> ​	age int
>
> )charset utf8;
>
> 或者：
>
> use mydb;
>
> create table if not exists mytable(
>
> ​	name varchar(10),
>
> ​	age int
>
> )charset utf8;



### 查看数据表

> `use mydb;`
>
>
>
> `show tables;` // 查找所有数据表
>
> `show tables like ‘pattern’;` // show tables like ‘my%’;
>
> `show create table 表名;` // 查看表的创建语句
>
> `desc/describe/show columns from 表名;` // 查看表结构（表中的字段信息）
>
> desc mytable;
> describe mytable;
> show columns from mytable;



### 修改数据表

> `rename table 老表名 to 新表名;` // 修改表名 // rename table mytable to mt;
>
> `alter table 表名 表选项 [=] 值;` // 修改表选项 alter table mytable charset = GBK;

> `Alter table 表名 add [column] 字段名 数据类型 [列属性] [位置];` // 新增字段
>
> -- 给mytable增加ID放到第一个位置
> alter table mytable
> add column id int
> first;	
>
> -- mysql会自动寻找分号: 语句结束符 
>
> -- after 字段名 ：增加在某个字段之后
>
> `alter table 表名 modify 字段名 数据类型 [属性][位置];` // 修改字段: 
>
> -- 将mytable的number学号字段变成固定长度,且放到第二位(id之后)
> alter table mytable
> modify number char(10) after id;
>
> `Alter table 表名 change 旧字段 新字段名 数据类型 [属性] [位置];` // 重命名字段
>
> -- 修改mytable中的gender字段更名为sex
> alter table my_student
> change gender sex varchar(10);
>
> `Alter table 表名 drop 字段名;` // 删除字段
>
> -- 删除mytable中的年龄字段(age)
> alter table mytable drop age;



### 删除数据表

> `Drop table 表名1,表名2...;` // 可以一次性删除多张表 drop table mytable;





## 数据操作

### 新增数据

> `insert into 表名 values(值列表)[,(值列表)];` // 可以一次性插入多条记录
>
> -- 插入数据（要求数据的值出现的顺序必须与表中设计的字段出现的顺序一致）
> insert into mytable values(1,'itcast0001','Jim','male'),
> (2,'itcast0002','Hanmeimei','female');
>
> `insert into 表名 (字段列表) values (值列表)[,(值列表)];`
>
> -- 插入数据: 指定字段列表
> insert into mytable(username,userpwd,usertel) values('leson1','good','15871437346')



### 查看数据

> `Select */字段列表 from 表名 [where条件];` 
>
> -- 查看所有数据
> select * from mytable;
>
> -- 查看指定字段,指定条件数据
> select id,number,sex,name from mytable where id = 1;	-- 查看满足id为1的学生信息



### 更新数据

> `update 表名 set 字段 = 值 [where条件];`	// 建议都有where: 又不是更新全部
>
> -- 更新数据name为'jim'的sex值
> update mytable set sex  = 'female' where name = 'jim'; 



### 删除数据

> `delete from 表名 [where条件];`
>
> -- 删除数据(删除sex为male的字段数据)
> delete from mytable where sex = 'male';