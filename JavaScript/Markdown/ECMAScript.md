# 最后一遍 ECMAScript

## 变量

> 变量是用于存储信息的"容器"。

如何声明变量

命名规则和规范

案例01. 不新建中间变量交换两个变量的值

```javascript
let a = 3, b = 5
a = a + b
b = a - b
a = a - b
```

## 数据类型

> JavaScript 为弱类型语言

简单数据类型

最大值：Number.MIN_VALUE
最小正值：Number.MAX_VALUE
正无穷：Infinity
负无穷：-Infinity
不是数值：NaN。不与任何值相等，包括它自己。可以用 `window.isNaN(num)` 进行判断

**注意：**由于计算机中是用二进制存储数值，所以浮点数存在精度问题。应避免用浮点数做相等比较。

在字符串中使用特殊符号需要添加转义字符

`str.length` = 字符串的长度

任何数据类型和字符串做 `+` 运算，都是拼串

复杂数据类型

判断数据类型的方式：

`typeof variable` = 返回的结果是字符串类型

- Number => number
- String => string
- Boolean => boolean
- Undefine => undefine
- Null => object
- Object => object

## 数据类型转换

Number 和 Boolean => String

- toString()
- String()
- foo + ''

Undefine 和 Null => String

- String()
- foo + ''

String => Number

- Number()
  - 空串或只有空格 => 0
  - 纯数值（忽略前后空格） => 相应数值
  - 其他 => NaN
- parseInt()
  - 数值开头的字符串(忽略前面的空格) => 字符串前面的整数部分
  - 其他 => NaN
  - parseFloat()
    - 同上。多读取小数部分而已
  - 其他数据类型会先转成字符串类型，然后使用字符串的转换方式
- 取正数：+foo

其他 => Number

- true => 1
- false => 0
- null => 0
- undefined => NaN

其他 => Boolean

- 方式：Boolean() 和 !!foo
- 为 flase 的情况有 5 种
  - 0，NaN
  - 空串
  - null
  - undefined
- 其他都是 true

## 运算符

算数运算符：+ - * / %

一元运算符：++ --

逻辑运算符：&& || ！（短路）

关系运算符：> < >= <= == != （左边部分会进行隐式数据类型转换，右边的不会） === !==

赋值运算符：= += -= *= /= %=

## 表达式和语句

概念

## 流程控制

流程控制条件部分的表达式结果会隐式转换为布尔类型

### 顺序结构

### 分支结构

if...else  switch  三目运算符

### 循环结构

while  do...while  for

break continue

## debug

- 语法错误
- 逻辑错误

调试方式：

- 过去用 `alert()` 或 `console.log()` 观察结果
- 使用 chrome 调试工具。可以 watch 变量的值，也可以看到代码的执行顺序

## 数组

`foo.length = 0` 可以清空数组

冒泡排序

```javascript
let i, j, flag
const foo = [23, 21, 55, 34, 15, 18, 33]
for (i = 0; i < foo.length - 1; i++) {
  flag = true
  for (j = 0; j < foo.length - 1- i; j++) {
    if (foo[j] > foo[j+1]) {
      foo[j] = foo[j] + foo[j+1]
      foo[j+1] = foo[j] - foo[j+1]
      foo[j] = foo[j] - foo[j+1]
      flag = false
    }
  }
  if (flag) {
    break
  }
}
console.log(foo)
```

## 函数

函数也是一种数据类型，可以作为参数和返回值

### 声明

### 调用

### 参数

### 返回值

### arguments

### 匿名函数

## 作用域

### 作用域链

## 预解析

变量声明和函数声明提前

在预解析过程中，如果变量名跟函数名一样，则函数优先

## 对象

对象 => 封装实例的属性和方法
函数 => 封装实现特定功能的代码段

### 创建对象的方式：

- 字面量 => {}
- `new Object()`
- 工厂模式
- 自定义构造函数

### new 关键字的执行过程

### 遍历

`for...in` 遍历对象
`delete foo.bar` 删除对象的属性

## 数据如何在内存中的存储

简单类型 => 栈内存
引用类型 => 堆内存

## 内置对象

推荐去 [MDN](https://developer.mozilla.org/zh-CN/) 查询，更加详细全面

Math

不是构造函数，提供的是静态属性和方法

- Math.PI
- Math.random() * (max - min) + min => 生成 min 到 max 之间的随机数，左闭右开
- Math.floor()/Math.ceil()
- Math.round()
- Math.abs()
- Math.max()/Math.min()
- Math.sin()/Math.cos()
- Math.power()/Math.sqrt()

Date

构造函数，提供实例属性和方法

Date 对象基于 1970 年 1 月 1 日 0点 0 分 0 秒 （世界标准时间）的毫秒数。这个时间以前的毫秒数为负值

GMT 格林威治时间
GMT+0800 中国标准时间

GMT起始到现在的毫秒数为：

```javascript
const foo = new Date()
console.log(foo.valueOf())
console.log(foo.getTime())
console.log(Date.now())
```

valueOf()通常在JavaScript内部被调用，不推荐在代码中显示调用；Date.now()在H5中新增的，存在兼容问题。用getTime()最合适。

小技巧：`const now = + new Date()` 可以直接获取到现在的毫秒值

Date() 的语法

- new Date();
- new Date(value);
- new Date(dateString);
- new Date(year, monthIndex [, day [, hours [, - minutes [, seconds [, milliseconds]]]]]);

日期格式化方法：

- foo.toString => console.log()内部会自动将日期转化为字符串
- foo.toDateString
- foo.toTimeString
- foo.toLocalDateString
- foo.toLocalTimeString

获取指定部分的日期：

注意：月份和星期是从0开始的

两个日期相加减实际上是对应的毫秒数做加减，内部会调用 valueOf() 方法

Array

typeof无法判断数组对象，可以用 instanceof 或 Array.isArray()（存在兼容性，H5新增的）

valueOf和toString

- valueOf() 的返回值就是数组对象本身
- toString() 的返回值是数组字面量字符串

常用实例方法：

清空数组的方式：

- arr = [] (推荐)
- arr.length = 0
- arr.splice(0)/arr.splice(0, arr.length)


String

基本包装类型

- String()
- Number()
- Boolean()
- 最多使用的是String()，其他两个基本不用，会造成歧义。即使是 false 的 Boolean() 也是一个对象，在做判断的时候会当作 true 处理

**字符串的不可变**

给存储字符串的变量重新赋值时，会新开辟一个空间，然后让变量指向它，以前的空间会被系统回收掉。

这一特性会导致拼接字符串的时候性能很低 => 不断的开辟新空间存储拼接后的字符串

字符串的常用属性和方法：

- `charAt()`/`charCodeAt()`/`str[index]`（H5新增）
- slice()/substring()/substr()
- indexOf()/lastIndexOf()
- trim()
- toUpperCase()/toLowerCase()
- search() => 和 indexOf()一样，只不过支持正则表达式 
- replace() =>只替换第一个字符
- split()

字符串的所有方法都不会修改原字符串(不可变性)，而是返回一个新字符串


## 学习 API 的方式

- 弄清楚 API 的作用
- 参数的含义和类型
- 返回值的含义和类型
- 写个 demo 测试一下