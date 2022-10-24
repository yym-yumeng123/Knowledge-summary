> 内置的可用于标注的类型: any never unknown, 加上这一部分我们就掌握了所有的内置类型标注

### 内置类型: any unknown never

有时候,我们的 ts 代码不需要十分精确严格的类型标注, 比如 console.log 方法能够接受任意类型, 为了能够表示 '任意类型', ts 提供了一个内置类型 any, 来表示所谓的任意类型

```ts
log(message?: any, ...optionalParams: any[]): void
```

除了显式的标记一个变量或参数为 any，在某些情况下你的变量/参数也会被隐式地推导为 any

> 在 tsconfig 中启用了 noImplicitAny 时会报错

```ts
let foo; // any

// foo, bar 都是 any
function func(foo, bar) {}
```

any 类型的变量几乎无所不能, 它可以在声明后再次接受任意类型的值, 同事可以被赋值给任意其他类型的变量

```ts
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
```

可以在 any 类型变量上任意的进行操作, 包括赋值, 访问, 方法调用等等, 此时可以认为类型推导与检查是被完全禁用的

```ts
let anyVar: any = null;

anyVar.foo.bar.baz();
anyVar[0][1][2].prop1;
```

而 any 类型的主要意义, 其实就是为了表示一个 **无拘无束的 "任意类型", 它能兼容所有类型, 也能够被所有类型兼容**

> any 的本质是类型系统中的顶级类型，即 Top Type，这是许多类型语言中的重要概念，我们会在类型层级部分讲解。

- 如果是类型不兼容报错导致你使用 any，考虑用类型断言替代，我们下面就会开始介绍类型断言的作用。
- 如果是类型太复杂导致你不想全部声明而使用 any，考虑将这一处的类型去断言为你需要的最简类型。如你需要调用 foo.bar.baz()，就可以先将 foo 断言为一个具有 bar 方法的类型。
- 如果你是想表达一个未知类型，更合理的方式是使用 unknown。

unknown 类型和 any 类型有些相似, 一个 unknown 类型的变量可以再次赋值为任意其它乐行, 但只能赋值给 any 与 unknown 类型的变量

```ts
let unkonowmVar: unknown = "yym";
unkonowmVar = false;
unkonowmVar = {
  site: "jj",
};
unkonowmVar = () => {};

const val1: string = unkonowmVar; // 不能将类型“unknown”分配给类型“string
const var2: number = unkonowmVar; // Error
const val3: () => {} = unkonowmVar; // Error

const val4: any = unkonowmVar;
const val5: unknown = unkonowmVar;
```

unknown 和 any 的一个主要差异体现在赋值给别的变量时, any 就像是 “我身化万千无处不在” ，所有类型都把它当自己人。 而 unknown 就像是 “我虽然身化万千，但我坚信我在未来的某一刻会得到一个确定的类型”
简单地说，any 放弃了所有的类型检查，而 unknown 并没有。这一点也体现在对 unknown 类型的变量进行属性访问时：

```ts
let unknownVar: unknown;

unknownVar.foo(); // 报错：对象类型为 unknown

(unkonowmVar as { foo: () => {} }).foo();
```

在类型未知的情况下，更推荐使用 unknown 标注。

### 虚无的 never 类型

看一个例子:

```ts
// never 被无视掉了
type UnionWithNever = "yym" | 599 | true | void | never; // true | void | "yym" | 599
```

never 类型不携带任何的类型信息

```ts
declare let v1: never;
declare let v2: void;
v1 = v2; // 不能将类型“void”分配给类型“never”
v2 = v1;
```

在编程语言的类型系统中, never 类型被称为 **Bottom Type**, 整个类型系统层级中最底层的类型。和 null、undefined 一样，它是所有类型的子类型，但只有 never 类型的变量能够赋值给另一个 never 类型变量

在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数:

```ts
function justThrow(): never {
  throw new Error();
}
```

在类型流的分析中，一旦一个返回值类型为 never 的函数被调用，那么下方的代码都会被视为无效的代码（即无法执行到）

```ts
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
```

```ts
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
```

上面的代码, 如果我们希望这个变量的每一种类型都需要得到妥善处理，在最后可以抛出一个错误，但这是运行时才会生效的措施，是否能在类型检查时就分析出来？

前面我们提到了主动使用 never 类型的两种方式，而 never 其实还会在某些情况下不请自来。比如说，你可能遇到过这样的类型错误：

```ts
// 未标明类型的数组被推导为了 never[] 类型
const arr = [];

// 这种情况仅会在你启用了 strictNullChecks 配置，同时禁用了 noImplicitAny 配置时才会出现
arr.push("linbudu"); // 类型“string”的参数不能赋给类型“never”的参数。
```

### 类型断言: 警告编译器不准报错

类型断言能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型, 它其实就是一个将变量的已有类型更改为新指定类型的操作 它的基本语法 **as NewType**

```ts
// 将 any / unknown 类型断言到一个具体的类型
let unknownVar: unknown;
(unknownVar as { foo: () => {} }).foo();

// as 到 any 来为所欲为，跳过所有的类型检查：
const str: string = "linbudu";
(str as any).func().foo().prop;

// 可以在联合类型中断言一个具体的分支：
function foo(union: string | number) {
  if ((union as string).includes("linbudu")) {
  }

  if ((union as number).toFixed() === "599") {
  }
}
```

类型断言的正确使用方式是，在 TypeScript 类型分析不正确或不符合预期时，将其断言为此处的正确类型

### 双重断言

如果在使用类型断言时，原类型与断言类型之间差异过大，也就是指鹿为马太过离谱，离谱到了指鹿为霸王龙的程度，TypeScript 会给你一个类型报

```ts
const str: string = "linbudu";

// 类型 "string" 到类型 "{ handler: () => {}; }" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"
(str as { handler: () => {} }).handler();

(str as unknown as { handler: () => {} }).handler();

// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();
```

因为你的断言类型和原类型的差异太大，需要先断言到一个通用的类，即 any / unknown。这一通用类型包含了所有可能的类型，因此断言到它和从它断言到另一个类型差异不大

### 非空断言

非空断言其实是类型断言的简化, 使用 **! 语法**, 即 **obj!.func()!.prop**的形式标记前面的一个声明一定是非空的（实际上就是剔除了 null 和 undefined 类型）

```ts
declare const foo12: {
  func?: () => {
    prop?: number | null;
  };
};

foo12.func!().prop!.toFixed();
```

非空断言的常见场景还有 document.querySelector、Array.find 方法等

```ts
const element = document.querySelector("#id")!;
const target = [1, 2, 3, 599].find((item) => item === 599)!;
```

### 扩展

- 最顶级的类型，any 与 unknown
- 特殊的 Object ，它也包含了所有的类型，但和 Top Type 比还是差了一层
- String、Boolean、Number 这些装箱类型
- 原始类型与对象类型
- 字面量类型，即更精确的原始类型与对象类型嘛，需要注意的是 null 和 undefined 并不是字面量类型的子类型
- 最底层的 never
