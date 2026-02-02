### 什么是可维护的代码

- 容易理解: 无须求助原始开发者，任何人一看代码就知道它是干什么的，以及它是怎么实现的.
- 符合尝试: 代码中的一切都显得顺理成章，无论操作有多么复杂
- 容易适配: 即使数据发生变化也不用完全重写。
- 容易扩展: 新功能可以很方便地添加，不需要修改已有的实现。
- 容易调试: 代码中没有逻辑错误，bug 容易定位。

### 编码规范

1. 可读性
   1. 缩进
   2. 注释
      1. 函数与方法: 有注释描述用途, 每个参数的含义, 函数的返回值
      2. 大型代码块: 多行代码但用于完成单一任务的
      3. 复杂的算法
      4. 使用黑科技
2. 变量和函数命名
   1. 变量名应该是名词: car person
   2. 函数名应该是动词: getPrice getUser
   3. 对变量和函数使用符合逻辑的名称, 不用担心长度
   4. 变量、函数和方法应该以小写字母开头, 使用驼峰大小写(camelCase)
   5. 类名应该以大写字母开头(PascalCase)
   6. 常量应该全部大写
   7. 名称尽量用描述性和直观的词汇
3. 变量类型透明化
   1. 表明变量类型 `let found = false // 布尔`
   2. 使用类型注释 `let found /* :Boolean*/ = false`

### 松散耦合

1. 解耦 HTML/JavaScript
2. 解耦 CSS/JavaScript
3. 解耦应用程序逻辑/事件处理程序
   1. 不要把 event 对象传给其他方法，而是只传递 event 对象中必要的数据
   2. 应用程序中每个可能的操作都应该无须事件处理程序就可以执行
   3. 事件处理程序应该处理事件，而把后续处理交给应用程序逻辑

### 编码惯例

1. 尊重对象所有权-不要修改不属于你的对象
   1. 不要给实例或原型添加属性
   2. 不要给实例或原型添加方法。
   3. 不要重定义已有的方法。
   4. 创建包含想要功能的新对象，通过它与别人的对象交互
   5. 创建新自定义类型继承本来想要修改的类型，可以给自定义类型添加新功能。
2. 不声明全局变量
   1. 全局对象可以扩展为命名空间的概念。命名空间涉及创建一个对象，然后通过这个对象来暴露能力
3. 不要比较 null
   1. 如果值应该是引用类型，则使用 instanceof 操作符检查其构造函数。
   2. 如果值应该是原始类型，则使用 typeof 检查其类型
   3. 如果希望值是有特定方法名的对象，则使用 typeof 操作符确保对象上存在给定名字的方法。
4. 使用常量
   1. 重复出现的值
   2. 用户界面字符串
   3. URL
   4. 任何可能变化的值

## 性能

### 作用域意识

1. 避免全局查找

```js
function updateUI() {
 let imgs = document.getElementsByTagName("img");
 for (let i = 0, len = imgs.length; i < len; i++) {
  imgs[i].title = '${document.title} image ${i}';
 }
 let msg = document.getElementById("msg");
 msg.innerHTML = "Updated";
}

function updateUI() {
// 在局部作用域中保存 document 对象的引用，能够明显提升这个函数的性能
 let doc = document;
 let imgs = doc.getElementsByTagName("img");
 for (let i = 0, len = imgs.length; i < len; i++) {
  imgs[i].title = '${doc.title} image ${i}';
 }
 let msg = doc.getElementById("msg");
 msg.innerHTML = "Update complete.";
}
```

2. 不使用 with 语句

### 选择正确的方法

1. 避免不必要的属性方法

```js
let query = window.location.href.substring(window.location.href.indexOf("?"));

// 保存在局部变量中。第一次仍然要用 O(n)的复杂度去访问这个属性，但后续每次访问就都是 O(1)
let url = window.location.href;
let query = url.substring(url.indexOf("?"));
```

2. 优化循环
   1. 简化终止条件
   2. 简化循环体
   3. 使用后测试循环

```js
for (let i = 0; i < len; i++) {
 // 循环体
}
```

3. 展开循环

   - 循环的次数是有限的，那么通常抛弃循环而直接多次调用函数会更快

4. 避免重复解释

```js
// 对代码求值：不要
eval("console.log('Hello world!')");
// 创建新函数：不要
let sayHi = new Function("console.log('Hello world!')");
// 设置超时函数：不要
setTimeout("console.log('Hello world!')", 500);
```

5. 原生方法很快
6. switch 语句比 if 语句更快
7. 位操作符比算术操作符更快

### 语句最少化

1. 多个变量生命

```js
// 有四条语句：浪费
let count = 5;
let color = "blue";
let values = [1,2,3];
let now = new Date();

// 一条语句更好
let count = 5, color = "blue", values = [1,2,3], now = new Date();
```

1. 插入迭代性值

```js
let name = values[i++];
```

3. 使用数组和对象字面量

```js
// 创建和初始化数组用了四条语句：浪费
let values = new Array();
values[0] = 123;
values[1] = 456;
values[2] = 789;
// 创建和初始化对象用了四条语句：浪费
let person = new Object();
person.name = "Nicholas";
person.age = 29;
person.sayName = function() {
 console.log(this.name);
};

// 一条语句创建并初始化数组
let values = [123, 456, 789];
// 一条语句创建并初始化对象
let person = {
 name: "Nicholas",
 age: 29,
 sayName() {
 console.log(this.name);
 }
};

```

### 优化 DOM 交互

1. 实时更新最小化
2. 使用 innerHTML
3. 使用事件委托

## 部署

### 构建流程

- 知识产权问题: 如果把满是注释的代码放到网上，其他人就很容易了解你在做什么，重用它，并可能发现安全漏洞
- 文件大小: 你写的代码可读性很好，容易维护，但性能不好。浏览器不会因为代码中多余的空格、缩进、冗余的函数和变量名而受益
- 代码组织：为保证可维护性而组织的代码不一定适合直接交付给浏览器。为此，需要为 JavaScript 文件建立构建流程


1. 文件结构
2. 任务运行器
3. 摇树优化: 摇树优化（tree shaking）是非常常见且极为有效的减少冗余代码的策略
4. 模块打包器

### 压缩

1. 代码压缩
2. Javascript 编译
   1.  删除未使用的代码；
   2.  将某些代码转换为更简洁的语法；
   3.  全局函数调用、常量和变量行内化。