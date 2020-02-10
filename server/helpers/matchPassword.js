const bcrypt = require("bcrypt")
function match(passIn, passDB) {
    const cocok = bcrypt.compareSync(passIn, passDB)
    return cocok
}
module.exports = match