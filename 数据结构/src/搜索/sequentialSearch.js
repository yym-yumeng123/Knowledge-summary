const DOES_NOT_EXIST = -1;

const defaultEquals = (p1, p2) => {
  return p1 === p2;
};

function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i;
    }
  }

  return DOES_NOT_EXIST;
}
