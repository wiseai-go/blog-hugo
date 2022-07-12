---
author: "wiseai"
title: "Go程序执行系统命令"
date: 2022-07-12T17:56:39+08:00
description: ""
tags:
- 编程
categories:
- golang学习
draft: false
---
直接上代码:
```
package main

import (
	"bytes"
	"fmt"
	"os/exec"
)

func main() {
	var err error
	var stdout, stderr string

	Loop:
	err = nil
	stdout, stderr = "", ""

	fmt.Println("1.列出当前目录中的目录和文件")
	fmt.Println("2.当前目录占用空间")
	fmt.Println("3.重启打印服务")
	fmt.Println("退出请输入9")
	fmt.Println("-----------------------------")

	var key uint8
	fmt.Scanf("%d", &key)
	switch key {
	case 1:
		err, stdout, stderr = shellRun("ls -lh")
	case 3:
		err, stdout, stderr = shellRun("systemctl restart cups")
		fmt.Println("请输入密码!")
	case 2:
		err, stdout, stderr = shellRun("du -h")
		fmt.Println("当前目录占用空间为:")
	case 9:
		fmt.Println("安全退出")
		return
	default:
		fmt.Println("-----------------------------")
		fmt.Println("请输入正确的数字!")
	}
	if err != nil {
		fmt.Print("出现错误：")
		fmt.Println(err)
	}
	if stdout != "" {
		fmt.Println(stdout)
	}
	if stderr != "" {
		fmt.Println("错误提示:")
		fmt.Println(stderr)
	}

	fmt.Println("-----------------------------")
	goto Loop
}

func shellRun(command string) (error, string, string) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd := exec.Command("/bin/bash", "-c", command)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	return err, stdout.String(), stderr.String()
}
```