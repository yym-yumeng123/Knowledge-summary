/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 16:49:50
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 17:19:02
 * @FilePath: /Knowledge-summary/数据结构/src/Set.js
 * @Description: 对象实现集合
 */
class Set {
  constructor() {
    this.items = {};
  }

  add(element) {
    if (!this.has(element)) {
      // 添加一个 element 的时候，把它同时作为键和值保存
      this.items[element] = element;
      return true;
    }
    return false;
  }

  has(element) {
    // 该方法返回一个表明对象是否具有特定属性的布尔值
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  sizeLegacy() {
    let count = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++;
      }
      return count;
    }
  }

  values() {
    return Object.values(this.items);
  }

  valuesLegacy() {
    let values = [];
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(key);
      }
    }
    return values;
  }

  // 并集
}

module.exports = Set;
