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