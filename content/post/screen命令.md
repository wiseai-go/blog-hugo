---
author: "wiseai"
title: "screen命令"
date: 2022-07-06T17:09:03+08:00
description: ""
tags:
- 命令
categories:
- Linux命令
draft: false
---

# 一、使用

*   创建一个新的窗口
安装完成后，直接敲命令screen就可以启动它。但是这样启动的screen会话没有名字，实践上推荐为每个screen会话取一个名字，方便分辨：
> ＃ screen -S david
*   screen启动后，会创建第一个窗口，也就是窗口No. 0，并在其中打开一个系统默认的shell，一般都会是bash。所以你敲入命令screen之后，会立刻又返回到命令提示符，仿佛什么也没有发生似的，其实你已经进入Screen的世界了。当然，也可以在screen命令之后加入你喜欢的参数，使之直接打开你指定的程序，例如：
> ＃ screen vi david.txt
> screen创建一个执行vi david.txt的单窗口会话，退出vi 将退出该窗口/会话。

*   可以使用快捷键C-a A来为当前窗口重命名
*   暂时中断会话，在screen窗口键入C-a d，Screen会给出detached提示
*   找到该screen会话：
> ＃ screen -ls
*   重新连接会话：
>＃ screen -r 12865
*   将指定的screen作业离线
> ＃ screen -d
*   清除dead 会话
> ＃ screen -wipe
*   语法
> ＃screen [-AmRvx -ls -wipe][-d <作业名称>][-h <行数>][-r <作业名称>][-s ][-S <作业名称>]
*   参数说明
```
-A 　将所有的视窗都调整为目前终端机的大小。
-d <作业名称> 　将指定的screen作业离线。
-h <行数> 　指定视窗的缓冲区行数。
-m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。
-r <作业名称> 　恢复离线的screen作业。
-R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。
-s 　指定建立新视窗时，所要执行的shell。
-S <作业名称> 　指定screen作业的名称。
-v 　显示版本信息。
-x 　恢复之前离线的screen作业。
-ls或--list 　显示目前所有的screen作业。
-wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。
```
*   常用screen参数
```
> screen -S yourname -> 新建一个叫yourname的session
> screen -ls -> 列出当前所有的session
> screen -r yourname -> 回到yourname这个session
> screen -d yourname -> 远程detach某个session
> screen -d -r yourname -> 结束当前session并回到yourname这个session
```
*   在每个screen session 下，所有命令都以 ctrl+a(C-a) 开始。
```
C-a ? -> 显示所有键绑定信息
C-a c -> 创建一个新的运行shell的窗口并切换到该窗口
C-a n -> Next，切换到下一个 window
C-a p -> Previous，切换到前一个 window
C-a 0..9 -> 切换到第 0..9 个 window
Ctrl+a [Space] -> 由视窗0循序切换到视窗9
C-a C-a -> 在两个最近使用的 window 间切换
C-a x -> 锁住当前的 window，需用用户密码解锁
C-a d -> detach，暂时离开当前session，将目前的 screen session (可能含有多个 windows) 丢到后台执行，并会回到还没进 screen 时的状态，此时在 screen session 里，每个 window 内运行的 process (无论是前台/后台)都在继续执行，即使 logout 也不影响。
C-a z -> 把当前session放到后台执行，用 shell 的 fg 命令则可回去。
C-a w -> 显示所有窗口列表
C-a t -> Time，显示当前时间，和系统的 load
C-a k -> kill window，强行关闭当前的 window
C-a [ -> 进入 copy mode，在 copy mode 下可以回滚、搜索、复制就像用使用 vi 一样
C-b Backward，PageUp
C-f Forward，PageDown
H(大写) High，将光标移至左上角
L Low，将光标移至左下角
0 移到行首
$ 行末
w forward one word，以字为单位往前移
b backward one word，以字为单位往后移
Space 第一次按为标记区起点，第二次按为终点
Esc 结束 copy mode
C-a ] -> Paste，把刚刚在 copy mode 选定的内容贴上
```
*   screen 高级应用
*   会话共享
还有一种比较好玩的会话恢复，可以实现会话共享。假设你在和朋友在不同地点以相同用户登录一台机器，然后你创建一个screen会话，你朋友可以在他的终端上命令：
>＃screen -x
*   这个命令会将你朋友的终端Attach到你的Screen会话上，并且你的终端不会被Detach。这样你就可以和朋友共享同一个会话了，如果你们当前又处于同一个窗口，那就相当于坐在同一个显示器前面，你的操作会同步演示给你朋友，你朋友的操作也会同步演示给你。当然，如果你们切换到这个会话的不同窗口中去，那还是可以分别进行不同的操作的。
*   会话锁定与解锁
Screen允许使用快捷键C-a s锁定会话。锁定以后，再进行任何输入屏幕都不会再有反应了。但是要注意虽然屏幕上看不到反应，但你的输入都会被Screen中的进程接收到。快捷键C-a q可以解锁一个会话。
也可以使用C-a x锁定会话，不同的是这样锁定之后，会话会被Screen所属用户的密码保护，需要输入密码才能继续访问这个会话。
*   发送命令到screen会话
在一个叫做sandy的screen会话中创建一个新窗口，并在其中运行ping命令
> ＃ screen -S sandy -X screen ping 127.0.0.1
*   屏幕分割
*   快捷键C-a S将显示器水平分割，Screen 4.00.03版本以后，也支持垂直分屏，快捷键是C-a '。分屏以后，可以使用C-a 在各个区块间切换，每一区块上都可以创建窗口并在其中运行进程。
*   可以用C-a X快捷键关闭当前焦点所在的屏幕区块，也可以用C-a Q关闭除当前区块之外其他的所有区块。
*   C/P模式和操作
screen的另一个很强大的功能就是可以在不同窗口之间进行复制粘贴了。使用快捷键C-a 或者C-a [可以进入copy/paste模式，这个模式下可以像在vi中一样移动光标，并可以使用空格键设置标记。其实在这个模式下有很多类似vi的操作，譬如使用/进行搜索，使用y快速标记一行，使用w快速标记一个单词等。关于C/P模式下的高级操作，其文档的这一部分有比较详细的说明。
一般情况下，可以移动光标到指定位置，按下空格设置一个开头标记，然后移动光标到结尾位置，按下空格设置第二个标记，同时会将两个标记之间的部分储存在copy/paste buffer中，并退出copy/paste模式。在正常模式下，可以使用快捷键C-a ]将储存在buffer中的内容粘贴到当前窗口。
*   更多screen功能
同大多数UNIX程序一样，GNU Screen提供了丰富强大的定制功能。你可以在Screen的默认两级配置文件/etc/screenrc和$HOME/.screenrc中指定更多，例如设定screen选项，定制绑定键，设定screen会话自启动窗口，启用多用户模式，定制用户访问权限控制等等。如果你愿意的话，也可以自己指定screen配置文件。
以多用户功能为例，screen默认是以单用户模式运行的，你需要在配置文件中指定multiuser on 来打开多用户模式，通过acl*（acladd,acldel,aclchg...）命令，你可以灵活配置其他用户访问你的screen会话。更多配置文件内容请参考screen的man页。