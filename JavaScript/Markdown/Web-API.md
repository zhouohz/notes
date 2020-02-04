# BOM 和 DOM

## API

> API是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力。且无需访问源码或理解内部工作机制的细节

Web API 就是一组工具，让我们可以操作浏览器和页面

DOM 是一种基于树的API文档，它要求在处理过程中整个文档都表示在存储器中

## 获取DOM中的元素

通过 `console.dir()` 会以对象的形式打印到控制台

- `docmument.getElementById()`
  - params：id字符串
  - return：元素节点 或 null
- `document.getElementsByTagName()`
  - params：标签名字符串
  - return：元素集合(动态的)
  - `elem.getElementsByTagName()` 在指定元素内获取
- `document.getElementByName()`
  - 在 IE和Opera 中id相同的元素也会被获取。不推荐使用该方法
- `document.getElementsByClassName()`
  - patams：class字符串
  - return：元素集合
  - IE9+才开始兼容
- `document.querySelector()`
  - 根据选择器获取元素
  - params：css选择器字符串
  - return：匹配的第一个元素
  - elem.querySelector()
  - IE8+
- `document.querySelectorAll()`
  - 根据选择器获取元素
  - params：css选择器字符串
  - return：匹配到的所有元素
  - elem.querySelectorAll()
  - IE8+

## 事件

事件源 => 事件名称 => 处理函数

## 属性操作

HTML标签的属性都会作为相应DOM对象的属性

### 常规标签属性

id、src(运行时路径)、href、title、alt、className

取消a标签的默认行为 => return false

- e.preventDefault
- e.stopPropagation

innerHTML

- 获取开始标签和结束标签中所有的内容
- 设置的时候，按HTML解析

innerText

- 获取开始标签和结束标签中所有的文本内容
- 子元素中的文本也会获取到
- 设置的时候按字符串解析，特殊符号会用字符实体代替

innerContent

- 作用和innerText一样
- 两者在不同的浏览器兼容性不同
- 新版chrome好像没这个属性了

设置内容的时候，如果是纯文本，推荐用innerText，执行效率高些

### 表单元素属性

value、type、disabled、checked、selected

disabled、checked、selected => 在DOM中的值为布尔值

被禁用的文本框依然可以通过value属性修改其内容

onfocus  onblur

### 自定义属性

无法通过 elem.属性名 的方式获取

- elem.getAttribute('foo')
- elem.setAttribute('foo', 'bar')
- elem.removeAttribute('foo')

跟节点相关的属性

- nodeName => 标签名的大写
- nodeType => 元素节点为1，属性节点为2，文本节点为3
- nodeValue => 元素节点始终为null

## 元素结构

父子结构

- parentNode
- childNodes => 包括文本节点，属性节点，注释节点，元素节点
- children => 元素节点集合（动态的）。在低版本IE中可能会包含注释节点
- firstElementChild => IE9+
- lastElementChild => IE9+

兄弟结构

- nextSibling/previousSibling
- nextElementSibling/previousElementSibling

补充：void是一个运算符，执行后面的表达式，其返回值始终是undefined，用于防止a标签跳转 => `javascript:void(0)`

## 字符实体

小技巧：可以通过 console.dir() 打印出相应的对象，查看里面的属性和方法

## 动态创建元素

- document.write() => 在事件中使用会覆盖body和head中的所有内容。用于加载第三方服务，在页面加载时使用
- elem.innerHTML => 需要拼串，不断开辟空间，性能很低。可以先用数组存储，最后转为字符串。但是这样不方便操作DOM，创建之后还得再从页面中获取元素
- document.createElement()
  - params：元素名字符串
  - return：DOM元素对象
  - 在内存中创建一个对象，需要通过 appendChild(obj) 添加到父元素中
  - 创建之后可以直接进行DOM操作，注册事件、添加属性或内容等等

事件委托：原理为事件冒泡

- 给父元素绑定事件，通过 event.target 得到实际触发事件的元素
- 节约了内存空间

通过事件对象 event 可以获取事件相关的数据和信息

