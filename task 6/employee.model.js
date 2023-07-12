const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    salary: {
        type: Number,
        required: true
    },
    department: {
        type: String,

    }
}, {timestamps: true})

module.exports = mongoose.model("Employee", employeeSchema)