function diff(arr1, arr2) {
  var newArr = []
  //循环遍历arr1
  arr1.map(function(item){
    //判断arr2中有没有arr1的元素,没有执行
    if(arr2.indexOf(item) === -1){
      newArr.push(item)
    }else{
      //删除一个
      arr2.splice(arr2.indexOf(item),1)
    }
  })
  return newArr.concat(arr2)

}
console.log(diff([1, 2, 3, 5], [1, 2, 3, 4, 5,6.7]))
