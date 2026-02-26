;(function () {
  let data = "moduleB"
  function method() {
    console.log(data + "execute")
  }
  window.moduleB = {
    method: method,
  }
})()


