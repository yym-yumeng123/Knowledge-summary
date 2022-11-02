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