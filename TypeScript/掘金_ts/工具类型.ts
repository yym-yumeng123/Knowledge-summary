type MyPartial1<T> = {
  [P in keyof T]?: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Foo {
  optional: string | undefined;
  required: string;
}

const foo100: Foo = {
  required: "1",
};

interface Foo1 {
  optional: never;
  required: string;
}

const foo101: Foo1 = {
  optional: "",
  required: "1",
};

// --------

interface EmployeeType {
  id: number;
  fullname: string;
  role: string;
}

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// 键名均为字符串, 键值类型未知
type Record1 = MyRecord<string, unknown>;
// 键名均为字符串, 键值类型任意
type Record2 = MyRecord<string, any>;
// 键名为字符串或数字, 键值类型任意
type Record3 = MyRecord<string | number, any>;

type Record4 = MyRecord<number, EmployeeType>;

let employees: Record4 = {
  0: { id: 1, fullname: "John Doe", role: "Designer" },
  1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
  2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
};

type aniType = "dog" | "cat" | "pet";
type obj1 = {
  a: string;
};

type Record5 = MyRecord<aniType, obj1>;

const aa: Record5 = {
  dog: {
    a: "2",
  },
};

type petsGroup = "dog" | "cat" | "fish";
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petsGroup | "otherAnamial", IPetInfo>;

const animalsInfo: IPets = {
  dog: {
    name: "dogName",
    age: 2,
  },
  cat: {
    name: "catName",
    age: 3,
  },
  fish: {
    name: "fishName",
    age: 5,
  },
  otherAnamial: {
    name: "otherAnamialName",
    age: 10,
  },
};

type Dictionary<T> = {
  [index: string]: T;
};

type A1 = Dictionary<string>;

const a11: A1 = {
  "21": undefined,
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Pick 是保留这些传入的键
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface Foo102 {
  name: string;
  age: number;
  job: string;
}

// type PickFoo102 = {
//   name: string;
//   age: number;
// }
type PickFoo102 = MyPick<Foo102, "name" | "age">;

type Tmp101 = Exclude<1, 2>; // 1
type Tmp102 = Exclude<1 | 2, 2>; // 1
type Tmp103 = Exclude<1 | 2 | 3, 2 | 3>; // 1
type Tmp104 = Exclude<1 | 2 | 3, 2 | 4>; // 1 | 3
