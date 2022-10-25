type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);
const status1: StatusCode = 200;

type Handle = (e: Event) => void;
const clickHandle: Handle = (e) => {};
const moveHandle: Handle = (e) => {};
const dragHandle: Handle = (e) => {};

type ObjType = {
  name: string;
  age: number;
};

type Factory<T> = T | number | string;
type FactoryWithBool = Factory<boolean>;
const foo15: FactoryWithBool = true;
type Factory1<NewType> = NewType | number | string;

type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handle: () => {} }>) {
  input?.handle();
}

type MaybeArray<T> = T | T[];

// 函数泛型我们会在后面了解~
function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

//-----

interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "yym",
  age: 18,
};

type StrAndNum = string & number; // never

type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};
type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Composed = Struct1 & Struct2;
type PrimitivePropType = Composed["primitiveProp"]; // never
type ObjectPropType = Composed["objectProp"]; // { name: string; age: number; }

type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

interface AllStringTypes {
  [key: string]: string;
}

type AllStringTypes1 = {
  [key: string]: string;
};

type PropType1 = AllStringTypes["yym"]; // string
type PropType2 = AllStringTypes["599"]; // string

const foo16: AllStringTypes = {
  12: "599",
  yym: "2323",
  [Symbol("add")]: "symbol",
};

interface AllStringTypes2 {
  propA: number; // // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  [key: string]: string;
}

interface Foo {
  yym: 1;
  599: 2;
}

type Fookeys = keyof Foo; // "linbudu" | 599

type StrAndNumAndSym = keyof any; // string | number | symbol

interface NumbrRecord {
  [key: string]: number;
}

type PropType = NumbrRecord[string]; // number

interface Foo {
  propA: number;
  propB: boolean;
}

type PropAType = Foo["propA"]; // number
type PropBType = Foo["propB"]; // boolean

type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean

type Stringify<T> = {
  [K in keyof T]: string;
};

type Clone<T> = {
  [K in keyof T]: T[K];
};

interface Foo1 {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifyfiedFoo = Stringify<Foo1>;
type ClonefiedFoo = Clone<Foo1>;

// 等价于
interface StringifiedFoo {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}

// ---

const str2 = "linbudu";
const obj4 = { name: "linbudu" };
const nullVar = null;
const undefinedVar = undefined;
const func4 = (input: string) => {
  return input.length > 10;
};

type Str = typeof str2; // "linbudu"
type Obj = typeof obj4; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefinedVar;
type Func = typeof func4; // (input: string) => boolean

const func5: typeof func4 = (name: string) => {
  return name === "yym";
};

type FuncReturnType = ReturnType<typeof func4>;

function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace("linbudu", "linbudu599");
  }
  if (typeof input === "number") {
  }
  // ...
}

export type Falsy = false | "" | 0 | null | undefined;
export const isFalsy = (val: unknown): val is Falsy => !val;
export type Primitive = string | number | boolean | undefined;
export const isPrimitive = (val: unknown): val is Primitive =>
  ["string", "number", "boolean", "undefined"].includes(typeof val);

interface Foo10 {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar10 {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo10 | Bar10) {
  if ("foo" in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
function handle1(input: Foo10 | Bar10) {
  if ("shared" in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}

//-----

// import assert from 'assert'
