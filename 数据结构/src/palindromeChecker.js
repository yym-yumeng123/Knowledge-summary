const Deque = require("./Deque");

const palindromeChecker = (aString) => {
  // 检查传入的字符串参数是否合法
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }

  const deque = new Deque();
  const lowerString = aString.toLocaleLowerCase().split(" ").join(""); // 对字符串进行处理
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerString.length; i++) {
    // 对字符串中的所有字符执行 enqueue 操作
    deque.addBack(lowerString.charAt(i));
  }

  // 如果所有元素都在双端队列中（如果只有一个字符的话，那它肯定是回文）并且首尾字符相同的话
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront(); // 从前端移除一个元素
    lastChar = deque.removeBack(); // 再从后端移除一个元素
    // 要使字符串为回文，移除的两个字符必须相同。如果字符不同的话，这个字符串就不是一个回文
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }

  return isEqual;
};

console.log("a", palindromeChecker("a"));
console.log("aa", palindromeChecker("aa"));
console.log("kayak", palindromeChecker("kayak"));
console.log("level", palindromeChecker("level"));
console.log(
  "Was it a car or a cat I saw",
  palindromeChecker("Was it a car or a cat I saw")
);
console.log("Step on no pets", palindromeChecker("Step on no pets"));
