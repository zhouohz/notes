## 数组更新检测

Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- push()
- pop()
- shift()
- unshift()
- splice() 删除并替换
- sort()
- reverse()

补充: `...` 语法为可变参数, 可以传入任意个参数, 保存在 arg 数组中.

```javascript
function foo (...arg) {
  console.log(arg) // arg 为参数组成的数组
}

foo('a', 'b', 'c') // ['a', 'b', 'c']
```

对于非变异的方法, 可以用替代的方式, 将经过处理后的新数组赋值给原数组

```javascript
this.items = newItems
```

## 对象变更检测注意事项

可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性. 还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：`vm.$set(vm.userProfile, 'age', 27)`