---
author: "wiseai"
title: "Goframe中数据库配置"
date: 2022-09-16T10:55:47+08:00
description: ""
tags:
- 数据库
categories:
- goframe学习
draft: false
---
goframe中获取数据库操作对象有三种方式，一种是使用g.DB方法（推荐），一种是使用原生gdb.New方法，还有一种是使用包原生单例方法gdb.Instance

### 配置文件
```
{
	"database": {
		"default": 
			[{"link": "sqlite:/home/xjc/go/src/gitee/test-gf/testGf.db", "debug": "true"}],
		"focus": 
			[{"link": "mysql:focus:sadmQHH*i@tcp(192.168.1.1:3306)/focus", "debug": "true", "role": "master"}]
			[{"link": "mysql:focus:sadmQHH*i@tcp(192.168.1.2:3306)/focus", "debug": "true", "role": "slave"}]
	}
}
```
这里是json格式，也可以使用yaml，这样配置的原因是可以方便配置集群模式，[具体查看文档](https://goframe.org/)

### 加载数据库驱动

[这里找加载方法](https://github.com/gogf/gf/tree/master/contrib/drivers)
```
mport (
    _ "github.com/gogf/gf/contrib/drivers/sqlite/v2" 
    _ "github.com/gogf/gf/contrib/drivers/mysql/v2"
)
```
### g.DB方法（推荐）

加载数据库驱动，[这里找加载方法](https://github.com/gogf/gf/tree/master/contrib/drivers)
```
import (
    "github.com/gogf/gf/v2/frame/g"
)

// 获取默认配置的数据库对象(配置名称为"default")
db := g.DB()

// 获取配置分组名称为"user"的数据库对象
db := g.DB("user")
```
g.DB对象管理方式获取的是单例对象，整合了配置文件的管理功能，支持配置文件热更新。

### gdb.New是根据给定的数据库节点配置创建一个新的数据库对象(非单例)，无法使用配置文件。（这里有坑）

```
db, err := gdb.New(gdb.ConfigNode{
        Host     : "/home/xjc/go/src/gitee/test-gf/",
        Name     : "testGf.db",
        Type     : "sqlite",
})
```
**这里不支持link写法，注意这里sqlite的写法**

### gdb.Instance是包原生单例管理方法，需要结合配置方法一起使用，通过分组名称(非必需)获取对应配置的数据库单例对象。
```
gdb.SetConfig(gdb.Config {
    "default" : gdb.ConfigGroup {
        gdb.ConfigNode {
            Link: "sqlite:/home/xjc/go/src/gitee/test-gf/testGf.db",
        },
    },
    "focus" : gdb.ConfigGroup {
        gdb.ConfigNode {
            Link: "mysql:focus:sadmQHH*i@tcp(192.168.1.1:3306)/focus",
        },
    },
})

//数据库dufault
db, err := gdb.Instance()
//数据库focus
db, err := gdb.Instance("focus")
//或
//数据库dufault
db, err := gdb.NewByGroup()
//数据库focus
db, err := gdb.NewByGroup("focus")
```
### 使用该配置方式时，为保证数据库安全，默认底层不支持多行SQL语句执行。为了得到更多配置项控制，请参考推荐的简化配置，同时建议您务必了解清楚简化配置项中每个连接参数的功能作用。
```
database:
  分组名称:
    host:                  "地址"
    port:                  "端口"
    user:                  "账号"
    pass:                  "密码"
    name:                  "数据库名称"
    type:                  "数据库类型(mysql/pgsql/mssql/sqlite/oracle)"
    link:                  "(可选)自定义数据库链接信息，当该字段被设置值时，以上链接字段(Host,Port,User,Pass,Name)将失效，但是type必须有值"         
    role:                  "(可选)数据库主从角色(master/slave)，不使用应用层的主从机制请均设置为master"
    debug:                 "(可选)开启调试模式"
    prefix:                "(可选)表名前缀"
    dryRun:                "(可选)ORM空跑(只读不写)"
    charset:               "(可选)数据库编码(如: utf8/gbk/gb2312)，一般设置为utf8"
    weight:                "(可选)负载均衡权重，用于负载均衡控制，不使用应用层的负载均衡机制请置空"
    timezone:              "(可选)时区配置，例如:local"
    maxIdle:               "(可选)连接池最大闲置的连接数"
    maxOpen:               "(可选)连接池最大打开的连接数"
    maxLifetime:           "(可选)连接对象可重复使用的时间长度"
    createdAt:             "(可选)自动创建时间字段名称"
    updatedAt:             "(可选)自动更新时间字段名称"
    deletedAt:             "(可选)软删除时间字段名称"
    timeMaintainDisabled:  "(可选)是否完全关闭时间更新特性，true时CreatedAt/UpdatedAt/DeletedAt都将失效"
```