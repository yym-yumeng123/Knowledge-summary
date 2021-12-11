## 数据类型

- 原始类型有六种 `string number boolean undefined null symbol`, 原始类型存储的都是值
- 对象类型只有 `Object`, 对象类型存储的是地址(引用), 当你创建一个对象类型, 计算机会在内存中开辟一个空间来存放值, 这个空间会有一个地址(指针), 我们可以找到它

```js
const a = [] // 假设地址为 #000, name在地址 #000 的位置放了值 []

const b = a // 复制的是原本变量的地址
b.push(1)

a // [1]
b // [1]
```

```js
//  函数参数是对象
function test(person) {
  person.age = 26
  person = {
    name: "John",
    age: 30,
  }
  return person
}

const p1 = {
  name: "Jack",
  age: 25,
}

const p2 = test(p1)
console.log(p1) // { name: 'Jack', age: 26 }
console.log(p2) // { name: 'John', age: 30 }

// 解析
// 1. 函数传参是传递对象指针的副本
// 2. p1 赋值 给 person, person 修改了 age
// 3. person 重新赋值, 给了一个新地址, 和 p1 没有关系, 返回了 person, 是 p2
```

## typeof vs instanceof

- `typeof`

```js
// typeof 对原始数据类型, 除了 null 都显示正确的的类型
typeof 1 // 'number'
typeof "1" // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'

// 对于对象
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

- `instanceof` 是通过原型链来判断的

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

// 对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的
var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true

[] instanceof Array // true
```

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === "string"
  }
}
console.log("hello world" instanceof PrimitiveString) // true
```

## 类型转换

在 `JS` 中, 类型转换只有三种情况:

- 转换为`Boolean`
- 转换为 `Number`
- 转换为 `String`

```js
number -> boolean           : 除了 `0 -0 NaN` 都是 true
string -> boolean           : 除了 `空字符串` 都是 true
undefined null -> boolean   : false
引用类型 -> boolean           : true
number -> 字符串              : 5 => '5'
Boolean 函数 Symbol -> 字符串 : 'true'
数组 -> 字符串                 : [1, 2] => '1, 2'
对象 -> 字符串                 : '[object, object]'
string -> 数字                : '1' => 1 'a' => NaN
数组 -> 数字                  : 空数组 => 0, 存在一个元素为数字 => 数字,其他 NaN
null -> 数字                  : 0
除了数组的引用类型 -> 数字        : NaN
Symbol -> 数字 : NaN          : 抛错
```

在条件判断时，除了 `undefined， null， false， NaN， ''， 0， -0`，其他所有值都转为 true，包括所有对象

---

- 四则运算

```js
// 运算中其中一方为字符串，那么就会把另一方也转换为字符串
// 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
1 + "1" // 11
true + true // 2
4 + [1, 2, 3] // 41,2,3

"a" + +"b" // -> "aNaN"
```

```js
// 除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字
4 * "3" // 12
4 * [] // 0
4 * [1, 2] // NaN
```

## this

- 如何正确判断 this？箭头函数的 this 是什么？

```js
// 函数调用的场景

// 普通函数调用
function foo() {
  console.log(this.a) // window.a
}
var a = 1
foo()

// 对象调用
const obj = {
  a: 2,
  foo: foo,
}
obj.foo() // obj.foo.call(obj) 谁调用, 谁是this

// 构造函数调用
const c = new foo() // this 就是 c
```

- 箭头函数没有 `this`, 箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`
- 对箭头函数使用 `bind` 这类函数是无效的

```js
// 箭头函数的 this

function a() {
  // this 的环境
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```

- `bind apply call`

```js
let a = {}
let fn = function () {
  console.log(this)
}
fn.bind().bind(a)() // window

let a = { name: "yck" }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'yck'
```

- `new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变

## == vs ===

1. `==` 会发生类型转换
   - 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`
   - 判断其中一方是否为 `boolean`, 是的话就会把 `boolean` 转为 `number` 再进行判断
   - 判断其中一方是否为 `object` 且另一方为 `string、number 或者 symbol`，是的话就会把 `object` 转为原始类型再进行判断
   ```js
   1 == '1' // 1 ==  1 => true
   '1' == true // '1' == 1 => 1 == 1 => true
   '1' == { name: 'yck' } // '1' == "[object, object]' => fasle
   [] == ![] // true
   ```
2. `===` 就是 `==` 两边类型相同, 全等

## 闭包

> 函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包

1. 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量

```js
// 循环中使用闭包解决 `var` 定义函数的问题

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
} // 每秒打印 6

// 闭包解决
for (var i = 1; i <= 5; i++) {
  ;(function (j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}

// 使用 setTimeout 的第三个参数，这个参数会被当成 timer 函数的参数传入
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}

// 使用 let
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

## 深浅拷贝

我们知道, 对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况

1. 浅拷贝
   - `Object.assign({}, 对象)`: 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝
   ```js
   let a = {
     age: 1,
   }
   let b = Object.assign({}, a)
   a.age = 2
   console.log(b.age) // 1
   ```
   - `展开运算符 ... 来实现浅拷贝`
   ```js
   let a = {
     age: 1,
   }
   let b = { ...a }
   a.age = 2
   console.log(b.age) // 1
   ```
2. 深拷贝

```js
// 这种情况浅拷贝就不适用了, 浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了
let a = {
  age: 1,
  jobs: {
    first: "FE",
  },
}
let b = { ...a }
a.jobs.first = "native"
console.log(b.jobs.first) // native
```

- `JSON.parse(JSON.stringify(object))`: 实现深拷贝
  - 会忽略 undefined
  - 会忽略 symbol
  - 不能序列化函数
  - 不能解决循环引用的对象

```js
let a = {
  age: 1,
  jobs: {
    first: "docter",
  },
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = "teacher"
console.log(b.jobs.first) // docter
```

- 自己实现一个简易的 `deepClone`

```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === "object" || typeof o === "function") && o !== null
  }

  if (!isObject(obj)) {
    throw new Error("非对象")
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3,
  },
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

