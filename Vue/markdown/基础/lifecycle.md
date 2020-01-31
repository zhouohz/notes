## LifeCycle

![lifecycle](./images/lifecycle.png)

在创建 vue 实例的过程中, 其内部会做很多的操作. 可以分为四个阶段:

- create
- mount
- update
- destory

Vue 在这些阶段的前后为我们提供了 callhook 钩子函数, 让我们可以在某个阶段的时候进行自定义的操作.