const express = require("express")
const mysql = require('mysql')
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb'
})

//Connect to database
//First way
connection.connect((err) => {
    if (err) {
        console.log("Error in DB connection" + JSON.stringify(err, undefined, 2))
    } else {
        console.log("DB connection successful")
    }
})


//Second way
// connection.connect((err)=>{
//     if (err) throw err; 
//     console.log("DB connection successful")
// })

//Middleware to 
app.use(express.json());


//Routes

//Get all the employees
app.get('/employee', (req, res) => {
    connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
            // res.send(rows)
            res.json({
                status: 200,
                success: true,
                body: rows
            })
        }
    })
})

//Get employee by id
app.get('/employee/:id', (req, res) => {
    connection.query('SELECT * FROM employee WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
            // res.send(rows)
            res.json({
                status: 200,
                success: true,
                body: rows
            })
        }
    })
})

//Add employee
app.post('/employee/add', (req, res) => {

    const emp = req.body
    // employee_data = [req.body.name, req.body.salary, req.body.department]
    employee_data = [emp.name, emp.salary, emp.department]
    query = "INSERT INTO employee(name, salary, department) values(?,?,?)"

    connection.query(query, employee_data, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(200).json({
                success: true,
                body: {
                    "employee name": emp.name,
                    "salary": emp.salary,
                    "department": emp.department
                }
            })
        } else {
            console.log(rows)
            // res.send(rows)
            res.status(200).json({
                success: true,
                body: {
                    "employee name": emp.name,
                    "salary": emp.salary,
                    "department": emp.department
                }
            })
        }
    })
})

//Update an employee
app.post('/employee/update/:id', (req, res) => {
    const { id } = req.params
    console.log(id)

    const updatedEmployee = req.body
    console.log(updatedEmployee)
    const query = "UPDATE employee SET ? where id=?"

    connection.query(query, [updatedEmployee, id], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                body: err
            })
        } else {
            console.log(rows)
            // res.send(rows)
            res.status(200).json({
                success: true,
                body: {
                    "employee name": req.body.name,
                    "salary": req.body.salary,
                    "department": req.body.department
                }
            })
        }
    })

})

//Delete an employee by id
app.post('/employee/delete/:id', (req, res) => {
    const { id } = req.params

    const query = "DELETE from employee where id=?"

    connection.query(query, id, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                body: err
            })
        } else {
            console.log(rows)
            // res.send(rows)
            res.status(200).json({
                success: true,
                body: "The employee has been deleted"
            })
        }
    })
})


//using offset, limit, filter and sorting
app.post('/employee/all', (req, res) => {

    const filter = req.body.filter
    const sort = req.body.id
    const limit = req.body.limit
    const offset = req.body.offset

    const query = "SELECT * FROM employee where name LIKE ? ORDER BY ? LIMIT ? OFFSET ?"

    // connection.query("SELECT * FROM employee where name LIKE ? ORDER BY ? LIMIT ? OFFSET ?",[`%${filter}%`, sort, limit, offset], (err, rows) => {
    connection.query(query, [`%${filter}%`, sort, limit, offset], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                body: err
            })
        } else {
            console.log(rows)
            // res.send(rows)
            res.status(200).json({
                success: true,
                body: "The employee is sh",
                rows: rows
            })
        }
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})