type Factory<T> = T | number | string;

function Factory(typeArg) {
  return [typeArg, "number", "string"];
}

type Stringify<T> = {
  [K in keyof T]: string;
};

type Close<T> = {
  [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

interface IFoo {
  prop1: string;
  prop2: number;
  props3: boolean;
}

type PirtialIFoo = MyPartial<IFoo>;

type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<"yym">; // 2

{
  type Factory<T = boolean> = T | number | string;
  const foo: Factory = false;

  function Factory1(typeArg = boolean) {
    return [typeArg, "number", "string"];
  }

  function add(source: number, add: number) {
    if (typeof source !== "number" || typeof add !== "number") {
      throw new Error("Invalid arguments");
    }

    return source + add;
  }

  type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
    ? "success"
    : "failure";

  type Res1 = ResStatus<10000>; // 'success'
  type Res2 = ResStatus<20000>; // 'success'
  type Res3 = ResStatus<"10000">; // 类型“string”不满足约束“number

  type ResStatus1<ResCode extends number = 10000> = ResCode extends
    | 10000
    | 10001
    | 10002
    ? "success"
    : "failure";

  type Res4 = ResStatus1;
}
