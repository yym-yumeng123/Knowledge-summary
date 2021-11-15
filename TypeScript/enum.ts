/**
 * 枚举
 */
enum sexType {
  BOY,
  GIRL
}

console.log(sexType.BOY); // 0
console.log(sexType.GIRL); // 1

enum sexType1 {
  BOY = 5,
  GIRL
}

console.log(sexType1.BOY); // 5
console.log(sexType1.GIRL); // 6