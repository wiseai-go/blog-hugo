---
author: "wiseai"
title: "nohup及重定向"
date: 2022-07-08T16:30:38+08:00
description: ""
tags:
- 重定向
- 命令
categories:
- Linux学习
- Linux命令
draft: false
---

- 语法：nohup Command [ Arg … ] [　& ]
- 描述：nohup 命令运行由 Command 参数和任何相关的 Arg 参数指定的命令，忽略所有挂断（SIGHUP）信号。要在后台运行 nohup 命令，添加 `&` 到命令的尾部。

- 操作系统中有三个常用的流：
```
0：标准输入流 stdin
1：标准输出流 stdout
2：标准错误流 stderr
```

`> info.txt`实际是 `1 > info.txt`的省略用法；

`< info.txt`实际是 `0 < info.txt`的省略用法。

- 下面步入正题：
```
>nohup ./text.sh >output 2>&1 &
>su – wiseai -c ‘/usr/local/bin/jupyter notebook &> /dev/null &’
```
解释：
1. 带&的命令行，即使terminal（终端）关闭，或者电脑死机程序依然运行（前提是你把程序递交到服务器上)；
2. `2>&1`和`&>`相同:意思是把标准错误（2）重定向到标准输出中（1），而标准输出又导入文件output里面，所以结果是标准错误和标准输出都导入文件output里面了。 至于为什么需要将标准错误重定向到标准输出的原因，那就归结为标准错误没有缓冲区，而stdout有。这就会导致 `>output 2>output` 文件output被两次打开，而stdout和stderr将会竞争覆盖，这肯定不是我门想要的。
3. /dev/null文件的作用，这是一个无底洞，任何东西都可以定向到这里，但是却无法打开。 所以一般很大的stdou和stderr当你不关心的时候可以利用stdout和stderr定向到这里。