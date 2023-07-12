//Creating a node file using npm i and installing express and nodemon

const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//Type http://localhost:3000/ on the browser after running the application

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Run using npm start