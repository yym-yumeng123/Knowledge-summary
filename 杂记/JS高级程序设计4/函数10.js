let ints = [1, 2, 3]

ints.map(function (i) {
  return i + 1
})

ints.map((i) => i + 1)

function foo() {}
console.log("foo.bind(null)", foo.bind(null).name)

let dog = {
  get age() {
    return this.year
  },
  set age(newAge) {
    this.year = newAge
  },
}

let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, "age")
console.log(propertyDescriptor.get.name) // get age
console.log(propertyDescriptor.set.name) // set age

function doAdd(num1, num2) {
  if (arguments.length === 1) {
    console.log(num1 + 10)
  } else if (arguments.length === 2) {
    console.log(arguments[0] + num2)
  }
}
