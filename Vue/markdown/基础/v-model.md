## v-model

v-model 双向绑定表单元素相当于 v-bind:value 和 v-on:input 配合使用.

```html
<input v-bind:value="msg" v-on:input="msg = $event.target.value">
<p>{{ msg }}</p>
```

其他表单元素是 checked 和 change 事件

可以理解为一个语法糖

### 绑定单选框

v-model 获取的是预设的 value 值, 在设置时也必须和 value 的值一致才能默认选中

```html
<input type="radio" value="男" v-model="gender"> 男
<input type="radio" value="女" v-model="gender"> 女
```

当 v-model 绑定同一个响应式数据时, 不设置相同的 name 值, 单选框也能实现互斥

但是, 想要成功提交表单, 表单元素还是必须设置 name 属性

### 绑定复选框

只有一个复选框时如果绑定一个布尔值, 则获取的也是布尔值, 选中为 true, 否则为 flase

也可以绑定一个数组, 保存的是 checkbox 的 value 值

如果有一组 name 相同的复选框, 则只能绑定数组

```html
  <!-- others 为数组 -->
  <input type="checkbox" v-model="others" value="其他1" name="other">其他1
  <input type="checkbox" v-model="others" value="其他2" name="other">其他2
  <input type="checkbox" v-model="others" value="其他3" name="other">其他3
```

### 修饰符

- .lazy 将输入框的 input 事件改为 change 事件. 只有确认输入之后才会获取值更新到 data 中. 提高性能
- .number 内部调用的是 parseFloat() 如果无法解析, 则得到原始值
- .trim 去除首尾空格