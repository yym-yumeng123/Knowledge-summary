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

// Response {
//  body: (...)
//  bodyUsed: false
//  headers: Headers {}
//  ok: true
//  redirected: false
//  status: 200
//  statusText: "OK"
//  type: "default"
//  url: ""
// }

fetch("https://foo.com")
  .then((response) => response.text())
  .then(console.log)
// <!doctype html><html lang="en">
// <head>
// <meta charset="utf-8">
// ...

fetch("https://foo.com/foo.json")
  .then((response) => response.json())
  .then(console.log)
// {"foo": "bar"}

fetch("https://foo.com")
  .then((response) => response.arrayBuffer())
  .then(console.log)
// ArrayBuffer(...) {}

fetch("https://foo.com/form-data")
  .then((response) => response.formData())
  .then((formData) => console.log(formData.get("foo")))
// bar

fetch("https://foo.com")
  .then((response) => response.blob())
  .then(console.log)
// Blob(...) {size:..., type: "..."}

fetch("https://foo.com").then((response) =>
  response.blob().then(() => response.blob())
)
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked
let request = new Request("https://foo.com", { method: "POST", body: "foobar" })
request.blob().then(() => request.blob())
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked

fetch("https://foo.com").then((response) => {
  response.blob() // 第一次调用给流加锁
  response.blob() // 第二次调用再次加锁会失败
})
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked
let request1 = new Request("https://foo.com", {
  method: "POST",
  body: "foobar",
})
request.blob() // 第一次调用给流加锁
request.blob() // 第二次调用再次加锁会失败
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked

fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    let reader = body.getReader()
    console.log(reader) // ReadableStreamDefaultReader {}
    reader.read().then(console.log)
  })
// { value: Uint8Array{}, done: false }

fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    let reader = body.getReader()
    function processNextChunk({ value, done }) {
      if (done) {
        return
      }
      console.log(value)
      return reader.read().then(processNextChunk)
    }
    return reader.read().then(processNextChunk)
  })
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }

fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    const reader = body.getReader()
    // 创建第二个流
    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { value, done } = await reader.read()
            if (done) {
              break
            }
            // 将主体流的块推到第二个流
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })
  })
  .then((secondaryStream) => new Response(secondaryStream))
  .then((response) => response.text())
  .then(console.log)
// <!doctype html><html lang="en"><head><meta charset="utf-8"> ...
