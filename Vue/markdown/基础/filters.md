## Filters

Vue 可以定义全局的或局部的过滤器, 用于 mustache 语法中, 默认值会作为实参传递给过滤器函数, 过滤器函数的返回值会作为新值显示在视图中.

```html
<!-- 默认传参省略不写, 中间用管道符连接 -->
<h3>oldvalue | filter</h3>
```