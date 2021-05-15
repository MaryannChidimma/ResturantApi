const categoriesService = require('../services/categories.service')
const appResponse = require('../../lib/appResponse')
const { singleUpload } = require('../../lib/cloudinary')
class CategoriesController {
    create = async (req, res) => {
        const image = await singleUpload(req.file)
        const data = await categoriesService.create({ ...req.body, image })
        res.status(201).send(appResponse("category created successfully", data))
    }

    getAll = async (req, res) => {
        const data = await categoriesService.find()
        res.send(appResponse("all categories", data))
    }


}

module.exports = new CategoriesController()