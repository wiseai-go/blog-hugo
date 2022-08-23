---
author: "wiseai"
title: "golang使用smtp发送Email"
date: 2022-08-23T10:33:39+08:00
description: ""
tags:
- 编程
- golang
categories:
- golang学习
draft: false
---

几个开源的代码：
- [email](https://github.com/jordan-wright/email.git "email")
这个代码比较清晰，我现在用的就是这个，Star2.1k
- [gomail](https://github.com/go-gomail/gomail.git "gomail")
没用过，Star3.7k
- [mailhog](https://github.com/mailhog/MailHog.git "mailhog")
这个Star10.7，看着是不错功能强大，但是依赖太多，没深入学习
- [邮件相关汇总](https://www.mianshigee.com/project/t/go-email-creation-and-sending "邮件相关汇总")
这个是一个邮件相关代码汇总的帖子，内容比较旧了，但是可以参考学习下

使用ssl的例子：
```
import (
	"tls.Config"
	"email"//引入包，看怎么引入了
	)
func SendMail(s string) error {
	e := NewEmail()
	e.From = "发送邮箱"
	e.To = []string{"目标邮箱"}
	// e.Bcc = []string{"bcc@junzhe.net"}
	// e.Cc = []string{"cc@junzhe.net"}
	//这两个基本不用
	e.Subject = "这个是主题"
	// e.Text = []byte("这里是内容")
	e.HTML = []byte("这是HTML格式的内容")
	t := &tls.Config{InsecureSkipVerify: true, ServerName: "这里是smtp服务器"}
	err := e.SendWithTLS("smtp服务器:465", smtp.PlainAuth("", "邮箱名", "密码", "smtp服务器"), t)
	return err
}
```