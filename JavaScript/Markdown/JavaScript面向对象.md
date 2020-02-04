# Class

## 基本使用

```javascript
class Student {
  // new 的时候会自动调用constructor函数，返回实例对象，即使不写，内部也会生成一个
  constructor (name) {
    this.name = name
  }
  study (doing) {
    console.log(this.name + '在' + doing)
  }
}
let stu1 = new Student('Tom')
```

## 继承

```javascript
class Father {
  constructor () {

  }
  method () {
    console.log('Father')
  }
}
class Son extends Father {
  // 可以继承父类的属性和方法
}

let son1 = new Son()
son1.method()
```

### super关键字

可以访问和调用父类上的函数

使用场景：如果父类中的方法有使用自己的属性，而子类也想用这个方法，在传参的时候是没办法传递给父类构造函数中的this指向的对象的，因此，需要在子类的构造函数中调用父类的构造函数，让参数传递给父类的this对象的属性。

```javascript
class Son {
  constructor (x, y) {
    super(x, y)
  }
}
```

相当于子类的数据传递给了父类的构造函数，而父类的方法只能用父类构造函数中的数据，子类继承后使用的方法实际也是父类的

在继承中，如果子类有方法和父类同名，优先使用自己的，如果没有则在父类中寻找。就近原则。

super 也可以调用父类的普通方法 `super.method()`，即使子类中有重名的

如果子类有自己的方法需要用到自己的this，同时又想用继承的方法，也需要调用父类的constructor函数。此时需要先调用super后写子类的this

```javascript
class Son {
  constructor (x, y) {
    super(x, y) // 必须写在子类的this前面
    this.x = x
    this.y = y
  }
}
```

注意点：

1. class 没有声明提前，必须先构造类，才能实例化对象
2. class里面的共有属性和方法，要加上this.才能使用，因为那些属性和方法是属于this指向的实例对象的
3. 注意类里面this的指向问题，即使在constructor里面，事件函数中的this依然是指向事件源的。总的来说依旧遵循，谁调用的，函数里面的this就指向谁。

## 原型

在ES6之前JavaScript是没有类这个概念的，而是使用构造函数来定义对象和它们的特征

以前创建对象有三种方式：1.对象字面量 2.new Object() 3.自定义构造函数

构造函数主要用来初始化对象，与 new 一起使用才有意义（new会做四件事情），可以把对象的公共属性和方法抽取出来封装在构造函数中

### 静态成员和实例成员

构造函数本身也是一个对象，可以添加一些成员，称为静态成员，只能通过构造函数访问

而给构造函数中的this添加的成员，称为实例成员，只能通过实例对象访问

### prototype

构造函数中如果存放了方法，则会为每个实例对象都开辟一个内存空间存放相同的函数，存在内存浪费的问题。

而通过构造函数的prototype对象存放的函数是所有实例共享的。原型就是用来共享方法的，而一些公共属性还是直接写在构造函数中，这个对象里面都会有一个constructor属性，指向构造函数自身，当我们用字面量的形式为原型添加方法时，需要手动指回构造函数

实例之所以能够访问构造函数原型对象中的方法，是因为有`__proto__`属性指向了构造函数的prototype对象，这个属性的意义在于为对象的查找机制提供一个方向，不是一个标准属性，实际开发中不可以使用

原型链：调用实例的成员时，会逐层的沿着原型链寻找。终点是Object.prototype，它的__proto__属性指向的是null。如果原型链中都有该成员，则遵循就近原则

原型对象中的this也是指向实例对象的，因为，最终使用的时候，也是由实例去调用，this的指向是在调用的时候决定的

我们可以利用原型对象，扩展内置对象，添加自定义的方法。注意：不能用字面量对象的方式进行覆盖，会报错

## 继承

在ES6之前，并没有`extends`继承，只能使用构造函数+原型对象模拟实现继承，称为组合继承

补充：call() ==> 可以调用函数，还可以修改函数执行时的this指向

语法：`fn.call(newObj, arg1, arg2, ...)`

继承属性的核心原理：通过`call()`函数把父类的this替换为子类的this，以实现子类继承父类

```javascript
function Son () {
  // 这里的this指Son的实例对象
  Father.call(this)
  // Son自己的属性也可以写在后面
}
```

其实就相当于借用了父类构造函数的代码

那么如何继承方法呢？

可以用子类的原型指向父类的原型，这样子类的实例可以顺利使用父类的方法。但是，当子类想要添加自己的方法时，父类的原型中也会有，父类的实例也能使用子类的方法。

解决方法：`Son.prototype = new Father()`

Son的实例方法会去Son.prototype中找，也就是在Father的实例中找，而Father的实例会去Father的prototype中找，也就实现了继承。当Son在自己的prototype中添加自己的方法时，相当于添加在Father的实例对象中，不会影响Father的prototype。

注意：`Son.prototype = new Father()`相当于覆盖了Son.prototype，需要将constructor重新指向构造函数

类（class）的本质其实就是函数，ES6的class只是一种语法糖，绝大部分功能在ES5中也能实现，这样做只是为了让原型的写法更清晰，更像面向对象的语言。它也有原型，其实例也有__proto__属性。