const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const port = 5000;
const config = require('./config.json')
const checkToken = require('./auth')

//Why not working const {checkToken} = require('./auth')

//express initialization
const app = express();
app.use(express.json())
app.use(bodyParser.json())

//connection with database
mongoose.connect("mongodb://localhost:27017/employeedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connection successful")
    })
    .catch((err) => {
        console.log(err)
    })


//Routes
//Register a user
app.post('/register', async (req, res) => {

    try {
        const { username, password } = req.body

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //creating a new user

        const user = new User({
            username: username,
            password: hashedPassword
        })

        //Save the user
        await user.save()

        res.status(200).json({
            success: true,
            message: 'A new user is registered'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }

})

const fs = require("fs")
const path = require("path")

var privateKEY  = fs.readFileSync('./private_key.pem', 'utf8');

//Login as a user
app.post('/login', async (req, res) => {

    try {
        //get data from body
        const { username, password } = req.body
        // const username = req.body.username
        // const password = req.body.password

        //Find the user in the database
        const user = await User.findOne({ username: username })

        //If user is not available, or password does not match
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            console.log("Result is ", result)

            if (result) {

                //Generate JWT token
                // const token = jwt.sign({ userId: user._id, name: user.username }, privateKEY, {expiresIn: '1h' })
                const token = jwt.sign({ userId: user._id, name: user.username }, 'Fahim', {expiresIn: '1h' })

                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    body: token
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "Password does not match"
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
})

//Show all users
app.post('/get', checkToken, async(req,res) => {

    try{
        const allUser = await User.find()

        res.status(200).json({
            success: true,
            message:"All users are displayed",
            body: allUser
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err
        })
    }

})



// app.listen(config.api.port , ()=>{
//     console.log(`Server is running on port ${config.api.port}`)   
// })

app.listen(`${port}`, () => {
    console.log(`Server is running on port ${port}`)
})