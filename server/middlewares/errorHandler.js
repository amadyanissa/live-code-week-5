function errorHandler(err, req, res, next) {
    // console.log("masuk error handler")
    // console.log(err.code, err.message)
    if (err.code) {
        // console.log("masukkk ")
        console.log(err.message, "<<")
        res.status(err.code).json(err.message)
    } else if (err.errors) {
        let errMsg = []
        for (let i of err.errors) {
            errMsg.push(i)
        }
        res.status(400).json(errMsg)
    } else {
        res.status(500).json({ err })
    }
}
module.exports = errorHandler