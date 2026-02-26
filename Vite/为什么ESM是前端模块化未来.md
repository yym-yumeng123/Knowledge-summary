## 为什么 ESM 是前端模块化的未来

### 无模块化标准阶段

1. 文件划分

文件划分是最原始的模块化实现, 简单来说就是将应用的状态和逻辑分散到不同的文件中，然后通过 HTML 中的 script 来一一引入

```js
// a.js
let data = 'data'

// b.js
function method() {
  console.log('methods')
}

// index.html
// 模块变量相当于在全局声明和定义，会有变量名冲突的问题
// 无法清晰地管理模块之间的依赖关系和加载顺序。假如 module-a 依赖 module-b
<script src="a.js"></script>
<script src="b.js"></script>
```

2. 命名空间

命名空间 是模块化的另一种实现手段，它可以解决上述文件划分方式中 全局变量定义 所带来的一系列问题。

```js
// a.js
window.moduleA = {
  data: 'dataA',
  method: function () {
    console.log('methodA')
  }
}

// b.js
window.moduleB = {
  data: 'dataB',
  method: function () {
    console.log('methodB')
  }
}

// index.html
// 每个变量都有自己专属的命名空间
<script src="a.js"></script>
<script src="b.js"></script>
<script>
  console.log(moduleA.data)
  moduleA.method()
</script>
```

3. IIFE(立即执行函数)

IIFE 实现的模块化安全性要更高，对于模块作用域的区分更加彻底

```js
// a.js
(function () {
  let data = 'data'
  function method() {
    // data 变量，我们只能在模块内部的 method 函数中通过闭包访问
    console.log('method' + data)
  }
  window.module = {
    data,
    method
  }
})()

// b.js
(function () {
  let data = "moduleB"
  function method() {
    console.log(data + "execute")
  }
  window.moduleB = {
    method: method,
  }
})()
```

上面的都没有解决另外一个问题: 模块加载的顺序问题

### 业界主流的三大模块规范

1. CommonJS 规范

CommonJS 是业界最早正式提出的 JavaScript 模块规范，主要用于服务端, ，随着Node.js 越来越普及，这个规范也被业界广泛应用

CommonJS 是一个不太适合在浏览器中运行的模块规范

```js
// a.js
var data = 'data'
function getData() {
  return data
}
// module.exports 来导出一个模块
module.exports = {
  getData
}

// index.js
// 使用 require 来导入一个模块
const { getData } = require('./a.js')
console.log(getData())
```

2. AMD/CMD 模块规范

`AMD` 全称为 `Asynchronous Module Definition`, 异步模块定义规范, 模块根据这个规范，在浏览器环境中会被异步加载，而不会像 CommonJS 规范进行同步加载，也就不会产生同步请求导致的浏览器解析过程阻塞的问题了

```js
// main.js
// 通过 define 去定义或加载一个模块
define(["./print"], function (printModule) { 
  printModule.print("Hello World");
})

// print.js
define(function () { 
  return {
    print: function (text) { 
      console.log(text);
    }
  }
})
```

由于没有得到浏览器的原生支持，AMD 规范需要由第三方的 loader 来实现，最经典的就是 `requireJS` 库了，它完整实现了 AMD 规范

> UMD (Universal Module Definition)规范，其实它并不算一个新的规范，只是兼容 AMD 和 CommonJS 的一个模块化方案，可以同时运行在浏览器和 Node.js 环境。


3. ES6 Module

ES6 Module 也被称作 ES Module (或 ESM ), 作为一个官方提出的规范， ES Module 已经得到了现代浏览器的内置支持

在现代浏览器中，如果在 HTML 中加入含有 `type="module"` 属性的 script 标签，那么浏览器会按照 ES Module 规范来进行依赖加载和模块解析，这也是 Vite 在开发阶段实现 `nobundle` 的原因，由模块加载的任务交给了浏览器，即使不打包也可以顺利运行模块代码


```js
// main.js
import { methodA } from "./a.js"
methodA()

// a.js
const methodA = function () {
  console.log("methodA")
}
export { methodA }

// index.html
<script type="module" src="main.js"></script>
```

ES Module 作为 ECMAScript 官方提出的规范，经过五年多的发展，不仅得到了众多浏览器的原生支持，也在 Node.js 中得到了原生支持，是一个能够跨平台的模块规范。同时，它也是社区各种生态库的发展趋势，尤其是被如今大火的构建工具 Vite 所深度应用。可以说，ES Module 前景一片光明，成为前端大一统的模块标准指日可待。