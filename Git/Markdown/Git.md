# Git

## 生成 SSH KEY

```shell
ssh-keygen -t rsa -C "email"
```

保持默认配置会保存在：`C:\Users\zhou\.ssh`目录下

## 配置本机账户

```shell
git config --global user.name "your_username"
git config --global user.email "your_email"
```

## 连接GitHub

将生成的 `id_rsa.pub` 文件中的内容保存在GitHub的配置中

步骤：

Setting →

SSH and GPG keys →

New SSH key →

Title（标识是谁连接的）→

Key（ 粘贴`id_rsa.pub` 文件中的内容）

→ Add SSH key

即可

测试是否连接成功：

```shell
ssh -T git@github.com
# Are you sure you want to continue connecting (yes/no)? yes
```

## 关联远程仓库

第一次提交到远程仓库需要先连接

```shell
git remote add origin git@github.com:EPCRoo/Notes.git
```

```shell
git push -u origin master
# 第一次提交到远程仓库需要加 -u 参数，以后就不需要了。
# 如果远程仓库中存在本地没有的文件，需要先pull同步到本地，然后才能push成功
```

将远程仓库克隆到本地不需要先连接，并且此后默认连接上了

```shell
git clone git@github.com:EPCRoo/Notes.git
# 可以将远程仓库中的内容克隆到本地
```

