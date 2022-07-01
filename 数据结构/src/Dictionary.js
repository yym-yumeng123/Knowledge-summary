/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-01 10:34:25
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 11:05:35
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
}
