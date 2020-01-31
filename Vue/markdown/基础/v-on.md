## v-on

### $event

默认会把 event 事件对象传递给回调函数, 但是, 当传递了其他实参时, 还想得到 event 事件对象, 就需要手动传递.

```html
<button v-on:click="handleClick(value, $event)"></button>
```

注意: 不传参时, 写了 () 就不能得到默认的 event 事件对象了

```html
<button v-on:click="handleClick()"></button>
```

### 修饰符

- .stop
- .prevent
- .native 在组件中监听原生事件
- .once