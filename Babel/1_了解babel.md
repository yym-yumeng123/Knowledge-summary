> babel 最开始叫 6to5, 顾名思义 es6 转 es5, 随着 es 标准的演进, 有了 es7 等, 6to5 不合适了, 所以改名叫 babel

### babel 用途

1. 转译 esnext, typescript, flow 等到目标环境支持 js
2. 一些特定用途的代码转换
3. 代码的静态分析

babel 的名字来自巴别塔的典故，是一个 js 转译器，用于 es next、typescript 等代码的转换，同时还暴露出了 api 让开发者可以进行特定用途的转换。除此以外，还可以做各种静态分析

### 编译器和转译器

编译的定义就是从一种编程语言转成另一种编程语言。主要指的是高级语言到低级语言

> 高级语言: 有很多用于描述逻辑的语言特性，比如分支、循环、函数、面向对象等，接近人的思维，可以让开发者快速的通过它来表达各种逻辑。比如 c++、javascript

> 低级语言：与硬件和执行细节有关，会操作寄存器、内存，具体做内存与寄存器之间的复制，需要开发者理解熟悉计算机的工作原理，熟悉具体的执行细节。比如汇编语言、机器语言。

一般编译器 Compiler 是指高级语言到低级语言的转换工具，对于高级语言到高级语言的转换工具，被叫做转换编译器，简称转译器 (Transpiler)

babel 就是一个 Javascript Transpiler。

### babel 的编译流程

babel 是 source to source 的转换, 整体编译流程分为三步:

1. parse: 通过 parser 把源码转成抽象语法树(AST)
2. transform: 遍历 AST, 调用各种 transform 插件对 AST 进行增删改
3. generate: 把转换后的 AST 打印成目标代码, 并生成 sourcemap

为了让计算机理解代码需要先对源码字符串进行 parse，生成 AST，把对代码的修改转为对 AST 的增删改，转换完 AST 之后再打印成目标代码字符串

**parse**

parse 阶段的目的是把源码字符串转换成机器能够理解的 AST, 这个过程分为词法分析, 语法分析.

比如: `let name = 'guang'` 这样一段源码, 我们先把它分成一个个不能细分的单词(token), 也就是 let, name, =, 'guang', 这个过程就是词法分析, 按照单词的构成规则来拆分字符串成单词.
之后要把 token 进行递归的组装, 生成 AST, 这个过程是语法分析, 按照不同的语法结构, 来吧一组单词组合成对象, 比如声明语句, 赋值表达式等都有对应的 AST 节点

**transform**

transform 阶段是对 parse 生成的 AST 的处理, 会进行 AST 的遍历, 遍历的过程中处理到不同的 AST 节点会调用注册的响应的 `visitor` 函数, visitor 函数里可以对 AST 节点进行怎删改, 返回新的 AST

**generate**

generate 阶段会把 AST 打印成目标代码字符串，并且会生成 sourcemap, 不同的 AST 对应的不同结构的字符串, 比如 IfStatement 就可以打印成 if(test) {} 格式的代码

### 总结

了解了编译和转译的区别，明确了 babel 是一个 js transpiler。然后学习了 babel 编译流程的三个步骤 parse、transform、generate

---

# Babel 的 AST

babel 编译的第一步是把源码 parse 成抽象语法树 AST （Abstract Syntax Tree）, 后续对这个 AST 进行转换

### 常见的 AST 节点

AST 是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST。我们分别来了解一下：

- Literal 字面量的意思

```js
let name = 'guang'

'guang' => '字符串字面量' => StringLiteral
NumberLiterial
BooleanLiterial
RegExpLiterial

xxxLiterial
```

- Identifier 标识符的意思 => 变量名、属性名、参数名等各种声明和引用的名字，都是 Identifer

```js
const name = "guang"; // name 是

function say(name) {
  // say name
  console.log(name); // console log name
}

const obj = {
  // obj name
  name: "guang",
};
```

- Statement 语句 是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等

```js
break; // BreakStatement
continue; // COntinueStatement
return; // ReturnStatement
debugger;
throw Error();
{}
try {} catch(e) {} finally{}
for (let key in obj) {}
for (let i = 0;i < 10;i ++) {}
while (true) {}
do {} while (true)
switch (v){case 1: break;default:;}
label: console.log();
with (a){}

```

- Declaration 声明语句是一种特殊的语句, 它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等

```js
const a = 1; // VariableDeclaration
function b() {} // FunctionDeclaration
class C {} // ClassDeclaration

import d from "e"; // ImportDeclaration

export default e = 1;
export { e };
export * from "e";
```

- Expression 表达式, 特点是执行完以后有返回值，这是和语句 (statement) 的区别

```js
[1,2,3] // ArrayExpression
a = 1 // AssignmentExpression 赋值表达式
1 + 2;
-1;
function(){};
() => {};
class{};
a;
this;
super; // Super
a::b; // 绑定表达式
```

因为 identifier、super 有返回值，符合表达式的特点，所以也是 expression

- Class 语法也有专门的 AST 节点来表示
  - 整个 class 的内容是 ClassBody, 属性是 ClassProperty
- Modules
  - es module 是语法级别的模块规范，所以也有专门的 AST 节点
- import

  ```js
  // named import
  import { a, b } from "c";

  // default import
  import a from "a";

  // namespaced import
  import * as b from "b";
  ```

- export

  ```js
  // named export
  export { a, b };
  // default export
  export default a;
  // all export
  export * from "c";
  ```

- Program & Directive

program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的集合。还有 directives 属性，存放 Directive 节点，比如"use strict" 这种指令会使用 Directive 节点表示。

- File & Comment

babel 的 AST 最外层节点是 File，它有 program、comments、tokens 等属性，分别存放 Program 程序体、注释、token 等，是最外层节点。

### AST 可视化工具
