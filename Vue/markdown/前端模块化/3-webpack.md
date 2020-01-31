## Webpack

它主要有两个工作: 模块 和 打包

模块: 将模块之间的依赖关系整合起来

打包: 将开发所有的语法转化为浏览器能识别的通用语法, 包括图片压缩, 文件合并等工作

Webpack 的运行依赖于 node 环境, 还需要使用 npm

vue-cli2 依赖的是 webpack3

webpack 的安装分为全局和局部, 直接在终端中使用的是全局安装的 (--global), 如果是在 package.json 的 scripts 选项中配置的则用的局部安装的 webpack (--save-dev)

### 起步

项目中通常都有两个文件夹 src(source) 和 dist(distribution) 即源文件和发布文件, 开发的时候在 src 目录中写, 上线的是 dist 目录

通常 main.js 作为程序的入口

webpack ./src/main.js ./dist/bundle.js 它会自动将 main.js 的依赖模块一起打包整合, 生成到 bundle.js 中

在 index.html 中引入 bundle.js 即可让浏览器识别

webpack 支持很多的模块化规范, 底层封装好了的

### webpack.config.js

webpack 的配置文件, 可以指定打包的入口文件, 打包到哪里等等

```javascript
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  }
}
```

output 的 path 选项必须是绝对路径, 可以用 node 的 API 进行拼接

这样配置之后, 就可以直接执行 webpack 打包了, 不需要再指定文件

通常, 我们还会在项目中执行 npm init, 让 npm 和 webpack 配合使用, 将 webpack 的命令映射到 npm 中, 用 npm run 命令去执行.

在 package.json 的 scripts 选项中进行配置, 里面的属性名都是通过 npm run xxx 执行. 相当于 alias 关键字

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

区别: 这种方式执行的 webpack 命令会优先使用当前目录中安装的 webpack, 而直接在命令行运行 webpack 命令是优先使用全局安装的 webpack 工具

通常, 我们会在项目中安装对应版本的 webpack, 用 npm run 的方式运行, 便于项目移植, 别人全局中的 webpack 版本可能不对

项目中的 webpack 可以被看作是一个开发时的依赖包

## loader

对 webpack 的功能进行扩展. 原生的功能就是打包 JS 文件

使用: 通过 npm 进行安装, 再到 webpack.config.js 中进行配置

安装和配置的代码可以去官网查看

loader 也相当于是一个开发时依赖包

### 打包 css 文件

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配所有的 .css 文件
        use: [ 'style-loader', 'css-loader' ] // 对 css 文件使用的 loader
      }
    ]
  }
}
```

webpack 是从右向左读取 loader 的.

### 打包 less 文件

安装:

```shell
npm install --save-dev less-loader less
```

less 包用于将 less 语法解析为 css 语法

配置:

```javascript
// webpack.config.js
module.exports = {
  ...
  module: {
      rules: [
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
        }
      ]
  }
};
```

这里的 use 使用的是数组+对象的语法, 可以配置更多的选项.

### 打包资源文件

这里以图片为例

```shell
npm install --save-dev url-loader file-loader
```

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片小于 limit 时, 会将图片编译为 base64 字符串
              // 大于 limit 的图片需要使用 file-loader, 这个 loader 不需要再配置, 但需要安装. 会把图片打包到 dist 目录中, 作为一个资源使用, 其名字经过 hash 算法处理保证唯一
              limit: 8192,
              name: '[path][name].[hash].[ext]' // 指定打包后图片的名字格式
            }
          }
        ]
      }
    ]
  }
}
```

### babel

默认不会将 ES6 语法转化为 ES5, 需要配置 babel-loader, 以兼容低版本的浏览器

```shell
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] // 这个需要配合 .babelrc 配置文件使用
        }
      }
    }
  ]
}
```

有点麻烦.

### Vue

现在我们是以模块化的方式组织项目

安装 `npm install vue --save`

在 JS 模块中导入

```javascript
// 直接写包名即可, webpack 会默认去 node_modules 目录中寻找
import Vue from 'vue'

const vm = new Vue({

})
```

Vue 对不同构建版本的解释

- runtime-only 代码中不能包含 template, 无法解析
- runtime-compiler 有 compiler 可以编译 template 模板

