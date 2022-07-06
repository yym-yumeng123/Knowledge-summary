/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-06 10:43:44
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-06 11:10:17
 * @FilePath: /Knowledge-summary/数据结构/src/CircularLinkedList.js
 * @Description: 循环链表
 */
const Node = require("./Node");
const LinkedList = require("./LinkedList");

// 扩展 LinkedList
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index < this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        // 如果为空
        if (this.head === null) {
          this.head = node;
          node.next = this.head;

          // 非空循环链表的第一个位置插入元素
        } else {
          // node.next 指向现在的 head 引用的节点（current 变量）
          node.next = current;
          current = this.getElementAt(this.size());
          // 将头部元素更新为新元素
          this.head = node;
          // 再将最后一个节点（current）指向新的头部节点
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      if (index === 0) {
        // 从只有一个元素的循环链表中移除一个元素
        if (this.size() === 1) {
          this.head = undefined;

          // 是从一个非空循环链表中移除第一个元素
        } else {
          // 保存现在的 head 元素的引用，它将从循环链表中移除
          const removed = this.head;
          // 需要获得循环链表最后一个元素的引用
          current = this.getElementAt(this.size());
          // 更新 head element，将其指向第二个元素
          this.head = this.head.next;
          // 将最后一个 element（current.next）指向新的 head
          current.next = this.head;
          // 更新 current 变量的引用
          current = removed;
        }
      } else {
        // 不需要修改循环链表最后一个元素
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element; // {6}
    }
    return undefined;
  }
}

module.exprots = CircularLinkedList;
