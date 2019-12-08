## 文档

http://aui.github.io/art-template/express/

## 安装

```shell
npm install --save art-template
npm install --save express-art-template
```

## 使用

```JavaScript
// 引包
var express = require('express');
var app = express();

// 配置
// 第一个参数表示渲染 .art 文件的时候,使用art-template模板引擎
// express-art-template 的作用是将 art-template 整合进 express 中.虽然不需要引 art-template 包了,但是 express-art-template 有依赖 art-template ,所以也是必须要下载的. 
app.engine('art', require('express-art-template'));
// 以下三个 set 是可选的配置,可以不写
// app.set('view', {
//     debug: process.env.NODE_ENV !== 'production'
// });
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'art');

// 路由
// express 为 response 提供了 render 方法, 只能在配置了模板引擎后使用, 默认不可用
// render('模板名', {模板数据})
// 第一个参数不需要写路径,它会默认去找同级的 views 目录中找对应的模板, 这是express的约定
// 如果views目录中还有目录a,那么模板名就要写 a/b.html 直接相对于 views 写相路径 
// 如果希望改掉views默认路径,可以通过 app.set('views', '指定路径') 进行配置
// 而且,模板的扩展名必须为前面配置的 art ,当然里面的内容还是html.如果不希望这样,也可以把前面配置中的art改为html,这样有利于编辑器语法和高亮
// 如果该模板没有数据,第二个参数可以不写
// render 方法的作用就相当于,读取文件 + 渲染模板 + 响应
app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```

