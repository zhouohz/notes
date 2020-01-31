## mustache

```html
<h2>hello, {{ msg }}</h2>
```

mustache 中可以执行任何的 JS 表达式

可以与标签内容进行拼接, 且带有格式

相较于 v-text 更加灵活. v-text 绑定的值会覆盖标签的内容

存在闪烁问题, 不过 Vue 提供了解决方案