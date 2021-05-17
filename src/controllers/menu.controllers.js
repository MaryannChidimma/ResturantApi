const { BadRequestError } = require('../../lib/appError');
const menuService = require('../services/menu.service')
const appResponse = require('../../lib/appResponse')
const { singleUpload } = require('../../lib/cloudinary')
class MenuController {
    async create(req, res) {
        const fileUpload = await singleUpload(req.file)
        if (!fileUpload) throw new BadRequestError("image upload failed")
        const data = await menuService.create({ ...req.body, image: fileUpload });
        res.send(appResponse("menu created successfully", data));
    }

    async getAll(req, res) {
        const data = await menuService.find();
        res.send(appResponse("All menus", data))
    }

    async getOne(req, res) {
        const data = await menuService.getOne(req.query.id);
        res.send(appResponse("Menu details gotten successfully", data))
    }

    async update(req, res) {
        const data = await menuService.update(req.query.id, req.body);
        res.send(appResponse("menu updated successfully"))
    }

    async delete(req, res) {
        await menuService.delete(req.query.id);
        res.send(appResponse("menu deleted successfully"));
    }
}


module.exports = new MenuController()