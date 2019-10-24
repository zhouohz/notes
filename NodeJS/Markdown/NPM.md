# NPM 笔记

## NPM 介绍

官网：<https://www.npmjs.com/>
> Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code.

NPM 是随同 NodeJS 一起安装的包管理工具，能解决NodeJS代码部署上的很多问题

## 如何使用

- `npm -version`
  + 查看 npm 版本号
- `npm install npm -global`
  + 升级旧版本的 npm ，会覆盖安装
- `npm install <Module Name>`
  + 安装 Node.js 第三方模块
  + 默认放在当前文件夹下的 node_modules 目录中
  + 使用 `--sava` 会将包的信息添加在 dependencies 中
- `npm uninstall <Module Name>`
  + 删除对应的依赖包
  + 使用`--save` 会把依赖信息一起删除
- `npm install -global cnpm --registry=https://registry.npm.taobao.org`
  + 淘宝 NPM 镜像
  + <https://npm.taobao.org/>
  + 使用 cnpm 代替 npm 使用

## package.json

- 使用 `npm init` 命令生成
  + `npm init -y` 跳过向导，快速生成
- 里面描述了项目的相关信息
- 其中 dependencies 保存了安装的依赖包的信息
- `npm install` 命令会根据 dependencies 下载依赖包