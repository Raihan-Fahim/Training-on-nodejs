const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    password: Joi.string().required(),
    email: Joi.string().email(),
    age: Joi.number(),
    // age: Joi.number().allow(null),
    department: Joi.valid("Science", "Arts", "Commerce")
})

//If I give age: ""
//Showing error

const validateStudent = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) 
        return res.status(400).json({
            error: error.details[0].message
        });
        
    next();
};


module.exports = { validateStudent }