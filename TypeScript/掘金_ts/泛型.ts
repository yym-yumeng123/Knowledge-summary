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
