# Protocol Buffers

### 什么是 Protocol Buffer

> [官网](https://developers.google.com/protocol-buffers/docs/overview)  Protocol buffers provide a language-neutral, platform-neutral, extensible mechanism for serializing structured data in a forward-compatible and backward-compatible way. It’s like JSON, except it's smaller and faster, and it generates native language bindings 

`Protocol Buffer (以下简称Protobuf)` 是 Google 出品的一种语言无关、平台无关、可扩展的序列化结构数据的方法，类似于 JSON, 只是它更小, 更快

`json\xml`都是基于文本格式，`protobuf`是二进制格式。

可以通过 `ProtoBuf` 定义数据结构，然后通过 `ProtoBuf` 工具生成各种语言版本的数据结构类库，用于操作 `ProtoBuf` 协议数据

**protobuf 是可序列化的, 什么是可序列化?**

```js
// 对比 js 中的序列化
const a = {name: 'yym', age: 18, sex: '男'}

// 序列化后可以存储在 LocalStorage 中, 使用的时候反序列化
JSON.stringify(a) // '{"name":"yym","age":18,"sex":"男"}'
JSON.parse(JSON.stringify(a)) // {name: 'yym', age: 18, sex: '男'}
```
**protobuf是二进制格式**

上面`JSON`序列化后是文本格式, 和 `JS Object` 差不多, 对我们很友好, 但是对机器很不友好, 文本格式解析起来比二进制更加麻烦; 简单来说，就是二进制协议在进行网络传输时，传输的并不是类似JSON这样的文本文件，而是类似BSON这样的二进制数据(1和0), 文本协议在进行网络传输时，传输的是类似`JSON，XML`这样的文本文件，而不是二进制文件（就是0和1）

两种协议各有利弊，没有银弹，只有适用场景

- 从学习成本: 文本协议肯定是优于二进制协议
- 效率: 二进制协议肯定是优于文本协议的
- 可读性: 文本协议肯定是由于二进制协议, 带来学习成本
- 安全性: 二进制协议有天生的优势（全是0和1）

**如何创建?**

对比使用`JSON`, 我们是创建一个 `.json` 文件, 如果我们使用 `ProtoBuf`, 需要创建 `.proto` 文件, 简单了解一下 `protobuf` 规则

```json
{
  "name": "yym",
  "age": 12,
  "sex": "男"
}
```

```proto
syntax = "proto3"
package ceres.enterprise;

message SearchRequest {
  // 包含三个字段: [type 类型] [fieldName 字段名] [fieldNumber 字段序号] 
  repeated string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```
对于上面的 proto, 解析每行的含义

- 指定 protobuf 版本, proto3 是最新语法, 默认版本 `proto2`
- `package :` 可选的, 防止不同的消息类型有命名冲突
- 消息类型 `message 关键字`, `SearchResponse` 类型名, `query page_number, result_per_page` 该类型的三个字段, 类型分别是 `string int32 []int32`
- 每个字段的修饰符默认是 `singular`, 一般省略不写, `repeated` 表示字段可重复, 用来表示 go 语言中的数组类型
- 每个字符 `=` 后面的数字称为标识符, 每个字段都需要提供唯一的标识符. 标识符用来在消息的二进制格式识别各个字段, 一旦使用不能改变, 取值范围 `[1, 2^29 - 1]`
- `.proto` 可以写注释, 和 `js` 注释一样 `// 或者 /* ... */`
- 一个 `.proto` 文件可以写多个消息类型

---

### 快速入门 ProtoBuf

> 对于上面我们简单了解了什么是 `ProtoBuf`, 这里我们具体的看一下实例, 学习这些是为了能够看懂它是如何工作的

**定义消息**

`message` 在 `protobuf` 中指的是定义的数据结构
```proto
syntax = "proto3";

// 关键字, 标记开始定义消息, 消息体, 定义各种字段类型
message 消息名 {
  消息体
}

// 示例
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

- `标识符`: 前面的例子中可以看到, 每个字段后面有一个唯一的数字, 就是标识符. 标识号是用来在消息的二进制格式中识别各个字段的，一旦开始使用就不能够再改变，每个消息内唯一即可，不同的消息定义可以拥有相同的标识号

**数据类型**

`protobuf` 类型和其他语言类型的映射表

**枚举类型**

当需要定义一个消息类型的时候，可能想为一个字段指定“预定义值序列”中的一个值，这时候可以通过枚举实现

```proto
syntax = "proto3";

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;

  // enum 关键字
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }
  Corpus corpus = 4; // 使用枚举 Corpus
}
```

**数组类型**

在`protobuf`消息中定义数组类型，是通过在字段前面增加`repeated`关键词实现，标记当前字段是一个数组

```proto
message SearchResponse {
  repeated Result results = 1;
}

message Result {
  string url = 1;
  string title = 2;
  // 表示数组类型
  repeated string snippets = 3;
}

message Msg {
  // 字符串数组
  repeated string names = 1;
}
```

**消息嵌套**

可以在一个消息中嵌套另外一个消息，字段类型可以是另外一个消息类型

```proto
message SearchResponse {
  // 嵌套消息定义
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  // 引用嵌套的消息定义
  repeated Result results = 1;
}


message Outer {
  message MiddleAA {
    message Inner {
      int64 ival = 1;
      bool  booly = 2;
    }
  }
  message MiddleBB {
    message Inner {
      int32 ival = 1;
      bool  booly = 2;
    }
  }
}
```

如果定义在其他文件中，可以导入其他消息类型来使用

```proto
// result.proto
syntax = "proto3";
// Result消息定义
message Result {
  string url = 1;
  string title = 2;
  repeated string snippets = 3;
}

// search_response.proto
syntax = "proto3";
// 导入Result消息定义
import "result.proto";

message SearchResponse {
  // 使用导入的Result消息
  repeated Result results = 1; 
}
```

**Map 类型**

```ts
// key_type可以是任何整数或字符串类型, 注意，枚举不是有效的key_type
// value_type 可以是除另一个映射之外的任何类型
map<key_type, value_type> map_field = N;
```

```proto
syntax = "proto3";
message Product {
  string name = 1;
  // 定义一个k/v类型，key是string类型，value也是string类型
  map<string, string> attrs = 2; // Map 字段不能使用repeated关键字修饰
}
```

**定义服务**

消息类型是用来远程通信的(Remote Procedure Call, RPC)，可以在 `.proto` 文件中定义 `RPC` 服务接口

```proto
service SearchService {
  rpc Search(SearchRequest) returns (SearchResponse);
}
```