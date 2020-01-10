## res.json([body])

Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.

```javascript
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```

相当于将对象转化为JSON和响应这两步合并成了一个 API. 其内部也是 `JSON.stringify()` 进行转化的.