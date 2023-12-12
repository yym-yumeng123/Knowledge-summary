### JS 8 种数据类型

- 原始类型 Primitive Type
  - number
  - string
  - boolean
  - null
  - undefined
  - symbol 数据不可变 immutable
  - BigInt
- 对象类型 Object Type
  - object
    - array
    - function
    - Date
    - RegExp
    - Map
    - Set

1. number, 为什么 `0.1 + 0.2 != 0.3`

JavaScript 中的数字类型包括了两类：浮点数和整数。浮点数对应的是定点数

浮点数是采用科学计数法来表示的,`1.4 * 10 的 9 次方`

JavaScript 所采用的`IEEE 754` 是二进制浮点数算术标准。这个标准里规定了 4 种浮点数算术方式：`单精确度、双精确度、延伸单精确度与延伸双精确度`, 这里选择的是 `float64`

有 64 位比特, 包含了一个比特的符号位(sign), 11 个比特的有偏指数, 52 个比特小数部分

十进制转化为二进制的算法是用十进制的小数乘以 2 直到没有了小数为止，所以十进制下的有些小数无法被精确地表示成二进制小数。而既然这里的浮点数是二进制，因此小数就会存在精度丢失的问题。

当我们使用加减法的时候，由于需要先对齐（也就是把指数对齐，过程中产生移位），再计算，所以这个精度会进一步丢失

```js
// 按比例先放大, 再缩小
var priceBigInt = 1999n
var priceStr = String(priceBigInt)
var priceYuan = `￥${priceStr.slice(0, -2)}.${priceStr.slice(-2)}`
console.log(priceYuan)
```

2. NaN, 如何判断一个值是不是数字?

在 `IEEE 754` 中, NaN 代表 `Not a Number`, 但是 `typeof NaN => number`

`NaN != NaN`

```js
// isFinite 可以过滤掉 NaN 和 Infinity
var isNum = function isNum(value) {
  return typeof value === "number" && isFinite(value)
}
```

3. boolean

在 JS 中, `false undefined null 0 NaN ""` 都是假值

4. null, 是个对象

`typeof null =>  object` null 实际上是一个空的对象指针

```js
null == undefined // true
null === undefined // false
```

5. 为什么基于对象创建的实例 instanceOf 返回错误

```js
// 1. 字面量
var objA = { name: "Object A" }
var objB = Object.create(objA)
console.log(objB instanceof objA) // 返回 类型错误

// 2. constructor
var objA = new Object()
objA.name = "Object A"
var objB = object.create(objA)
console.log(objB instanceof objA) // 返回 类型错误

// 3. 基于原型
var objA = function () {}
objB = new objA()
console.log(objB instanceof objA) // 返回 true
```

6. 如何识别一个数组

- Array.isArray()

```js
if (typeof Array.isArray === "undefined") {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]"
  }
}
```

### 通过 JS 引擎堆栈了解闭包

如果说一个函数 "出生" 的地方是作用域, 从出生到被回收的 "一生" 是它的生命周期, 那么闭包则可以突破这种空间和时间的限制

1. 静态和动态作用域

- 静态作用域, 取决于变量和函数在何处声明, 它执行之前就确定了, 又称为词法作用域
- 动态作用域, 函数的作用域是在函数调用的时候才决定的。所以取决于在何处调用

2. IIFE: 利用作用域封装

作用域的层级可以分为块儿级、函数和全局这样的嵌套关系

```js
var a = 2
;(function foo() {
  var a = 3
  console.log(a) // 3
})()
console.log(a) // 2
```

3. 闭包:突破作用域限制

- 在函数内部生成了一个局部变量 i
- 嵌入了 increment 和 getValue 这两个函数方法
- 把函数作为返回值 return 返回

```js
function createCounter() {
  let i = 0
  function increment() {
    i++
  }

  function getValue() {
    return i
  }
  return { increment, getValue }
}

const counter = createCounter()
```

### 迭代还是递归

- 阶乘

