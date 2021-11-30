### 面试问题方法论

- 该技术要解决什么问题? why
- 该技术怎么解决它的? how
- 该技术有什么优点? 对比其它技术
- 该技术有什么缺点
- 如何解决这些缺点

### Promise 你了解吗?

- Promise 解决 回调地狱? -> 可以把回调里面的 弄成函数, 在外面声明

- Promise 优点

  - 减少缩进: 把[函数里的函数] 变成 [then 下面的 then]
  - 消灭 `if(err)`, 错误处理单独放到一个函数; 如果不处理, 一直等到往后抛

- async await 来解决 promise 每次都 then

### 宏任务 微任务

- MacroTask: setTimeout
- MicroTask: process.nextTick -> node / MutationObserver -> 浏览器 / setImmediate -> 兼容性差
