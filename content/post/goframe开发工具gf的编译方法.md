---
author: "wiseai"
title: "Goframe开发工具gf的编译方法"
date: 2022-09-20T10:52:06+08:00
description: ""
tags:
- gf
categories:
- goframe学习
draft: false
---
### 这里主要说明自行编译的方法

- [点击下载源码](https://github.com/gogf/gf) ，这里最好放在`~/go/src/github/`下，方便导入。

- 根据自己的需要修改数据库依赖，文件/cmd/gf/internal/cmd/cmd_gen_dao.go的import。sqlite 和oracle 的驱动需要安装cgo环境。

- 进入到gf cli的源码目录/cmd/gf 编译

`# go build main.go`或者`gf build main.go`

***这里说明几个需要注意的事项:***
1. 编译的时候最好使用以前编译的gf编译，用`go build`不能写入gf的信息
```
GoFrame CLI Tool v2.1.4, https://goframe.org
GoFrame Version: v2.1.0 in current go.mod
CLI Installed At: /home/xjc/go/src/github.com/gogf/gf/cmd/gf/gf
Current is a custom installed version, no installation information.
```
用`gf build`就有编译信息了
```
GoFrame CLI Tool v2.1.4, https://goframe.org
GoFrame Version: v2.1.0 in current go.mod
CLI Installed At: /usr/bin/gf
CLI Built Detail:
  Go Version:  go1.19.1
  GF Version:  v2.1.4
  Git Commit:  none
  Build Time:  2022-09-20 10:24:57
```
这里的Git Commit没有内容，主要是懒得去加。
Git Commit怎么用go语言取值没有去找，比较直接的方法是修改这个文件`github.com/gogf/gf/cmd/gf/internal/cmd/cmd_version.go`
```
if info.Git == "" {
    info.Git = "none"
}
```
意思是如果这个值为空，就为none，最直接的就是把none改为Git Commit的值。

2. 如果使用sqlite和oracle数据库，必需使用cgo环境编译。

`# CGO_ENABLED=0 gf build main.go`

3. 涉及gf编译的文件有以下几个：
```
github.com/gogf/gf/cmd/gf/internal/cmd/cmd_gen_dao.go
github.com/gogf/gf/cmd/gf/internal/cmd/cmd_version.go
github.com/gogf/gf/os/gbuild/gbuild.go

```
