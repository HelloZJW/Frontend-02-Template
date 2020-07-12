## 学习笔记
### 语言的分类
 ![语言](https://cdn.nlark.com/yuque/0/2020/png/622179/1594476096695-d1cb23ed-82a4-4415-ab39-5b3c15fded14.png)


 本周学习内容为重学 JavaScript，学完课程以后，从宏观的理论层面对编程语言有了更全面更深入的了解。从语言层面学习了自然语言和形式语言的分类，以及深入学习了形式文法在乔姆斯基谱系下的分类。同时也学习了经典巴科斯范式（ BNF ），它是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。[维基百科](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)对 BNF 的描述：

 > In computer science, Backus–Naur form or Backus normal form (BNF) is a notation technique for context-free grammars, often used to describe the syntax of languages used in computing, such as computer programming languages, document formats, instruction sets and communication protocols. 

### 现代编程语言的分类

参考了几篇文章，大致的对常见的编程语言做一个分类：
* 解释型：BASIC、Lisp、Lua、Pascal、Perl、Python、JavaScript、Ruby
* 编译型：C、C++、C#、COBOL、Java、Objective-C、Smalltalk、Visual Basic
* 脚本语言：AppleScript、JavaScript、BeanShell、PHP、VBScript、Windows PowerShell
* 函数式：又分为纯函数式和非纯函数式语言
* 纯函数式编程语言的典型代表：Haskell
* 非纯函数式语言：Erlang、F#、Scala、Clojure、Lisp、R
* 标记语言：HTML、XHTML、XML、SGML、Curl
* 声明式：函数式语言、标记语言、Lisp等
* 命令式：常见的语言大部分都是命令式的
* 面向对象：C++、Java、Objective-C、Python、Ruby、C#、Smalltalk、COBOL

### 编程语言的性质

#### 图灵完备性
* 命令式---图灵机
  * goto
  * if 和 while
* 声明式 -- lambda 演算
  * 递归

#### 动态与静态
* 动态
  * 在用户设备上/在线服务器上
  * 产品实际运行时
  * Runtime
* 静态
  * 在程序员的设备上
  * 产品开发时
  * CompilteTime

#### 类型系统
* 动态类型系统与静态类型系统
* 强类型与弱类型
* 复合类型
* 子类型
* 泛型

#### 命令式编程语言的组成

 ![语言](https://cdn.nlark.com/yuque/0/2020/png/622179/1594527258887-d264b202-e01a-43c0-a5f9-6e33ce857507.png)


### JavaScript 的类型系统

#### Number
按照 ​IEEE 754 Double Float 标准实现的

* ​以64位为例子
  * ​Sign (1个符号位) 
  * Exponent (11 个指数位) 
  * Fraction (52 个精度位 )
* 32位
  * ​​Sign (1个符号位) 
  * ​​Exponent (8 个指数位)
  * ​Fraction (23 个精度位 )

#### String

字符串的核心概念：
* 字符 Character
* 码点 Code Point
* 编码 Encoding
  * ASCII
  * Unicode
  * GB
  * UCS
  * ISO8895
  * BIG5

#### Object
两个核心要素 Property 和 Prototype。
对象是属性的集合，JavaScript 的属性既可以用来描述状态，也可以用来描述行为。因为 function 也是一种属性。

原型链：
当我们访问属性时，如果遇到当前对象没有，则会沿着原型链找原型对象是否有此名称的属性，原型对象可能还是没有，因此就会有“原型链”这一说法。这一算法保证了每个对象只需要描述自己和原型的区别即可。

### 其他

Boolean 、 Null、 Undefined、Symbol 比较简单

Symbol 用来实现属性访问的权限控制。