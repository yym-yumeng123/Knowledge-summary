function where(arr, num) {
  // 把数字添加到arr中
  arr.push(num)
  //排序
  var newArr = arr.sort(function(a,b){
    return a-b
  })
 
  return newArr.indexOf(num);
}
console.log(where([40, 60], 50));
