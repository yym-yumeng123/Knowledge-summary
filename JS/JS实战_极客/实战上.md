### 函数式 vs 面向对象

函数式编程中，我们通常会把各种干扰，就叫做`副作用（Side effect）`

#### 函数式编程

函数是数据集到目标的一种关系，它所做的就是把行为封装起来，从而达到目标

1. 函数中有哪些副作用?

- 函数中最常见的副作用，就是`全局变量（global variable）`
- IO 影响: 类似前端浏览器中的用户行为，比如鼠标和键盘的输入，或者如果是服务器端的 Node 的话，就是文件系统、网络连接以及 stream 的 stdin（标准输入）和 stdout（标准输出）
- 网络请求有关

2. 减少副作用: 纯函数(pure function)和不可变(immutablility)

- 纯函数的意思是说，一个函数的返回结果的变化只依赖其参数，并且执行过程中没有副作用
- 纯函数强调的是自身的稳定性，对结果只影响一次
- 不可变强调的是和外界的交互中，尽量减少相互间负面的影响
- 幂等
  - 在数学中，幂等的意思是不管我们把一个函数嵌套多少次来执行，它的结果都应该是一样的
  - 在计算机中，幂等的意思是一个程序执行多次结果是一样的。

```js
// 数组 纯函数
slice concat map filter reduce reduceRight

// 非纯函数
fill splice pop push shift unshift sort reverse
```

### 面向对象编程

面向对象编程最核心的点就是服务业务对象，最需要解决的问题就是封装、重用和继承

```js
var widget = {
  widgetName: "微件",
  identify: function () {
    return "这是" + this.widgetName
  },
}

console.log(widget.widgetName) // 返回 "微件"
console.log(widget.identify()) // 返回 "这是微件"
```

JS 里的对象和 类，也就是构建函数之间是原型链接关系, ES6 也加入了类, 底层逻辑仍是原型链

```js
class Widget {
  constructor() {
    // specify here
  }
  notice() {
    console.log("notice me")
  }

  display() {
    console.log("diaplay me")
  }
}

var widget1 = new Widget()

widget1.notice()
widget1.display()
```

### 如何通过闭包对象管理程序中状态的变化

1. 值到底是不是可变的

JS 中, 值分为原始类型和对象类型

- 原始类型不可变
- 对象类型可变

2. 闭包

- 闭包最大的特点是可以突破`生命周期`和`作用域`的限制，也就是时间和空间的控制
- 在属性和方法的隐私方面，闭包天然对属性有保护作用，同时它也可以按需暴露接口，来更细粒度地获取或重新给状态赋值。

```js
// 内部的值对外不可见
function counter() {
  let name = "计数"
  let curVal = 0
  function counting() {
    curVal++
  }
  function getCount() {
    console.log(`${name}是${curVal}`)
  }
  return { counting, getCount }
}

var counter1 = counter()

counter1.counting()
counter1.counting()
counter1.getCount() // 计数是2
```

### 如何通过部分应用和柯里化让函数具象化

比如处理未知，让函数从抽象变具体、让具体的函数每次只专心做好一件事、减少参数数量之外，还有一个更抽象的好处，就是体现了函数式底层的声明式思想

1. 通过部分应用延迟实参传入

```js
// 预先知道它的 url，却不知道它的 data 和 callback ?
function orderEventHandler(url, data, callback) {
  // ..
}

// 提前预置了已知参数 url，减少了后面需要传入的参数数量
function fetchOrder(data, cb) {
  orderEventHandler("http://some.api/order", data, cb)
}

// 想进一步具象化，预制一些参数怎么办？
// 所以在函数式编程中，我们通常会使用部分应用。
// 它所做的就是抽象一个 partial 工具，在先预制部分参数的情况下，后续再传入剩余的参数值
var fetchOrder = partial(orderEventHandler, "http://some.api/order")
var getCurrentOrder = partial(fetchOrder, { order: CURRENT_ORDER_ID })

// 实现 partial
// 借助闭包，以及 ES6 中引入的…延展操作符（spread operator）这两个函数式编程中的利器
var partial =
  (fn, ...presetArgs) =>
  (...laterArgs) =>
    fn(...presetArgs, ...laterArgs)
```

2. 通过柯里化每次传一个参数

```js
// 每次只传入一个参数
var curriedOrderEvntHandler = curry(orderEventHandler)

var fetchOrder = curriedHttpEvntHandler("http://some.api/order")

var getCurrentOrder = fetchOrder({ order: CURRENT_ORDER_ID })

getCurrentOrder(function editOrder(order) {
  /* .. */
})

// arity 参数的数量
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg]
      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}
```

### map、reduce 如何围绕值进行操作？

1. map 映射和函子

函子是一个带运算工具的数据类型或数据结构值

