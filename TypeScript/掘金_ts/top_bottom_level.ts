type Result = "yym" extends string ? 1 : 2;

declare let source: string;
declare let anyType: any;
declare let neverType: never;

anyType = source;
neverType = source;

type Result11 = "yym" extends string ? 1 : 2;
type Result22 = 1 extends number ? 1 : 2;
type Result33 = true extends boolean ? 1 : 2;
type Result44 = { name: string } extends object ? 1 : 2;
type Result55 = { name: "yym" } extends object ? 1 : 2;
type Result66 = [] extends object ? 1 : 2;

type Result77 = 1 extends 1 | 2 | 3 ? 1 : 2;
type Result88 = "yym" extends "yym" | "y1" | "y2" ? 1 : 2;
type Result99 = true extends true | false ? 1 : 2;
type Result100 = string extends string | false | number ? 1 : 2;
type Result101 = "lib" | "bu" | "bubu" extends string ? 1 : 2;
type Result102 = {} | (() => void) | [] extends object ? 1 : 2;

type Reuslt103 = "yym" extends "yym" | "18"
  ? "yym" | "18" extends string
    ? 2
    : 1
  : 0;

type Result104 = string extends String ? 1 : 2;
type Result105 = String extends {} ? 1 : 2;
type Result106 = {} extends object ? 1 : 2;
type Result107 = object extends Object ? 1 : 2;

// interface String {
//   replace: //...,
//   endsWith: //...clg
// }

type Tmp100 = string extends object ? 1 : 2;
type Result108 = Object extends any ? 1 : 2; //1
type Result109 = Object extends unknown ? 1 : 2;
type Result110 = any extends Object ? 1 : 2;
type Result111 = unknown extends Object ? 1 : 2;
type Result112 = any extends "yym" ? 1 : 2;
type Result113 = any extends unknown ? 1 : 2;
type Result114 = unknown extends any ? 1 : 2;

type Result115 = never extends "yym" ? 1 : 2;

type TypeChain = never extends "yym"
  ? "yym" extends "yym" | "18"
    ? "yym" | "18" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;

type Result116 = [number, number] extends number[] ? 1 : 2; // 1
type Result117 = [number, string] extends number[] ? 1 : 2; // 2
type Result118 = [number, string] extends (number | string)[] ? 1 : 2; // 1
