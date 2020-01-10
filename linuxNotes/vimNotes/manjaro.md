## 换 pacman 源

`sudo pacman-mirrors -m rank -c China -i`

## 添加 archlinuxcn 源

`sudo nano /etc/pacman.conf`

```shell
[archlinuxcn]
SigLevel = Optional TrustedOnly
# Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
# Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

## 更新软件仓库

`sudo pacman -Syy`

## 安装 archlinuxcn 的密钥

`sudo pacman -Sy archlinuxcn-keyring`

## 再次刷新软件仓库并更新系统

`sudo pacman -Syyu`

## 重启生效

`reboot`

## 安装宇宙第一编辑器 vim 

`sudo pacman -Sy vim`

## 安装配置 fcitx 输入法

`sudo pacman -Sy fcitx-im fcitx-configtool fcitx-cloudpinyin`

## 添加输入法配置文件

`vim ~/.xprofile`

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

`reboot`

## 配置

添加 pinyin

触发键改为 L-shift

cloudpinyin 源改为 baidu

## 常用软件

netease-cloud-music 听着歌进行配置

chromium 便于安装其他软件

zsh和ohmyzsh 终端优化

git 同步管理

node和npm 开发环境

flameshot 截图软件,linux下的snipaste

shadowsocks-qt5 科学上网

## pacman 

删除包及其依赖的包，同时删除全局配置文件

sudo pacman -Rns xxx

同步软件仓库

sudo pacman -Syy

强制同步一次，并更新系统

sudo pacman -Syyu

查看自己安装了哪些包

sudo pacman -Qe

不显示版本号

sudo pacman -Qeq

查看包含 xxx 关键字的有哪些包

sudo pacman -Qs xxx

查看孤儿包

sudo pacman -Qdt

删除所有孤儿包

sudo pacman -R $(pacman -Qdtq)
