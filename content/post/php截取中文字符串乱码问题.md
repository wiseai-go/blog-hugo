---
author: "wiseai"
title: "php截取中文字符串乱码问题"
date: "2022-06-20"
description: "php乱码"
tags:
- php
- 中文乱码
categories:
- Linux学习
draft: false
---

php截取字符串有两个函数:

一个是substr()，这个用来截取全字母的字符串，截取UTF-8的汉字就会出错；

另一个是mb_substr()，这个用来截取汉字，但一定要注明编码方式：mb_substr('我的祖国是中国', 0, 4, 'utf-8');