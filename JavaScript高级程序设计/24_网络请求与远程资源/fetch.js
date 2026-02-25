fetch("bar.txt").then((response) => {
  response.text().then((data) => {
    console.log(data)
  })
})

fetch("bar.txt")
  .then((response) => response.text())
  .then((data) => console.log(data))

fetch("/bar").then((response) => {
  console.log(response.status) // 200
  console.log(response.statusText) // OK
})
fetch("/throw-server-error").then((response) => {
  console.log(response.status) // 500
  console.log(response.statusText) // Internal Server Error
})

fetch("/bar").then((response) => {
  console.log(response.status) // 200
  console.log(response.ok) // true
})
fetch("/does-not-exist").then((response) => {
  console.log(response.status) // 404
  console.log(response.ok) // false
})
