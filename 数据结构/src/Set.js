/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 16:49:50
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 19:24:51
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
  // 没有副作用的方法和函数被称为纯函数
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach((value) => unionSet.add(value));
    otherSet.values().forEach((value) => unionSet.add(value));
    return unionSet;
  }

  // 交集: 是 x（元素）存在于 A 中，且 x 存在于 B 中
  intersection(otherSet) {
    // 创建一个新的 Set 实例
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    // 比较两个集合的元素个数，如果另一个集合元素个数多于当前集合的话，我们就交换 biggerSet 和 smallerSet 的值
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }

    // 迭代较小集合
    smallerSet.forEach((value) => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });

    return intersectionSet;
  }

  // 差集: 是 x（元素）存在于 A 中，且 x 不存在于 B 中
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach((value) => {
      // 得到所有存在于集合 A 但不存在于集合 B 的元素
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });

    return differenceSet;
  }

  // 子集: 集合 A 中的每一个 x（元素），也需要存在于集合 B 中
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false;

    let isSubset = true;

    this.values().every((value) => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }

      return true;
    });

    return isSubset;
  }
}

module.exports = Set;
