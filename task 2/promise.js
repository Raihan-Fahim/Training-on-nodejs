//Promise example with multiple then

const mathExample = () => {
    return new Promise((resolve, reject) => {
       setTimeout(()=>{
         //Taking a random number
         var randNum = Math.floor(Math.random() * 10) + 1;
        //  var randNum = 1;
         console.log(randNum)
 
         if(randNum > 3) {
             resolve(randNum)
         }else{
             reject(new Error('Failed'))
         }
       }, 1000)
    })
}

mathExample()
.then((result) => {
    console.log("Main result is ", result)
    return result * 2
})
.then((doubleResult) => {
    console.log("Double result is ", doubleResult)
    return doubleResult + 3
})
.then((FinalResult) => {
    console.log("Final result is ", FinalResult)
})
.catch((error)=>{
    console.log("Failed due to error ", error)
})

