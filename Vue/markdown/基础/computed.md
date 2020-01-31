## Computed

模板内的表达式时非常便利, 但是设计它们的初衷是用于简单运算的. 在模板中放入太多逻辑会让模板过重且难以维护.

所以, 对于任何复杂逻辑, 都应当使用**计算属性**

### 计算属性缓存 vs 方法

计算属性是基于它们的响应式依赖进行缓存的, 只在相关响应式依赖发生改变时它们才会重新求值. 而方法每次使用都会执行一遍代码, 性能较低

### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性. 如果一个属性有多个响应式依赖, 就需要分别 watch 每一个依赖, 非常的麻烦.

```javascript
watch: {
  firstName: function (val) {
    this.fullName = val + ' ' + this.lastName
  },
  lastName: function (val) {
    this.fullName = this.firstName + ' ' + val
  }
}
```

为了得到 fullname, 需要侦听 firstname 和 lastname. 而 computed 只需要一句代码

```javascript
computed: {
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}
```

### 计算属性的 setter

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

set() 可以侦听计算属性的值, 响应回依赖的数据

### watch

这是 Vue 提供的一种更通用的方法, 来响应数据的变化. 当需要在数据变化时执行异步或开销较大的操作时, 这个方式最有用.
