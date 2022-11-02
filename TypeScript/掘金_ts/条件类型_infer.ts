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
