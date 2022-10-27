type Factory<T> = T | number | string;

function Factory(typeArg) {
  return [typeArg, "number", "string"];
}

type Stringify<T> = {
  [K in keyof T]: string;
};

type Close<T> = {
  [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

interface IFoo {
  prop1: string;
  prop2: number;
  props3: boolean;
}

type PirtialIFoo = MyPartial<IFoo>;

type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<"yym">; // 2

{
  type Factory<T = boolean> = T | number | string;
  const foo: Factory = false;

  function Factory1(typeArg = boolean) {
    return [typeArg, "number", "string"];
  }

  function add(source: number, add: number) {
    if (typeof source !== "number" || typeof add !== "number") {
      throw new Error("Invalid arguments");
    }

    return source + add;
  }

  type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
    ? "success"
    : "failure";

  type Res1 = ResStatus<10000>; // 'success'
  type Res2 = ResStatus<20000>; // 'success'
  type Res3 = ResStatus<"10000">; // 类型“string”不满足约束“number

  type ResStatus1<ResCode extends number = 10000> = ResCode extends
    | 10000
    | 10001
    | 10002
    ? "success"
    : "failure";

  type Res4 = ResStatus1;
}

type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

type Result1 = Conditional<"yym", string, "passed", "rejected">;
type Result2 = Conditional<"yym", boolean, "passed", "rejected">;

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

// ---------

interface IRes1<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

function fetchUserProfile(): Promise<IRes1<IUserProfileRes>> {}

// ------

function handle(input: any): any {}
function handle(input: string | number | {}): string | number | {} {}

function handle1<T>(input: T): T {}
const author = "yym";
let authorAge = 18;

handle1(author);
handle1(authorAge);

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

const swap1 = swap(["yym", 59]);
const swap2 = swap([null, 59]);
const swap3 = swap([{ name: "yym" }, {}]);

const object = { a: 1, b: 2, c: 3 };
_.pick(object, ["a", "c"]);


pick<T extends object, U extends keyof T>(object: Text, ...props: Array<U>): Pick<T, U>

function handle2<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload])
  })
}