2. filter 过滤和筛选

filter 可以是双向的，我们可以过滤掉（filter out）不想要的东西，也可以筛选出（filter in）出想要的东西

3. reduce 和缩减器

缩减（reduce）主要的作用就是把列表中的值合成一个值, 在 reduce 当中，有一个缩减器（reducer）函数和一个初始值

```js
;[5, 10, 15].reduce((arr, val) => arr * val, 3) // 2250
```

### 如何通过模块化、异步和观察做到动态加载？

1. 如何处理异步事件中的时间状态？

假设，我们有以下 getUser 和 getOrders 两个函数，分别通过用户 ID 来获取用户信息和订单信息。如果 getUser 先得到响应的话，那么它就没法获得订单信息。同样地，如果 getOrders 先得到响应的话，那么它就没办法获得用户信息

两个函数就形成了一个`竞争条件（Race Condition）`

```js
var user

// 并行
getUser(userId, function onUser(userProfile) {
  var orders = user ? user.orders : null
  user = userProfile
  if (orders) {
    user.orders = orders
  }
})

getOrders(userId, function onOrders(userOrders) {
  if (!user) {
    user = {}
  }
  user.orders = userOrders
})
```

解决异步问题的工具就叫`承诺（promise）`

```js
var userPromise = getUser(userId)
var ordersPromise = getOrders(userId)

userPromise.then(function onUser(user) {
  ordersPromise.then(function onOrders(orders) {
    user.orders = orders
  })
})
```

### 深入理解对象的私有和静态属性

- 一个对象可以有对外分享的、别人可以获取的`公开属性`
- 也有不对外暴露的、别人不可以随便获取的`私有属性`。
- `静态属性`。静态属性是属于类，而不是单独属于对象的

```js
// 示例1：类class
class WidgetA {
  #appName // 私有属性 # name
  static appAge = 18 // 静态属性只能作用于 class 本身
  constructor() {
    // this.appName = "天气应用"
    this.#appName = "天气应用"
  }
  getName() {
    return this.#appName
  }
}
var widget1 = new WidgetA()
console.log(widget1.appName) // 返回 undefined
console.log(widget1.getName()) // 返回 “天气应用”

// 示例2：对象字面量
var WidgetB = {
  appName: "天气应用",
  getName: function () {
    return this.appName
  },
}

console.log(WidgetB.appName) // 返回 “天气应用”
console.log(WidgetB.getName()) // 返回 “天气应用”

// 示例3：函数构造式
function WidgetC() {
  this.appName = "天气应用"
  this.getName = function () {
    return "天气应用"
  }
}

var widget3 = new WidgetC()
console.log(widget3.appName) // 返回 “天气应用”
console.log(widget3.getName()) // 返回 “天气应用”
```

之前是怎么创建私有属性的

- 闭包和 IIFE
- 构造函数
- WeakMap

```js
// 对象字面量
var WidgetE
;(function () {
  var appName = "天气应用"
  WidgetE = {
    getName: function () {
      return appName
    },
  }
})()
WidgetE.appName // 返回 undefined
WidgetE.getName() // 返回 “天气应用”
```

### 面向对象：通过词法作用域和调用点理解 this 绑定

1. 默认绑定

```js
function aLogger() {
  console.log(this.a) // window
}
var a = 2
aLogger() // 2
```

2. 隐式绑定

```js
function aLogger() {
  console.log(this.a)
}

var obj = {
  a: 3,
  logger: aLogger,
}

var a = 2

obj.logger() // 3 被调用时的上下文是在 obj 中

var objLogger = obj.logger
objLogger() // 2 this 引用的就是全局中 a
```

3. 显示绑定

```js
function logger() {
  console.log(this.a)
}

var obj = {
  a: 3,
}
// call 或者 apply。通过这种方式，我们可以强行使 this 等于 obj
logger.call(obj) // 3
```

4. 硬性绑定

```js
function logger() {
  console.log(this.a)
}

var obj = {
  a: 3,
}
// bind
var hardBinding = logger.bind(obj)

setTimeout(hardBinding, 1000) // 3

hardBinding.call(window) // 3
```

5. new 绑定

```js
function logger(a) {
  this.a = a
  console.log(this.a)
}

var loggerA = new logger(2) // 2
```

6. 箭头函数

使用箭头函数的时候，this 是在词法域里面的

```js
function logger() {
  return (a) => {
    console.log(this.a)
  }
}
var obj1 = {
  a: 2,
}

var obj2 = {
  a: 3,
}

var logger1 = logger.call(obj1)

logger1.call(obj2) // 2

function logger() {
  setTimeout(() => {
    console.log(this.a)
  }, 1000)
}
var obj = {
  a: 2,
}
logger.call(obj) // 2
```
