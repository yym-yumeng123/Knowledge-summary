let xhr = new XMLHttpRequest()
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText)
  } else {
    console.log(xhr.status)
  }
}

xhr.onprogress = function (event) {
  let divStatus = document.getElementById("status")
  if (event.lengthComputable) {
    divStatus.innerHTML =
      "Received " + event.position + " of " + event.totalSize + " bytes"
  }
}

xhr.open("get", "/api/users", true)
xhr.send(null)

