## Using middleware

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.


## 理解

基本感知: 服务端从接收请求到响应可以看作是一个生命周期, 在这个生命周期之中, 会有不同的环节对这个请求进行解析和处理, 这些环节就是中间件. 比如 body-parser 这个中间件, 它的作用就是获取请求体中的查询字符串转化为对象存储在 req.body 属性当中. 这样处理之后, 后面的路由环节, 就可以直接使用 req.body 直接得到前端提交的数据了.

简单的说, 中间件就是一个中间处理环节, 让后面的环节可以更轻松的执行.

在 express 的内部维护了一个中间件数组, 中间件函数就存放在这个数组中

```javascript
app.use(function (req, res, next) {
  // 处理代码

  next()
})

app.use('/foo', function (req, res, next) {
  // 处理代码

  next()
})

app.use('/bar',function (req, res, next) {
  // 处理代码

  next()
})
```

请求会按照顺序进入不同的中间件函数进行处理, 当然, 请求进入的是下一个匹配的中间件. 如果中间件函数中没有调用 next() 函数, 那么请求就不会进入后面的中间件函数. 

app.use() 的第一个参数就是匹配以 `/xxx` 开头的 url, 如果没有指定, 那么任何请求都会被处理 