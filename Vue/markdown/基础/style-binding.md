## Style-binding

### 对象语法

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```

### 数组语法

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

将多个样式对象应用到同一个元素上