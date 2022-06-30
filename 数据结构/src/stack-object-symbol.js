/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 11:13:52
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 11:40:48
 * @FilePath: /Knowledge-summary/数据结构/src/stack-object.js
 * @Description: 基于对象实现Stack类
 */

const _items = Symbol("stackItems");
class Stack {
  constructor() {
    this.count = 0;
    this[_items] = {};
  }

  // 复杂度均为 O(1)，
  // 对象是一系列键值对的集合, 向栈中添加元素, 使用 count 变量作为 _items 对象的键名, 插入的元素是它的值, 递增count变量
  push(element) {
    this[_items][this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.count--;
    // 保存栈顶的值
    const result = this[_items][this.count];
    // 删除
    delete this[_items][this.count];
    // 返回它
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this[_items][this.count];
  }

  clear() {
    this.count = 0;
    this[_items] = {};
  }

  clear2() {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  toString() {
    if (this.isEmpty()) return "";
    let objString = `${this[_items][0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this[_items][i]}`;
    }
    return objString;
  }
}

const stack = new Stack();
stack.push(2);
stack.push(8);

console.log("stack", stack); // { count: 2, items: { '0': 2, '1': 8 } }

console.log(
  "Object.getOwnPropertyNames(stack)",
  Object.getOwnPropertyNames(stack)
); // [ 'count', 'items' ] 属性是公开的

console.log("Object.keys(stack)", Object.keys(stack));

console.log(
  "Object.getOwnPropertySymbols(stack)",
  Object.getOwnPropertySymbols(stack)
); // [ Symbol(stackItems) ]

let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); // 输出 1
console.log(objectSymbols); // [Symbol()]
console.log(objectSymbols[0]); // Symbol()
stack[objectSymbols[0]].push(1);
