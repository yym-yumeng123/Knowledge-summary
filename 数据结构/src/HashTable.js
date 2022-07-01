/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-01 11:44:15
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 14:15:13
 * @FilePath: /Knowledge-summary/数据结构/src/HashTable.js
 * @Description: 散列表
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

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  // 散列函数
  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);

    let hash = 0; // 防止 key 是一个对象而不是字符串。我们需要一个 hash 变量来存储这个总和

    // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 之间的整数
    // 遍历 key 并将从 ASCII表中查到的每个字符对应的 ASCII 值加到 hash 变量中
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    // 为了得到比较小的数值，我们会使用 hash 值和一个任意数做除法的余数（%)——这可以规避操作数超过数值变量最大表示范围的风险。
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  // 将键和值加入散列表
  put(key, value) {
    if (key != null && value != null) {
      //对于给出的 key 参数，我们需要用所创建的 hashCode 函数在表中找到一个位置
      const position = this.hashCode(key);
      // 为了信息备份将原始的 key 保存下来
      this.table[position] = new ValuePair(key, value);
    }
  }

  // 从散列表中获取一个值
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  // 移除一个值
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}

module.exports = HashTable;
