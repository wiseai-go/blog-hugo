---
author: "wiseai"
title: "Go程序的时间"
date: 2022-08-25T10:25:07+08:00
description: ""
tags:
- 编程
- golang
categories:
- golang学习
draft: false
---
**Time包定义的类型**

Time: 时间类型, 包含了秒和纳秒以及 Location

Month: type Month int 月份.

定义了十二个月的常量
```
const (
	January Month = 1 + iota
	February
	March
	April
	May
	June
	July
	August
	September
	October
	November
	December
)
```
Weekday 类型: type Weekday int 周

定义了一周的七天
```
const (
	Sunday Weekday = iota
	Monday
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
)
```
Duration： type Duration int64 持续时间.

定义了以下持续时间类型.

多用于时间的加减 需要传入Duration做为参数的时候.

可以直接传入 time.Second
```
const (
 Nanosecond Duration = 1
 Microsecond   = 1000 * Nanosecond
 Millisecond   = 1000 * Microsecond
 Second    = 1000 * Millisecond
 Minute    = 60 * Second
 Hour     = 60 * Minute
)
```
Location

在time包里有两个时区变量:

time.UTC utc时间

time.Local 本地时间

时间格式化

时间格式Time:
```
fmt.Println(time.Now())
// 输出: 2019-04-30 14:41:59.661602 +0800 CST m=+0.000225294

fmt.Println(time.Now().String())
// 输出: 2019-04-30 14:41:59.661826 +0800 CST m=+0.000448434
获取当前时间戳：

// 获取当前unix时间戳（秒）
fmt.Println(time.Now().Unix()) // 输出: 1556615702

// 获取当前unix时间戳（毫秒）
fmt.Println(time.Now().UnixNano() / 1e6) // 输出: 1556615702009

// 获取当前unix时间戳（纳秒）
fmt.Println(time.Now().UnixNano()) // 输出: 1556615702009257000
字符串转化成时间戳:

x := "2018-12-27 18:44:55"
p, _ := time.Parse("2006-01-02 15:04:05", x)
fmt.Println( p.Unix() ) // 输出: 1545936295
将当前时间转成年月日时分秒格式:

t = time.Now()
fmt.Println(t.Format("2006-01-02"))   // 输出: 2019-04-30
fmt.Println(t.Format("2006-01-02 15:04:05")) // 输出: 2019-04-30 14:43:26
fmt.Println(t.Format("2006-01-02 00:00:00")) // 输出: 2019-04-30 00:00:00
fmt.Println(t.Format("2006/01/02 15:04")) // 输出: 2019-04-30 14:43
fmt.Println(t.Format("2006/Jan/02 15:04")) // 输出: 2019/Apr/30 17:28

// 指定时间
t2 := time.Date(2019, time.November, 28, 11, 35, 46, 0, time.UTC)
// 返回 Time 类型

fmt.Printf("=>日期格式: %s\n", t2.Format("06/01/02 15:04:05"))
// 输出: =>日期格式: 19/11/28 11:35:46
```
注意：
在Go语言中，"Y-m-d H:i:s""yyyy-MM-dd HH:mm:ss" 为特定的数字 “2006-01-02 15:04:05”是Go语言的创建时间，且必须为这几个准确的数字。

使用 time.Now().Date() 获取年月日：
```
// Date()返回三个参数: 年月日
year1, month1, day1 := time.Now().Date()
 
fmt.Printf("year: %v, type: %T \n", year1, year1)
// 输出: year: 2019, type: int
 
fmt.Printf("month: %v, type: %T \n", month1, month1)
// 输出: month: April, type: time.Month
 
fmt.Printf("day: %v, type: %T \n", day1, day1)
// 输出: day: 30, type: int
```

golang的time.Format设计的和其他语言都不一样, 其他语言总是使用一些格式化字符进行标示, 而golang使用"2006-01-02 15:04:05.999999999 -0700 MST"
```
// String returns the time formatted using the format string
// "2006-01-02 15:04:05.999999999 -0700 MST"
func (t Time) String() string {
 return t.Format("2006-01-02 15:04:05.999999999 -0700 MST")
}
```
例子:
```
func nowTime() string {
 return time.Now().Format("2006-01-02 15:04:05")
}
```