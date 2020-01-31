## vue-cli

快速生成项目结构, 及对应的开发环境配置, webpack 配置等

俗称: "脚手架"

前面学 webpack 也看到了, 配置不难但很麻烦

## 依赖

webpack node npm

注意版本相对应

## 安装

```shell
# v3
npm install -g @vue/cli
# v2
npm install -g vue-cli
```

注意: v2 和 v3 的命令以及初始化的模板不同. 如果安装了 v3, 又想使用 v2 的 vue init 功能, 可以全局安装一个桥接工具:

```shell
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

```shell
# v3
vue create my-project
```

## vue-cli v2

### 初始化

执行 `vue init webpack my-project` 初始化命令后, 会出现一些交互式选项

- 项目名称
- 项目描述
- 作者信息 默认读取全局的 git 配置
- vue build 版本. 有两个选项:
  - runtime + compiler
  - runtime-only

  初学者推荐选前者, 可以编译模板. 后者更轻量, 性能更好
- 询问是否安装 vue-router 按需选择
- 询问是否使用 ESLint 规范代码
  - 如果格式不规范, 编辑器也会报提示
  - 决定使用 ESLint 后, 会提示选择一种规范
    - Standard
    - Airbnb
    - configure it yourself
  - 可以在 /config/index.js 配置中关闭
- 构建单元测试. 通常不用
- 构建 e2e(end to end 端到端) 测试. 利用其他工具进行自动化测试.
- 选择项目管理工具
  - npm
  - yarn

配置完成之后开始生成项目模板

### 项目结构介绍

`build` 和 `config` 目录: 里面是 webpack 的配置

- build 存放具体配置文件
- config 预设一些配置值, 供 build 中的配置文件使用

`node_modules` 目录: 存放依赖包. 不用管.

`src` 目录: 开发时的源码目录

`static` 目录: 存放静态资源. 里面的内容在打包的时候会原样复制到 dist 目录中. 而 src 目录中资源会根据配置进行重命名等处理
  - .gitkeep 文件: git 的配置文件, 即使该目录为空, 也会同步到远程仓库

`.babelrc` 文件: 控制 babel 转化的配置文件, 配合 babel-loader 使用的
  - "browsers" 选项: 指定哪些浏览器需要进行适配

`.editorconfig` 文件: 规范化编辑习惯

`.eslintignore` 文件: 忽略一些文件, 不进行 ESLint 规范化检测

`.gitignore` 文件: 忽略管理一些文件

`.eslintrc.js`: 代码规范化检测的配置

`.postcssrc.js`: 控制 css 转化相关的配置

`index.html`: 在 dist 目录中生成的 index.html 的模板

`package.json`: 管理包

`package-lock.json`: 锁定项目中包的版本

`README.md`: 项目介绍

#### package.json

配置介绍:

- "build": "node build/build.js"
  - 删除之前生成的 dist 目录
  - 去读取 webpack.prod.conf.js 的配置
  - 重新打包生成 dist 目录
- "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
  - 开启一个本地服务器
  - 读取的是开发时的 webpack 配置文件中的 devServer 配置项
  - 开发调试时使用

### 基础示例结构

main.js 负责加载文件, 管理 div#app 元素, App 组件作为根组件使用, 里面再去引入 components 目录中的其他内容组件

### runtime-only 和 runtime compiler 的区别

runtime compiler 和我们学习 Vue 时一样, 通过 components 选项去注册组件, 然后到 template 中使用

而 runtime-only 则是通过 render 选项

```javascript
render: h => h(App)
```

runtime compiler 模板的编译过程: template -> render 函数 -> 虚拟 DOM -> UI

runtime-only 就是直接使用 render 函数将 App 组件编译为虚拟 DOM: render 函数 -> 虚拟 DOM -> UI

#### render()

其形参 h 是 Vue 内部传递的一个 createElement('tagName', {attribute}, [content]), 第一个参数是标签名, 会创建对应的标签, 替换 div#app 元素, 第二个参数是对象, 配置标签的属性, 第三个参数是数组, 设置标签的内容

```javascript
// 手动配置配置一个模板元素
new Vue({
  el: '#app',
  render: function(createElement) {
    return createElement('h2', {class: 'bgc'}, ['H2标签'])
  }
  // <h2 class="bgc">H2标签</h2> 会替换 div#app
  // 就跟 template + components 选项配合一样 
})
```

第三个数组参数中还可以继续调用 createElement(), 生成子元素

createElement() 还可以接收一个组件对象. 如:

```javascript
const cpn = {
  template: `
    <h2>{{ msg }}</h2>
  `,
  data() {
    return {
      msg: 'hello Vue'
    }
  }
}
```

而我们导入 .vue 文件得到的也是一个组件对象. 在导入的时候已经将 .vue 文件中的 template 编译为了 render 函数(这个过程是由 vue-template-compiler 工具实现的), 所以, 即使在 runtime-only 中也能使用带有 template 的 .vue 文件, 接收到的 App 对象中根本没有 template 选项

也就是说, vue 把源码中的 template 编译的部分放在了 vue-template-compiler(开发时依赖) 中. 由此轻量化了 vue, 提高了运行时的性能

实际项目开发, 都是使用的 runtime-only 版本

## vue-cli v3

基于 webpack4 打造; 遵循 "0配置" 原则; 提供了 vue ui 可视化配置命令; 用 public 目录取代 static 目录; 默认用 git 管理; 默认就是 runtime-only 

### 创建

```shell
vue create my-project
```

执行后会出现如下交互项:

- 选择一个预设配置
  - default(babel, eslint)
  - manually select feature
    - 选择此项后会列出所有可以选择的配置
    - 上下键移动, 按 space 选中/取消, 回车确认
- 问你是把配置文件放在一个独立的配置文件中, 还是放在 package.json 里. 通常放在独立的配置文件中
- 是否保存刚才的预设, 下次创建项目时会提供这个选项
  - 选择保存后, 会提示给预设起名
  - 这个预设可以在用户目录中的 .vuerc 中删除
- 选择项目管理工具
  - npm
  - yarn

### 项目结构

node_modules 目录: 存放 npm 安装的包

public 目录: 相当于 static 目录, 且 index.html 模板也在里面

src 目录: 源码

.browserslistrc: 指定适配的浏览器

.gitignore: 忽略管理的文件

bable.config.js: babel 配置文件

package.json: 里面的依赖包列表更简洁. 其他包通过 vue-cli-service 管理.

package-lock.json:

.postcss.config.js: css 转化配置

### 命令

查看 package.json 的 scripts 配置项

### 示例结构

main.js 中多了一句代码

```javascript
Vue.config.productionTip = false
```

作用: 使用 npm run 构建的时候是否打印提示信息. 开发时不需要, 最终 build 时可以改为 true.

直接使用的 render 函数. el 配置项改为了 $mount() 的形式

### 修改配置

运行 `vue ui` , 开启一个图形化页面, 导入项目. 

就可以看到配置选项. 

项目中的配置文件是被隐藏在 `node_modules/@vue/cli-service/webpack.config.js` 中

不推荐直接去更改隐藏的配置文件. vue-cli 提供了一个自定义配置的方式: 在项目根目录下创建 vue.config.js 文件, 在里面更改配置

构建的时候, 会把自定义的配置和隐藏配置进行合并作为整体的配置, 从而达到更改配置的效果. 编写规则看官方文档
