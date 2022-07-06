---
author: "wiseai"
title: "grep命令"
date: 2022-07-06T17:21:46+08:00
description: ""
tags:
- 命令
categories:
- Linux命令
draft: false
---

基本格式：grep  expression

**1.主要参数**

[options]主要参数：

	－c：只输出匹配行的计数。
	－i：不区分大小写
	－h：查询多文件时不显示文件名。
	－l：查询多文件时只输出包含匹配字符的文件名。
	－n：显示匹配行及行号。
	－s：不显示不存在或无匹配文本的错误信息。
	－v：显示不包含匹配文本的所有行。
	－r：查询目录及子目录下的文件包含匹配字符的文件名。

pattern正则表达式主要参数：

	\： 忽略正则表达式中特殊字符的原有含义。
	^：匹配正则表达式的开始行。
	$: 匹配正则表达式的结束行。
	\<：从匹配正则表达 式的行开始。
	\>：到匹配正则表达式的行结束。
	[ ]：单个字符，如[A]即A符合要求 。
	[ - ]：范围，如[A-Z]，即A、B、C一直到Z都符合要求 。
	.：所有的单个字符。
	* ：有字符，长度可以为0。

**2.实例**

	(1)grep 'test' d*　　#显示所有以d开头的文件中包含 test的行

	(2)grep 'test' aa bb cc 　　 #显示在aa，bb，cc文件中包含test的行

	(3)grep '[a-z]\{5\}' aa 　　#显示所有包含每行字符串至少有5个连续小写字符的字符串的行

	(4)grep magic /usr/src　　#显示/usr/src目录下的文件(不含子目录)包含magic的行

	(5)grep -r magic /usr/src　　#显示/usr/src目录下的文件(包含子目录)包含magic的行

	(6)grep -w pattern files ：只匹配整个单词，而不是字符串的一部分(如匹配'magic'，而不是'magical')