```js
// 迭代计算阶乘 7!
function factorialIterative(number) {
  if (number < 0) return undefined
  let total = 1
  for (let n = number; n > 1; n--) {
    total = total * n
  }
  return total
}
console.log(factorialIterative(7)) // 5040

// 递归计算
function factorialRecursive(n) {
  // 基本条件
  if (n === 1 || n === 0) {
    return 1
  }
  // 递归调用
  return n * factorialRecursive(n - 1)
}
console.log(factorialRecursive(7)) // 5040
// f(7)
// 7 * f(6)
// 7 * (6 * f(5))
```

- 斐波那契

```js
// 迭代
function fibIterative(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  let fibNMinus2 = 0
  let fibNMinus1 = 1
  let fibN = n
  // n >= 2
  for (let i = 2; i <= n; i++) {
    // f(n-1) + f(n-2)
    fibN = fibNMinus1 + fibNMinus2
    fibNMinus2 = fibNMinus1
    fibNMinus1 = fibN
  }
  return fibN
}
console.log(fibIterative(10)) // 55

// 递归
function fibRecursive(n) {
  // 基本条件
  if (n < 1) return 0
  // 基本条件
  if (n <= 2) return 1
  // 递归+分治
  return fibRecursive(n - 1) + fibRecursive(n - 2)
}
console.log(fibRecursive(10)) // 55

// 递归记忆函数
function fibMemo(n, memo = [0, 1, 1]) {
  if (memo[n]) {
    return memo[n]
  }
  // 递归+分治+闭包
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo)
  return memo[n]
}
console.log(fibMemo(10)) // 55

// 递归中的尾递归
// 在函数的尾部执行递归的调用, 最多递归 n 次，因为在每次递归的过程中都会 n-1。
function fibTailRecursive(n, lastlast, last) {
  if (n == 0) {
    return lastlast
  }
  if (n == 1) {
    return last
  }
  return fibTailRecursive(n - 1, last, lastlast + last)
}
console.log(fibTailRecursive(10, 0, 1)) // 55
```

### 数组的稳定排序

数组可以说是一种连续存储的线性表, 劣势是高效的插入和删除

- 冒泡排序（bubble sort）的核心思想就是通过`比较两个相邻的数据元素`，如果前面的大于后面的，就交换它们的位置。
- 选择排序（selection sort）用的是一种原地比较的算法（in-place compare），它的核心思想就是找到最小的数据元素，把它放到第一位，然后再从剩下的数组中找到最小的数据元素，然后放到第二位，以此类推。
- 插入排序（insertion sort）通过`位移来做插入`。它假设数组中第 1 个元素已经排序了。从第 2 个和第 1 个比较，如果小于第 1 个值，就插入到前面，如果大于，就原地不动；第 3 个值同理和前面的 2 个比较，小于就左移插入，大于就不动；后面的操作都以此类推
- 归并排序（merge sort）核心就是先把一个大的数组拆分成只包含一个元素的不可再分的数组，然后两两比较，最后再合并成一个数组。

### 通过 哈希查找 JS 对象的内存地址

哈希算法当中，最基础的就是素数（prime number）哈希。这里我们把一个素数作为模数

```js
{key:7, value: "南昌"}
{key:24, value: "太原"}
{key:42, value: "郑州"}
Prime number: 11 // 素数 11
7 % 11  = 7 // 余数为7
24 % 11 = 2 // 余数为2
42 % 11 = 9 // 余数为9
```

1. 字典：如何查找对象的内存地址

字典作为一种数据结构，又叫做映射（map）、符号表（symbol table）或者关联数组（associative array）

对象在栈的引用和它在堆中的实际存储间的关联就是通过地址映射来实现的。这种映射关系就是通过字典来存储的

2. Map Set 各解决什么问题

Map 和对象最大的区别就是 Map 里的键可以是字符串以外的其它数据结构，比如对象也可以是一个键名

Set 就是集合的结构，它里面包含值，没有键。这里你也可能会问，那这种结构和数组有什么区别？它的区别主要在于 JS 中的集合属于无序集合，并且里面不能有相同的元素

### 如何通过链表做LRU/LFU缓存？