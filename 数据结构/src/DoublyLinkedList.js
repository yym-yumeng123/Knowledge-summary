/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-05 10:21:03
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-05 11:12:23
 * @FilePath: /Knowledge-summary/数据结构/src/DoublyLinkedList.js
 * @Description: 双向链表
 */
const Node = require("./Node");
const LinkedList = require("./LinkedList");

class DoubleNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

// // 是一种特殊的 LinkedList 类
class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    // 保存对链表最后一个元素的引用
    this.tail = undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoubleNode(element);
      let current = this.head;

      // 在双向链表的第一个位置（起点）插入一个新元素
      if (index === 0) {
        // 如果双向链表为空, 把 head 和 tail 都指向这个新节点
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          // 如果不为空，current 变量将是对双向链表中第一个元素的引用
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }

      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      // current 变量是对双向链表中第一个元素的引用
      let current = this.head;

      // 移除第一个元素, current 就是我们希望移除的
      if (index === 0) {
        // 是改变 head 的引用，将其从 current 改为下一个元素
        this.head = current.next;
        // 如果只有一项, 更新 tail
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          // 把 head.prev 的引用改为 undefined, 因为 head 也指向双向链表中新的第一个元素
          this.head.prev = undefined;
        }

        // 最后一个位置移除元素
      } else if (index === this.count - 1) {
        // 已经有了对最后一个元素的引用（tail）
        current = this.tail;
        // 把 tail 的引用更新为双向链表中倒数第二个元素
        this.tail = current.prev;
        // 既然 tail 指向了倒数第二个元素，我们就只需要把 next 指针更新为 undefined;
        this.tail.next = undefined;

        // 从双向链表中间移除一个元素
      } else {
        // current 变量所引用的就是要移除的元素
        current = this.getElementAt(index);
        // 过更新 previous.next 和 current.next.prev 的引用
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this.count++;
      return current.element;
    }
    return undefined;
  }
}

module.exprots = DoublyLinkedList;
