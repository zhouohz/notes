## 笔记

笔记一定要好好做，多花个几分钟，以后能省很多事。主要是可以快速浏览，防止遗忘。对于我这种没什么安全感的人来说，简直不要太好用。

 语言只是工具，帮助我们实现业务逻辑的。

## Nodejs 是什么

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 

Nodejs不是一门语言，也不是库和框架。它是一个js运行时环境，相当于浏览器，可以解析和执行 JS 代码。也就是说现在的 JS 可以脱离浏览器运行。

它是基于 V8 JS引擎开发的。就是专门处理JS脚本的虚拟机。代码只是具有特定格式的字符串，而引擎能够识别它

浏览器中的 JS组成：ECMAScript  BOM  DOM

Nodejs中的JS组成：没有了BOM和DOM，服务端不管页面和浏览器，而是提供了一些服务器操作相关的API，如文件读写，构建网络服务，网络通信。当然也有ECMAScript

所以，JS 是有 基础语法 + 宿主环境提供的API组成

Nodejs的特性：

- 事件驱动
- 非阻塞IO模型
- 轻量高效

Nodejs的包生态系统 NPM 是世界上最大的开源库生态系统

绝大多数的 JS 相关的包都放在 npm 上，这样做的目的是为了让开发人员更方便的下载使用。如 `npm install jquery`

## NodeJS能做什么

1. Web 服务器后台。
2. 命令行工具。如 Git npm hexo 等

前端人员接触 node 最多的是使用别人写的命令行工具，如 webpack gulp npm 等等

## 资源推荐

《深入浅出的Node.js》 偏理论

《Node.js 权威指南》 API 讲解

cnodejs.org 中文社区

## 学习目标

- B/S 编程模型
- 模块化编程
  - 以前的 JS 文件之间无法相互引用，只能在 HTML 页面中通过script标签按依赖顺序引入
  - 在 node 中可以像 css 的 `@importj("")` 一样引用JS 文件
- node 常用 API
- 异步编程
  - 回调函数
  - Promise
  - async
  - generator
- Express 框架
- ES6
  - 新的语法规则而已