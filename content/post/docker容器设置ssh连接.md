---
author: "wiseai"
title: "Docker容器设置ssh连接"
date: 2022-07-06T16:36:58+08:00
description: ""
tags:
- Linux
- docker
- 容器
categories:
- Linux学习
draft: false
---

这里以debian容器为例：

一、进入容器、更改更新源及安装openssh-server
--

<pre class="editor-colors lang-text"><span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># docker exec -it debian /bin/bash</span></span>
<span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># sed -i -e 's/deb.debian.org/mirrors.aliyun.com/g' \</span></span>
<span class="syntax--text syntax--plain">         <span class="syntax--meta syntax--paragraph syntax--text">-e 's/security.debian.org/mirrors.aliyun.com/g' \</span></span>
<span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text">         /etc/apt/sources.list</span></span>
<span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># apt install openssh-server</span></span>
</pre>

二、添加目录、修改配置文件
--

<pre class="editor-colors lang-text"><span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># mkdir -p /run/sshd</span></span>
</pre>

注：(这个地方看启动服务时的提示信息，运行sshd服务的命令只能使用绝对路径/usr/sbin/sshd -D)

*   下面修改/etc/ssh/sshd_config
先说下PermitRootLogin：prohibit-password 允许root登陆但不能使用密码登陆yes 允许root以任何方式登陆,我们这里只允许使用密钥无密码登陆：
<pre class="editor-colors lang-text"><span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config</span></span>
</pre>

*   下面修改/etc/pam.d/sshd
<pre class="editor-colors lang-text"><span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># sed -i 's/session .*required .*pam_loginuid.so/#session required pam_loginuid.so/g' /etc/pam.d/sshd</span></span>
</pre>

注：这个是一个pam登陆控制，可以参考[ftp服务器设置](/post/ftp服务器架设vsftpd/)

三、添加ssh服务，使服务在容器打开时就启动：
--

<pre class="editor-colors lang-text"><span class="syntax--text syntax--plain"><span class="syntax--meta syntax--paragraph syntax--text"># sed -i '$a /usr/sbin/sshd -D' /etc/bash.bashrc</span></span></pre>

<!-- wp:heading {"level":4} -->

#### centos容器中遇到的问题：

显示/etc/ssh/中缺少公钥和私钥：
```
$ ssh-keygen -t rsa -N '' -f /etc/ssh/ sh_host_rsa_key  
$ ssh-keygen -t ed25519 -N '' -f /etc/ssh/ssh_host_ed25519_key  
$ ssh-keygen -t ecdsa -N '' -f /etc/ssh/ssh_host_ecdsa_key
```
