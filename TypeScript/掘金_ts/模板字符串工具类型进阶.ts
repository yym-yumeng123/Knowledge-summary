//  Search 前后声明了两个 infer 插槽，但实际上并不消费 R1 与 R2，而只是判断字符串是否可以被划分为要搜索的部分 + 其他部分

type _Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false

type Include<Str extends string, Search extends string> = Str extends ""
  ? Search extends ""
    ? true
    : false
  : _Include<Str, Search>

type IncludeRes1 = Include<"linbudu", "lin">
type IncludeRes2 = Include<"linbudu", "_lin">
type IncludeRes3 = Include<"linbudu", "">
type IncludeRes4 = Include<" ", ""> // true
type IncludeRes5 = Include<"", ""> // false

type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V
type Trim<V extends string> = TrimLeft<TrimRight<V>>

type _StartWith<
  Str extends string,
  Search extends string
> = Str extends `${Search}${infer _R}` ? true : false

type StartsWith<Str extends string, Search extends string> = Str extends ""
  ? Search extends ""
    ? true
    : _StartWith<Str, Search>
  : _StartWith<Str, Search>

type StartsWithRes1 = StartsWith<"linbudu", "lin"> // true
type StartsWithRes2 = StartsWith<"linbudu", ""> // true
type StartsWithRes3 = StartsWith<"linbudu", " "> // false
type StartsWithRes4 = StartsWith<"", ""> // true
type StartsWithRes5 = StartsWith<" ", ""> // true
