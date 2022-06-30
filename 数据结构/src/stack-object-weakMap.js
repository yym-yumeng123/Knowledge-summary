/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 11:13:52
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 11:43:01
 * @FilePath: /Knowledge-summary/数据结构/src/stack-object.js
 * @Description: 基于对象实现Stack类
 */

// 采用这种方法，代码的可读性不强，而且在扩展该类时无法继承私有属性。鱼和熊掌不可兼得！
const items = new WeakMap();
class Stack {
  constructor() {
    items.set(this, []);
  }

  push(element) {
    const s = items.get(this);
    s.push(element);
  }
  pop() {
    const s = items.get(this);
    const r = s.pop();
    return r;
  }
}

const stack = new Stack();
stack.push(2);
stack.push(8);
