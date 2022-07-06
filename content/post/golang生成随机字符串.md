---
author: "wiseai"
title: "Golang生成随机字符串"
date: 2022-07-06T08:54:04+08:00
description: ""
tags:
- 随机
- 编程
- golang
categories:
- golang学习
draft: false
---

假如我们要生成一个固定长度的随机字符串，包含大小写字母，没有数字，没有特殊字符串，那么我们怎么做呢？需要怎样优化，才会更简单，更高效？在最终的方案之前，我们看看最常见的写法是怎样的，然后是如何一步步演进到最终的高效率方案的。好吧，先看下最原始的方案。

- 常见做法(Runes)
```
func init() {
	rand.Seed(time.Now().UnixNano())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
```
这个实现比较简单，二十六字母（大小写），然后随机取数，获得随机字符串。

- Bytes改进

我们在最开始的时候进行了假设，我们的随机字符串只包含大小写字母，这样的话，我们发现没有必要使用rune类型存储，因为在Golang（Go语言）UTF-8编码下，英文字母和byte字节是一对一的。byte的本质是uint8类型，而rune本质是int32类型。我们改进后的代码如下：
```
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
```
仔细看上面的代码，我们不光对rune类型进行了改进，还把原来的letter变量变成了常量，这样len(letterBytes)也是一个常量，代码的效率将大大提升。

- 余数改进

我们前面的方案都是通过调用rand.Intn()生成的随机字符，这个rand.Intn()其实是委托调用的Rand.Intn(),而Rand.Intn()最终又是调用的Rand.Int31n()实现。相比我们直接调用rand.Int63()来说，rand.Intn()要慢很多。

所以我们可以把rand.Intn()换成rand.Int63()来提高效率，为了不超过letterBytes的索引范围，我们使用余数来保证。
```
func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63() % int64(len(letterBytes))]
	}
	return string(b)
}
```
这种方式虽然快，但是有个缺点，就是每个字母的概率可能会不一样，不过52个字母相比1<<63-1是在太小太小，所以在这种情况下，这个缺点可以忽略不计。

- Masking 掩码

基于前面的方案，我们可以进一步改进，使用随机数的最低位保证字母的均等分配，也就是掩码的方式。我们现在有52个字母，52用二进制表示就是52==110100b，所以我们可以只使用rand.Int63()返回最低的6位数就可以。为了保证平均分配，如果返回的只大于len(letterBytes)-1，则舍弃不用。
```
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6 // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	)

	func RandStringBytesMask(n int) string {
		b := make([]byte, n)
		for i := 0; i < n; {
			if idx := int(rand.Int63() & letterIdxMask); idx < len(letterBytes) {
				b[i] = letterBytes[idx]
				i++
			}
		}
		return string(b)
	}
```
按照作者的推测，在52个字母的情况下，随机到超过范围的可能性(64-52)/64 = 0.19,按上面的代码，如果超过范围会重复生成，重复的10次的概率仅有1e-8。

- Masking 掩码改进

上一步的方案，我们使用rand.Int63()可以生成63个随机位的数，但是我们只用了最低位的6个，有点浪费，因为获取随机数是我们整个代码中最慢的部分。现在我们有52个字母，意味着6位编码字母索引即可满足，所以我们使用rand.Int63()生成的随机数可以被我们使用63/6=10次。
```
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6 // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax = 63 / letterIdxBits // # of letter indices fitting in 63 bits
	)

	func RandStringBytesMaskImpr(n int) string {
		b := make([]byte, n)
		// A rand.Int63() generates 63 random bits, enough for letterIdxMax letters!
		for i, cache, remain := n-1, rand.Int63(), letterIdxMax; i >= 0; {
			if remain == 0 {
				cache, remain = rand.Int63(), letterIdxMax
			}
			if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
				b[i] = letterBytes[idx]
				i--
			}
			cache >>= letterIdxBits
			remain--
		}

		return string(b)
	}
```
把生成的63位的随机数，分成10部分，每一部分都可以被我们使用，这样我们调用rand.Int63()次数将大大降低，进而提升效率。

- rand Source 优化

rand.Rand其实是使用了一个rand.Source作为生成随机数的源，这个rand.Source是个接口，正好有个func Int63() int64 方法。
```
// A Source represents a source of uniformly-distributed
// pseudo-random int64 values in the range [0, 1<<63).
type Source interface {
Int63() int64
Seed(seed int64)
}
```
这正好是我们需要的，也够我们用了。改进后代码如下：
```
var src = rand.NewSource(time.Now().UnixNano())

func RandStringBytesMaskImprSrc(n int) string {
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}
```
原来的rand.Int63()是整个rand包全局的，而且支持安全高并发，所以速度比较慢。现在我们自己创建的这个src只有我们自己用，所以效率比较高。
strings.Builder 改进

