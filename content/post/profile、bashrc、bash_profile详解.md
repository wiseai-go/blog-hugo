---
author: "wiseai"
title: "profile、bashrc、bash_profile详解"
date: 2022-07-06T16:20:56+08:00
description: ""
tags:
- Linux
categories:
- Linux学习
draft: false
---

**/etc/profile:** 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.

英文描述为：
```
# /etc/profile

# System wide environment and startup programs, for login setup
# Functions and aliases [Go](http://lib.csdn.net/base/go "Go知识库") in /etc/bashrc

# It's NOT a good idea to change this file unless you know what you
# are doing. It's much better to create a custom.sh shell script in
# /etc/profile.d/ to make custom changes to your environment, as this
# will prevent the need for merging in future updates.
```
此修改对每个用户都生效。

---

**/etc/bashrc:** 为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.

英文描述为：
```
# /etc/bashrc

# System wide functions and aliases
# Environment stuff goes in /etc/profile

# It's NOT a good idea to change this file unless you know what you
# are doing. It's much better to create a custom.sh shell script in
# /etc/profile.d/ to make custom changes to your environment, as this
# will prevent the need for merging in future updates.
```
如果你想对所有的使用bash的用户修改某个配置并在以后打开的bash都生效的话可以修改这个文件，修改这个文件不用重启，重新打开一个bash即可生效。

---

- **~/.bash_profile:** 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的 **.bashrc** 文件.

此文件类似于 **/etc/profile** ，**/etc/profile**对所有用户生效，**~/.bash_profile**只对当前用户生效。

- **~/.bashrc:** 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该文件被读取.

此文件类似于 **/etc/bashrc**，不需要重启生效，重新打开一个bash即可生效，  /etc/bashrc对所有用户新打开的bash都生效，但 **~/.bashrc**只对当前用户新打开的bash生效。

- ~/.bash_logout:当每次退出系统(退出bash shell)时,执行该文件.

另外,/etc/profile中设定的变量(全局)的可以作用于任何用户,而 **~/.bashrc** 等中设定的变量(局部)只能继承 **/etc/profile** 中的变量,他们是"父子"关系.

~/.bash_profile 是交互式、login 方式进入bash 运行的；
~/ **.bashrc** 是交互式 non-login 方式进入bash 运行的；
通常二者设置大致相同，所以通常前者会调用后者。