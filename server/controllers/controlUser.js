const User = require("../models").User
const generateToken = require("../helpers/generateToken")
const matchPassword = require("../helpers/matchPassword")

class ControlUser {
    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(emailFoundLogin => {
                // console.log("masuk sini")
                if (emailFoundLogin) {
                    if (req.body.password == emailFoundLogin.password) {
                        const access_token = generateToken({ id: emailFoundLogin.id })
                        res.status(200).json({ access_token })
                    } else {
                        let match = matchPassword(req.body.password, emailFoundLogin.password)
                        if (match) {
                            const access_token = generateToken({ id: emailFoundLogin.id })
                            res.status(200).json({ access_token })
                        } else {
                            next({ code: 401, message: "wrong password/email" })
                        }
                    }
                } else {
                    next({ code: 401, message: "wrong password/email" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static register(req, res, next) {
        // console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<")
        User.findOne({ where: { email: req.body.email } })
            .then(emailFoundReg => {
                if (emailFoundReg) {
                    next({ code: 400, message: "email already used" })
                } else {
                    return User.create({
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name
                    })
                }
            })
            .then(userRegistered => {
                let access_token = generateToken({ id: userRegistered.id })
                res.status(201).json({ access_token: access_token })
            })
            .catch(err => {
                next(err)
            })
    }

}
module.exports = ControlUser