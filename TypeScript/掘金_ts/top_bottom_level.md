> 类型层级指的是: **TS 中的所有类型的兼容关系, 从最上面的一层 any类型, 到最底层的never 类型**

### 判断类型兼容性的方式

```ts
// 返回1, 'yym' 是 string 子类型
type Result = 'yym' extends string ? 1 : 2

// 通过赋值来进行兼容性检查的方式
declare let source: string
declare let anyType: any
declare let neverType: never

anyType = source
neverType = source // 不能将类型“string”分配给类型“never”。
```

对于 变量a = 变量b, 成立 => `<变量b的类型> extends <变量a 的类型>`, 即 **b类型是a类型的子类型**, 在这里 `string extends never` 不成立

### 从原始类型开始

> 从原始类型, 对象类型,(统称基础类型) 和他们对应的字面量类型开始

```ts
type Result11 = "yym" extends string ? 1 : 2;
type Result22 = 1 extends number ? 1 : 2;
type Result33 = true extends boolean ? 1 : 2;
type Result44 = { name: string } extends object ? 1 : 2;
type Result55 = { name: "yym" } extends object ? 1 : 2;
type Result66 = [] extends object ? 1 : 2;
```

一个基础类型和他们对应的字面量类型必定存在父子类型关系, object 代表着所有非原始类型的类型, 即数组, 对象与函数类型, 我们将结论简记为, **字面量类型 < 对应的原始类型**

### 联合类型

在联合类型中, 只需要符合其中一个类型, 我们就可以认为实现了这个联合类型, 用条件类型表达式是这样的

```ts
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1
```

在这一层面上, 并不需要联合类型的所有成员均为 字面量类型, 或者字面量类型来自于统一寄出类型这样的前提, 只需要这个类型存在于联合类型中

```ts
type Result10 = string extends string | false | number ? 1 : 2; // 1
```

**字面量类型 < 包含此字面量类型的联合类型, 原始类型 < 包含此原始类型的联合类型**

```ts
type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2; // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1
```

**同一基础类型的字面量联合类型 < 此基础类型。**

合并一下: `字面量类型 < 包含此字面量类型的联合类型(同一基础类型) < 对应的原始类型`

即: 
```ts
// 2
type Result13 = 'linbudu' extends 'linbudu' | '599'
  ? 'linbudu' | '599' extends string
    ? 2
    : 1
  : 0;
```

### 装箱类型

JavaScript 中装箱对象 String 在 TypeScript 中的体现： String 类型，以及在原型链顶端傲视群雄的 Object 对象与 Object 类型。很明显, string类型是String类型的子类型, String类型会是Object类型的子类型, 那中间还有吗? 

```ts
type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends Object ? 1 : 2; // 1
```

`{}` 不是 object 的字面量类型吗? 

```ts
// String 继承了 {}  这个空对象, 然后自己实现了这些方法
// 在结构化类型的比较下,  String 会被认为是 {} 的子类型
interface String {
  replace: // ...
  replaceAll: // ...
  startsWith: // ...
  endsWith: // ...
  includes: // ...
}
```

```ts
// error 不成立
type Tmp = string extends object ? 1 : 2; // 2
```


```ts
// {} 是 object 和 Object 的字面量类型
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends {} ? 1 : 2; // 1

type Result17 = object extends Object ? 1 : 2; // 1
type Result20 = Object extends object ? 1 : 2; // 1

type Result19 = Object extends {} ? 1 : 2; // 1
type Result21 = {} extends Object ? 1 : 2; // 1
```

**原始类型 < 原始类型对应的装箱类型 < Object类型**

### Top Type

这里只有 any 和 unknown 两兄弟, 它们无视一切因果律，是类型世界的规则产物。因此， Object 类型自然会是 any 与 unknown 类型的子类型

```ts
type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1


type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2


type Result26 = any extends 'linbudu' ? 1 : 2; // 1 | 2
type Result27 = any extends string ? 1 : 2; // 1 | 2
type Result28 = any extends {} ? 1 : 2; // 1 | 2
type Result29 = any extends never ? 1 : 2; // 1 | 2
```

因为“系统设定”的原因。any 代表了任何可能的类型，当我们使用 any extends 时，它包含了“让条件成立的一部分”，以及“让条件不成立的一部分”
**在 TS 中, 如果接受判断的是 any, 那么会直接 返回条件类型结果组成的联合类型**

**Object < any/unknown**

### 向下探索

一定有一个 never 类型, 他代表了 '虚无' 的类, 一个根本不存在的类型, 对于这样的类型, 他会是任何类型的子类型

```ts
type Result33 = never extends 'linbudu' ? 1 : 2; // 1
```

undefined void null

```ts
type Result34 = undefined extends 'linbudu' ? 1 : 2; // 2
type Result35 = null extends 'linbudu' ? 1 : 2; // 2
type Result36 = void extends 'linbudu' ? 1 : 2; // 2
```

在 TypeScript 中，void、undefined、null 都是切实存在、有实际意义的类型，它们和 string、number、object 并没有什么本质区别

**never < 字面量类型**

### 类型层级链


```ts
type TypeChain = never extends "yym"
  ? "yym" extends "yym" | "18"
    ? "yym" | "18" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
```

### 其它比较场景

- 对于基类和派生类, 通常情况 派生类会完全保留基类的结构, 而只是自己新增新的属性和方法, 在结构化类型的比较下，其类型自然会存在子类型关系。更不用说派生类本身就是 extends 基类得到的
- 联合类型的判断, 多个成员

```ts
// 只需要比较一个联合类型是否可被视为另一个联合类型的子集，即这个联合类型中所有成员在另一个联合类型中都能找到
type Result36 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
```

- 数组和元组

```ts
type Result40 = [number, number] extends number[] ? 1 : 2; // 1
type Result41 = [number, string] extends number[] ? 1 : 2; // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2; // 1
type Result43 = [] extends number[] ? 1 : 2; // 1
type Result44 = [] extends unknown[] ? 1 : 2; // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2; // 1
type Result46 = any[] extends number[] ? 1 : 2; // 1
type Result47 = unknown[] extends number[] ? 1 : 2; // 2
type Result48 = never[] extends number[] ? 1 : 2; // 1
```


### 总结

1. any / unknown
2. Object 顶级原型
3. String/Boolean/Nubmer 装箱类型
4. string/boolean/number 基础类型(拆箱类型)
5. 'yym'/true/18 字面量类型
6. never