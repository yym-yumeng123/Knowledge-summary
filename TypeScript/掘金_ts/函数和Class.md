# 函数

### 函数的类型签名

如果说变量的类型是描述了这个变量的值类型, 那么函数的类型就是描述了 **函数入参类型与函数返回值类型**, 同样适用 : 的语法进行类型标注

```ts
// 在函数类型中同样存在类型推导, 可以不写返回值类型, 也能被正确推导为 number 类型
function foo(name: string): number {
  return name.length;
}
```

在 JS 中,, 我们称 `function name() {}` 这一声明函数的方式为函数声明(Function Declaration), 除了函数声明以外, 我们还可以通过 函数表达式(Function Expression), 即 const foo = function() {} 的形式声明一个函数

```ts
const foo = function (name: string): number {
  return name.length;
};
```

也可以像对变量进行类型标注那样，对 foo 这个变量进行类型声明

```ts
const foo2: (name: string) => number = function (name) {
  return name.length;
};
```

这里的 **(name: string) => number** 看起来很眼熟，对吧？它是 ES6 的重要特性之一：箭头函数, 但在这里, 它其实是 TS 中的 **函数类型签名**, 而实际的箭头函数, 我们的类型标注是类似的

```ts
const foo3 = (name: string): number => {
  return name.length;
};

// 这种代码可读性很差,
const foo4: (name: string) => number = (name) => {
  return name.length;
};
```

**直接在函数中进行参数和返回值的类型声明，要么使用类型别名将函数声明抽离出来**

```ts
type FuncFoo = (name: string) => number;

const foo4: FuncFoo = (name) => {
  return name.length;
};
```

如果只是为了描述这个函数的类型结构，我们甚至可以使用 interface 来进行函数声明

```ts
// interface 就是用来描述一个类型结构的，而函数类型本质上也是一个结构固定的类型罢了
// Callable Interface
interface FuncFooStruct {
  (name: string): number;
}
```

### void 类型

在 ts 中, 一个没有返回值(即没有调用 return 语句)的函数, 其返回类型应当被标记为 void 而不是 undefined, 即使他实际的值是 undefined

```ts
// 没有调用 return 语句
function foo5(): void {}

// 调用了 return 语句, 但没有返回值
function bar(): void {
  return;
}
```

**在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值**, 相比之下, void 类型就像是 js 中的 null 一样, 因此在我们没有实际返回值时, 使用 void 类型能更好的说明这个函数 **没有进行返回操作**

```ts
function bar(): undefined {
  return;
}
```

### 可选参数与 rest 参数

很多时候, 我们希望函数的参数可以更灵活, 比如不一定全部必传, 当你不传入参数时函数会使用此参数的默认值, 使用 ? 描述一个可选参数

```ts
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
```

注意: **可选参数必须位于必选参数之后**, 我们也可以直接将可选参数与默认值合并，但此时就不能够使用 ? 了，因为既然都有默认值，那肯定是可选参数啦

对于 rest 参数的类型标注也比较简单，由于其实际上是一个数组，这里我们也应当使用数组类型进行标注：

```ts
function foo8(arg1: string, ...rest: any[]) {}
function foo9(arg1: string, ...rest: [number, boolean]) {}

foo9("yym", 3, true);
```

### 重载

在某些逻辑复杂的情况下, 函数可能有多组入参类型和返回值类型

```ts
// 函数的返回类型基于其入参 bar 的值
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}
```

要想实现与入参关联的返回值类型，我们可以使用 TypeScript 提供的 **函数重载签名(Overload Signature)**

```ts
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
```

这里三个 `function func` 具有不用的意义:

- **function func(foo: number, bar: true): string** 重载签名一, 传入 bar 的值为 true, 函数返回值为 string
- **function func(foo: number, bar?: false): number** 重载签名二, 不传入 bar, 后传入 bar 的值为 false, 函数返回值为 number
- **function func(foo: number, bar?: boolean): string | number**, 函数的实现签名, 会包含重载签名的所有可能情况

**需要注意的地方，拥有多个重载声明的函数在被调用时，是按照重载的声明顺序往下查找的。因此在第一个重载声明中，为了与逻辑中保持一致，即在 bar 为 true 时返回 string 类型，这里我们需要将第一个重载声明的 bar 声明为必选的字面量类型**

实际上, TS 的重载更像是伪重载, 他只是一个具体实现, 其重载体现在方法调用的签名上而非具体实现上

### 异步函数、Generator 函数等类型签名

对于异步函数、Generator 函数、异步 Generator 函数的类型签名，其参数签名基本一致，而返回值类型则稍微有些区别：

```ts
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}
```

对于异步函数（即标记为 async 的函数），其返回值必定为一个 Promise 类型，而 Promise 内部包含的类型则通过泛型的形式书写，即 **Promise<T>**
