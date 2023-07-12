//Callback functions

function fetchData(callback) {
    // Simulating an asynchronous operation
    setTimeout(()=> {
      const data = 'This is the fetched data';
      callback(data);
    }, 2000); 
  }
  
  function processData(data) {
    console.log('Processing data:', data);
  }
  
  // Calling the fetchData function and passing the processData function as a callback
  fetchData(processData);
  