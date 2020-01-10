## express-session

### Installation

This is a Node.js module available through the npm registry. Installation is done using the **npm install** command:

```shell
npm install express-session
```

### API

#### req.session

To store or access session data, simply use the request property req.session, which is (generally) serialized as JSON by the store, so nested objects are typically fine. For example below is a user-specific view counter:

```javascript
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
```

**基本使用:**

- 通过 `req.session.foo = 'bar'` 存储内容, `req.session.foo` 获取内容. 
- 默认是暂存在内容中, 服务器重启后就会删除. 实际应用时是存储在数据库中的.
- 服务端存储后会向客户端发送一把钥匙, 只有客户端存有该钥匙的时候, 才能获取到 session 所存储的内容

### Example

```javascript
var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

/*
 配置项

*/
app.use(session({
  secret: 'keyboard cat', // 拼接一个自定义字符串再进行加密, 防止破解或冲突
  resave: false,
  saveUninitialized: true // 无论是否使用session都分配一把钥匙
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})
```

