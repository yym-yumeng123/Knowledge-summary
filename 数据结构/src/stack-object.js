class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  // 复杂度均为 O(1)，
  // 对象是一系列键值对的集合, 向栈中添加元素, 使用 count 变量作为 items 对象的键名, 插入的元素是它的值, 递增count变量
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.count--;
    // 保存栈顶的值
    const result = this.items[this.count];
    // 删除
    delete this.items[this.count];
    // 返回它
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count];
  }

  clear() {
    this.count = 0;
    this.items = {};
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
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = Stack;
