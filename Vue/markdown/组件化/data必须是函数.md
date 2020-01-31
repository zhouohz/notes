## data 必须是函数

```javascript
data: function () {
  return {
    count: 0
  }
}
```

如果没有这个规则, 复用组件的时候, 它们会维护同一个 data 对象, 相互影响

data() 每次被调用都会创建一个新对象交给实例维护
