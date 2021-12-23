### 什么是 TypeScript
- JavaScript + Type => TypeScript
- TS 有强的类型检查

### TS 开发环境
- 安装 node 
```bash
# 全局安装
npm install typescript -g
yarn add typescript -g
```
- `tsc typescript complire` 编译 ts
```bash
tsc xx.ts 
# ==> xx.js

tsc xx.ts -w # 监听 ts 的变化
```

### tsconfig 配置文件
- `tsc --init` 创建 `tsconfig.json`

### 使用
- `枚举 enum`
- `元组 tuple :[string, ...]`
- `组合类型 |`
- `非空断言 !`
- `可选参数 ?`
- `as 断言`
- `any 任何类型`
- `unknown 不知道什么类型`
- `void` 不具体返回值, 返回 undefined
- `never 不会执行到最后` 可以使用在 throw new Error   
- `泛型 <T> ` 泛型 宽泛的类型, 一般用 <T> 表示
- `abstract: 抽象类` 抽象类是可以派生其他类的基类。它不能被直接实例化。与接口不同，一个抽象类可以包含它的成员的实现细节
   - 抽象类用abstract关键字修饰
   - 抽象类其实就是将通用性的东西抽离出来，变成一个抽象类
   - 抽象类可以定义属性、方法和抽象方法
   - 抽象类只能被继承，不能被实例化
   - 抽象类可以有构造器
- `interface 接口`
   - 接口不能被直接实例化
   - 接口不包括具体的实现
   - 接口不能有构造器