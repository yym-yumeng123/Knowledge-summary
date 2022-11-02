### 条件类型基础

条件类型的语法类似于三元表达式

```ts
valueA === valueB ? Result1 : Result2
TypeA extends TypeB ? Result1 : Result2
```

条件类型中使用 extends 判断类型的兼容性, 而非判断类型的全等形, 因为在类型层面中, 对于能够进行赋值操作的两个变量, 我们 **并不需要他们的类型完全相等, 只需要具有兼容性**, 而两个完全相等的类型, 其 extends 自然也是成立的

条件类型大部分场景和泛型一起使用, 泛型参数的实际类型会在调用时才被填充(类型别名中显示传入, 或者函数中提取), 而条件类型在这一基础上, 可以基于填充后的泛型进一步的类型操作

```ts
type LiteralType<T> = T extends string ? "string" : "other";
type Rest1 = LiteralType<"yym">;
type Rest2 = LiteralType<599>;
```

```ts
// 多层嵌套
export type LiteralType<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends null
	? "null"
	: T extends undefined
	? "undefined"
	: never;

type Res1 = LiteralType<"linbudu">; // "string"
type Res2 = LiteralType<599>; // "number"
type Res3 = LiteralType<true>; // "boolean"
```

函数和泛型搭配, 下面如何标注返回值类型

```ts
function univarsalAdd<T extends number | bigint | string>(x: T, y: T) {
  return x + (y as any);
}

universalAdd(599, 1); // T 填充为 599 | 1
universalAdd("linbudu", "599"); // T 填充为 linbudu | 599
```

```ts
export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
	? bigint
	: T extends string
	? string
	: never;

function universalAdd<T extends number | bigint | string>(
	x: T,
	y: T
): LiteralToPrimitive<T> {
	return x + (y as any);
}

universalAdd("linbudu", "599"); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint
```

函数类型:

```ts
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;
```

### infer 关键字

TS 中支持通过 `infer` 关键字 **在条件类型中提取类型的某一部分信息**

```ts
//  infer是 inference 的缩写，意为推断
// infer R就表示待推断的类型
// infer 只能在条件类型中使用
type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;
```

类型结构不局限于函数类型结构, 还可以是数组

```ts
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
```

可以使用 `rest` 操作符来处理任意长度的情况

- infer 甚至可以和 rest 操作符一样同时提取一组不定长的类型

```ts
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

type ExtractResult1 = ExtractStartAndEnd<[1, 2, 3, 4]>; // [1, 4]

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

type SwapStartAndEndResult1 = SwapStartAndEnd<[1, 3, 5, 7]>; // [7, 3, 5, 1]

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;
```

```ts
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number
```

除了数组, infer 结构也可以是接口

```ts
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
// ，TypeScript 中这样对键值类型进行 infer 推导，将导致类型信息丢失，而不满足索引签名类型只允许 string | number | symbol 的要求。
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never

type ReverseKeyValueResult1 = ReverseKeyValue<{ "key": "value" }>; // { "value": "key" }
```

infer 还可以是 Promise 结构

```ts
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取
```

infer 关键字也经常被使用在嵌套的场景中，包括对类型结构深层信息地提取，以及对提取到类型信息的筛选等

```ts

type PromiseValue<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;

type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>>

// 递归
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
```

条件类型在泛型的基础上支持了基于类型信息的动态条件判断，但无法直接消费填充类型信息，而 infer 关键字则为它补上了这一部分的能力，让我们可以进行更多奇妙的类型操作