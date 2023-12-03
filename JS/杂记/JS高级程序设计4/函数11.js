function double(value) {
  setTimeout(() => setTimeout(console.log, 0, value * 2), 1000)
}
double(3)

let p1 = new Promise((reslove, reject) => reslove())
setTimeout(console.log, 0, p1)

let p2 = new Promise((reslove, reject) => reject())
setTimeout(console.log, 0, p2) // Promise <rejected


