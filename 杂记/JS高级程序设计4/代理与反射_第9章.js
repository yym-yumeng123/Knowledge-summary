const target = {
  id: "target",
  foo: 'bar'
}

const handler = {
  get() {
    return 'handler override'
  }
}

const proxy = new Proxy(target, handler)

console.log(target.id) 
console.log(proxy.id)

target.id = 'foo'

proxy.id = 'bar'
