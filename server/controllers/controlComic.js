const Comic = require("../models").Comic

class ControlComic {
    static fetchComics(req, res, next) {
        Comic.findAll()
            .then(allComics => {
                res.status(200).json(allComics)
            })
            .catch(err => {
                next(err)
            })
    }
    static updateComic(req, res, next) {
        Comic.update({
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl
        }, {
                where: { id: req.params.id },
                returning: true,
                plain: true
            })
            .then(updated => {
                // console.log(updated[1].dataValues, "<< ini updated")

                res.status(200).json({ comic: updated[0], message: "success update comic" })
            })
            .catch(err => {
                next(err)
            })

    }

    static getComicById(req, res, next) {
        Comic.findOne({ where: { id: req.params.id } })
            .then(ketemu => {
                res.status(200).json(ketemu)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlComic