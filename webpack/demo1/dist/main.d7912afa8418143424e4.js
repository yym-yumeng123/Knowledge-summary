"use strict";
(self["webpackChunkdemo1"] = self["webpackChunkdemo1"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ "./src/print.js");



const component = () => {
  const element = document.createElement("div")

  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default().join(["Hello", "webpack"], "")

  element.onclick = _print__WEBPACK_IMPORTED_MODULE_1__["default"].bind(null, 'Hello webpack!');
  return element
}

document.body.appendChild(component())


/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ print)
/* harmony export */ });
function print(text) {
  console.log(text);
};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kNzkxMmFmYTg0MTgxNDM0MjRlNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQXNCO0FBQ007QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0RBQU07QUFDNUI7QUFDQSxvQkFBb0IsbURBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1plO0FBQ2Y7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RlbW8xLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2RlbW8xLy4vc3JjL3ByaW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIlxyXG5pbXBvcnQgUHJpbnQgZnJvbSAnLi9wcmludCc7XHJcblxyXG5jb25zdCBjb21wb25lbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oW1wiSGVsbG9cIiwgXCJ3ZWJwYWNrXCJdLCBcIlwiKVxyXG5cclxuICBlbGVtZW50Lm9uY2xpY2sgPSBQcmludC5iaW5kKG51bGwsICdIZWxsbyB3ZWJwYWNrIScpO1xyXG4gIHJldHVybiBlbGVtZW50XHJcbn1cclxuXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpXHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50KHRleHQpIHtcclxuICBjb25zb2xlLmxvZyh0ZXh0KTtcclxufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=