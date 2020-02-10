const bcrypt = require("bcrypt")
const saltRounds = 3

function hash(plainPass) {
    let hashed = bcrypt.hashSync(plainPass, saltRounds)
    return hashed
}
module.exports = hash