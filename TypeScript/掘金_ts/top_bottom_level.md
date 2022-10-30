> 类型层级指的是: **TS 中的所有类型的兼容关系, 从最上面的一层 any类型, 到最底层的never 类型**

### 判断类型兼容性的方式

```ts
// 返回1, 'yym' 是 string 子类型
type Result = 'yym' extends string ? 1 : 2

// 通过赋值来进行兼容性检查的方式
declare let source: string
declare let anyType: any
declare let neverType: never

anyType = source
neverType = source // 不能将类型“string”分配给类型“never”。
```

对于 变量a = 变量b, 成立 => `<变量b的类型> extends <变量a 的类型>`, 即 **b类型是a类型的子类型**, 在这里 `string extends never` 不成立
