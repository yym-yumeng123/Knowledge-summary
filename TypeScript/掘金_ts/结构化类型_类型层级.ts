class Cat {
  eat() {}
  meow() {}
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog());

// ----

class Cat1 {
  eat() {}
}

class Dog1 {
  bark() {}
  eat() {}
}

function feedCat1(cat: Cat1) {}

feedCat1(new Dog1());

// ------

class Cat2 {
  eat(): boolean {
    return true;
  }
}

class Dog2 {
  eat(): number {
    return 599;
  }
}

function feedCat2(cat: Cat2) {}

// 报错！
feedCat2(new Dog2());

// type USD = number;
// type CNY = number;
// const CNYCount: CNY = 200;
// const USDnumber: USD = 200;

// function addCNY(source: CNY, input: CNY) {
//   return source + input;
// }

// addCNY(CNYCount, USDnumber);

declare class TagProtector<T extends string> {
  protected __tag__: T;
}

type Nominal<T, U extends string> = T & TagProtector<U>;

export type CNY = Nominal<number, "CNY">;

export type USD = Nominal<number, "USD">;

const CNYCount = 100 as CNY;

const USDCount = 100 as USD;

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY;
}

addCNY(CNYCount, CNYCount);
addCNY(CNYCount, USDCount);
