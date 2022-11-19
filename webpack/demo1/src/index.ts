import * as _ from "lodash"
const str: string = '32323'
function component() {
  const element = document.createElement("div")

  element.innerHTML = _.join(["Hello", "webpack"], " ")

  return element
}

document.body.appendChild(component())