## 原型

> 如何理解原型? 如何理解原型链?

- 看下面我们打印 obj 时, 在 `obj` 上有一个 `__proto__` 属性
- 每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型, 原型也是一个对象，并且这个对象中包含了很多函数
- 原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型
- prototype 是函数才有的属性
- `__proto__`是每个对象都有的属性

```js
let obj = { a: [1, 2, 3] }
console.log(obj) // __proto__: Object

// __proto__ 有一个 constructor 属性
```

> 无论什么时候,只要创建了新函数, 就会有一组特定的规则为该函数创建一个 prototype 属性, 这个属性指向函数的原型对象, 默认情况下, 所有原型对象都会自动获得一个 constructor(构造函数)属性, 这个属性是指向 prototyp 属性所在的指针

- 原型链
  - 每个构造函数都有原型对象；每个对象都会有构造函数；每个构造函数的原型都是一个对象；那么这个原型对象也会有构造函数；那么这个原型对象的构造函数也会有原型对象；这样就会形成一个链式的结构，称为原型链

## 原型继承 & Class 继承

> Class 在 JS 中知识一个原型的语法糖, 本质还是函数

```js
class Person {}
Person instanceof Function //
```

1. 组合继承

```js
function Person(name) {
  this.name = name
}
Person.prototype.sayName = function () {
  console.log(`${this.name}你好`)
}

function People(name) {
  // 继承属性
  Person.call(this, name)
}
People.prototype = new Person()

const people = new People("yym")
people.sayName()
```

2. `Class` 继承
   - 使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 Parent.call(this, value)

```js
class Person {
  constructor(name) {
    this.name = name
  }
  getValue() {
    console.log(this.name)
  }
}
class Child extends Person {
  constructor(name) {
    super(name)
    this.name = name
  }
}
let child = new Child("yym")
child.getValue() // 'yym'
child instanceof Person // true
```

## var & let & const

1. `var` 声明的变量会发生提升, 函数也会提升, 并且优于变量提升

```js
// 提升 hosting
console.log(a) // undefined
var a = 1

// --------
console.log(a) // ƒ a() {}
function a() {}
var a = 1
```

2. `let const`
   - 变量不会被挂在到 `window` 上
   - 暂时性死区，我们不能在声明前就使用变量

```js
var a = 1
let b = 1
const c = 1
console.log(window.b) // undefined
console.log(window.c) // undefined

function test() {
  console.log(a) // Cannot access 'a' before initialization
  let a
}
test()
```

3. 总结
   - 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
   - `var` 存在提升，我们能在声明之前使用。`let、const` 因为暂时性死区的原因，不能在声明前使用
   - var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
   - `let 和 const` 作用基本一致，但是后者声明的变量`不能再次赋值`

## 模块化

1. 为什么使用模块化?

   - 解决命名冲突
   - 提高复用性
   - 提高代码可维护性

2. 哪几种可以实现模块化

   - `立即执行函数`: 通过函数作用域解决了命名冲突、污染全局作用域的问题

   ```js
   ;(function (globalVariable) {
     globalVariable.test = function () {}
     // ... 声明各种变量、函数都不会污染全局作用域
   })(globalVariable)
   ```

   - `AMD: require.js 和 CMD: sea.js` 推出的规范

   ```JS
   // 对于依赖的模块AMD是提前执行，CMD是延迟执行
   // AMD推崇依赖前置（在定义模块的时候就要声明其依赖的模块），CMD推崇依赖就近（只有在用到某个模块的时候再去require——按需加载）
    // AMD
    define(['./a', './b'], function(a, b) {
      // 加载模块完毕可以使用
      a.do()
      b.do()
    })
    // CMD
    define(function(require, exports, module) {
      // 加载模块
      // 可以把 require 写在函数体的任意地方实现延迟加载
      var a = require('./a')
      a.doSomething()
    })
   ```

   - `Common.js`: 最早在 `node` 使用

   ```js
   // a.js
   module.exports = {
     a: 1,
   }
   // or
   exports.a = 1

   // b.js
   var module = require("./a.js")
   module.a // -> log 1
   ```

   - `ES Module` 是原生实现的模块化方案

   ```js
   // 引入模块 API
   import XXX from "./a.js"
   import { XXX } from "./a.js"
   // 导出模块 API
   export function a() {}
   export default function () {}
   ```

## Proxy
```js
// target: 需要添加代理的对象, handler: 用来自定义对象中的操作
let p = new Proxy(target, handler);
```

```js
// 自定义 set 和 get 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

## map filter Reduce
```js
// map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中
[1, 2, 3].map(v => v + 1) // -> [2, 3, 4]

['1','2','3'].map(parseInt)
// 第一轮遍历 parseInt('1', 0) -> 1
// 第二轮遍历 parseInt('2', 1) -> NaN
// 第三轮遍历 parseInt('3', 2) -> NaN


// filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组
let array = [1, 2, 4, 6]
let newArray = array.filter(item => item !== 6)
console.log(newArray) // [1, 2, 4]

// reduce 来说，它接受两个参数，分别是回调函数和初始值
// 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)

// 就通过 reduce 来实现 map 函数
const arr = [1, 2, 3]
const mapArray = arr.map(value => value * 2)
const reduceArray = arr.reduce((acc, current) => {
  acc.push(current * 2)
  return acc
}, [])
console.log(mapArray, reduceArray) // [2, 4, 6]
```