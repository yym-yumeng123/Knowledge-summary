function slasher(arr, howMany) {
// it doesn't always pay to be first
  var newArr = []
  var len = arr.length
     
  if(len > howMany){
    newArr = arr.splice(howMany,len)
  }else{
    newArr = []
  }
  
  return newArr;
}

console.log(slasher([1, 2, 3], 0));
