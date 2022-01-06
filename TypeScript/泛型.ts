// ! 不适用泛型, 使用具体的类型
{
  function dump(val: string): string {
    return val
  }
  function dumpboolean(val: boolean): boolean {
    return val
  }

  // 相同的事情, 却使用不同的函数
  dump("yym")
  dumpboolean(true)
}

// ! 使用泛型
{
  function dump<T>(val: T): T {
    return val
  }

  const a = dump<string>("123")
  const b = dump<boolean>(true)
}

{
  function getlength<T extends { length: number }>(val: T): number {
    return val.length
  }

  getlength("21122")
  getlength(["1", "2", "3"])

  function getlength1<T>(val: T[]): number {
    return val.length
  }
}
