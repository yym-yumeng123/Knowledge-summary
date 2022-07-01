/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-01 10:34:25
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 11:38:14
 * @FilePath: /Knowledge-summary/数据结构/src/Dictionary.js
 * @Description: 字典
 */

const defaultToString = (item) => {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }

  return item.toString;
};

// 不是只将 value 保存在字典中，而是要保存两个值：原始的key 和 value
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  // 已经存在一个给定键名的键值对（表中的位置不是 null 或 undefined），那么返回 true
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key); // 获取 key 的字符串
      this.table[tableKey] = new ValuePair(key, value); // 创建一个新的键值对并将其赋值给 table 对象上的 key属性（tableKey）
      return true;
    }
    return false;
  }

  // 检索一个值
  get(key) {
    // 首先检索存储在给定key 属性中的对象,
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  // 这个也可以检索一个值: 获取两次key的字符串以及访问两次 table 对象
  get2(key) {
    if (this.hasKey(key)) {
      return this.table[this.toStrFn(key)].value;
    }
    return undefined;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  keyValues() {
    return Object.values(this.table);
  }

  // 兼容版
  keyValues2() {
    const valuePairs = [];
    for (const key in this.table) {
      if (this.hasKey(key)) {
        valuePairs.push(this.table[key]);
      }
    }
    return valuePairs;
  }

  keys() {
    return this.keyValues().map((i) => i.key);
  }

  values() {
    return this.keyValues().map((i) => i.value);
  }

  // 迭代字典中的每个键值对
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      // 执行以参数形式传入 forEach 方法的 callbackFn 函数, 保存结果,
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      // 回调函数返回了 false，我们会中断 forEach 方法的执行
      if (result === false) {
        break;
      }
    }
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}

module.exports = Dictionary;
