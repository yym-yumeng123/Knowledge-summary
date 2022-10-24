interface IRes {
  code: number;
  status: string;
  data: any;
}

interface Res {
  code: 10000 | 10001;
  status: "success" | "failure";
  data: any;
}

// 精确的类型推导
declare var res: Res; // 可以认为它其实就是快速生成一个符合指定类型，但没有实际值的变量，同时它也不存在于运行时中
if (res.status === "success") {
}

// 字面量类型
const str1: "yym" = "yym";
const num: 18 = 18;
const bool: true = true;

interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "y1" | "y2" | "y3";
}

interface Tmp1 {
  mixed: true | string | 599 | {} | (() => {});
}

interface Tmp2 {
  user: { vip: true; expires: string } | { vip: false; promotion: string };
}

declare var tmp: Tmp2;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}

type Code = 10000 | 10001 | 50000;
type Status = "success" | "failure";

interface Tmp3 {
  obj: {
    name: "yym";
    age: 18;
  };
}

const tmp1: Tmp3 = {
  obj: {
    name: "yym",
    age: 18,
  },
};

enum Items {
  Foo,
  Bar = 599,
  Baz,
}
Items.Foo; // 0
Items.Bar; // 599

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // 'Foo'
console.log(fooKey);

const returnNum = () => 100 + 300;

enum Items1 {
  Foo = returnNum(),
  Bar = 599,
  Baz,
}

const enum Items2 {
  Foo,
  Bar,
  Baz,
}

const fooValue1 = Items.Foo;
