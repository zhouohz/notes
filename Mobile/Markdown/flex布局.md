# flex

> Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力 

如果不考虑兼容性的问题，无脑用 flex 就完事了

注意点：在 flex 布局中，float、clear 和 vertical-align 会失效

父元素称为容器，子元素称为项目

原理：通过将父盒子变为flex容器，来控制子元素的排列方式

## 容器属性

| 属性            | 值                                                           | 描述                                                         |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| flex-direction  | row\|row-reverse\|column\|column-reverse                     | 规定主轴方向（默认row）                                      |
| justify-content | flex-start\|flex-end(元素的顺序不会改变)\|center\|space-around\|space-between | 规定**主轴**上子元素的排列方式                               |
| flex-wrap       | nowrap\|wrap                                                 | 是否允许子元素换行，默认不换行，如果装不下了就减少盒子的宽度。平均分配高度 |
| align-content   | flex-start\|flex-end(元素的顺序不会改变)\|center\|space-around\|space-between | 规定侧轴上子元素的排列方式只在设置了wrap时有效，不论是否换行了 |
| align-items     | stretch(项目没有宽度时生效)\|flex-start\|flex-end\|center    | 规定侧轴上子元素的排列方式（单行）                           |
| flex-flow       |                                                              | 简写属性，flex-direction和flex-wrap                          |

## 项目属性

### flex

> 属性值为具体数值，表示当前项目的宽度占主轴**剩余宽度**的多少份。默认为 0

总的份数为主轴上所有项目的 flex 值之和

### align-self

> 控制当前项目在侧轴上的排列方式。

可以覆盖 align-items 属性，默认值为 auto。同样的只能控制当前项目在自己所在行内的对齐方式

### order

> 控制项目的排列顺序

默认值为 0，其值可以为负数，值越小就越靠前排列