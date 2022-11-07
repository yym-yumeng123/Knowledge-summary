import { expectType } from "tsd";

type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;

type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepPartialStruct = DeepPartial<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;

expectType<DeepPartialStruct>({
  foo: "bar",
  nested: {},
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {},
  },
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {
      nestedBarFoo: undefined,
    },
  },
});

type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type NonNullable<T> = T extends null | undefined ? never : T;

type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};

type Nullable<T> = T | null;
type A1 = Nullable<string>;

export type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};

/**
 * @des 讲一个对象的部分属性标记为可选
 * T: 需要处理的对象类型
 * K: 需要标记为可选的属性, 必须为 T 内部的属性, 对象属性组成的字面量联合类型
 */
type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Partial<Pick<T, K>> & Omit<T, K>;

type MarkPropsAsOptionalStruct = MarkPropsAsOptional<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  "bar"
>;

type Flatten<T> = { [K in keyof T]: T[K] };

export type MarkPropsAsOptional1<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Partial<Pick<T, K>> & Omit<T, K>>;

type MarkPropsAsOptionalStruct1 = MarkPropsAsOptional1<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  "bar"
>;

/**
 * 1. 拆分对象结构
 * 2. 部分属性改变, 属性修饰操作
 * 3. 组合两个对象类型
 */
type MarkPropsAsRequired<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Required<Pick<T, K>>>;

type MarkPropsAsOptionalStruct2 = MarkPropsAsRequired<
  {
    foo?: string;
    bar?: number;
    baz?: boolean;
  },
  "bar"
>;

type MarkPropsAsReadonly<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>;

type FunctionStruct = (...args: any[]) => any;

type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FunctionStruct ? K : never;
}[keyof T];

type Tmp<T extends object> = {
  [K in keyof T]: T[K] extends FunctionStruct ? K : never;
};

type Res = Tmp<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;

type ResEqual = {
  foo: "foo";
  bar: "bar";
  baz: never;
};

type WhatWeWillGet = Res[keyof Res]; // 'foo' | 'bar'
type WhatWillWeGetEqual1 = Res["foo" | "bar" | "baz"];
type WhatWillWeGetEqual2 = Res["foo"] | Res["bar"] | Res["baz"];
type WhatWillWeGetEqual3 = "foo" | "bar" | never;

type ExpectedPropKeys<T extends object, valueType> = {
  [Key in keyof T]-?: T[Key] extends valueType ? Key : never;
}[keyof T];

type FunctionKeys1<T extends object> = ExpectedPropKeys<T, FunctionStruct>;

type AAA = FunctionKeys1<{
  foo: () => void;
  bar: () => number;
  baz: number;
}>;

type PickByValueType<T extends object, valueType> = Pick<
  T,
  ExpectedPropKeys<T, valueType>
>;

// {
//   foo: string;
// }
type PickResult1 = PickByValueType<{ foo: string; bar: number }, string>;

// {
//   foo: string;
//   bar: number;
// }
type PickResult2 = PickByValueType<
  { foo: string; bar: number; baz: boolean },
  string | number
>;

type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

type OmitRes1 = OmitByValueType<{ foo: string; bar: number }, string>;
type OmitRes2 = OmitByValueType<
  { foo: string; bar: number; baz: boolean },
  string | number
>;

// 结合
type Conditional<Value, Condition, Resloved, Rejectd> = Value extends Condition
  ? Resloved
  : Rejectd;

type ValueTypeFilter<T extends object, ValueType, Positive extends boolean> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

type PickByValueType1<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, true>
>;

type OmitByValueType1<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, false>
>;
