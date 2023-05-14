var fruits = [
  { id: 1, name: "banana", color: "yellow" },
  { id: 2, name: "apple", color: "red" },
  { id: 3, name: "orange", color: "orange" },
];
var UserInput = prompt("Enter fruit to search");

for (var i = 0; i < fruits.length; i++) {
  if (fruits[i].name === UserInput) {
    console.log(fruits[i]);
  } else if (i == fruits.length - 1) {
    console.log("no such data");
  }
}
