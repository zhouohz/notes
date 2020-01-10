## 下载

官网: https://www.mongodb.com/

选择 MongoDB Community Server 系列.

OS 选择 Linux 64-bit legacy x64

默认是当前的版本, 如果没有以上的 OS 选项, 适当选择较低的版本就可以找到. 较新的包是 deb 包或者 rpm 包. 我不会在 archlinux 系中使用...

Package 默认的 TGZ

下载到本地即可

## 解压

推荐解压到 /usr/share/ 或 /usr/opt/ 目录下, 便于统一管理安装的包.

```shell
# 解压
tar -xvzf <tgz file>
# 移到存放包的目录下
sudo mv dirname /usr/share/
cd /usr/share/
# 改名方便使用
sudo mv dirname mongodb
```

## 环境变量

将 mongodb 目录下的 bin 目录添加到终端的 rc 配置文件中(.bashrc or .zshrc 等)

```
export PATH=/usr/share/mongodb/bin:$PATH
```

## 建库

mongodb 的默认仓库位置为 /data/db 目录. 需要自己创建

```shell
sudo mkdir /data/db
```

当然, 可以修改, 但没必要. 都采用默认的, 以后出错方便调试和查阅资料

## 测试

再次打开终端

```shell
mongod --version
# 出现如下内容则安装配置成功
# db version v4.0.14
# git version: 1622021384533dade8b3c89ed3ecd80e1142c132
# allocator: tcmalloc
# modules: none
# build environment:
#     distarch: x86_64
#     target_arch: x86_64
```

## 开启服务

```shell
sudo mongod
# I NETWORK  [initandlisten] waiting for connections on port 27017
```

这里一定要用超级管理员的身份执行, 否则没有权限无法启动. 出现注释中的字样说明服务开启成功

终端窗口关闭或者 ctrl-c 则关闭服务

## 连接本机数据库

在开启了服务的情况下, 新打开一个终端

```shell
mongo
# 显示 > 说明连接成功
```

该命令默认连接本机的MongoDB服务

在 `>` 后面输入 `exit` 即可断开连接

同样的, 其他相关的命令也这样执行.

## 基础命令

```shell
# 列出所有数据库. 默认存在系统数据库.
show dbs
# 切换到指定的数据库,如果不存在则会新建(有数据之后才能看到).
use dbName
# 查看当前使用的数据库. 默认是 test
db
# 新建一个集合并插入数据.会自动添加唯一的ID标识
db.myCollection.insetOne({"name": "Jerry"})
# 列出当前数据库中的所有集合
show collections
# 查看某个集合中的所有数据.
db.anyCollection.find()
```

这里可以看到, MongoDB的使用跟 JS 对象非常相似. 集合可以理解为数组, 数据可以理解为对象.

非常的灵活, 可以随意为数据增加一项数据或减少一项数据. 而关系型数据库无法做到, 必须更改表结构, 统一格式