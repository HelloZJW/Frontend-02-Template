## 学习笔记

本周学习进入第三周了，慢慢的找到了一些学习的感觉，能够耐着性子看完 parseInt 的规范文档，并且照着 规范实现了 stringToNumber 的函数，虽然过程比较痛苦，但是这个过程带来的收获非常的大。

因为上班时间有限，运算符和表达式这些编译相关的知识，我的学习目标是简历一个感性的认知，在脑海中建立一条纽带，在未来需要的时候花更多的时间去钻研。所以本周的学习重点放在了 JS 结构化的内容上。

### JS 结构化
#### 宏任务和微任务

* 我们把宿主发起的任务称为宏观任务（如setTimeout），把 JavaScript 引擎发起的任务称为微观任务, 微任务只有 Promise 会产生，微任务里面可能会分成几个不同的函数调用。
* 在宏观任务中，JavaScript 如 Promise 会产生异步代码，JavaScript 必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列。
* 微任务总会在下一个宏任务之前执行，在本身所属的宏任务结束后立即执行
* JavaScript 的 Promise 是 [Promise A+规范](https://promisesaplus.com/)的实现。

### 闭包
每一个函数都是包含一个闭包,闭包包含代码部分和环境部分
```
var y = 2;
function foo() {
    console.log(y)
}
export foo;

// Environment Record: y: 2
// Code: console.log(y);
```

```
var y = 2;
function foo2() {
    var z = 3;
    return () => {
        console.log(y, z, this) 
    }
}

var foo3 = foo2()
export foo3;

// Environment Record: 
// 1, z: 3, this: global (箭头函数保存父级this)
// 2, y: 2
// Code: console.log(y, z, this);
```