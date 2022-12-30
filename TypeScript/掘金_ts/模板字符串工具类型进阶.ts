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

/**
 * @param str
 * @param 需要替换的
 * @param 替换为
 */
export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? `${Head}${Replacement}${Tail}`
  : Str

type ReplaceRes1 = Replace<"杨雨萌", "杨", "我是好人"> // "我是好人雨萌"
type ReplaceRes2 = Replace<"杨雨萌", "?", "??">

export type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
  : Str

// "mmm.linbudu.top"
type ReplaceAllRes1 = ReplaceAll<"www.linbudu.top", "w", "m">
// "www-linbudu-top"
type ReplaceAllRes2 = ReplaceAll<"www.linbudu.top", ".", "-">

export type Split<Str extends string> =
  Str extends `${infer Head}-${infer Body}-${infer Tail}`
    ? [Head, Body, Tail]
    : []
type SplitRes1 = Split<"lin-bu-du"> // ["lin", "bu", "du"]

export type Split1<
  Str extends string,
  Delimiter extends string
> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split1<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str]

type SplitRes11 = Split1<"linbudu,599,fe", ",">
type SplitRes13 = Split1<"linbudu", "">

export type Join<
  List extends Array<string | number>,
  Delimiter extends string
> = List extends []
  ? ""
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string

// "lin-bu-du"
type JoinRes3 = Join<["lin", "bu", "du"], "-">
