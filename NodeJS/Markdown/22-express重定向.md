## 重定向

express 给 response 对象添加了一个 redirect 方法, 可以重定向

res.redirect('/') 重定向到首页

相当于原生的 res.statusCode = 302; res.setHeader('Location', '/')