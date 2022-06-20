---
author: "wiseai"
title: "更改ubuntu源"
date: "2022-06-19"
description: "更改ubuntu源"
tags:
- apt
- 源
categories:
- Linux使用
draft: false
---

`sed -i 's#http://archive.ubuntu.com/ubuntu/#mirror://mirrors.ubuntu.com/mirrors.txt#' /etc/apt/sources.list`