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

### 分布式条件类型

分布式条件类型: 条件类型的分布式特性, 只不过是条件类型在满足一定情况下会执行的逻辑而已

```ts
type Condition<T> = T extends 1 | 2 | 3 ? T : never;
type Res11 = Condition<1 | 2 | 3 | 4 | 5>; // 1 | 2 | 3
type Res12 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never; // never
```

上面的唯一差异在 Res11 中, 进行判断的联合类型被作为泛型参数传入另一个独立的类型别名

**是否通过泛型参数传入**

```ts
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res13 = Naked<number | boolean>;
// "N"
type Res14 = Wrapped<number | boolean>;
```

**泛型参数是否被数组包裹**

大致得到了条件类型分布式起作用的条件:
- 你的类型参数需要是一个联合类型,
- 类型参数需要通过泛型参数的方式传入, 而不能直接进行条件类型判断
- 条件类型中的泛型参数不能被包裹 

效果: 将这个联合类型拆开来, 每个分支分别进行一次条件类型的判断, 最后将结果合并起来

**对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上**

```ts
// 自动分发

type Naked<T> = T extends boolean ? "Y" : "N";

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>;


// 伪代码
const Res3 = [];

for(const input of [number, boolean]){
  if(input extends boolean){
    Res3.push("Y");
  } else {
    Res.push("N");
  }
}
```

而这里的裸类型参数，其实指的就是泛型参数是否完全裸露

```ts
export type NoDistribute<T> = T & {};

type Wrapped<T> = NoDistribute<T> extends boolean ? "Y" : "N";

type Res1 = Wrapped<number | boolean>; // "N"
type Res2 = Wrapped<true | false>; // "Y"
type Res3 = Wrapped<true | false | 599>; // "N"

```

在某些情况下，我们也会需要包裹泛型参数来禁用掉分布式特性。最常见的场景也许还是联合类型的判断，即我们不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性判断，

```ts
type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false

```

另外一种情况则是，当我们想判断一个类型是否为 never 时，也可以通过类似的手段

```ts
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<"linbudu">; // false
```

需要注意的是这里的 never 与 any 的情况并不完全相同，any 在直接作为判断参数时、作为泛型参数时都会产生这一效果：

```ts
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1


// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never
```
通过使用分布式条件类型，我们能轻易地进行集合之间的运算，比如交集：

```ts
type Intersection<A, B> = A extends B ? A : never;

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3

```

### 扩展

```ts
// 无论如何 0 extends 1 都不会成立。
type IsAny<T> = 0 extends 1 & T ? true : false;

// 但作为代表任意类型的 any ，它的存在就像是开天辟地的基本规则一样，如果交叉类型的其中一个成员是 any，那短板效应就失效了，此时最终类型必然是 any 
```

```ts
type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false;


type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;
```