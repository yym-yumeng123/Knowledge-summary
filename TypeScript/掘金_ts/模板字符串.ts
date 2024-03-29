type World = "World"

type Greeting = `Hello ${World}`

type Greet<T extends string | number | boolean | null | undefined | bigint> =
  `Hello ${T}`

type Greet1 = Greet<"linbudu"> // "Hello linbudu"
type Greet2 = Greet<599> // "Hello 599"
type Greet3 = Greet<true> // "Hello true"
type Greet4 = Greet<null> // "Hello null"
type Greet5 = Greet<undefined> // "Hello undefined"
type Greet6 = Greet<0x1fffffffffffff> // "Hello 9007199254740991"

type Version = `${number}.${number}.${number}`

type SKU =
  | "iphone-16G-official"
  | "xiaomi-16G-official"
  | "honor-16G-official"
  | "iphone-16G-second-hand"
  | "xiaomi-16G-second-hand"
  | "honor-16G-second-hand"
  | "iphone-64G-official"
  | "xiaomi-64G-official"
  | "honor-64G-official"
  | "iphone-64G-second-hand"
  | "xiaomi-64G-second-hand"
  | "honor-64G-second-hand"

type SizeRecord<Size extends string> = `${Size}-Record`
type Size = "Small" | "Middle" | "Large"

// "Small-Record" | "Middle-Record" | "Huge-Record"
type UnionSizeRecord = SizeRecord<Size>

interface Foo {
  name: string
  age: number
  job: "job"
}

type ChangeListener = {
  on: (change: `${keyof Foo}Changed`) => void
}

declare let listener: ChangeListener

listener.on("jobChanged")

type Copy<T extends object> = {
  [K in keyof T]: T[K]
}

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${string & K}`]: T[K]
}

type CopyFoo = CopyWithRename<Foo>

type Heavy<T extends string> = `${Uppercase<T>}`
type Respect<T extends string> = `${Capitalize<T>}`

type HeavyName = Heavy<"linbudu"> // "LINBUDU"
type RespectName = Respect<"linbudu"> // "Linbudu"

type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str

type ReversedTomHardy = ReverseName<"Tom hardy"> // "Hardy Tom"
type ReversedLinbudu = ReverseName<"Budu Lin"> // "Lin Budu"


declare function handler<Str extends string>(arg: `Guess who is ${Str}`) : Str 
handler(`Guess who is Linbudu`); // "Linbudu"
handler(`Guess who is `); // ""
handler(`Guess who is  `); // " "

handler(`Guess who was`); // Error
handler(``); // Error
