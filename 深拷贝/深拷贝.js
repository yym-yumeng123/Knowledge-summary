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
 *
 * window.self === window
 */
const b1 = JSON.parse(JSON.stringify(b))

const type = {
  s: "1",
  n: 1,
  b: true,
  u: undefined,
  n: null,
}

// 缓存
const cache = []
function deepClone(source) {
  if (source instanceof Object) {
    let cacheDist = findCache(source)
    if (cacheDist) {
      return cacheDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = new Array()
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else {
        dist = new Object()
      }
      cache.push([source,dist])
      for (const key in source) {
        dist[key] = deepClone(source[key])
      }
      return dist
    }
  }

  return source
}

// 环检测
function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][1] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

// 数组
const arr = [1, 2, [3, 4], [5, [6]]]
console.assert(arr[3][0] === deepClone(arr))

// 普通对象断言
const type = {
  s: "1",
  n: 1,
  b: true,
  u: undefined,
  n: null,
  children: {
    name: "yym",
  },
}
console.assert(type.s === deepClone(type).s)
console.assert(type.children !== deepClone(type).children)
console.assert(type.children.name === deepClone(type).children.name)

// 基本类型断言
console.assert(1 === deepClone(1))
console.assert("1" === deepClone("1"))
console.assert(true === deepClone(true))
console.assert(null === deepClone(null))
console.assert(undefined === deepClone(undefined))
