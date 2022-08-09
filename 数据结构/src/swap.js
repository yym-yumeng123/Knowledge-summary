const swap = (array, a, b) => {
  // const temp = array[a]
  // array[a] = array[b]
  // array[b] = temp

  [array[a], array[b]] = [array[b], array[a]]; // ES6
};

module.exports = swap;
