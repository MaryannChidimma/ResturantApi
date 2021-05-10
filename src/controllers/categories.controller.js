const categoriesService = require('../services/categories.service')
const appResponse = require('../../lib/appResponse')

class CategoriesController {
    create = async (req, res) => {
        const data = await categoriesService.create(req.body)
        res.status(201).send(appResponse("category created successfully", data))
    }

    getAll = async (req, res) => {
        const data = await categoriesService.getAll()
        res.send(appResponse("all categories", data))
    }


}

module.exports = new CategoriesController()