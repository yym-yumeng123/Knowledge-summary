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
