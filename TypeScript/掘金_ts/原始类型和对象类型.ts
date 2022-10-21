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
