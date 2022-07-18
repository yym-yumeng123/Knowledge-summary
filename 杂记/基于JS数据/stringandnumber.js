const str1 = "string 1"
const str2 = "string 2"
const str3 = `string 3`

const target = "world"
const word = `hello ${target}`

// ` 可以用于创建一个 "多行字符串", 即字符串中可以包含换行符

const str = `
Hello
World
`

// 去除文本中的标点符号

const originalText = "Hey dude, how is it going?"
let wordOnlyText = ""

for (let i = 0; i < originalText.length; ++i) {
  const letter = originalText[i]
  const asciiCode = letter.charCodeAt()
  if (
    (asciiCode >= 65 && asciiCode <= 90) ||
    (asciiCode >= 97 && asciiCode <= 122)
  ) {
    wordOnlyText += letter
  }
}

console.log(wordOnlyText)

// 所有大写字母转换为小写字母
let lowerCaseText = ""
for (let i = 0; i < originalText.length; ++i) {
  const letter = originalText[i]
  const asciiCode = letter.charCodeAt()
  if (asciiCode >= 65 && asciiCode <= 90) {
    lowerCaseText += String.fromCharCode(asciiCode + 32)
  } else {
    lowerCaseText += letter
  }
}

const lowerCaseText1 = wordOnlyText.toLowerCase()

// 组装字符串
console.log(str1 + " " + str2 + " " + str3)
const name = 'William'
const level = 'Gold'
const message = `${name} is a ${level} level user`

// 正则表达式
const words = originalText.toLowerCase().match(/\w+/g)
console.log(words.length);

// 数字
const a = 3
const b = 2
a + b