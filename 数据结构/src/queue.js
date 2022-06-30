/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 14:23:54
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 16:15:24
 * @FilePath: /Knowledge-summary/数据结构/src/queue.js
 * @Description: 队列
 */

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {}; // 使用对象来存储我们的元素
  }

  // enqueue 方法和 Stack 类中 push 方法的实现方式相同
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * items: {0: 1, 1: 8}
   * 键为0 获取队列头部的值, 删除它, 再返回它的值, 删除后, 变为 items: {1: 8}
   * 再次执行 dequeue 方法, lowestCount 0 -> 1
   */
  dequeue() {
    if (this.isEmpty()) return undefined;
    const result = this.items[this.lowestCount]; // 如果队列不为空, 暂存队列头部的值
    delete this.items[this.lowestCount]; // 删除队列删除元素
    this.lowestCount++;
    return result;
  }

  // 查看队列头部元素
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  /**
   * 假设 count 2, lowestCount 为 0, 表示队列有两个元素
   * 移除一个元素, lowestCount -> 1  count 还是 2, 队列只有一个元素了
   *
   */
  // 计算队列有多少元素, 计算 count 和 lowestCount 之间的差值
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) return "";
    let objString = `${this.items[this.lowestCount]}`; // 第一个元素的值
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }
}

module.exports = Queue;
