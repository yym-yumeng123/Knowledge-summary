//方法一:
function repeat(str, num) {
  //如果大于0
  if(num > 0){
    var str1 = str.split(" ")
    var str2 = []
    //for循环把str1添加到str2的每一个位置
    for(var i = 0;i< num;i++){
     str2[i] = str1
     console.log(str2)
    }
    //num<0,空字符串
  }else{
    return ""
  }
  return str2.join("")
}

console.log(repeat("abc", 4))
console.log(repeat("*", 4))
console.log(repeat("abc", -4))