这个是G0 1.10 新增的功能，提升字符串拼接的效率，这方面的可以参考我以前写的三篇文章，这里不做过多的介绍了。

[Go语言字符串高效拼接（一）](https://mp.weixin.qq.com/s?__biz=MzI3MjU4Njk3Ng%3D%3D&chksm=eb3103e0dc468af626e41f136b4652a3fb24527a69db8689c9f691ac94a12a5b6dd6df7b39d3&idx=1&mid=2247484015&scene=21&sn=4fe47b59e7c1595f4d6723c876910247#wechat_redirect)

[Go语言字符串高效拼接（二）](https://mp.weixin.qq.com/s?__biz=MzI3MjU4Njk3Ng%3D%3D&chksm=eb31030edc468a18ffce72f8358f5fa3d4eaa05170569cde6615f86afea85e673767fd049fbc&idx=1&mid=2247484033&scene=21&sn=909064f18cb624ff3c2a061f4e3994f4#wechat_redirect)

[Go语言字符串高效拼接（三）](https://mp.weixin.qq.com/s?__biz=MzI3MjU4Njk3Ng%3D%3D&chksm=eb31030adc468a1cf319086310111998a031691334784fd7afdca2afae0eec7656e574d4e89e&idx=1&mid=2247484037&scene=21&sn=653dcecc028b97e16eed393f37a925d2#wechat_redirect)

经过改进后，代码如下：
```
func RandStringBytesMaskImprSrcSB(n int) string {
	sb := strings.Builder{}
	sb.Grow(n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			sb.WriteByte(letterBytes[idx])
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return sb.String()
}
```
使用unsafe包模拟 strings.Builder

strings.Builder的原理其实很简单，是内置了一个[]byte存储字符，最终转换为string的时候为了避免拷贝，使用了unsafe包。
```
// String returns the accumulated string.
func (b *Builder) String() string {
	return *(*string)(unsafe.Pointer(&b.buf))
}
```
以上这些我们可以自己来做，看看我们重写后的代码。
```
func RandStringBytesMaskImprSrcUnsafe(n int) string {
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return *(*string)(unsafe.Pointer(&b))
}
```
效果和使用strings.Builder一样，而且看起来更简洁了。

- Benchmark 性能测试

以后，我们通过一步步的改进代码，提升效率，现在我们通过Benchmark测试看下这些方法的效果。
```
BenchmarkRunes-4 2000000 723 ns/op 96 B/op 2 allocs/op
BenchmarkBytes-4 3000000 550 ns/op 32 B/op 2 allocs/op
BenchmarkBytesRmndr-4 3000000 438 ns/op 32 B/op 2 allocs/op
BenchmarkBytesMask-4 3000000 534 ns/op 32 B/op 2 allocs/op
BenchmarkBytesMaskImpr-4 10000000 176 ns/op 32 B/op 2 allocs/op
BenchmarkBytesMaskImprSrc-4 10000000 139 ns/op 32 B/op 2 allocs/op
BenchmarkBytesMaskImprSrcSB-4 10000000 134 ns/op 16 B/op 1 allocs/op
BenchmarkBytesMaskImprSrcUnsafe-4 10000000 115 ns/op 16 B/op 1 allocs/op
```
仅仅从rune到byte的改进，我们就获得了**24%的提升，内存占用降低了三分之一** 。

使用rand.Int63替换掉原来的rand.Intn，我们又获得了近20%的提升。

单纯的使用掩码，因为重复获取可用索引的问题，性能下降了**-22%**。

但是当我们对 Masking 掩码 进行改进，分为10部分缓存的时候，我们获得了3倍的提升。

使用rand.Source 代替 rand.Rand, 我们再次获得了21%的提升。

使用strings.Builder,速度提升虽然只有3.5%,但是内存分配降低了50% 。

最后，通过unsafe包精简重写了strings.Builder的功能，我们又获得了14%的提升。

最终，RandStringBytesMaskImprSrcUnsafe比RandStringRunes快6.3倍，并且只使用了六分之一的内存和一半的内存分配，我们就完成了任务。

- 结束语

这是一篇stackoverflow的文章，有人提问 How to generate a random string of a fixed length in Go? ，icza 做了非常精彩的回答，我把整个翻译下来加以整理分享给大家。

这是一篇非常棒的文章，它的意义不光是回答这个问题，还有帮助我们建立如何一步步优化的思路以及追求极致的极客精神。


原文链接：[https://blog.csdn.net/flysnow_org/java/article/details/103520891](https://blog.csdn.net/flysnow_org/java/article/details/103520891)

博客链接：[https://www.flysnow.org/archives/](https://www.flysnow.org/archives/)