需要在 webpack.config.js 中进行配置

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

它的含义是: 在 import vue 的时候, 去找指定的 vue.esm.js 版本. 默认是加载的 vue.runtime.js 版本

#### 根实例的 template 选项

在实际开发中, 我们并不希望频繁的修改 index.html 中的 div#app. 这时就可以配置 template 选项

```javascript
new Vue({
  el: '#app',
  template: `
    <div id="app">{{ msg }}</div>
  `,
  data: {
    msg: 'hello Vue'
  }
})
```

template 指定的模板会替换 index.html 中的 div#app 元素, 相当于是一个插槽

#### 抽取根实例中的模板

实际开发中, new Vue() 实例中也不会进行复杂的业务逻辑. 而是抽取到一个组件中, 当作根实例使用

```javascript
const App = {
  template: `
    <div id="app">{{ msg }}</div>
  `,
  data() {
    return {
      msg: 'hello Vue'
    }
  }
}
new Vue({
  el: '#app',
  template: `<App/>`,
  components: {
    App
  }
})
```

然后将 App 这个配置对象提取到一个 JS 文件中用 export default 导出, 在 main.js 中通过 import App form './vue/app.js' 导入使用, 这样 main.js 中的代码也就简洁了

最终方案: 将 App 配置对象提取到 .vue 文件中, 里面包含三个部分 template script style, 以标签的形式, 将结构, 样式和行为分离开来.

```vue
<template>
<div id="app">{{ msg }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello Vue'
    }
  }
}
</script>

<style>
</style>
```

导入到 main.js 中 import App form './vue/app.vue'

这里导入的 App 相当于是 Vue.extend() 生成的组件构造器对象

这时 webpack 是无法识别的 .vue 文件的, 同样的需要安装配置一些 loader

```shell
npm install -D vue-loader vue-template-compiler
```

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

## Plugin

loader 负责导入和编译

plugin 负责功能扩展, 如打包优化, 文件压缩

webpack 内置了一些插件, 需要在 webpack.config.js 中配置. 也可以通过 npm 下载其他插件, 进行配置使用

### webpack.BannerPlugin

在每个打包出来的文件的顶部生成一个注释块, 著名一些版本信息, 作者, 开源协议等

文档: https://webpack.js.org/plugins/banner-plugin/

```javascript
const webpack = require('webpack');

module.exports = {
  entry: //...,
  output: //...,
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}

```

### HtmlWebpackPlugin

文档: https://webpack.js.org/plugins/html-webpack-plugin/

开发时, index.html 在项目的根目录中, 需要通过这个插件打包到 dist 目录中

可以指定生成的 index.html 的模板, output 生成的文件都会加载进去

非 webpack 自带, 需要安装 `npm install --save-dev html-webpack-plugin`

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 这里指向的是根目录中的 index.html 作为模板, 里面不需要引入其他文件, 会自动引入
      template: 'index.html'
    })
  ]
};
```

项目上线的是 dist 目录

### UglifyjsWebpackPlugin

文档: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/

压缩(丑化) JS 代码

安装: `npm install uglifyjs-webpack-plugin --save-dev`

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```

可以传入一个配置对象

## DevServer

我们可以配置一个本地的服务器, 去监听 dist 目录, 当代码发生改动, 就在内存中自动生成打包好的文件, 而不是每次都实际生成到 dist 目录中. 待调试完成后再 npm run build 生成. 提高开发效率

安装: `npm install webpack-dev-server --save-dev`

```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 指定监听的目录
    inline: true, // 实时刷新
    compress: true,
    port: 9000 // 默认是 8080 端口
  }
};
```

再去 package.json 的 scripts 中配置命令

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --open"
}
```

这样就会运行项目中的 webpack-dev-server 工具, --open 是打开默认浏览器

相当于 live-server 扩展

## webpack 配置文件分离

文档: https://webpack.js.org/guides/production/

看文档就知道了, 内容有点多

通过前面可以发现, 有些配置项是开发时需要, 有些是上线时需要.

可以分为三个配置文件 公共配置 开发配置 上线配置

再到 scripts 配置中指定不同阶段的配置文件