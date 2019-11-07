# Hexo

## 准备工作

安装 Git 和 NodeJS

注册Github账号，配置好Git与Github的ssh连接

为了使用方便，将npm的源替换为淘宝源

```shell
npm config set registry https://registry.npm.taobao.org
```

```shell
# 可以查看当前使用的源
npm config get registry
```

```shell
# 恢复官方的源
npm config set registry https://registry.npmjs.org
```

通过 npm 安装Hexo-cli命令行工具 

```shell
npm install -g hexo-cli
```

## 搭建博客

```shell
# 查看当前所在目录
pwd
# 创建名为blog的文件夹
# 以后所有的博客相关的配置和文件都在这个文件夹中操作
mkdir blog
# 进入 blog 文件夹
# 输入 b 按 tab 会自动补全
cd .\blog\
# hexo初始化
hexo init
# 查看目录内容列表
dir
# 启动服务
# 可以通过 http://localhost:4000 访问自己的博客
hexo s
# 新建博客
hexo new "我的第一篇博客"
# 会在blog文件夹的\source\_posts目录中生成同名的md文件
# 编写好了之后，退回到blog目录，清理缓存，重新生成，运行服务
cd ../../
hexo clean
hexo g
hexo s
```

## 部署到GitHub上

1. 在GitHub中新建一个仓库。仓库名必须为 username.github.io

2. 在blog目录中安装git部署的依赖包

   ```shell
   npm install --save hexo-deployer-git
   ```

   安装好之后，在 _config.yml 文件中配置 deploy 的 type 值

   ```json
   deploy:
     type: git
   	repo: git@github.com:zhouohz/zhouohz.github.io.git
   	branch: master
   ```

3. 配置好之后就可以推送到仓库中

   ```shell
   hexo d
   ```

   

