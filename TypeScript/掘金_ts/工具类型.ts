type MyPartial1<T> = {
  [P in keyof T]?: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Foo {
  optional: string | undefined;
  required: string;
}

const foo100: Foo = {
  required: "1",
};

interface Foo1 {
  optional: never;
  required: string;
}

const foo101: Foo1 = {
  optional: "",
  required: "1",
};

// --------

interface EmployeeType {
  id: number;
  fullname: string;
  role: string;
}

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// 键名均为字符串, 键值类型未知
type Record1 = MyRecord<string, unknown>;
// 键名均为字符串, 键值类型任意
type Record2 = MyRecord<string, any>;
// 键名为字符串或数字, 键值类型任意
type Record3 = MyRecord<string | number, any>;

type Record4 = MyRecord<number, EmployeeType>;

let employees: Record4 = {
  0: { id: 1, fullname: "John Doe", role: "Designer" },
  1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
  2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
};

type aniType = "dog" | "cat" | "pet";
type obj1 = {
  a: string;
};

type Record5 = MyRecord<aniType, obj1>;

const aa: Record5 = {
  dog: {
    a: "2",
  },
};

type petsGroup = "dog" | "cat" | "fish";
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petsGroup | "otherAnamial", IPetInfo>;

const animalsInfo: IPets = {
  dog: {
    name: "dogName",
    age: 2,
  },
  cat: {
    name: "catName",
    age: 3,
  },
  fish: {
    name: "fishName",
    age: 5,
  },
  otherAnamial: {
    name: "otherAnamialName",
    age: 10,
  },
};

type Dictionary<T> = {
  [index: string]: T;
};

type A1 = Dictionary<string>;

const a11: A1 = {
  "21": undefined,
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Pick 是保留这些传入的键
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface Foo102 {
  name: string;
  age: number;
  job: string;
}

// type PickFoo102 = {
//   name: string;
//   age: number;
// }
type PickFoo102 = MyPick<Foo102, "name" | "age">;

type Tmp101 = Exclude<1, 2>; // 1
type Tmp102 = Exclude<1 | 2, 2>; // 1
type Tmp103 = Exclude<1 | 2 | 3, 2 | 3>; // 1
type Tmp104 = Exclude<1 | 2 | 3, 2 | 4>; // 1 | 3

type MyExtract<T, U> = T extends U ? T : never;
type MyExclude<T, U> = T extends U ? never : T;

type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2

type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never); // never

// 并集
export type Concurrence<A, B> = A | B;
// 交集
type Intersection<A, B> = A extends B ? A : never;
// 差集
type Difference<A, B> = A extends B ? never : A;
// 补集
type Complement<A, B extends A> = Difference<A, B>;

type NonNullable<T> = T extends null | undefined ? never : T;
type _NonNullable<T> = Difference<T, null | undefined>;

type FunctionType = (...args: any) => any;
type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;

type para = Parameters<(...arg: string[]) => string>; // string[]
type return1 = ReturnType<(...arg: string[]) => string>; // string

type FirstParameter<T extends FunctionType> = T extends (
  arg: infer F,
  ...args: any
) => any
  ? F
  : never;

type GetLast<T extends unknown[]> = T extends [...any, infer L] ? L : T[number];
type FuncLastArg<T> = T extends (...args: infer G) => unknown ? GetLast<G> : T;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number
type BarFirstParameter = FirstParameter<FuncBar>; // string

type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

type FirstArrayItemType<T extends any[]> = T extends [infer F, ...any[]]
  ? F extends string
    ? F
    : never
  : never;

type Tmp1 = FirstArrayItemType<[599, "linbudu"]>; // never
type Tmp2 = FirstArrayItemType<["linbudu", 599]>; // 'linbudu'
type Tmp3 = FirstArrayItemType<["linbudu"]>; // 'linbudu'

type FirstArrayItemType1<T extends any[]> = T extends [
  infer P extends string,
  ...any[]
]
  ? P
  : never;
