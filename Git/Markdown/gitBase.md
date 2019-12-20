## 简介

让开发者有后悔药可以吃

学习 git 不能单纯的记忆指令及其作用

它是一个工具，只有在一定的使用场景下才有价值

所以，一定要从需求出发，想要实现什么效果，再去查看对应的指令

如此，才能深刻理解，感受到 git 的魅力

## 配置

### 作者信息

```shell
$ git config --global user.name "your name"
$ git config --global user.email "your email"
```

如果想为项目单独设置作者信息，就在项目根目录下执行，去掉 --global 配置

### 初始化项目

```shell
$ mkdir demo
$ cd demo
$ git init
```

## 克隆

通常，我们不是自己新建一个仓库从0开始，而是克隆一个已有的项目，然后进行开发

```shell
git clone git@github.com:zhouohz/projects.git
```

前提是已经用 ssh 关联了此github账户。后面讲如何关联

## 提交到仓库

git status 查看文件状态

工作区  暂存区  仓库

- add 工作区 -> 暂存区
- commit 暂存区 -> 仓库

## 忽略文件

默认情况下 git 会监听项目中所有的改动情况，但是可以通过 .gitignore 文件进行配置，将不想进行版本控制的文件写在里面，支持正则表达式。

```shell
$ touch .gitignore
$ vim .gitignore
```

下面介绍几个正则标识

- × 所有。如 ×.txt 忽略所有的 txt 文件
- ! 除了。如 !a.txt 除了 a.txt 即 a.txt 是会被提交的，和 *.txt 配合使用
- /dir 文件夹。不跟踪此文件夹及其内部所有的内容。也可以忽略其中的某个文件或文件夹，同理。

有了忽略配置，就可以放心使用 `git add .` 命令了，它会提交除了忽略文件外的所有改动，非常的方便

## 从仓库中移除文件

如果想要删除 commit 了的文件，用 `git rm demo.md` ，会删除工作区以及仓库中的文件，需要commit一次记录。相当于无事发生。

但是，有些文件是想要在工作区中继续使用，用 `git rm --cached demo.md` 只删除仓库中的文件，也需要 commit 记录下。这时，status 查看状态，会提示 demo.md 未被跟踪

## 修改仓库中的文件名

修改 commit 了的文件的文件名 `git mv oldname.md newname.md` ，这个指令修改的其实是工作区中的文件，跟常规的修改内容一样，只不过一个是 modified ，一个是 renamed，有一个区别是改名不需要add到暂存区可以直接commit，而修改内容需要先add进行更新，才能commit到仓库中

建议：改名最好用 git 指令，否则可能会出现没有更新到仓库的情况

## 查看版本日志

查看 commit 记录 `git log` 会展示出版本的标识，作者信息，日期以及提交时的描述信息。其中，当前的版本会用 head-master 标识出来。

`git log -p` 可以看到每次提交，修改了哪些内容

`git log -p -2` 后面的数字指定查看最近的几次提交记录

`git log --oneline` 简化显示信息

`git log --name-only` 查看哪些文件作了修改

`git log --name-status` 查看作了哪种修改，修改还是新增等等

这些参数可以相互结合使用，暂时没什么用，知道 log 就行了

## 修改提交描述

`git commit --amend` 会转到 vim 编辑界面，修改即可。注意：修改的是最新一次的提交描述

这个指令还有一个更重要的功能，就是将新的修改合并到最新的一次提交中。好处是不用再 commit 一次，生成一个不那么必要的日志

## 删除暂存区中的文件

`git restore --staged demo.md ` 相当于逆向的 add 指令

如果修改了内容，想要还原，就 `git restore demo.md` 撤销掉所有的修改

注意：这两个撤销，只限于在没有commit的情况下使用。如果已经被 commit 了，那就只能进行版本回退了

多用 git status 命令，会有相关的命令提示

## 简化命令

我们可以自定义命令的符号

`git config --global alias.c commit` 用 c 替代 commit 指令

也可以直接在 .gitconfig 文件中进行配置（推荐）

## 分支

`git branch` 查看分支，前面有 `×` 的表示当前所在的分支

`git branch new` 创建一个新的分支

`git checkout new` 切换到 new 分支

注意：在分支中可以使用 master 中的文件，而 master 中无法查看 分支中的文件；还有一个注意点是创建了分支之后，如果master中又发生了更改，是不会自动同步到新分支中的

`git checkout -b new` 创建且切换到 new 分支

`git merge new` 在 master 分支中执行，将 new 合并到 master 分支中

`git branch -d new` 合并了之后分支就没用了，可以直接删除

`git branch --merged` 列出与 master 提交点相同的分支，而 git branch --no-merged 会列出有不同提交点的分支。从而可以判断哪些分支可以合并，哪些分支可以删除

`git branch -D new` 删除没有进行合并的分支

## 冲突问题

由于分支可以使用 master 中的文件，当有多个分支同时修改了一个文件时，在 master 中合并的过程中就会出现冲突问题。此时打开被修改的文件，里面冲突的部分就会被 git 用符号标识出来，由管理者进行取舍

手动修改完成之后，需要 add 和 commit 进行提交

## 临时存储

场景：我们在一个分支中工作的过程中，想切换到其他分支，是不被允许的，只有提交了之后才能切换，但是工作没完成，又不想留下一个日志。这时，就需要用到 stach 保存当前的工作状态

`git stash` 保存当前的工作状态，之后就可以切换分支了

`git stash list` 列出所有的临时存储记录，便于查看和恢复。序号越小，表示临时记录越新

`git stash apply [stash{1}]` 恢复指定的临时存储状态，默认是恢复第 0 个，也就是最新的，存储区依然存在

`git stash drop stash{0}` 删除指定的临时存储

`git stash pop` 恢复并删除零时存储

注意：只有被 git 记录过的文件才能使用临时存储，即被 add 或 commit 过

## 标签

当我们的项目有了一个阶段性的进步的时候就可以给它添加一个标签，比如版本号

`git tag v1.0`

通过 `git tag` 查看标签记录

这个标签不能像 commit 描述一样随心的记录，慎重使用

## 压缩

将 master 分支里面的文件进行打包压缩

git archive master --prefix='dirname/' --forma=zip > zipname.zip

把 master 中的文件放在 dirname 目录中，压缩到 zipname 的 zip 格式包中

## rebase

场景：从 master 的某个提交点引出一个分支进行开发后，master 中又出现了新的提交点，这时，将引出的分支合并到master中，会出现冲突问题，相当于分支合并了，需要由master的维护者进行调整。维护者需要阅读不同的分支中的代码，理解不同开发者的逻辑，这样显然过于残忍。于是，就需要 rebase 指令了，它的本质是将分支移到 master 最新的提交点上，相当于将master中的代码更新到分支中，这样冲突的问题就交给了分支的开发者处理。

当然，如果 master 中没有新的提交点，合并是没有问题的。

`git rebase master` 在分支中执行，更新master的提交点

此时，查看日志 git log 就会发现分支的日志前新增了 master 的提交日志

再去 master 中合并就没有问题了

即使没有冲突也最好 rebase 更新一下，这样能保持 master 的提交日志整洁干净