//Control structure are


//If else
let a = 5
if(a == 5){
    console.log("true\n")
}
else{
    console.log("False\n")
}

//Switch Case
let grade = 'A'

switch(grade){
    case 'A': console.log("Your grade is A\n" )
    break;

    case 'B': console.log("Your grade is B" )
    break;

    default: console.log("Grade not submitted\n")
}

//Do while
var count = 0;
do {
    console.log("Count is ", count)
    count ++
}while(count < 3)
console.log('\n')

//While

var c = 0;
while(c<3){
    console.log("While example ", c)
    c++
}

console.log("\n")

//For loop
var forCount
for (forCount = 0; forCount < 3; forCount++ ){
    console.log("For count example ", forCount)
}
