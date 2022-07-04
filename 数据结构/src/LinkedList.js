/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-04 11:29:17
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-04 11:36:13
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
}
