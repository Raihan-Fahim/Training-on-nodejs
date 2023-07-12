const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        require: true
    }
}, {timestamps:true} )


//creating the model and exporting
module.exports = mongoose.model("User", userSchema)