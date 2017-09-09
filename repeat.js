//方法一:
function repeat(str, num) {
  if(num > 0){
    var str1 = str.split(" ")
    var str2 = []
    for(var i = 0;i< num;i++){
     str2[i] = str1
     console.log(str2)
    }
  }else{
    return ""
  }
  return str2.join("")
}

console.log(repeat("abc", 4))
console.log(repeat("*", 4))
console.log(repeat("abc", -4))
