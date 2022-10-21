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

- [可视化工具](https://astexplorer.net/)

### AST 的公共属性

每种 AST 都有自己的属性, 但是他们也有一些公共属性

- `type` AST 节点的类型
- `start end loc`: start 和 end 代表该节点在源码中的开始和结束下标, loc 属性是一个对象, 有 line 和 column 属性分别记录开始和结束的行列号
- `leadingComments、innerComments、trailingComments`: 表示开始的注释、中间的注释、结尾的注释，每个 AST 节点中都可能存在注释
- extra: 记录一些额外的信息, 处理一些特殊情况

---

# Babel API

### babel 的 api 有哪些

babel 的编译流程分为三步：parse、transform、generate

- parse 阶段有 `@babel/parser`, 功能是把源码转成 AST
- transform 阶段有 `@babel/traverse`, 可以遍历 AST, 并调用 visitor 函数修改 AST, 修改 AST 自然设计到 AST 的判断, 创建, 修改等, 这时候就需要 `@babel/types`, 当批量创建 AST 的时候可以使用 `@babel/template` 来简化 AST 创建逻辑
- generate 阶段会把 AST 打印为目标代码字符串, 同时生成 sourcemap, 需要 `@babel/generate` 包
- 中途遇到错误想打印代码位置的时候，使用 @babel/code-frame 包
- babel 的整体功能通过 @babel/core 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset

主要学习的就是 **@babel/parser，@babel/traverse，@babel/generator，@babel/types，@babel/template** 这五个包的 api 的使用

### @babel/parser

babel parser 叫 babylon，是基于 acorn 实现的，扩展了很多语法，可以支持 es next（现在支持到 es2020）、jsx、flow、typescript 等语法的解析

babel parser 默认只能 parse js 代码，jsx、flow、typescript 这些非标准的语法的解析需要指定语法插件

提供了两个 api: parse 和 parseExpression, 都是把源码转成 AST, 不过 parse 返回的 AST 根节点是 File(整个 AST), parseExpression 机会的根节点是 Expression, 力度不同

```ts
function parse(input: string, options?: ParseOptions): File;
function parseExpression(input: string, options?: ParserOptions): Expression;
```

parse 的内容是什么?

- plugins: 指定 jsx, typescript, flow 等插件来解析对应的语法
- allowXxx: 指定一些语法是否允许, 比如函数外的 await, 没生命的 export 等
- sourceType: 指定是否支持解析模板语法, 有 module, script, unambiguous 3 个取值
  - module: 解析 esmodule 的语法
  - script: 不解析 es module 的语法
  - unambiguous: 根据内容是否有 import 和 export 来自动设置 module 还是 script

```js
const parse = require("@babel/parser");
const ast = parse.parse("代码", {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});
```

以什么方式 parse

- `strictMode` 是否是严格模式
- `startLine` 从源码的哪一行开始 parse
- `errorRecovery` 出错时是否记录错误并继续往下 parse
- `tokens` parse 的时候是否保留 token 信息
- `ranges` 是否在 ast 节点中添加 ranges 属性

### @babel/traverse

parse 出的 AST 由 @babel/traverse 来遍历和修改, babel traverse 包提供了 traverse 方法：

```js
// parent 指定要遍历的 AST节点, opts 指定 visitor 函数, babel 会在遍历 parent 对应的 AST 时调用相应的 visitor 函数
function traverse(parent, opts)
```

**遍历过程**

visitor 是指定对什么 AST 做什么处理的函数，babel 会在遍历到对应的 AST 时回调它们

```js
traverse(ast, {
  FunctionDeclaration: {
    enter(path, state) {} // 进入节点时调用
    exit(path, state) {} // 离开节点时调用
  }
})

// 如果只指定了一个函数，那就是 enter 阶段会调用的：
traverse(ast, {
  FunctionDeclaration(path, state) {} // 进入节点时调用
})


visit 一个节点的过程

1. 调用 enter
2. 遍历子节点
3, 调用 exit
```

同一个 visitor 函数可以用于多个 AST 节点的处理，方式是指定一系列 AST，用 | 连接

```js
// 进入 FunctionDeclaration 和 VariableDeclaration 节点时调用
traverse(ast, {
  "FunctionDeclaration|VariableDeclaration"(path, state) {},
});
```

1. path

AST 是棵树，遍历过程中肯定是有个路径的，path 就记录了这个路径
最重要的是 path 有很多属性和方法，比如记录父子、兄弟等关系的：

- path.node 指向当前的 AST 节点
- path.parent 指向负极 AST 节点
- path.getSibling、path.getNextSibling、path.getPrevSibling 获取兄弟节点
- path.find 从当前节点向上查找节点
- path.get、path.set 获取 / 设置属性的 path
- path.scope 获取当前节点的作用域信息
- path.isXxx 判断当前节点是不是 xx 类型
- path.assertXxx 判断当前节点是不是 xx 类型，不是则抛出异常
- path.insertBefore、path.insertAfter 插入节点
- path.replaceWith、path.replaceWithMultiple、replaceWithSourceString 替换节点
- path.remove 删除节点
- path.skip 跳过当前节点的子节点的遍历
- path.stop 结束后续遍历

2. state

state 则是遍历过程中在不同节点之间传递数据的机制，插件会通过 state 传递 options 和 file 信息，我们也可以通过 state 存储一些遍历过程中的共享数据

### @babel/types

遍历 AST 的过程中需要创建一些 AST 和判断 AST 的类型，这时候就需要 @babel/types 包

```js
// 要创建IfStatement就可以调用
t.ifStatement(test, consequent, alternate);

// 判断节点是否是 IfStatement 就可以调用 isIfStatement 或者 assertIfStatement
t.isIfStatement(node, opts);
t.assertIfStatement(node, opts);

// opts 可以指定一些属性是什么值，增加更多限制条件，做更精确的判断
t.isIdentifier(node, { name: "paths" });
```

### @babel/template

通过 @babel/types 创建 AST 还是比较麻烦的，要一个个的创建然后组装，如果 AST 节点比较多的话需要写很多代码，这时候就可以使用 @babel/template 包来批量创建。

```js
const ast = template(code, [opts])(args);
// template.ast 返回的是整个 AST。
const ast = template.ast(code, [opts]);
// template.program 返回的是 Program 根节点。
const ast = template.program(code, [opts]);
```

### @babel/generator

AST 转换完之后就要打印成目标代码字符串，通过 @babel/generator 包的 generate api

```js
// 第一个参数是要打印的 AST
// 第二个参数是 options，指定打印的一些细节，比如通过 comments 指定是否包含注释，通过 minified 指定是否包含空白字符。
// 第三个参数当多个文件合并打印的时候需要用到
function (ast: Object, opts: Object, code: string): {code, map}


import generate from "@babel/generator";

const { code, map } = generate(ast, { sourceMaps: true })
```

### @babel/code-frame

babel 的报错一半都会直接打印错误位置的代码，而且还能高亮，

```js
// options 可以设置 highlighted （是否高亮）、message（展示啥错误信息）。
const result = codeFrameColumns(rawLines, location, {
  /* options */
});
```

### @babel/core

babel 基于这些包来实现编译、插件、预设等功能的包就是 @babel/core。

```js
// 这三个 transformXxx 的 api 分别是从源代码、源代码文件、源代码 AST 开始处理，最终生成目标代码和 sourcemap。

// options 主要配置 plugins 和 presets，指定具体要做什么转换
transformSync(code, options); // => { code, map, ast }

transformFileSync(filename, options); // => { code, map, ast }

transformFromAstSync(parsedAst, sourceCode, options); // => { code, map, ast }

// api 也同样提供了异步的版本，异步地进行编译，返回一个 promise

transformAsync("code();", options).then((result) => {});
transformFileAsync("filename.js", options).then((result) => {});
transformFromAstAsync(parsedAst, sourceCode, options).then((result) => {});
```

- `@babel/parser` 对源码进行 parse，可以通过 plugins、sourceType 等来指定 parse 语法
- `@babel/traverse` 通过 visitor 函数对遍历到的 ast 进行处理，分为 enter 和 exit 两个阶段，具体操作 AST 使用 path 的 api，还可以通过 state 来在遍历过程中传递一些数据
- `@babel/types` 用于创建、判断 AST 节点，提供了 xxx、isXxx、assertXxx 的 api
- `@babel/template` 用于批量创建节点
- `@babel/code`-frame 可以创建友好的报错信息
- `@babel/generator` 打印 AST 成目标代码字符串，支持 comments、minified、sourceMaps 等选项。
- `@babel/core` 基于上面的包来完成 babel 的编译流程，可以从源码字符串、源码文件、AST 开始。

---

# 改造成 babel 插件

babel 支持 transform 插件, 大概这样

```js
module.exports = function (api, options) {
  return {
    visitor: {
      Identifier(path, state) {},
    },
  };
};
```

babel 插件的形式就是函数返回一个对象，对象有 visitor 属性

函数的第一个参数可以拿到 types、template 等常用包的 api，这样我们就不需要单独引入这些包了。

而且作为插件用的时候，并不需要自己调用 parse、traverse、generate，这些都是通用流程，babel 会做，我们只需要提供一个 visitor 函数，在这个函数内完成转换功能就行了

函数的第二个参数 state 中可以拿到插件的配置信息 options 等，比如 filename 就可以通过 state.filename 来取。

```js
const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

module.exports = function (types, template) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }

        const calleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;
          const newNode = template.expression(
            `console.log("filename: (${line}, ${column})")`
          )();
          newNode.isNew = true;

          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};
```
