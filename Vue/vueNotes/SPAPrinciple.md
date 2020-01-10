## hash

一个窗口的 hash 就是 url 中 # 后面的部分. 也被称为锚点.

## 获取hash

`window.location.hash`

## onhashchange

当窗口的 hash 值改变时触发此事件. 如: 

```html
<ul>
  <li><a href="#/">/</a></li>
  <li><a href="#/foo">/foo</a></li>
  <li><a href="#/bar">/bar</a></li>
</ul>
```

点击链接时就会改变 url 中的 hash 值.

注意: href 引用的不是一个链接, 所以页面不会发生跳转, 同样的也没有同名 id 的元素, 页面也不会滚动. 点击之后仅仅是改变 hash 值.

onhashchange 事件也与 onclick 有所不同, onclick 会在每次点击时触发, 而 onhashchange 仅在 hash 值改变时触发.

示例中的 hash 是故意写成 `/xxx` 的形式的, 为的就是和路由联系起来.

接下来就可以从 hash 中方便的提取出设计好的路由标识, 通过 Ajax 请求同名的页面, 然后渲染到 html 预设的容器中.

注意: Ajax 是可以请求字符串的.

```javascript
window.onhashchange = function () {
  let router = window.location.hash.substr(1) // 去掉 # 号
  if (router === '/foo') {
    $.get('./foo.html', function (data) {
      // 在控制台输出foo.html中的代码字符串.
      console.log(data)
    })
  }
}
```

在 [网易云音乐](https://music.163.com/) 中, 点击不同的模块, 观察 url 的变化会有更直观的感受.

## 存在的问题

这里仅仅是有了一个开发单页面应用程序的思路. 但是, 实际的开发过程却十分繁琐, 比如 命名冲突问题(多个页面内容会被加载到index页面中), JS脚本问题(每个页面都有自己的JS代码), 等等.

所以就需要框架. 为的是让开发单页面应用更简单.

## 框架

- angular -- 带来了 mvvm 开发模式
- react -- 规范了组件化
- vue -- 集两位老大哥之所长
