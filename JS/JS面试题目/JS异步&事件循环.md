## 并发和并行的区别

并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

## 回调函数 Callback

1. 嵌套函数存在耦合性
2. 难以处理错误

```js
// 回调函数示例
ajax("", function () {
  // 处理逻辑
})

// 多个请求存在依赖, 容易写成回调地狱
```

## Generator

`generator` 最大的特点就是控制函数的执行

```js
// Generator 函数调用和普通函数不同，它会返回一个迭代器
// 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
// 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
// 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42

function* foo(x) {
  let y = 2 * (yield x + 1)
  let z = yield y / 3
  return x + y + z
}
let it = foo(5)
console.log(it.next()) // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}

// 用 generator 解决 回调地狱
function* fetch() {
  yield ajax(url, () => {})
  yield ajax(url1, () => {})
  yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

## Promise

1. `Promise 有三种状态: pending fulfilled rejected`
2. 一旦从等待状态变成为其他状态就永远不能更改状态了

```js
// 1. promise 状态一旦改变不会再变
new Promise((resolve, reject) => {
  resolve("success")
  // 无效
  reject("reject")
})

// 2. 构造函数内部代码立即执行
new Promise((resolve, reject) => {
  console.log("new Promise")
  resolve("success")
})
console.log("finifsh")
// new Promise -> finifsh

// 3. promsie实现链式调用, 每次返回都是一个 promise
Promise.resolve(1)
  .then((res) => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then((res) => {
    console.log(res) // => 2
  })

// 4. 解决回调地狱
ajax(url)
  .then((res) => {
    console.log(res)
    return ajax(url1)
  })
  .then((res) => {
    console.log(res)
    return ajax(url2)
  })
  .then((res) => console.log(res))
```

## Async 和 Await

1. 一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`

```js
async function test() {
  return "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}

// await 只能配套 async 使用
async function test() {
  let value = await sleep()
}

let a = 0
let b = async () => {
  a = a + (await 10)
  console.log("2", a) // -> '2' 10
}
b()
a++
console.log("1", a) // -> '1' 1
```

## 常用定时器函数

1. `setTimeout setInterval requestAnimationFrame`

2. 通常来说不建议使用 `setInterval`。第一，它和 `setTimeout` 一样，不能保证在预期的时间执行任务。第二，它存在执行累积的问题

```js
function demo() {
  setInterval(function () {
    console.log(2)
  }, 1000)
  sleep(2000)
}
demo()
```

3. `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行, `window.cancelAnimationFrame()` 可以取消这个动画

### 进程 和 线程的区别? JS 单线程的好处

本质上来说, 两个名词都是 CPU 工作时间片 的一个描述

进程描述了 CPU 在运行指令及加载和保存上下文所需的时间，放在应用上来说就代表了一个程序。`线程是进程中的更小单位`，描述了执行一段指令所需的时间

把这些概念拿到浏览器中来说，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁

得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处

### 什么是执行栈

> 可以把执行栈认为是`一个存储函数调用的栈结构，遵循先进后出的原则`

执行一段代码, 往栈中放入函数, 先放入的后执行, 后放入的先执行, 执行 JS 代码的时候其实就是往执行栈中放入函数

### 浏览器 EventLoop

对于执行栈上面是同步的, 但遇到异步代码的时候该怎么办？其实当遇到异步的代码时，会被`挂起`并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为

任务源可以分为 `微任务（microtask）` 和 `宏任务（macrotask）`。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task

- 微任务包括 `process.nextTick ，promise ，MutationObserver。`
- 宏任务包括 `script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。`

### Node 中的 Event Loop

1. timer
   - timers 阶段会执行 `setTimeout 和 setInterval` 回调，并且是由 poll 阶段控制的
2. poll
   - 回到 timer 阶段执行回调
   - 执行 I/O 回调
3. check
   - check 阶段执行 `setImmediate`

---

> `Node.js 的 EventLoop` 的几个阶段: `timers poll check`, 顺序是: timers -> poll -> check -> timers

1. Node.js

- `setTimeout` -> timers 阶段
- `setImmediate` -> check 阶段
- `process.nextTick` -> 当前在哪个阶段的后面: 如果是在 check 阶段, 就在这个阶段完成后面执行 再到其它阶段,

2. Node.js
   `node.js EventLoop(事件循环)`的过程

- 1. tiemrs -> [setTimeout(fn, 1s)] -> poll
  - 第一个阶段不确定有没有执行, 去第二个阶段 (poll) 去等待(执行 js)
  - 碰见 `setTimeout` 直接放入 timer []
  - 碰见 `setImmediate` 立即执行, 放到 check 检查执行 -> 执行完, 去看 timers 的队列
  - `setImmediate` 是否先执行, 要看 开启`eventloop` 进入 poll 阶段
- 2. poll 停留/等待 -> check
  - 事件大部分事件停留在 poll 阶段等待事件,
- 3. check -> setImmediate(fn2, 0) -> timers
     `process.nextTick()` 并不是 `eventloop` 的一部分, 不管 `event loop` 处在哪个阶段, `nextTick队列`都是在当前阶段后就被执行了, poll 阶段结束就执行 `nextTick`, 进入 check 阶段
