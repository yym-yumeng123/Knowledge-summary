(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "axios"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("axios"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios);
    global.AnimalApi = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _axios) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _axios = _interopRequireDefault(_axios);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  const getCat = () => {
    return _axios.default.get("https://aws.random.cat/meow").then(response => {
      const imageSrc = response.data.file;
      const text = "CAT";
      return {
        imageSrc,
        text
      };
    });
  };
  const getDog = () => {
    return _axios.default.get("https://random.dog/woof.json").then(response => {
      const imageSrc = response.data.url;
      const text = "DOG";
      return {
        imageSrc,
        text
      };
    });
  };
  const getGoat = () => {
    const imageSrc = "http://placegoat.com/200";
    const text = "GOAT";
    return Promise.resolve({
      imageSrc,
      text
    });
  };

  // ESM 方式对外提供接口
  var _default = {
    getCat,
    getDog,
    getGoat
  };
  _exports.default = _default;
});