# clac

此CSS函数让你在声明CSS属性值时执行一些计算。

```css
/* property: calc(expression) */
width: calc(100% - 80px);
/*宽度永远比父盒子小80像素*/
```

支持 + - * /

实际应用： 使用 calc() 可以很容易的为一个对象设置一个左右两边相等的外边距 

```css
.banner {
    position: absolute;
/* fallback for browsers which still doesn't support for `calc()` */
    left: 5%;
    width: 90%;
/* overwrite, if the browsers support for `calc()`*/
    left: calc(40px);
    width: calc(100% - 80px);
    border: 1px solid black;
}
```

