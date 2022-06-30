/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 14:59:53
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 16:14:58
 * @FilePath: /Knowledge-summary/数据结构/src/Deque.js
 * @Description: 双端队列
 */

class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    // 第一种情况: 如果双端队列是空的, 执行 addBack 方法
    if (this.isEmpty()) {
      this.addBack(element);
      /**
       * 第二种情况:
       * 一个元素已经被从双端队列的前端移除, 也就是说 lowestCount 属性会大于等于 1,
       * 这种情况下，我们只需要将 lowestCount 属性减 1 并将新元素的值放在这个键的位置上即可
       * 实例: items = {1: 8, 2: 9} count = 0; lowestCount = 1
       * 想将元素7添加到双端队列的前端: -> lowestCount = 0;  items[0] = 7
       */
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
      /**
       * 第三种情况: 最后一种场景是 lowestCount 为 0 的情况
       * 可以设置一个负值的键，同时更新用于计算双端队列长度的逻辑，使其也能包含负键值
       *
       * 我们把本场景看作使用数组。要在第一位添加一个新元素，我们需要将所有元素后移一位（行{1}）来空出第一个位置。由于我们不想丢失任何已
       * 有的值，需要从最后一位开始迭代所有的值，并为元素赋上索引值减 1 位置的值。在所有的元素都完成移动后，第一位将是空闲状态，这样就可以用需要添加的新元素来覆盖它了{4}
       */
    } else {
      // {1} {0: 1, 1: 3}
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element; // {4}
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) return undefined;
    const result = this.items[this.lowestCount]; // 如果队列不为空, 暂存队列头部的值
    delete this.items[this.lowestCount]; // 删除队列删除元素
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count];
  }

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

module.exports = Deque;
