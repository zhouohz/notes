## 方法

```javascript
app.post('/url', function (req, res) { 
  // 通常分为三步
  // 获取 post 请求体中的数据（get请求可以直接通过 req.query 获取到查询字符串对象)
  // 处理
  // 响应
})
```

express 默认没有提供可以获取post请求体中数据的API,但是,它的资源库中有一个中间件 body-parser 可以弥补

使用方式:

- 安装 npm install body-parser
- 配置
  ```javascript
  var express = require('express')
  // 0. 引包
  var bodyParser = require('body-parser')

  var app = express()

  // 1. 只要经过下面的配置,那么request对象中就会多一个 body 属性,直接通过 request.body 获取数据
  // 得到的也是一个对象和 request.query 一样
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())
  ```
- 使用
  ```javascript
  app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })
  ```

