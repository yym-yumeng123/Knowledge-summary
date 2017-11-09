function destroyer(arr) {
  var newArr = []
  // 将要销毁的值放入一个数组中，赋值给变量newArr
  for(var i = 0;i<arguments.length;i++){
    newArr.push(arguments[i])
    console.log(newArr)  //[[1, 2, 3, 1, 2, 3], 2, 3]
  }
  //两个数组去重,过滤出来的就是结果
  var arr2 = arr.filter(function(item){
    //indexOf 不包含的 === -1
    return newArr.indexOf(item) === -1
  })
  return arr2
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
