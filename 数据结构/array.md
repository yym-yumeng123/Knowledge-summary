<!--
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-29 14:08:29
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 10:28:06
 * @FilePath: /Knowledge-summary/数据结构/array.md
 * @Description: 数组了解
-->

### 创建和初始化数组

1. 使用 new 关键字，就能简单地声明并初始化一个数组

```js
let daysOfWeek = new Array();
daysOfWeek = new Array(7); // [empty * 7]
daysOfWeek = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);
```

2. 只用中括号（[]）的形式就行了

```js
let daysOfWeek = [];
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

dayOfWeek.length;
```

3. 访问元素: arr[number]

### 添加元素

1. 在末尾添加元素

```js
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

numbers[number.length] = 10;

// 使用 push
numbers.push(11);
```

2. 在开头添加元素

- 实现这个需求，首先要腾出数组里第一个元素的位置，把所有的元素向右移动一位

```js
Array.prototype.insertFirstPosition = function (value) {
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1];
  }
  this[0] = value;
};

numbers.insertFirstPosition(-1);

// unshift 方法
numbers.unshift(-2);
```

3. 删除元素

```js
// 删除末尾元素
numbers.pop();

// 从数组开头删除元素
Array.prototype.reIndex = function (myArray) {
  const newArray = [];
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] !== undefined) {
      // console.log(myArray[i]);
      newArray.push(myArray[i]);
    }
  }
  return newArray;
};
// 手动移除第一个元素并重新排序
Array.prototype.removeFirstPosition = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  return this.reIndex(this);
};
numbers = numbers.removeFirstPosition();

// shift 方法
numbers.shift();

// 任意位置添加或删除数组 splice()
numbers.splice(5, 3);

// JavaScript 数组和对象，我们还可以用 delete 运算符删除数组中的元素，例如 delete numbers[0], 数组位置 0 的值会变成 undefined，也就是说，以上操作等同于 numbers[0] = undefined。
// 我们应该始终使用splice、pop 或 shift（马上就会学到）方法来删除数组元素
```

### 二维数组 & 多维数组

- JavaScript 只支持一维数组，并不支持矩阵。但是，我们可以像上面的代码一样，用数组套数组，实现矩阵或任一多维数组

```js
const averageTemp = [
  [1, 2, 3, 4],
  [3, 65, 76, 43, 3],
];

function printMatrix(myMatrix) {
  for (let i = 0; i < myMatrix.length; i++) {
    for (let j = 0; j < myMatrix[i].length; j++) {
      console.log(myMatrix[i][j]);
    }
  }
}
printMatrix(averageTemp);
```

### 数组方法参考

```js
concat: // 连接两个或更多数组, 并返回结果
数组A.concat(数组b, 数组c);

every: // 对数组中的每个元素运行给定函数, 每个元素都为true, 才返回true
const isEven = x => x % 2 === 0;
numbers.every(isEven); // 都为true才返回 true

some: // 对数组中的每个元素运行给定函数, 任一元素返回 true, 则返回 true
numbers.some(isEven) // 有一个true 就返回 true

forEach: // 对数组中的每个元素运行给定函数。这个方法没有返回值; 如果要迭代整个数组，可以用 forEach 方法。它和使用 for 循环的结果相同。
numbers.forEach(x => console.log(x % 2 === 0))

filter: // 对数组中的每个元素运行给定函数，返回该函数会返回 true 的元素组成的数组; 返回的新数组由使函数返回 true 的元素组成
map: // 对数组中的每个元素运行给定函数，返回每次函数调用的结果组成的数组
reduce: // reduce 方法接收一个有如下四个参数的函数：previousValue、currentValue、index 和 array。因为 index 和 array 是可选的参数，所以如果用不到它们的话，可以不传。这个函数会返回一个将被叠加到累加器的值
numbers.reduce((previous, current) => previous + current);

join: // 将所有的数组元素连接成一个字符串
indexOf: // 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1
reverse: // 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个

keys:  // 返回包含数组所有索引的@@iterator
values: // 返回包含数组中所有值的@@iterator
entries: // 返回包含数组所有键值对的@@iterator

let a = [1,2,3,4,5]
a.entries() // Iterator {}
for(const n of a.entries()) {console.log(n)} // [0, 1] [1, 2]
for(const n of a.keys()) {console.log(n)} // 0 1 2 3 4
for(const n of a.values()) {console.log(n)} // 1 2 3 4 5
```

```js
// for...of 循环迭代数组
for (const n of numbers) {
  console.log(n % 2 === 0 ? "even" : "odd");
}
```

```js
// 使用 @@iterator 对象
// ES2015 还为 Array 类增加了一个@@iterator 属性，需要通过 Symbol.iterator 来访问

let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5

iterator = numbers[Symbol.iterator]();
for (const n of iterator) {
  console.log(n);
}
```

```js
// from Array.from 方法根据已有的数组创建一个新数组
let num = [1, 2, 3, 4, 5];

let numbers2 = Array.from(num); // 要复制数组;
let evens = Array.from(numbers, (x) => x % 2 == 0); // 用来过滤值的函数
```

```js
// Array.of 方法根据传入的参数创建一个新数组
let numbers3 = Array.of(1); // [1]
let numbers4 = Array.of(1, 2, 3, 4, 5, 6); // [1, 2, 3, 4, 5, 6]
let numbersCopy = Array.of(...numbers4);
```

```js
// fill 方法用静态值填充数组。
let numbersCopy = Array.of(1, 2, 3, 4, 5, 6);
numbersCopy.fill(0); // [0, 0, 0, 0, 0, 0]
numbersCopy.fill(2, 1); // 数组中从 1 开始的所有位置上的值都是 2  [0, 2, 2, 2, 2, 2]
numbersCopy.fill(1, 3, 5); // 会把 1 填充到数组索引 3 到 5 的位置（不包括 3 和 5）

let ones = Array(6).fill(1);
```

```js
// copyWithin 方法复制数组中的一系列元素到同一数组指定的起始位置
let copyArray = [1, 2, 3, 4, 5, 6];
copyArray.copyWithin(0, 3); // [4, 5, 6, 4, 5, 6]
```

```js
// 用 reverse 方法，然后数组内元素就会反序
numbers.reverse();
numbers.sort((a, b) => a - b);

// 是因为 JavaScript 在做字符比较的时候，是根据字符对应的 ASCII 值来比较的。
names.sort((a, b) => a.localeCompare(b));
```

```js
// 搜索
// indexOf 方法返回与参数匹配的第一个元素的索引；
// lastIndexOf 返回与参数匹配的最后一个元素的索引。
let copyArray = [1, 2, 3, 4, 5, 6];
copyArray.indexOf(1);
copyArray.lastIndexOf(1);
```

```js
// find 和 findIndex 方法接收一个回调函数，搜索一个满足回调函数条件的值, find 和 findIndex 的不同之处在于，find 方法返回第一个满足条件的值，findIndex方法则返回这个值在数组里的索引
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
function multipleOf13(element, index, array) {
  return element % 13 == 0;
}
console.log(numbers.find(multipleOf13));
console.log(numbers.findIndex(multipleOf13));
```

```js
// includes 数组里存在某个元素，includes 方法会返回 true，否则返回 false
let numbers2 = [7, 6, 5, 4, 3, 2, 1];
console.log(numbers2.includes(4, 5));
```

```js
// 输出数组为字符串
// toString 和 join。
console.log(numbers.toString());
const numbersString = numbers.join("-");
console.log(numbersString);
```