- 兼容性处理：event = event || window.event
- 常见的属性：
  - event.eventPhase => 得到的是数字 1（捕获），2（目标），3（冒泡）
  - e.target => 真正的事件对象，老版本的IE为 e.srcElement
  - e.currentTarget => 绑定事件处理函数的元素
  - e.type => 获取事件名称，不带on的
  - e.clientX 和 e.clientY => 相对于浏览器可视区左上角的坐标。e.pageX 和 e.pageY 是相对于文档页面的左上角(IE9+)
    - pageX = clientX + document.body.scrollLeft(document.documentElement.scrollLeft)
  - 还可以通过 e.pageX - this.offsetLeft 和 e.pageY - this.offsetTop 获取相对于元素左上角的坐标
- 事件对象还提供了两个方法，可以取消默认行为和冒泡
  - e.preventDefault()，IE老版本为 e.returnValue = false。return false也可以取消默认行为，区别就是会直接结束函数
  - e.stopPropagation()阻止冒泡，老版本IE为 e.cancelBubble = true
  - 文本框中显示输入的内容也属于默认行为
- keydown 的时候按下的键还没有落入文本框，keyup的时候已经落入。可以通过 e.keycode 获取按下的键对应的编码便于判断

## BOM

顶级对象 window。使用 window 的成员可以省略 window.

全局变量和全局函数分别是 window 对象的属性和方法

在全局里面定义变量的时候要注意不能与 window 的成员名称一致。如 name属性，即使给它赋值一个number，也会被转化为字符串；top也是一个已有的对象，不能赋值。

### 对话框

- alert()
- prompt()
- confirm()

无法控制样式，且在不同的浏览器中显示不一致，用户体验不好。实际开发中，会用一个div盒子替代

### onload

加载完成之后执行，所有元素创建完毕，引用的资源下载完毕

onunload => 页面卸载时执行，不能使用对话框 API。可以用于在卸载页面的时候清理一些数据

F5 => 卸载页面后加载页面

### 定时器

setTimeout()

setInterval()

都会在指定间隔时间后执行，且返回一个数值类型的定时器标识，可以通过 clearTimeout() 和 clearInterval() 关闭定时器

### location

获取或设置 URL。使用的时候在 MDN 或者 控制台查看它的成员

- location.href => 跳转到指定的URL，可以记录历史。不仅仅局限于超链接跳转页面
- location.assign() => 跳转到指定的URL，可以记录历史
- location.replace() => 跳转到指定的URL，无法记录历史
- location.reload() => 刷新页面，参数为true时强制从服务器获取（ctrl + f5），为flase时，如果有缓存，则从缓存获取页面（f5）

URL的组成 => scheme://host:port/path?query#fragment

### history

history.forward() => 跳转到访问过的下一个页面
history.back() => 跳转到访问过的上一个页面
history.go() => 跳转到第几个页面，为负值时向后跳转

### navigator

navigator.userAgent => 获取操作系统信息和浏览器的信息。

向服务器发送请求时，将这个信息传递过去，由服务器判断该返回适应哪个客户端的页面

### offset系列

- offsetLeft/offsetTop => 相对于最近的定位父元素的偏移量
- offsetWidth/offsetHeight => 盒子的宽高
- offsetParent => 获取最近的定位父元素

没有定位父元素，就默认为 body

### client系列

- clientLeft/clientTop => 得到的是盒子左/上边框的宽度
- clientWidth/clientHeight => 内容区 + 内边距

### scroll系列

- scrollLeft/scrollTop => 滚动出去内容的距离
- scrollWidth/scrollHeight => 滚动区域的宽高，包含看不见的部分，不包含滚动条的宽度

补充：onscroll 事件 => 拖动滚动条时触发

webp 格式的图片，chrome支持，体积更小，页面性能更高

onmouseover 和 onmouseout VS onmouseenter 和 onmouseleave

前者会触发事件冒泡，而后者不会

定时器可以重复开启，每次设置一个定时器都要先关闭它

btn.click() 方法，相当于手动点击了一次按钮