type FooFunc = () => string;
type BarFunc = () => "yym type";
type BazFunc = (input: string) => number;

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

type DogFactory = (args: Dog) => Dog;

function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}

function makeDogBark(dog: Dog) {
  dog.bark();
}

makeDogBark(new Corgi()); // 没问题
makeDogBark(new Animal()); // 不行
