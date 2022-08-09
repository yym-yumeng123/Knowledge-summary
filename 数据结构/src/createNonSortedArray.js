function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}

module.exports = createNonSortedArray;
