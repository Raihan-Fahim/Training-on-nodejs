//Async await example

const callAnotherFunc = () =>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve('After');
        }, 2000)
    });
}

async function functionAsync () {
    console.log("Before")

    const result = await callAnotherFunc();

    console.log("After 2 seconds result is ", result)

    /* 
    If we don't use async await, the result will show like `After 2 seconds result is  Promise { <pending> }`
    Using async await, the result will be `Result is  After` 
    */
}
  
functionAsync()