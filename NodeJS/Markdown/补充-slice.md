## 原生数组的 slice 方法

slice(下标1, 下标2) 从下标1开始截取数组，截到下标2，但不包括下标2。结果作为一个新的数组返回。如果不写下标2，则直接截取剩余的全部

它有一个能力就是将伪数组转为数组 `let newArr = [].slice.call(伪数组)`

其原理就是 slice 内部有一个for循环，遍历了伪数组的全部项，并放到一个新数组中返回了。

自己实现 slice 的代码

```javascript
Array.prototype.mySlice = function () {
  let start = 0
  let end = this.length
  if (arguments.length === 1) {
    start = arguments[0]
  } else if (arguments.length === 2) {
    start = arguments[0]
    end = arguments[1]
  }
  let result = []
  for (let i = start; i < end; i++) {
    result.push() = this[i]
  }
  return result
}
```

