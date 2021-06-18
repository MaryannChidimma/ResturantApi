const optionsService = require('../services/options.service')
const appResponse = require('../../lib/appResponse')
const { singleUpload } = require('../../lib/cloudinary')
const { BadRequestError } = require('../../lib/appError')
class optionsController {

    create = async (req, res) => {
        if (req.file) {
            const image = await singleUpload(req.file)
            if (!image) throw new BadRequestError("image Upload failed")
            req.body.image = image
        }
        const data = await optionsService.create(req.body)
        res.status(201).send(appResponse("option created successfully", data))
    }

    getAll = async (req, res) => {
        const data = await optionsService.find(req.query)
        res.send(appResponse("all options", data))
    }

    update = async (req, res) => {
        const data = { ...req.body }
        if (req.file) {
            let fileUpload = await singleUpload(req.file)

            if (!fileUpload) throw new BadRequestError("image uplaod failed")

            data.image = fileUpload
        }
        const option = await optionsService.update(req.query.id, data)
        res.send(appResponse("optionupdated successfully", option))
    }

    delete = async (req, res) => {
        const data = await optionsService.delete(req.query.id)
        res.send(appResponse("option has successfully been deleted"))
    }



}

module.exports = new optionsController()