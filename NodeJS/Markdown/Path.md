# Path

文件操作与模块加载的路径总结

- 文件操作的相对路径要么不写 ./ 则默认在当前目录中寻找，要么 ./ 一起写上
- 如果在文件操作中，只写 / 开头，那么相当于 盘符:/ 会从项目所在盘符的根目录开始寻找，相当于绝对路径
- 核心模块和第三方模块都可以直接用模块名加载，如果需要用到相对路径，则必须以 ./ 开头
- 如果在模块加载中，使用 / 开头，也是相当于从盘符开始的绝对路径