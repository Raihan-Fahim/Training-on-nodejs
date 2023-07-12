const showData = async (req, res) => {

    try {

        text = "Hello world"

        res.json({
            status: 200,
            message: "Successful",
            body: text
        })
    }
    catch (err) {
        res.json({
            status: 404,
            success: false,
            error: err.message
        })
    }

}

module.exports = { showData }