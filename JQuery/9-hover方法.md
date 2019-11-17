## hover

该方法等同于 mouseenter 和 mouseleave 事件的综合写法

```javascript
$('div').hover(fn1, fn2);
```

它的参数是两个事件执行函数，前者是鼠标移入时的操作，后者是鼠标移出时的操作

如果只写一个执行函数，那么不管鼠标进入还是离开都会执行

配合 toggle 类型的函数，可以简化代码，交替执行