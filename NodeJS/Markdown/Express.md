# Node.js Express 框架

## Installing

官网：<https://expressjs.com/>

>Fast, unopinionated, minimalist web framework for Node.js

Now install Express in the myapp directory and save it in the dependencies list

```shell
npm install express --save
```

## Hello World

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

- `express()`实例化一个server对象
- `app.get(url, (req, res) => {})`监听 request 事件
- `app.listen(port, () ==> {})`监听指定的端口号

## Router

- Get ==> url ==> callback
  + `app.get(url, (req, res) => {})`
- Post ==> url ==> callback
  + `app.post(url, (req, res) => {})`

## Static files

To serve static files such as images, CSS files, and JavaScript files, use the `express.static` built-in middleware function in Express.

```javascript
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets

For example, use the following code to serve images, CSS files, and JavaScript files in a directory named `public`:

```javascript
app.use(express.static('public'))
```

**NOTE:** Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.

To use multiple static assets directories, call the express.static middleware function multiple times:

```javascript
app.use(express.static('public'))
app.use(express.static('files'))
```

To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function, specify a mount path for the static directory, as shown below:

```javascript
app.use('/static', express.static('public'))
```

Now, you can load the files that are in the public directory from the `/static` path prefix.

However, the path that you provide to the `express.static` function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve

## Template Engines

[art-template 官方文档](https://aui.github.io/art-template/)

> High performance JavaScript templating engine

### Install

```shell
npm install --save art-template
npm install --save express-art-template
```

`express-art-template`依赖于`art-template`

### Example

Use the app.engine(ext, callback) method to create your own template engine.`ext` refers to the file extension, and `callback` is the template engine function

```javascript
var express = require('express');
var app = express();
app.engine('art', require('express-art-template'));
app.get('/', function (req, res) {
    /* 
    Renders a view and sends the rendered HTML string to the client
    Express 有一个约定，view 文件都放在同级的 views 目录中。render() 的默认路径就在views中
    */
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```

如果希望修改 render() 的默认路径，可以使用`app.set('views', 'newPath')`方法

## Post

在 Express 中没有直接提供获取Post方式提交的数据的API。

### body-parser

Parse HTTP request body

#### Install

```shell
npm install body-parser --save
```

#### Example

```javascript
var express = require('express')
/* 1. 引包 */
var bodyParser = require('body-parser')
var app = express()
/* 2. 配置 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/* 3.之后就可以使用req.body属性了，其值和req.query一样 */
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## API

### req.query

This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

### res.redirect([status,] path)

Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code . If not specified, status defaults to “302 “Found”.

## nodemon

>nodemon reload, automatically.

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server

```shell
# 全局安装nodemon
npm install -g nodemon
# 用 nodemon 代替 node 运行 server
nodemon demo.js
```





