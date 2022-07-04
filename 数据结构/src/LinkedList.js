/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-04 11:29:17
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-04 15:16:51
 * @FilePath: /Knowledge-summary/数据结构/src/LinkedList.js
 * @Description: 链表
 */

const Node = require("./Node");

function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0; // 存储链表中的元素数量
    // 数据结构是动态的，我们还需要将第一个元素的引用保存下来。我们可以用一个叫作head 的元素保存引用
    this.head = undefined;
    // 要比较链表中的元素是否相等，我们需要使用一个内部调用的函数，名为 equalsFn
    this.equalsFn = equalsFn;
  }

  /**
   * 两种情景: 1. 链表为空, 添加的是第一个元素, 链表不为空, 向其追加元素
   */
  push(element) {
    // 创建 Node 项
    const node = new Node(element);
    let current;
    // 1. 如果 head 为 undefined 或者 null , 链表添加第一个元素
    if (this.head == null) {
      this.head = node;
      // 2. 不为空的链表尾部添加元素, 首先找到最后一个元素
    } else {
      current = this.head; // 只有第一个元素的引用
      while (current.next != null) {
        current = current.next;
      }
      // current.next 为 null 或者 undefined, 到达链表尾部了
      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      // current 变量创建一个对链表中第一个元素的引用
      let current = this.head;

      // 移除第一项, 让 head 指向第二个元素
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;

        // 要从链表中移除当前元素，要做的就是将 previous.next 和 current.next 链接起来
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  getElementAt(index) {
    // 要对传入的 index 参数进行合法性验证
    if (index >= 0 && index <= this.count) {
      // 要初始化 node 变量，该变量会从链表的第一个元素 head 开始迭代整个链表
      let current = this.head;
      for (let i = 0; i < index && current != null; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }

  insert(element, index) {
    // 检查越界值
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      // 如果在第一个位置添加
      if (index === 0) {
        const current = this.head;
        node.next = current; // 修改对应引用
        this.head = node;
      } else {
        const previours = this.getElementAt(index - 1);
        const current = previours.next;
        node.next = current;
        previours.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  // 接受元素的值, 返回元素的位置
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      // current 节点的元素和目标元素是否相等
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next; // {5}
    }
    return -1;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    // 如果链表为空（head 为 null 或 undefined），我们就返回一个空字符串
    if (this.head == null) {
      return "";
    }
    // 链表第一个元素的值来初始化方法最后返回的字符串
    let objString = `${this.head.element}`;
    let current = this.head.next; // {3}
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

module.exports = LinkedList;
