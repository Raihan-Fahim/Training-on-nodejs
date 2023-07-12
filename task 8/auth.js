const jwt = require('jsonwebtoken')
const fs = require("fs")

var publicKEY  = fs.readFileSync('./public_key.pem', 'utf8');

const checkToken = (req, res, next) => {

    try {
        const authorization = req.headers['authorization']

        if (!authorization) {
            res.status(405).json({
                status: false,
                message: " No authorization"
            })
        }
        else if (authorization.split(' ')[0] != 'Bearer') {
            res.status(405).json({
                status: false,
                message: "Not a bearer token"
            })
        }
        else {
            const token = authorization.split(' ')[1]

            // jwt.verify(token, publicKEY, (err, decoded) => {
            jwt.verify(token, 'Fahim', (err, decoded) => {

                const { name, userId } = decoded
               
                console.log("Id and name are ", userId, "and" , name)
                

                if (!err) {
                    console.log("Token available")
                    req.token_data = decoded;
                    next();
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: err.message
                    })
                }
            })
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
            // message: "jwt expired"

        })
    }
}

module.exports = checkToken;