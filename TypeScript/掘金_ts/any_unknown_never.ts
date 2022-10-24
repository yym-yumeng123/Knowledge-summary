function log(message: any, ...optionalParams: any[]): void {
  console.log(message, ...optionalParams);
}

let foo11;

// foo, bar 都是 any
function func(foo, bar) {}

// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVal: any = "yym";
anyVal = false;
anyVal = "32";
anyVal = {
  site: "jj",
};
anyVal = () => {};

// 标记为具体类型的变量也可以接受任何 any 类型的值
const va1: string = anyVal;
const va2: number = anyVal;
const va3: () => {} = anyVal;
const va4: {} = anyVal;

anyVal = null;
anyVal.foo.bar.baz();

let unkonowmVar: unknown = "yym";
unkonowmVar = false;
unkonowmVar = {
  site: "jj",
};
unkonowmVar = () => {};

const val1: string = unkonowmVar;
const var2: number = unkonowmVar;
const val3: () => {} = unkonowmVar;
const val4: any = unkonowmVar;
const val5: unknown = unkonowmVar;

unkonowmVar.foo();
(unkonowmVar as { foo: () => {} }).foo();

type UnionWithNever = "yym" | 599 | true | void | never;

declare let v1: never;
declare let v2: void;
v1 = v2;
v2 = v1;

function justThrow(): never {
  throw new Error();
}

function foo(input: number) {
  if (input > 1) {
    justThrow();
    // 等同于 return 语句后的代码，即 Dead Code
    const name = "linbudu";
  }
}

declare const strOrNumOrBool: string | number | boolean;

if (typeof strOrNumOrBool === "string") {
  console.log("str");
} else if (typeof strOrNumOrBool === "number") {
  console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
  console.log("bool!");
} else {
  throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}

const arr = [];
arr.push("2323");

const str11: string = "linbudu";

// 从 X 类型 到 Y 类型的断言可能是错误的，blabla
(str11 as { handler: () => {} }).handler();

declare const foo12: {
  func?: () => {
    prop?: number | null;
  };
};

foo12.func().prop.toFixed();

interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}

const obj12 = <IStruct>{
  bar: {
    baz: {
      handler,
    },
  },
};
