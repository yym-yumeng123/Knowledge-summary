type FuncFoo = (name: string) => number;

interface FuncFooStruct {
  (name: string): number;
}

function foo(name: string): number {
  return name.length;
}

const foo1 = function (name: string): number {
  return name.length;
};

const foo2: (name: string) => number = function (name) {
  return name.length;
};

const foo3 = (name: string): number => {
  return name.length;
};

const foo4: FuncFoo = (name) => {
  return name.length;
};

// 没有调用 return 语句
function foo5(): void {}

// 调用了 return 语句, 但没有返回值
function bar(): undefined {
  return;
}

// 在函数逻辑中注入可选参数默认值
function foo6(name: string, age: number): number {
  const inputAge = age || 18;
  return name.length + inputAge;
}

// 直接为可选参数声明默认值
function foo7(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

function foo8(arg1: string, ...rest: any[]) {}
function foo9(arg1: string, ...rest: [number, boolean]) {}

foo9("yym", 3, true);

// function func(foo: number, bar?: boolean): string | number {
//   if (bar) {
//     return String(foo);
//   } else {
//     return foo * 599;
//   }
// }

function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}
const r1 = func(599); // number
const r2 = func(599, true); // string
const r3 = func(599, false); // number

async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}
