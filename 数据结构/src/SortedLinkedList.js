/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-06 11:08:58
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-06 11:19:24
 * @FilePath: /Knowledge-summary/数据结构/src/SortedLinkedList.js
 * @Description: 有序链表
 */

const LinkedList = require("./LinkedList");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    // {1}
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN; // {2}
}

class SortedLinkedList extends LinkedList {
  // 需要一个用来比较元素的函数
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  // 我们不想允许在任何位置插入元素，我们要给 index 参数设置一个默认值
  insert(element, index = 0) {
    // 如果有序链表为空，我们可以直接调用 LinkedList 的 insert 方法并传入 0 作为 index
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }

    // 如果有序链表不为空，我们会知道插入元素的正确位置
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }

  // 迭代整个有序链表直至找到需要插入元素的位置
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }

    return i;
  }
}
