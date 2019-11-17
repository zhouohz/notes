## attr()

用法和prop()一样，但是，它可以获取自定义属性

类似于原生的 getAttribute() 和 setAttribute()

当然也可以获取固有的属性值，与 prop() 不同的是它获取的是开发时的属性值

![attr&prop](images/attr和prop.png)

还有一个缺点就是 获取 checked 这类属性时 得到的值也是 checked 就不如 prop() 方法的布尔值方便