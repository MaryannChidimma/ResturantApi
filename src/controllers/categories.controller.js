const categoriesService = require('../services/categories.service')
const appResponse = require('../../lib/appResponse')
const { singleUpload } = require('../../lib/cloudinary')
const { BadRequestError } = require('../../lib/appError')
class CategoriesController {
    create = async (req, res) => {
        const image = await singleUpload(req.file)
        if (!image) throw new BadRequestError("image Upload failed")

        const data = await categoriesService.create({ ...req.body, image })
        res.status(201).send(appResponse("category created successfully", data))
    }

    getAll = async (req, res) => {
        const data = await categoriesService.find()
        res.send(appResponse("all categories", data))
    }

    update = async (req, res) => {
        const data = { ...req.body }
        if (req.file) {
            let fileUpload = await singleUpload(req.file)

            if (!fileUpload) throw new BadRequestError("image uplaod failed")

            data.image = fileUpload
        }
        const category = await categoriesService.update(req.query.id, data)
        res.send(appResponse("categoryupdated successfully", category))
    }

    delete = async (req, res) => {
        const data = await categoriesService.delete(req.query.id)
        res.send(appResponse("category has successfully been deleted"))
    }



}

module.exports = new CategoriesController()