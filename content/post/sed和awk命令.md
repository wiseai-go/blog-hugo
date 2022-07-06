---
author: "wiseai"
title: "sed和awk命令"
date: 2022-07-06T16:03:36+08:00
description: ""
tags:
- Linux
- 命令
categories:
- Linux学习
- Linux命令
draft: false
---

`# sed [-nefr] [动作]`

选项与参数：

	-n ：使用安静(silent)模式。在一般sed 的用法中，所有来自STDIN 的资料一般都会被列出到屏幕上。
	      但如果加上-n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。
	-e ：直接在指令列模式上进行sed 的动作编辑；
	-f ：直接将sed 的动作写在一个档案内， -f filename 则可以执行filename 内的sed 动作；
	-r ：sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)
	-i ：直接修改读取的档案内容，而不是由屏幕输出。

动作说明： `[n1[,n2]]function`

	n1, n2 ：不见得会存在，一般代表『选择进行动作的行数』，举例来说，如果我的动作
	         是需要在10 到20 行之间进行的，则『 10,20[动作行为] 』

	function 有底下这些咚咚：
	a ：新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
	c ：取代， c 的后面可以接字串，这些字串可以取代n1,n2 之间的行！
	d ：删除，因为是删除啊，所以d后面通常不接任何咚咚；
	i ：插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
	p ：列印，亦即将某个选择的资料印出。通常p 会与参数sed -n 一起运作～
	s ：取代，可以直接进行取代的工作！通常这个s的动作可以搭配正规表示法！
	         例如1,20s/old/new/g
例子：
```
sed '2,5d'  删除2-5行
sed '2a abc'  在第二行后添加abc
sed '2,5c abc' 将2-5行替换为abc
sed -n '2,5p'  打印2-5行
sed 's/word1/word2/g'  将word1替换为word2
sed -i  直接修改文档内容
```
`# cat /etc/passwd | sed -e '4d' -e '6c no six line' > passwd.new`

注：sed后面如果要接超过两个以上的动作时，每个动作前面得加-e才行！
<pre>$ printf '列印格式'实际内容
选项与参数：
关于格式方面的几个特殊样式：
       \a 警告声音输出
       \b 倒退键(backspace)
       \f 清除屏幕(form feed)
       \n 输出新的一行
       \r 亦即Enter 按键
       \t 水平的[tab] 按键
       \v 垂直的[tab] 按键
       \xNN NN 为两位数的数字，可以转换数字成为字元。
关于C 程式语言内，常见的变数格式
       %ns 那个n 是数字， s 代表string ，亦即多少个字元；
       %ni 那个n 是数字， i 代表integer ，亦即多少整数位数；
       %N.nf 那个n 与N 都是数字， f 代表floating (浮点)，如果有小数位数，
             假设我共要十个位数，但小数点有两位，即为%10.2f 啰！
例子：
printf '%10s %5i %5i %5i %8.2f \n' $(cat printf.txt ' grep -v Name)</pre>

<pre>$ <span class="term_command">awk '条件类型1{动作1}条件类型2{动作2} ...' filename</span></pre>
<table class="news">
<tbody>
<tr class="theader">
<td>变数名称</td>
<td>代表意义</td>
</tr>
<tr>
<td class="tcenter">NF</td>
<td>每一行($0) 拥有的栏位总数</td>
</tr>
<tr>
<td class="tcenter">NR</td>
<td>目前awk 所处理的是『第几行』资料</td>
</tr>
<tr>
<td class="tcenter">FS</td>
<td>目前的分隔字元，预设是空白键</td>
</tr>
</tbody>
</table>
<pre>$ <span class="term_command">cat /etc/passwd | awk 'BEGIN {FS=":"} $3 < 10 {print $1 "\t " $3}'</span> 
这个意思是列出UID<10的所有用户名和UID</pre>
</td>
</tr>
</tbody>
</table>
<pre>Name 1st 2nd 3th
VBird 23000 24000 25000
DMTsai 21000 20000 23000
Bird2 43000 42000 41000</pre>
将这个存为文件a.txt
<pre>$ <span class="term_command">cat a.txt | \</span> 
> <span class="term_command">awk 'NR==1{printf "%10s %10s %10s %10s %10s\n",$1,$2,$3,$4,"Total" }</span> 
> <span class="term_command">NR>=2{total = $2 + $3 + $4</span>          ＃这儿如果要存为一行，需要加；
> <span class="term_command">printf "%10s %10d %10d %10d %10.2f\n", $1, $2, $3, $4, total}'
这样就可以格式化并计算出总成绩
</span></pre>