let a = {
  b: 1,
  c: [1, 2, 3],
  d: { d1: "aaa", d2: "bbb" },
}

let b = {
  b: 1,
  c: [1, 2, 3],
  d: { d1: "aaa", d2: "bbb" },
  bool: true,
  f: function () {},
  u: undefined,
  time: new Date(),
  regex: /hi/,
  s: Symbol(),
}

// JSON 深拷贝

const a1 = JSON.parse(JSON.stringify(a))

/**
 * 只支持: Object array string number 'true' 'fasle' 'null'
 *
 * 不支持 函数 function
 * 不支持 undefined
 * 不支持 日期: 会变成一个 事件字符串
 * 不支持正则
 * 不支持 Symbol()
 */
const b1 = JSON.parse(JSON.stringify(b))

const type = {
  s: "1",
  n: 1,
  b: true,
  u: undefined,
  n: null,
}

function deepClone(source) {
  return source
}

deepClone(type)
