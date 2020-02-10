const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty("access_token")) {
        const access_token = req.headers.access_token
        try {
            const payload = jwt.verify(access_token, process.env.JWT_SECRET)
            req.payload = payload
            next()
        } catch (error) {
            next({ code: 401, message: "failed to authenticate" })
        }
    } else {
        next({ code: 400, message: "please login first" })
    }
}