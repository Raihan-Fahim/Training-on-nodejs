const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {type: String},

    age: {type: Number},

    department : {
        type: String,
        enum: ["Science", "Arts", "Commerce"]
    },
})

module.exports = mongoose.model('Student', studentSchema)