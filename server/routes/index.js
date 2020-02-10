const routes = require("express").Router()
const authentication = require("../middlewares/authentication")
const controlUser = require("../controllers/controlUser")
const controlComic = require("../controllers/controlComic")

routes.post("/login", controlUser.login)
routes.post("/register", controlUser.register)
routes.get("/comics", authentication, controlComic.fetchComics)
routes.put("/comics/:id", authentication, controlComic.updateComic)
routes.get("/comics/:id", authentication, controlComic.getComicById)

module.exports = routes