/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-28 11:32:47
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 17:23:12
 * @FilePath: /Knowledge-summary/设计模式/AOP.js
 * @Description: AOP
 */
const AOP = {};
AOP.before = function (fn, beforeFn) {
  // 返回一个新的函数
  return function () {
    // 先调用 before 函数
    beforeFn.apply(this, arguments);
    fn.apply(this, arguments);
  };
};

AOP.after = function (fn, afterFn) {
  return function () {
    fn.apply(this, arguments);
    afterFn.apply(this, arguments);
  };
};

// fn
const submit = () => {
  console.log("提交数据");
  return false;
};

// before
const check = () => {
  console.log("先进行校验");
};

// AOP.before 返回一个新的函数
submit = AOP.before(submit, check);

console.log("submit", AOP.before(submit, check));
