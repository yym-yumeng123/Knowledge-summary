/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-21 16:53:20
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-21 17:11:42
 * @FilePath: /Knowledge-summary/设计模式/object.js
 * @Description: 面向对象
 */
function startAnimation() {
  console.log("开始");
}

function stopAnimation() {
  console.log("停止");
}

// ======> 面向对象

const Animation = function () {};

Animation.prototype.start = function () {
  console.log("开始");
};

Animation.prototype.stop = function () {
  console.log("结束");
};

const myAnim = new Animation();

myAnim.start();
myAnim.stop();

// ======> 变形简化

const A1 = function () {};
A1.prototype = {
  start: function () {
    console.log("开始A1");
  },
  stop: function () {
    console.log("停止A1");
  },
};

const a1 = new A1();
a1.start();
a1.stop();

// ========> 持续改进
Function.prototype.method = function (name, fn) {
  this.prototype[name] = fn;
};
const A2 = function () {};
A2.method("start", function () {
  console.log("开始A2");
});

A2.method("end", function () {
  console.log("停止A2");
});

const a2 = new A2();
a2.start();
a2.end();

// =======> 链式调用
Function.prototype.method = function (name, fn) {
  this.prototype[name] = fn;
  return this;
};
const A3 = function () {};
A3.method("start", function () {
  console.log("开始A3");
}).method("end", function () {
  console.log("停止A3");
});

const a3 = new A3();
a3.start();
a3.end();

// 立即执行函数
(function () {
  const foo = 1;
  const bar = 2;
  console.log(foo * bar);
})();

// 携带参数
(function (foo, bar) {
  console.log(foo * bar);
})(1, 3);

// 闭包, 访问函数内部的局部变量
let baz;
(function () {
  const foo = 1;
  const bar = 2;
  baz = function () {
    return foo * bar;
  };
})();

baz();
