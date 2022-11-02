type LiteralType<T> = T extends string ? "string" : "other";
type Rest1 = LiteralType<"yym">;
type Rest2 = LiteralType<599>;

type LiteralType1<T> = T extends string
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

type Res1 = LiteralType1<"linbudu">; // "string"
type Res2 = LiteralType1<599>; // "number"
type Res3 = LiteralType1<true>; // "boolean"

type LiteralToPrimitive<T> = T extends number
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

type Func = (...args: any[]) => any;
type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? "A string return func!"
  : "A non-string return func!";

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

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

type ArrayItemType<T> = T extends Array<infer ElementType>
  ? ElementType
  : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, "name">;
type PropTypeResult2 = PropType<{ name: string; age: number }, "name" | "age">;

// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never;

type ReverseKeyValueResult1 = ReverseKeyValue<{ key: "value" }>;

type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取

type PromiseValue1<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T;

type PromiseValueResult3 = PromiseValue1<Promise<Promise<boolean>>>;
