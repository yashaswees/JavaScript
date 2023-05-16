function myFunction(n) {
  for (let i = n; i >= 1; i--) {
    let row = "*";
    for (let j = 2; j <= i; j++) {
      row = row + "*";
    }
    console.log(row);
  }
}
myFunction(5);
