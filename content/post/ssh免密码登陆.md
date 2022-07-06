---
author: "wiseai"
title: "ssh免密码登陆"
date: 2022-07-06T15:49:33+08:00
description: ""
tags:
- Linux
- 命令
categories:
- Linux学习
- Linux命令
draft: false
---

1. 在client生成公钥和私钥：
<pre>＃ ssh-keygen -t rsa</pre>
注:这个命令可以参考下[git的使用](/post/git/)，rsa也没有问题。

位置在`~/.ssh/`下，分别是id_rsa和id_rsa.pub

2. 将client的公钥上传到server：
<pre>＃ ssh-copy-id -p '端口' '用户名@IP或域名'</pre>
这个时候client的公钥文件内容会追加写入到server的 .ssh/authorized_keys 文件中。

登陆免密了：
<pre>＃ ssh -p '端口' '用户名@IP或域名'</pre>
打完，收功。