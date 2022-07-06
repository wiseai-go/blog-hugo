---
author: "wiseai"
title: "diff、cmp命令"
date: 2022-07-06T16:46:27+08:00
description: ""
tags:
- 命令
categories:
- Linux命令
draft: false
---

diff以行为单位对比：
<pre>$ diff [-bBi] from-file to-file
选项与参数：
from-file ：一个档名，作为原始比对档案的档名；
to-file ：一个档名，作为目的比对档案的档名；
注意，from-file 或to-file 可以- 取代，那个- 代表『Standard input』之意。

-b ：忽略一行当中，仅有多个空白的差异(例如"about me" 与"about me" 视为相同
-B ：忽略空白行的差异。
-i ：忽略大小写的不同。</pre>
cmp利用『位元组』单位去比对：
<pre>$ cmp [-l] file1 file2
选项与参数：
-l ：将所有的不同点的位元组处都列出来。因为cmp 预设仅会输出第一个发现的不同点。</pre>