import _ from "lodash"
import Print from "./print"
import { cube } from "./math.js"

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!")
}

const component = () => {
  // const element = document.createElement("div")
  const element = document.createElement("pre")

  // element.innerHTML = _.join(["Hello", "webpack"], "")
  element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join(
    "\n\n"
  )

  // element.onclick = Print.bind(null, 'Hello webpack!');
  return element
}

document.body.appendChild(component())
