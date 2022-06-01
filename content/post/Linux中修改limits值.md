---
author: "wiseai"
title: "Linux中修改limits值"
date: "2022-06-01"
description: "Linux中修改limits值"
tags:
- limits
- lib
categories:
- Linux学习
draft: false
---

在/etc/security/limits.conf 最后增加:

`* soft nofile 65535`

`* hard nofile 65535`

修改ulimit值