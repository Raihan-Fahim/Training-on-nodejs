const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const Employee = require('./employee.model')

//express app initialization
const app = express();
app.use(express.json());
app.use(bodyParser.json());

//Connection with the database
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

//Add an employee
app.post('/employee/add', async (req, res) => {
    const newEmployee = new Employee(req.body)

    try {
        const savedEmployee = await newEmployee.save();
        res.status(200).json({
            success: "Employee added successfully",
            body: savedEmployee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
})


//Get all employee
app.post('/employee/get', async (req, res) => {

    try {
        const employees = await Employee.find()

        res.status(200).json({
            success: true,
            message: "All employee list",
            body: employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }

})

//Get individual employee
app.post('/employee/get/:id', async (req, res) => {

    try {
        const employees = await Employee.findById(req.params.id)

        res.status(200).json({
            success: true,
            message: "All employee list",
            body: employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }

})

//Update an employee
app.post('/employee/update/:id', async (req, res) => {

    try {
        const id = req.params.id

        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            name: req.body.name,
            salary: req.body.salary,
            department: req.body.department
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "The employee information is updated",
            body: updateEmployee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
})


//Delete an employee
app.post('/employee/delete/:id', async (req, res) => {

    try {
        const employees = await Employee.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Delete employee",
            body: employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }

})

//Implement pagination, sort and filtering
app.post('/employee/getFilter', async (req, res) => {

    try {
        const { name, sortBy, page = 1, limit = 5 } = req.query
        // const sort = req.body.id
        // const limit = req.body.limit
        // const offset = req.body.offset

        //Converting page and limit to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        const getEmployee = await Employee
        .find({ name: { $regex: name, $options: 'i' } }).sort(sortBy)
        .skip(skip)
        .limit(limitNumber)
        .exec()

        const totalCount = await Employee.countDocuments();

        res.status(200).json({
            success: true,
            body: getEmployee,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / limitNumber)
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
})


app.use(express.json())

app.listen(3001, () => {
    console.log("App is listening on port 3000")
})