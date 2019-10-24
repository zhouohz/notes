# ES5中新增的方法

## 数组的迭代方法

1. `arr.forEach(function(value, index, arr){})`

   ```javascript
   var arr = [1, 2, 3]
   var sum = 0
   arr.forEach(function (value) {
     sum += value
   })
   console.log(sum)
   ```

2. `var newArr = arr.filter(function(value, index, arr){})`将符合条件的值组成一个新的数组返回

   ```javascript
   var arr = [1, 2, 3]
   var newArr = arr.filter(function (value) {
     return value >= 2 // 将大于等于2的数组成新数组返回
   })

   console.log(newArr)
   ```

3. `var flag = arr.some(function(value, index, arr){})`查找数组中是否有符合条件的值，返回一个布尔值

   ```javascript
   var arr = [1, 2, 3]
   var flag = arr.some(function (value) {
     return value >= 3 // 只要有一个大于等于3的数就返回true，遇到了符合条件的就终止循环
   })
   ```

辨析：forEach()和some()

如果只是查找某个元素，用some效率更高，找到后return true会终止循环，而forEach会遍历完数组

## 字符串方法

1. `str.trim()`：返回一个清除了字符串两端空白字符的新字符串

## 对象方法

1. `Object.defineProperty(obj, prop, descriptor)`设置对象的属性

   descriptor：是一个对象
   
   {
     value：属性值。默认为 undefined
     writable：是否可重写。默认为false，不可以被修改
     enumerable：目标属性是否可以被枚举（是否可以被遍历到）。默认为false
     configurable：目标属性是否可以被删除或再次修改其descriptor。默认为false
   }

2. `Object.keys(obj)`用于获取对象的属性，返回一个由属性名组成的数组，类似于for in