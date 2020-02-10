const jwt = require("jsonwebtoken")
function generateToken(payload) {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET)
    return access_token
}
module.exports = generateToken