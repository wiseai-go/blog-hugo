---
author: "wiseai"
title: "U盘启动盘制作"
date: 2022-07-05T10:08:37+08:00
description: ""
tags:
- 启动盘
categories:
- Linux学习
draft: false
---

## 一、[Ventoy](https://www.ventoy.net/cn/index.html "制作可启动U盘的开源工具"):制作可启动U盘的开源工具

---
[github](https://github.com/ventoy/Ventoy.git)

[gitee](https://gitee.com/longpanda/Ventoy.git)

#### 优点

多平台、支持Iso镜像多

#### 使用方法
- 在安装包解压后的目录下，打开终端执行 sudo sh VentoyWeb.sh
- 打开浏览器，直接访问 http://127.0.0.1:24680

	提示：
	- 执行第1步后会在终端上打印出对应的 http 地址。很多系统中都可以按下 Ctrl 键，同时鼠标点击链接即可。无需再手动打开浏览器。
	- VentoyWeb.sh 默认情况下监听 127.0.0.1 地址的 24680 端口。此时只能通过本机的浏览器进行访问。
	- 你也可以像这样 sudo sh VentoyWeb.sh -H 192.168.0.100 -P 8080 指定IP地址和端口号。
	- 此时你可以通过同网络内的另一台电脑上的浏览器来访问这个界面进行操作。这在有些情况下比较方便。
	- 比如，你有一台机器里面安装了Linux的系统，但是并没有安装图形界面，只有命令行操作界面。此时你可以在命令行里面执行上述命令，
	- 然后在另外一台有图形环境的电脑上（比如Windows）通过浏览器访问对应的页面进行操作。只要这两台电脑网络上是联通的即可。



## 二、[rufus](http://rufus.ie/zh/):只支持windows的U盘启动盘制作工具

---
[github](https://github.com/pbatard/rufus)

#### 使用方法

没有特别的，和其它windows程序一样，下一步，下一步就可以了。