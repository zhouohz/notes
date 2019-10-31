# Filter

C3新增属性，将**模糊**或**颜色偏移**等图形效果应用于元素。滤镜通常用于调整图像，背景和边框的渲染。 

```css
filter: url("filters.svg#filter-id")|blur(5px)|contrast(200%)|grayscale(80%)|hue-rotate(90deg)|drop-shadow(16px 16px 20px red) invert(75%);
```

其值为一个函数

url()函数可以引入一张图片

blur()表示模糊程度，参数为具体像素