---
author: "wiseai"
title: "Debian的包管理工具apt"
date: 2022-07-06T16:52:16+08:00
description: ""
tags:
- Linux
- 命令
categories:
- Linux学习
- Linux命令
draft: false
---

清除所有已删除包的残余配置文件：  
`#dpkg -l |grep ^rc|awk '{print $2}' |xargs dpkg -P`

`dpkg -l |grep "^rc"|awk '{print $2}' |xargs apt -y purge`

说明:

- dpkg -l  
列出系统中安装的所有包的状态，ii开头的是正常安装的包，rc开头的则是删除但仍留下配置文件的包，其他状态则是有错误的状态，自己执行一次就明白了，输出结果的开头有说明的。
- grep "^rc"  
提取以 rc 开头的包，也就是被删除但仍残留配置文件的包的信息的行。
- awk '{print $2}'  
打印这些包的名字，他们位于 dpkg -l 输出结果的第二个字段，估计有很多人是通过这个命令认识到 awk 的，也有很多人只在这个命令行中才使用 awk，我就是其中之一。
- xargs apt -y purge  
把上述输出，也就是要清除配置文件的包的名字放在 apt -y purge 后面，purge命令会清除配置文件，而 -y 参数会自动对后面 apt 命令的提示回答是，这个开关通常是危险的，所以在一般情况下不要轻易使用，而在这里，如果你确定这些包的配置文件的清除是没有问题的的话，可以使用这个开关