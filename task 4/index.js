const express = require('express');
const app = express();

const firstRoute = require("./router/getData.route")




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/test', firstRoute);
//Type http://localhost:4000/ on the browser after running the application



// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Run using npm start

