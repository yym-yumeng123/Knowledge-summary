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

let payload = JSON.stringify({ foo: "bar" })
let jsonHeaders = new Headers({ "Content-Type": "application/json" })

fetch("/bar", {
  method: "POST",
  headers: jsonHeaders,
  body: payload,
})

let payload1 = "foo=bar&baz=qux"
let paramHeaders = new Headers({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
})
fetch("/bar", {
  method: "POST",
  headers: paramHeaders,
  body: payload,
})

let imageFormData = new FormData()
let imageInput = document.querySelector("input[type=file]")
imageFormData.append("image", imageInput.files[0])
fetch("/bar", {
  method: "POST",
  body: imageFormData,
})

let imageFormData1 = new FormData()
let imageInput1 = document.querySelector("input[type='file'][multiple]")
for (let i = 0; i < imageInput.files.length; ++i) {
  imageFormData.append("image", imageInput.files[i])
}
fetch("/img-upload", {
  method: "POST",
  body: imageFormData,
})

const imageElement = document.querySelector("img")
fetch("my-image.png")
  .then((response) => response.blob())
  .then((blob) => {
    imageElement.src = URL.createObjectURL(blob)
  })

fetch("//cross-origin.com")
// TypeError: Failed to fetch
// No 'Access-Control-Allow-Origin' header is present on the requested resource.

fetch("//cross-origin.com", { method: "no-cors" }).then((response) =>
  console.log(response.type)
)
// opaque

let abortController = new AbortController()
fetch("wikipedia.zip", { signal: abortController.signal }).catch(() =>
  console.log("aborted!")
)
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10)
// 已经中断

let r = new Request("https://foo.com", { method: "POST", body: "foobar" })
r.text()
fetch(r)
// TypeError: Cannot construct a Request with a Request object that has already been used.

let r1 = new Request("https://foo.com", { method: "POST", body: "foobar" })
// 3 个都会成功
fetch(r.clone())
fetch(r.clone())
fetch(r)
