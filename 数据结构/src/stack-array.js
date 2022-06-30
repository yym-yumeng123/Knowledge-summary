/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 10:51:54
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 11:51:56
 * @FilePath: /Knowledge-summary/数据结构/src/stack-array.js
 * @Description: 利用数组实现栈 & 利用对象创建 Stack 类
 */
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }

  // 返回栈顶的元素
  peek() {
    return this.items[this.items.length - 1];
  }

  // 栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

module.exports = Stack;
