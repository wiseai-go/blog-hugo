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
```
-c：只输出匹配行的计数。
-i：不区分大小写
-h：查询多文件时不显示文件名。
-l：查询多文件时只输出包含匹配字符的文件名。
-n：显示匹配行及行号。
-s：不显示不存在或无匹配文本的错误信息。
-v：显示不包含匹配文本的所有行。
-r：查询目录及子目录下的文件包含匹配字符的文件名。
-A：后面跟一个数字（有无空格都可以），例如-A2表示打印符合要求的行以及下面两行。
-B：后面跟一个数字，例如-B2表示打印符合要求的行以及上面两行。
-C：后面跟一个数字，例如-C2表示打印符合要求的行以及上下各两行。
--color=auto：颜色显示
```
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
	
**过滤出带有某个关键词的行，并输出行号**
```
# grep -n 'root' /etc/passwd
1:root:x:0:0:root:/root:/bin/bash
10:operator:x:11:0:operator:/root:/sbin/nologin
```
说明: 前面的数字显示为绿色，表示行号。

**过滤出不带有某个关键词的行，并输出行号**
```
# grep -nv 'nologin' /etc/passwd
1:root:x:0:0:root:/root:/bin/bash
6:sync:x:5:0:sync:/sbin:/bin/sync
7:shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
8:halt:x:7:0:halt:/sbin:/sbin/halt
45:aminglinux:x:1000:1000:aminglinux:/home/aminglinux:/bin/bash
```

**过滤出所有包含数字的行**
```
# grep '[0-9]' /etc/inittab
# multi-user.target: analogous to runlevel 3
# graphical.target: analogous to runlevel 5
```
说明: 只要有一个数字就算匹配到了。

**过滤出所有不包含数字的行**
```
# grep -v '[0-9]' /etc/inittab
# inittab is no longer used.
#
# ADDING CONFIGURATION HERE WILL HAVE NO EFFECT ON YOUR SYSTEM.
#
# Ctrl-Alt-Delete is handled by /usr/lib/systemd/system/ctrl-alt-del.target
#
# systemd uses 'targets' instead of runlevels. By default, there are two main targets:
#
#
# To view current default target, run:
# systemctl get-default
#
# To set a default target, run:
# systemctl set-default TARGET.target
```
说明：和上一例的结果正好相反，只要是包含一个数字，就不显示。

**过滤掉所有以#开头的行**

操作样例文档/etc/sos.conf的内容如下：
```
[plugins]
#disable = rpm, selinux, dovecot

[tunables]
#rpm.rpmva = off

#general.syslogsize = 15
# grep -v '^#' /etc/sos.conf
[plugins]

[tunables]
```
说明：这里面是含有空行的。

那如何将空行删除呢?示例命令如下：
```
# grep -v '^#' /etc/sos.conf |grep -v '^$'
[plugins]
[tunables]
在正则表达式中，^表示行的开始，$表示行的结尾，那么空行则可以用^$表示。如何打印出不以英文字母开头的行呢？我们先来自定义一个文件，如下所示：
# mkdir /tmp/1
# cd /tmp/1
# vim test.txt //内容如下
123
abc
456
abc2323
#laksdjf
Alllllllll
```
接下来看两个例子：
```
# grep '^[^a-zA-Z]' test.txt
123
456
#laksdjf
# grep '[^a-zA-Z]' test.txt
123
456
abc2323
#laksdjf
```
前面也提到过中括号[]的应用，如果是数字就用[0-9]这样的形式（当遇到类似[15]的形式时，表示只含有1或者5）。如果要过滤数字以及大小写字母，则要写成类似[0-9a-zA-Z]的形式。另外，[^字符]表示除[]内字符之外的字符。请注意，把^写到方括号里面和外面是有区别的。

**过滤出任意一个字符和重复字符**
```
# grep 'r.o' /etc/passwd
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
```
.表示任意一个字符。上例中，r.o表示把r与o之间有一个任意字符的行过滤出来。

```
# grep 'ooo*' /etc/passwd
root:x:0:0:root:/root:/bin/bash
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
setroubleshoot:x:981:979::/var/lib/setroubleshoot:/sbin/nologin
*表示零个或多个*前面的字符。上例中，ooo*表示oo、ooo、oooo...或者更多的o。

# grep '.*' /etc/passwd |wc -l
45
# wc -l /etc/passwd
45 /etc/passwd
```
上例中，.*表示零个或多个任意字符，空行也包含在内，它会把/etc/passwd文件里面的所有行都匹配到，你也可以不加|wc -l看一下效果。

**指定要过滤出的字符出现次数**
```
# grep 'o\{2\}' /etc/passwd
root:x:0:0:root:/root:/bin/bash
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
setroubleshoot:x:981:979::/var/lib/setroubleshoot:/sbin/nologin
这里用到了符号{}，其内部为数字，表示前面的字符要重复的次数。需要强调的是，{}左右都需要加上转义字符\。另外，使用“{ }”还可以表示一个范围，具体格式为{n1,n2}，其中n1 < n2，表示重复n1到n2次前面的字符，n2还可以为空，这时表示大于等于n1次。
除grep工具外，阿铭也常常用到egrep这个工具，后者是前者的扩展版本，可以完成grep不能完成的工作。下面阿铭介绍egrep不同于grep的几个用法。为了试验方便，阿铭把test.txt编辑成如下内容：
rot:x:0:0:/rot:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
1111111111111111111111111111111
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

**过滤出一个或多个指定的字符**
```
# egrep 'o+' test.txt
rot:x:0:0:/rot:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
# egrep 'oo+' test.txt
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
# egrep 'ooo+' test.txt
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
和grep不同，这里egrep使用的是符号+，它表示匹配1个或多个+前面的字符，这个“+”是不支持被grep直接使用的。包括上面的{}，也是可以直接被egrep使用，而不用加\转义。示例如下：
# egrep 'o{2}' /etc/passwd
root:x:0:0:root:/root:/bin/bash
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
setroubleshoot:x:981:979::/var/lib/setroubleshoot:/sbin/nologin
```

**过滤出零个或一个指定的字符**
```
# egrep 'o?' test.txt
rot:x:0:0:/rot:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
1111111111111111111111111111111
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
# egrep 'ooo?' test.txt
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
# egrep 'oooo?' test.txt
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
```

**过滤出字符串1或者字符串2**
```
# egrep 'aaa|111|ooo' test.txt
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
1111111111111111111111111111111
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

**egrep中()的应用**
```
# egrep 'r(oo|at)o' test.txt
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
这里用()表示一个整体，上例中会把包含rooo或者rato的行过滤出来，另外也可以把()和其他符号组合在一起，例如(oo)+就表示1个或者多个oo。如下所示：
# egrep '(oo)+' test.txt
operator:x:11:0:operator:/root:/sbin/nologin
operator:x:11:0:operator:/rooot:/sbin/nologin
roooot:x:0:0:/rooooot:/bin/bash
```