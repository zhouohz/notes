# 三大特性

## 层叠

给相同的元素设置相同的样式，后面的会层叠（覆盖）掉前面的。

解决样式冲突的问题

在 Chrome 调试工具中，被层叠掉的样式，代码上有一条删除线

## 继承

CSS 的部分样式可以被继承。如字体颜色、字号等文字和文本相关的属性。

在 Chrome 调试工具中，会有 Inherited from XX 的标注

恰当的使用可以简化代码，直接给外层标签设置

## 优先级

用不同的选择器选中同一个元素时，选择器优先级高的生效，会忽略层叠的影响。

优先级相同时，还是根据层叠而定

| 选择器               | 优先级     |
| -------------------- | ---------- |
| 继承，通配符（*）    | 0，0，0，0 |
| 元素选择器           | 0，0，0，1 |
| 类选择器，伪类选择器,属性选择器 | 0，0，1，0 |
| ID选择器             | 0，1，0，0 |
| 行内样式             | 1，0，0，0 |
| !important           | MAX        |

不论多少个低优先级选择器，都无法超过1个高优先级选择器

在设置样式时，有这样的情况，可以继承的样式，在子元素中无效，比如a、h等等。这是因为，浏览器给它们添加了默认样式，优先级比继承的高

优先级计算

复合选择器存在权重叠加现象

规则：根据出现的基础选择器，将其**优先级对位相加**（不能进位）即可

**注意**：伪类选择器的权重 = 元素选择器的权重 + 伪类选择器的权重

```css
a:hover {
    /*
    权重为：0，0，0，1 + 0，0，1，0 = 0，0，1，1
    */
}
```

