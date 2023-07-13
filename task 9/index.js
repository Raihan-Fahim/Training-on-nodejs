const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config.json')
const Student = require('./student.model')

const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const {validateStudent} = require("./validation")

const app = express()
app.use(express.json())
app.use(bodyParser.json())

app.use(helmet());
// app.use(morgan());
app.use(morgan('combined'));
app.use(cors());

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
app.post('/add', validateStudent, async(req,res) => {
    
    const newStudent = new Student(req.body)

    try{
        await newStudent.save()

        res.status(200).json({
            success: true,
            message: "New Student added"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

//console.log(config.api.port)

app.listen(config.api.port, ()=>{
    console.log(`Server is running on port ${config.api.port}`)
})