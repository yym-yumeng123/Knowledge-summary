function sumAll(arr) {
  //前后之和 * 多少对
  return (arr[0]+arr[1])*(Math.abs(arr[0]-arr[1])+1)/2
}
