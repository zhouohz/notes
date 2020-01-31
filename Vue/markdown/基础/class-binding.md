## class binding

### Object Syntax

```html
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
```

```javascript
data: {
  isActive: true,
  hasError: false
}
```

键为 classname 值为布尔值, 为 ture 时应用, 为 flase 时取消

### Array Syntax

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

数组的每一项都是一个 classname 可以为表达式, 也可以是一个对象(由 value 控制是否应用)

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

**Tips:** 可以和普通的 class 属性共存