## 配置网络
ip link 查看是否开启了网络接口, 列出无线接口

ip link set wlan0 up 开启名为 wlan0 的无线接口

iwlist wlan0 scan 用wlan0接口扫描可用的接入点（即搜索wifi）
  - iwlist wlan0 scan | grep ESSID

wpa_passphrase MYSSID passphrase > /etc/wpa_supplicant/example.conf

wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/example.conf &

dhcpcd & 动态分配 IP 地址

timedatectl set-ntp true 更新系统时间

fdisk -l 查看硬盘

fdisk /dev/sdX 进入 fdisk 工具，对 sdx 进行分区
  - m 获得命令帮助列表
  - p 打印分区情况
  - g 创建一个分区（直接整个盘一个区，用于清除已有的分区）
  - n 创建一个可定义的分区
    - 分区编号 1 （用于UEFI引导）
    - 从哪里开始分 默认
    - 分到哪里结束（即分多大）。如 +512M
    - 提示是否清除已有的文件系统。 Y 清除
    - 继续 n 创建其他分区
    - 编号 2 （用于swap虚拟内存）
    - 默认
    - +8G
    - Y
    - n
    - 编号 3 默认 默认 Y 余下的都给主分区
    - p 检查一遍分区（可选）
    - w 写入分区并退出 fdisk 界面

分区完成后还需要写入文件系统

- uefi =  mkfs.fat -F32 /dev/sdx1
- swap = mkswap /dev/sdx2 创建swap分区 swapon /dev/sdx2 开启交换分区
- / = mkfs.ext4 /dev/sdx3

挂载分区

- mount /dev/sdX3 /mnt
- mkdir /mnt/boot
- mount /dev/sdx1 /mnt/boot

镜像

排序 /etc/pacman.d/mirrorlist

安装基础包，内核以及固件

pacstrap /mnt base base-devel linux linux-firmware

## Fstab

genfstab -U /mnt >> /mnt/etc/fstab

## Chroot

arch-chroot /mnt 切换到新安装的系统

## 时区

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

hwclock --systohc 生成/etc/adjtime校准时间

## 本地化

nano /etc/locale.gen 去掉 en_US.UTF-8 的注释 指定本地化类型

locale-gen 生成 locale 信息

nano /etc/locale.conf 配置 LANG=en_US.UTF-8 保存退出

或 echo LANG=en_US.UTF-8 > /etc/locale.conf

## 网络

nano /etc/hostname 配置 myhostname 即我的主机名（随便取）

nano /etc/hosts 配置本机 IP

```
127.0.0.1	localhost
::1		localhost
127.0.1.1	myhostname.localdomain	myhostname
```

## Root 密码

passwd 

## 安装引导程序

pacman -Sy grub efibootmgr

uname -m 检查系统架构（可选）

grub-install --target = x86_64-efi --efi-directory = /boot --bootloader-id = GRUB 安装GRUB efi 应用程序

grub-mkconfig -o /boot/grub/grub.cfg

mkdir /boot/grub 创建 GRUB 主目录

grub-mkconfig > /boot/grub/grub.cfg 生成配置文件

在 archlinux 中安装联网工具 wpa_supplicant dhcpcd vim vi(以防万一)

## 重启

exit 退出 chroot 环境

killall wpa_supplicant dhcpcd

reboot

## 配置

root 进入root账户

pacman -Syyu 更新

pacman -Sy man 指令帮助

useradd -m -G wheel zb

passwd linux

visudo 去掉 %wheel ALL=(ALL) ALL 前面的注释。让 wheel 组中的用户可以使用 sudo 权限

exit 退出root账户

zb 切换到普通用户

```shell
# 补充内容
systemctl start dhcpcd
systemctl enable dhcpcd

lspci | grep VGA 确定显卡型号

安装 xf86-video-ati 或 xf86-video-vesa 或 xf86-video-amdgpu
```

sudo pacman -Sy xorg 图形界面服务器

```
pacman -S ttf-dejavu wqy-microhei wqy-zenhei 

adobe-source-han-serif-cn-fonts - 思源宋体简体中文部分
adobe-source-han-sans-cn-fonts - 思源黑体简体中文部分
```

sudo pacman -Sy plasma kde-applications sddm

systemctl enable sddm 开启服务

pacman -S networkmanager

systemctl enable NetworkManager
