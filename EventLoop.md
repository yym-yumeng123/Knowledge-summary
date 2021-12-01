### 事件循环

1. 事件: 键盘事件, 其他东西触发的, 统称为事件
2. 轮询: 操作系统通过轮询的方式, 每个一段时间就询问事件有没有触发

---

1. JS: 浏览器
```js
console.log(1)
console.log(2)
console.log(3)

// js 是单线程, 发消息告诉 c++ , 轮询 ajax 事件
ajax() // 假如等待事件 1s, -> (操作系统/浏览器/...) 会轮询, 直到事件的发生

// 会继续执行, 不受 ajax 事件影响 
console.log(4)
console.log(5)
console.log(6)
```

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
```js
setImmediate(() => {
  console.log('setImmediate1)
  setTimeout(() => {
    console.log('setTimeout1)
  }, 0)
})

setTimeout(() => {
  console.log('setTimeout2)
  setImmediate(() => {
    console.log('setImmediate2)
  })
}, 0)

// 分析 eventloop 阶段
1. timer
2. poll
3. check

上面代码: 第一个 setImmediate 会进入 check 阶段立即执行, 第一个setTimeout 会进入 timer, 放入第一个队列, 然后 第一个 setImmediate 里面的 setTimeout 会被放入 timer 阶段 第二个, 

==> 先打印 setImmediate1 -> 然后 打印 setTimeout2 -> 继续 timer 阶段 setTimeout1 -> 最后回到check 阶段 -> setImmediate2
```

**总结**
> `Node.js 的 EventLoop` 的几个阶段: `timers poll check`, 顺序是: timers -> poll -> check -> timers

1. Node.js
  - `setTimeout` -> timers 阶段
  - `setImmediate` -> check 阶段
  - `process.nextTick` -> 当前在哪个阶段的后面: 如果是在check阶段, 就在这个阶段完成后面执行 再到其它阶段, 

2. chrome
  - `setTimeout` -> 宏任务(一会)
  - `.then(fn)` -> 微任务(马上)
  - `new Promise(fn)` -> 立即执行, 同步的