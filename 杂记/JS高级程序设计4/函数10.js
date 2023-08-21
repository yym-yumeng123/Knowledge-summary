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

function makeKing(name = "Henry") {
  return `king ${name} VILL`
}

let romanNumerals = ["I", "II", "III", "IV", "V", "VI"]
let ordinality = 0

let values = [1, 2, 3, 4]
function getSum() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

console.log(getSum.apply(null, values))

function factories(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factories(num - 1)
  }
}

function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}

const factorial = function f(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * f(num - 1)
  }
}

