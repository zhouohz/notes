# MongoDB 笔记

## 安装

1. 下载安装
2. 配置环境变量
3. 启动`mongod`
   * 默认寻找执行命令所在盘符根的`data/db`目录
   * 需要手动创建
4. 连接和退出数据库
   * `mongo`默认连接本机的数据库
   * `exit`退出链接
   * 必须在开启数据库服务的情况下才能连接
5. 基本命令
   * `show dbs`
     * 查看所有数据库
     * 默认有`admin`和`local`和`config`两个系统数据库
   * `db`
     * 查看当前操作的数据库
     * 默认操作test
   * `use dbname`
     * 切换到指定的数据库，如果没有会在操作之后创建
   * `db.collection.insertOne({ key: value })`
     * 在当前操作的数据库下创建一个collection集合，然后添加数据
   * `db.collection.find()`
     * 查看当前集合中的所有数据，数据前面默认有id属性
     * 可以理解为collection是一个数组，添加进去的数据是JSON字符串
   * `show collections`
     * 显示当前数据库里面的集合

## example

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
test
> use students
switched to db students
> db
students
> db.students.insertOne({"name":"tom"})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5cea77e4afead4bdb1d216d5")
}
> db.students.find()
{ "_id" : ObjectId("5cea77e4afead4bdb1d216d5"), "name" : "tom" }
> show collections
students
>
```

## 关系型数据库和非关系型数据库

表结构就是关系

* 所有的关系型数据库都可用`sql`语言操作
* 而且数据表还支持约束
  * 唯一性
  * 主键
  * 默认值
  * 非空
* 非关系型数据库非常的灵活
* 有的非关系型数据库就是键值对
* MongoDB是最像关系型数据库的非关系型数据库
  * 数据库
  * 数据表（集合）
  * 表记录（文档对象）
  * 不需要设计表结构
  * 可以任意往里面存数据

## MongoDB 基本模型

```javascript
{
  DataBase: {
    Collections: [
      {document01},
      {document01},
      {document01}
    ]
  }
}
```

文档结构非常灵活，没有任何限制。使用的时候直接用代码指明需要的操作库、集合以及文档就可以了，MongoDB会自动操作数据库的内容

## 在Node中连接mongodb

### mongodb

> The official MongoDB driver for Node.js

使用方法：<https://www.npmjs.com/package/mongodb>

官方提供的包比较偏原生，在实际开发中不用

### mongoose

官方网址：<https://mongoosejs.com/>

> elegant mongodb object modeling for node.js  

基于官方的`mongodb`包做了再次的封装

#### Install

`$ npm install mongoose`

#### Example

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

连接的数据库`/test`可以不存在，MongoDB会在添加第一条数据后创建

#### Schemas(架构)

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

var Blog = mongoose.model('Blog', blogSchema);

var animalSchema = new Schema({ name: String, type: String });

animalSchema.save(function (error, result) {
  if (err) {
    console.log('error')
  } else {
    console.log('success')
  }
})
```

代码分析：

* `var blogSchema = new Schema({})`
  * Defining your schema
  * 给`key`添加一些约束，如`type`、`required`、`default`等等
* `mongoose.model(modelName, schema)`
  * Creating a model
  * `modelName`会转换为小写复数的形式
  * 返回值：模型构造函数。可以对数据为所欲为
* `new Schema({ name: String, type: String })`
  * Instance methods
  * 得到一个约束的文档

#### Qurey

* `Blog.find(conditions, callback)`
  * Finds documents
  * conditions为查询条件，是一个对象
  * 返回值是一个数组，里面包含着查询到的文档对象
  * 没有第一个条件则返回整个集合
* `Blog.findOne(conditions, callback)`
  * Finds document
  * 返回值是查询到的第一个文档对象
  * 没有第一个条件则返回集合的第一个文档

#### Delete

* `Blog.remove(conditions, callback)`
  * Removes all documents that match conditions from the collection.
  * To remove just the first document that matches conditions, set the single option to true.

#### Update

* Blog.findOneAndUpdate(id, update, callback)
  * id：文档id字符串
  * update：需要更新的内容，是一个对象

## 在Node中连接Mysql

在Node中操作Mysql数据库需要安装mysql包

> This is a node.js driver for mysql.  
> It is written in JavaScript, does not require compiling, and is 100% MIT licensed.

### mysql-Install

文档：<https://www.npmjs.com/package/mysql>

```shell
npm install mysql
```

### mysql-Example

```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
```
