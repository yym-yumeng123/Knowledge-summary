//方法:
function confirmEnding(str, target){
  var str1 = str.split(" ").pop()
  var len = target.length
  if(str1.substr((str1.length-len))===target){
    return true
  }
  return false
 
}

console.log(confirmEnding("Bastian", "n"));
console.log(confirmEnding("He has to give me a new name", "name")
)
console.log(confirmEnding("He has to give me a new name", "me"))

//方法二:
function confirmEnding(str, target){ 
  if(str.endsWith(target)){
    return true
  }
 return false
}

