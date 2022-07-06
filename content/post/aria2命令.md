---
author: "wiseai"
title: "Aria2命令"
date: 2022-07-06T17:26:36+08:00
description: ""
tags:
- 命令
categories:
- Linux命令
draft: false
---

*   安装
`# dnf install aria2`
*   配置文件aria2.conf
```
    #基本配置
    dir=/home/tzb/aria2/
    log=/home/tzb/aria2/aria2.log
    input-file=/home/tzb/aria2/session/aria2.session
    save-session=/home/tzb/aria2/session/
    save-session-interval=60
    force-save=<span class="hljs-literal">true
    log-level=error  

    #see --split option
    max-concurrent-downloads=5
    continue=<span class="hljs-literal">true
    max-overall-download-limit=0
    max-overall-upload-limit=50K
    max-upload-limit=20  

    # Http/FTP options
    connect-timeout=120
    lowest-speed-limit=10K
    max-connection-per-server=10
    max-file-not-found=2
    min-split-size=1M
    split=5
    check-certificate=<span class="hljs-literal">false
    http-no-cache=<span class="hljs-literal">true  

    # FTP Specific Options  

    # BT/PT Setting
    bt-enable-lpd=<span class="hljs-literal">true
    #bt-max-peers=55
    follow-torrent=<span class="hljs-literal">true
    enable-dht6=<span class="hljs-literal">false
    bt-seed-unverified
    rpc-save-upload-metadata=<span class="hljs-literal">true
    bt-hash-check-seed
    bt-remove-unselected-file
    bt-request-peer-speed-limit=100K
    seed-ratio=0.0

    # Metalink Specific Options

    # RPC Options
    enable-rpc=<span class="hljs-literal">true
    pause=<span class="hljs-literal">false
    rpc-allow-origin-all=<span class="hljs-literal">true
    rpc-listen-all=<span class="hljs-literal">true
    rpc-save-upload-metadata=<span class="hljs-literal">true
    rpc-secure=<span class="hljs-literal">false

    # Advanced Options
    daemon=<span class="hljs-literal">true
    disable-ipv6=<span class="hljs-literal">true
    enable-mmap=<span class="hljs-literal">true
    file-allocation=falloc
    max-download-result=120
    #no-file-allocation-limit=32M
    force-sequential=<span class="hljs-literal">true
    parameterized-uri=<span class="hljs-literal">true
```
*   开机启动
`编辑rc.local添加 aria2c --conf-path=/path/to/aria2/aria2.conf`
*   图形界面
软件：uget或YAAMfirefox：flashgotjavascript：webui-aria2或AriaNg
*   命令：
```
    aria2c http://AAA.BBB.CCC/file.zip  普通下载
    aria2c -s 2 http://AAA.BBB.CCC/file.zip  最大两个连接下载
    aria2c -Z http://aaa.bbb.ccc/file.zip http://ddd.eee.fff/file.zip 下载多个文件
    aria2c -c http://AAA.BBB.CCC/file.zip 断点续传
    aria2c -i download.txt 从文件下载
    aria2c -x2 http://AAA.BBB.CCC/file.zip 开2个线程下载
    aria2c http://AAA.BBB.CCC/file.zipftp://DDD.EEE.FFF/GGG/file.zip 从不同的地址下载同一文件
    aria2c http://AAA.BBB.CCC/file.zipftp://DDD.EEE.FFF/GGG/file.zip  支持不同的协议下载同一文件
    aria2c -o test.torrent http://AAA.BBB.CCC/file.torrent 下载BT种子
    aria2c -max-upload-limit 40K -T file.torrent 设定BT最大上传速度
    aria2c http://AAA.BBB.CCC/file.metalink  从metalink下载文件
    aria2c 'magnet:?xt=urn:btih:248D0A1CD08284299DE78D5C1ED359BB46717D8C'  下载 BitTorrent 磁力链接
    aria2c https://curl.haxx.se/metalink.cgi?curl=tar.bz2  下载 BitTorrent Metalink 种子
    aria2c -S 打印 .torrent，.meta4 和 .metalink 这类文件内含的文件列表
    ＃从密码保护的网站下载文件
    aria2c --http-user=xxx --http-password=xxx https://download.owncloud.org/community/owncloud-9.0.0.tar.bz2
    aria2c --ftp-user=xxx --ftp-password=xxx ftp://ftp.gnu.org/gnu/wget/wget-1.17.tar.gz
 ```
*   注：https下载依赖于安装gnutls或openssl

bt下载依赖于安装gnutls+libgcrypt或opensslmetalink下载依赖于安装libxml2


    ##文件保存相关 ##

    #文件保存目录
    dir=/home/naonao/Downloads
    # 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
    disk-cache=32M
    #断点续传
    continue=true

    # 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
    # 预分配所需时间: none < falloc ? trunc < prealloc
    # falloc和trunc则需要文件系统和内核支持
    # NTFS建议使用falloc, EXT3/4建议trunc, MAC 下需要注释此项
    file-allocation=trunc

    ## 下载连接相关 ##

    # 最大同时下载任务数, 运行时可修改, 默认:5
    #max-concurrent-downloads=100
    # 同一服务器连接数, 添加时可指定, 默认:1
    # 官方的aria2最高设置为16, 如果需要设置任意数值请重新编译aria2
    max-connection-per-server=256
    # 整体下载速度限制, 运行时可修改, 默认:0（不限制）
    #max-overall-download-limit=0
    # 单个任务下载速度限制, 默认:0（不限制）
    #max-download-limit=0
    # 整体上传速度限制, 运行时可修改, 默认:0（不限制）
    #max-overall-upload-limit=0
    # 单个任务上传速度限制, 默认:0（不限制）
    #max-upload-limit=0
    # 禁用IPv6, 默认:false
    # disable-ipv6=true

    # 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
    # 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
    min-split-size=10M
    # 单个任务最大线程数, 添加时可指定, 默认:5
    # 建议同max-connection-per-server设置为相同值
    split=256

    ## 进度保存相关 ##

    # 从会话文件中读取下载任务
    input-file=/etc/aria2/aria2.session
    # 在Aria2退出时保存错误的、未完成的下载任务到会话文件
    save-session=/etc/aria2/aria2.session
    # 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
    save-session-interval=60

    ## RPC相关设置 ##

    # 启用RPC, 默认:false
    enable-rpc=true
    # 允许所有来源, 默认:false
    rpc-allow-origin-all=true
    # 允许外部访问, 默认:false
    rpc-listen-all=true
    # RPC端口, 仅当默认端口被占用时修改
    # rpc-listen-port=6800
    # 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
    rpc-secret=yourpassword
    # 启动SSL
    # rpc-secure=true
    # 证书文件, 如果启用SSL则需要配置证书文件, 例如用https连接aria2
    # rpc-certificate=
    # rpc-private-key=

    ## BT/PT下载相关 ##

    # 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
    follow-torrent=true
    # 客户端伪装, PT需要
    peer-id-prefix=-TR2770-
    user-agent=Transmission/2.77
    # 强制保存会话, 即使任务已经完成, 默认:false
    # 较新的版本开启后会在任务完成后依然保留.aria2文件
    #force-save=false
    # 继续之前的BT任务时, 无需再次校验, 默认:false
    bt-seed-unverified=true
    # 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
    # bt-save-metadata=true
    # 单个种子最大连接数, 默认:55 0表示不限制
    bt-max-peers=0
    # 最小做种时间, 单位:分
    # seed-time = 60
    # 分离做种任务
    bt-detach-seed-only=true
