方法一:
function largestOfFour(arr) {
  var newArr = []
  for(var i = 0;i< arr.length;i++){
    //判断数组
    if(Array.isArray(arr[i])){
    //拿出最大的
     newArr.push(Math.max.apply(null,arr[i]))
    }
  }
 return newArr
}

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]))
