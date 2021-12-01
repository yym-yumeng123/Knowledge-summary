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

### Promise

- 使用

```js
const p = new Promise((resolve, reject) => {
  // TODO...
  resolve()
})

p.then().catch()
```

- MacroTask 宏任务/ MicroTask 微任务
  先 宏任务, 后微任务, 其实一开始没有两个任务队列, 为了让 Promise 回调更早执行,强行插入了一个队列, 如果没有 微任务, 还不如直接用 `setTimeout`

- `Promise.resolve()`
  制造一个 (成功|失败) Promise 实例, 和 resolve 结果有关
- `Promise.reject()`
  制造一个失败的 `Promise`
- `Promise.all(数组)`
  等待全部成功, 或者有一个失败
- `Promise.allSettled(数组)`
  返回一个数组 [{status: 'fulfilled', value: xx}]

  ```js
  // 使用 Promise.all 写 Promise.allSettled
  // 失败会进入 reason, 成功返回, 也会成功执行
  x= promise => promise.then((result) => {status: 'ok', value: result}, reason => {status: 'not ok', reason} )

  const p1 = new Promise((resolve, reject) => reject(1))
  const p2 = new Promise((resolve) => resolve(2))
  const p3 = new Promise((resolve, reject) => reject(3))

  x = promiseList => promiseList.map(promise => promise.then(result => ({status: 'ok', value: result}),reason =>  ({status: 'not ok', reason}) ))

  Promise.all(x([p1, p2, p3])).then(res => console.log(res, 'res...'))
  // {status: 'not ok', reason: 1}
  // {status: 'ok', value: 2}
  // {status: 'not ok', reason: 3}
  ```

- `Promise.race(数组)`
