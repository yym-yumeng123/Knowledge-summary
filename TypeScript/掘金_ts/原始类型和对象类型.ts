const str: string = "yym";
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { str, age, male };
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol("unique");

function func1(): void {}

function func2(): void {
  return;
}

function func3(): void {
  return undefined;
}

const voidVar1: void = undefined;
// const voidVar2: void = null;

const arr1: string[] = [];
const arr2: Array<string> = [];

const arr3: string[] = ["y1", "y2", "y3"];
console.log(arr3[599]);

const arr4: [string, string, string] = ["y1", "y2", "y3"];
console.log("arr4[599]", arr4[2]);

const arr5: [string, number, boolean] = ["linbudu", 599, true];
const arr6: [string, number?] = ["yym"];

// type: 类型别名
// typeof 类型查询
// | 联合类型
type TupleLength = typeof arr6.length;

const arr7: [name1: string, age1: number, male1?: boolean] = ["yym", 16, true];

interface IDesc {
  name: string;
  age: number;
  male: boolean;
}

const obj1: IDesc = {
  name: "yym",
  age: 12,
  male: true,
};

interface IDesc1 {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj2: IDesc = {
  name: "yym",
  age: 12,
  male: true,
};

obj2.male = false;
// obj2.func = () => {};

interface IDescription {
  readonly name: string;
  age: number;
}

const obj3: IDescription = {
  name: "linbudu",
  age: 599,
};

// 无法分配到 "name" ，因为它是只读属性
// obj3.name = "林不渡";

// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const t1: Object = undefined;
const t2: Object = null;
const t3: Object = void 0;

const tmp4: Object = "linbudu";
const tmp5: Object = 599;
const tmp6: Object = { name: "linbudu" };
const tmp7: Object = () => {};
const tmp8: Object = [];

const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = "linbudu";

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: "linbudu" }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X

const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = "linbudu"; // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: "linbudu" };
const tmp23: object = () => {};
const tmp24: object = [];

const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = "linbudu";
const tmp29: {} = 599;
const tmp30: {} = { name: "linbudu" };
const tmp31: {} = () => {};
const tmp32: {} = [];

tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
