

// @ts-ignore
const name: string = 599

// @ts-expect-error
const name1: string = 599

// @ts-expect-error
const age: number = 599;


declare var f1: () => void
declare interface Foo {
  prop: string
}
declare function foo(input: Foo): Foo
declare class Foo {}


declare var window: Window & typeof globalThis
interface Window {

}

// 类型声明
declare const errorReporter: (err: any) => void
// 实际使用
errorReporter('err')


export namespace RealCurrency {
  export class WeChatPaySDK {}

  export class ALiPaySDK {}

  export class MeiTuanPaySDK {}

  export class CreditCardPaySDK {}
}

export namespace VirtualCurrency {
  export class QQCoinPaySDK {}

  export class BitCoinPaySDK {}

  export class ETHPaySDK {}
}