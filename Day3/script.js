// class Employee{
//     constructor(name){
//         this.name=name;
//     }
//     getName(){
//         console.log(this.name)
//     }
// }

// let employee=new Employee('esha');
// employee.getName()


function Square() { }

Square.prototype.x = 10;
Square.prototype.y = 10;
Square.prototype.getArea=function()
{return this.x*this.y;}


console.log(Square);

var sq = new Square();

console.log(sq.x);
console.log(sq);
console.log(sq.getArea());