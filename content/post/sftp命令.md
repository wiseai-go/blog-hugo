---
author: "wiseai"
title: "sftp命令"
date: 2022-07-06T15:57:22+08:00
description: ""
tags:
- Linux
- 命令
categories:
- Linux学习
- Linux命令
draft: false
---

## 常用方式
```
格式：sftp <host>

通过sftp连接<host>，端口为默认的22，用户为Linux当前登录用户。

格式：sftp -oPort=<port> <host>

通过sftp连接<host>，指定端口<port>，用户为Linux当前登录用户。

格式：sftp <user>@<host>

通过sftp连接<host>，端口为默认的22，指定用户<user>。

格式：sftp -oPort=<port> <user>@<host>

通过sftp连接<host>，端口为<port>，用户为<user>。
```

sftp连接成功之后常用操作命令如下：
```
help/? 打印帮助信息。

pwd   查看远程服务器当前目录；

lpwd  查看本地系统的当前目录。

cd <dir>   将远程服务器的当前目录更改为<dir>；

lcd <dir>  将本地系统的当前目录更改为<dir>。

ls 显示远程服务器上当前目录的文件名；

ls -l  显示远程服务器上当前目录的文件详细列表；

ls <pattern> 显示远程服务器上符合指定模式<pattern>的文件名；

ls -l <pattern>  显示远程服务器上符合指定模式<pattern>的文件详细列表。

lls 显示本地系统上当前目录的文件名；

lls的其他参数与ls命令的类似。

get <file> 下载指定文件<file>； -r参数操作目录

get <pattern> 下载符合指定模式<pattern>的文件。-r参数操作目录

put <file> 上传指定文件<file>；-r参数操作目录

put <pattern> 上传符合指定模式<pattern>的文件。-r参数操作目录

progress 切换是否显示文件传输进度。

mkdir <dir> 在远程服务器上创建目录；

lmkdir <dir> 在本地系统上创建目录。

exit/quit/bye 退出sftp。

! 启动一个本地shell。

! <commandline> 执行本地命令行。
```
其他命令还有：chgrp, chmod, chown, ln, lumask, rename, rm, rmdir, symlink, version。