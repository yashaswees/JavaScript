var arr = [
  { id: 1, name: "John" },
  { id: 2, name: "Mary" },
  { id: 3, name: "Andrew" },
];
function sortBy(array, key) {
  return array.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}

var sorted = sortBy(arr, "name");
console.log(sorted);
//does not work when we have more array elements, why?
//when to use bubble sort?
