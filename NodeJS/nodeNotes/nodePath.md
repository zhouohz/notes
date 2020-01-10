## Path

### __dirname

The directory name of the current module. This is the same as the `path.dirname()` of the `__filename`.

Example: running `node example.js` from `/Users/mjr`

```javascript
console.log(__dirname)  // Prints: /Users/mjr
console.log(path.dirname(__filename))  // Prints: /Users/mjr
```

### __filename

The file name of the current module. This is the current module file's absolute path with symlinks(符号链接) resolved(被解析).

For a main program this is not necessarily the same as the file name used in the command line.

See `__dirname` for the directory name of the current module.

Examples:

Running `node example.js` from `/Users/mjr`

```javascript
console.log(__filename)  // Prints: /Users/mjr/example.js
console.log(__dirname)  // Prints: /Users/mjr
```

Given two modules: `a` and `b`, where `b` is a dependency of `a` and there is a directory structure of:

- `/Users/mjr/app/a.js`
- `/Users/mjr/app/node_modules/b/b.js`

References(引用) to `__filename` within `b.js` will return `/Users/mjr/app/node_modules/b/b.js` while references to `__filename` within `a.js` will return `/Users/mjr/app/a.js`.

### path.join([...paths])

- `...paths` <string> A sequence(顺序, 序列) of path segments(断片, 段)
- Returns: <string>

The `path.join()` method joins all given path segments together using the platform-specific(特定平台) separator(分隔符) as a delimiter(定界符), then normalizes(归一化) the resulting path.

Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned, representing(代表) the current working directory.

```javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'
```

A `TypeError` is thrown if any of the path segments is not a string.

### path.parse(path)

- `path` <string>
- Returns: <Object>

The `path.parse()` method returns an object whose properties represent significant(重大) elements(元素) of the path. Trailing(尾部) directory separators are ignored, see `path.sep`.

目录尾部的分隔符会被忽略, 因为windows系统和unix系统中的不一样, node在这里也作了统一处理, 不论在什么系统中, 都可以通过 `path.sep` 获取到当前系统的分隔符

The returned object will have the following properties:

- dir <string> 目录路径
- root <string> 根目录
- base <string> 文件名(有扩展名)
- name <string> 文件名(无扩展名)
- ext <string> 扩展名

A `TypeError` is thrown if path is not a string.

## Summary

1. `__dirname` 和 `__filename` 都属于模块作用域, 这是 node 运行环境原生提供的属性. 可以很好的解决项目移植带来的路径问题
2. `path.join()` 可以自动的添加或删除路径片段之间的 `/` 以至于能拼接出正确的路径, 而且还能处理目录回退和当前路径. 需要进行路径拼接的时候, 推荐使用
3. `__dirname` 可以让路径从根到达模块所在目录, 而项目开发时模块中使用相对路径, 路径从当前目录到依赖模块的目录. 通过 `path.join()` 将两者拼接起来, 就相当于得到依赖模块的绝对路径. 在node中有这样一个设定, 模块中文件操作的相当路径是相对于 node 命令执行模块文件时所在的终端目录, 如果是在当前模块所处的目录中打开终端用 node 运行就没有问题, 但是, 在其他目录中运行就会出现路径错误, 而在模块中将相对路径替换为 `path.join()` 拼接而成的依赖模块的动态绝对路径, 就可以避免这一问题.补充: `require()` 加载自定义模块的相对路径不受影响.
4. 该方法会解析整个路径, 可以通过 `.` 语法获取想要的部分. node 还提供了一些只能获取路径某一个部分的 API 以及 其他路径相关的 API , 详情查看 node 官方文档的 PATH 核心模块部分.