/*
Datatypes are basically types of data that can be used and manipulated in a program. 
A variable in JavaScript can contain any data. 
This means that a variable at one time can be a number and at another be a string.
*/

/*
The latest ECMAScript standard defines eight data types 
Out of which seven data types are Primitive(predefined) and one complex or Non-Primitive.
*/


//Primitive data types
//Number
let num = 2; // integer 
let num2 = 1.3; // floating point number
let num3 = Infinity; // Infinity
let num4 = 'something here too'/2; // NaN

console.log("The Numbers are ", num," ", num2," ", num3," ", num4)


//String
let str = "String example => Hello world"
console.log(str)

let name = "Elon Musk"
console.log(`String Example 2, Name is ${name}`)

//Boolean
let isTrue = true; // yes
let isFalse = false; // no

console.log("Boolean example ", isTrue, " ", isFalse)

//Null
let x = null;
console.log("Null example ", x)


//BigInt
var bigBin = BigInt("0b1010101001010101001111111111111111");
// 11430854655n
console.log("BigInt example", bigBin);


// /Non-Primitive Data Types

//Object
let person = new Object({
    name: 'Helen',
    age: 20
}); 
console.log(person)
// "object constructor" syntax
  // "object literal" syntax
