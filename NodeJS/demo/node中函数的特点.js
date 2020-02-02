console.log(arguments.callee.toString())
/*
在 node 中任何一个模块中的代码都在一个函数中. 
function (exports, require, module, __filename, __dirname) {}
用于隐藏内部实现; 支持 commonJS 模块化规范
*/
console.log(__dirname)  // /home/void/Documents/notes/NodeJS/demo
console.log(__filename) // /home/void/Documents/notes/NodeJS/demo/node中函数的特点.js

